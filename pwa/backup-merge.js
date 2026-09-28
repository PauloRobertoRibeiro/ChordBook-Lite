(function (root) {
  function cloneItem(item) {
    return JSON.parse(JSON.stringify(item));
  }

  function stamp(item) {
    return {
      revision: Number(item?.revision || 0),
      time: Date.parse(item?.updatedAt || item?.createdAt || 0) || 0,
    };
  }

  function incomingIsNewer(local, incoming) {
    const a = stamp(local);
    const b = stamp(incoming);
    if (b.revision !== a.revision) return b.revision > a.revision;
    if (b.time !== a.time) return b.time > a.time;
    return false;
  }

  function songPayload(song) {
    return JSON.stringify({
      title: song.title,
      artist: song.artist,
      category: song.category,
      isFavorite: Boolean(song.isFavorite),
      lines: song.lines,
      capo: Number(song.capo || 0),
      cue: song.cue || "",
      transposeValue: Number(song.transposeValue || 0),
    });
  }

  function setlistPayload(setlist) {
    return JSON.stringify({
      title: setlist.title,
      songIds: setlist.songIds,
      finalSongIds: setlist.finalSongIds || [],
      notes: setlist.notes || "",
      service: setlist.service || {},
    });
  }

  function memberPayload(member) {
    return JSON.stringify({
      name: member.name,
      roles: member.roles || [],
      note: member.note || "",
    });
  }

  function agendaPayload(agenda) {
    return JSON.stringify({
      fields: agenda?.fields || [],
      sections: agenda?.sections || [],
    });
  }

  function planItems(localItems, incomingItems, payloadFn) {
    const localById = new Map((localItems || []).map((item) => [item.id, item]));
    const adds = [];
    const replaces = [];
    const skips = [];
    const conflicts = [];
    (incomingItems || []).forEach((incoming) => {
      const local = localById.get(incoming.id);
      if (!local) {
        adds.push(incoming);
        return;
      }
      if (payloadFn(local) === payloadFn(incoming)) {
        skips.push({ local, incoming });
        return;
      }
      if (incomingIsNewer(local, incoming)) {
        replaces.push({ local, incoming });
        return;
      }
      conflicts.push({ local, incoming });
    });
    return { adds, replaces, skips, conflicts };
  }

  function planTeam(localTeam, incomingTeam) {
    if (!incomingTeam) {
      return {
        members: { adds: [], replaces: [], skips: [], conflicts: [] },
        rolePresets: localTeam?.rolePresets || [],
      };
    }
    return {
      members: planItems(localTeam?.members || [], incomingTeam.members || [], memberPayload),
      rolePresets: [...new Set([...(localTeam?.rolePresets || []), ...(incomingTeam.rolePresets || [])])],
    };
  }

  function planAgenda(localAgenda, incomingAgenda) {
    if (!incomingAgenda) return { action: "skip", conflict: false };
    if (agendaPayload(localAgenda) === agendaPayload(incomingAgenda)) {
      return { action: "skip", conflict: false };
    }
    return { action: "replace", conflict: true, local: localAgenda, incoming: incomingAgenda };
  }

  function planImport(localState, prepared) {
    const songs = planItems(localState.songs || [], prepared.songs || [], songPayload);
    const setlists = planItems(localState.setlists || [], prepared.setlists || [], setlistPayload);
    const team = planTeam(localState.team, prepared.team);
    const agenda = planAgenda(localState.agenda, prepared.agenda);
    const conflicts = [
      ...songs.conflicts.map((item) => ({ kind: "song", ...item })),
      ...setlists.conflicts.map((item) => ({ kind: "setlist", ...item })),
      ...team.members.conflicts.map((item) => ({ kind: "member", ...item })),
      ...(agenda.conflict ? [{ kind: "agenda", local: agenda.local, incoming: agenda.incoming }] : []),
    ];
    return {
      songs,
      setlists,
      team,
      agenda,
      settings: prepared.settings || null,
      conflicts,
    };
  }

  function applyItems(localItems, plan, decision, options = {}) {
    const result = (localItems || []).map(cloneItem);
    const byId = new Map(result.map((item, index) => [item.id, index]));
    const idMap = {};

    function upsert(item) {
      const next = cloneItem(item);
      const index = byId.get(next.id);
      if (index == null) {
        byId.set(next.id, result.length);
        result.push(next);
        return;
      }
      result[index] = next;
    }

    (plan.adds || []).forEach(upsert);

    if (decision === "auto" || decision === "replace") {
      (plan.replaces || []).forEach((entry) => upsert(entry.incoming));
    }
    if (decision === "replace") {
      (plan.conflicts || []).forEach((entry) => upsert(entry.incoming));
    }
    if (decision === "both") {
      const suffix = options.suffix || " (import)";
      const makeId = options.makeId || (() => `imp-${Date.now()}-${Math.floor(Math.random() * 100000)}`);
      [...(plan.replaces || []), ...(plan.conflicts || [])].forEach((entry) => {
        const copy = cloneItem(entry.incoming);
        const previousId = copy.id;
        copy.id = makeId();
        if (typeof copy.title === "string") copy.title = `${copy.title}${suffix}`;
        if (typeof copy.name === "string") copy.name = `${copy.name}${suffix}`;
        idMap[previousId] = copy.id;
        result.push(copy);
      });
    }
    return { items: result, idMap };
  }

  function remapIds(ids, idMap) {
    return (ids || []).map((id) => idMap[id] || id);
  }

  function applyImportPlan(localState, plan, decision, options = {}) {
    const songsApplied = applyItems(localState.songs, plan.songs, decision, options);
    const setlistsApplied = applyItems(localState.setlists, plan.setlists, decision, options);
    if (decision === "both") {
      const localSetlistIds = new Set((localState.setlists || []).map((item) => item.id));
      setlistsApplied.items.forEach((setlist) => {
        if (localSetlistIds.has(setlist.id)) return;
        if (Array.isArray(setlist.songIds)) setlist.songIds = remapIds(setlist.songIds, songsApplied.idMap);
        if (Array.isArray(setlist.finalSongIds)) setlist.finalSongIds = remapIds(setlist.finalSongIds, songsApplied.idMap);
      });
    }
    const membersApplied = applyItems(localState.team?.members || [], plan.team.members, decision, options);
    const rolePresets = decision === "replace" || decision === "auto" || decision === "both" || decision === "keep"
      ? plan.team.rolePresets
      : (localState.team?.rolePresets || []);

    let agenda = localState.agenda;
    if (plan.agenda?.action === "replace") {
      if (decision === "replace" || (decision === "auto" && !plan.agenda.conflict)) agenda = plan.agenda.incoming;
      if (decision === "auto" && plan.agenda.conflict) agenda = localState.agenda;
    }

    const applySettings = Boolean(plan.settings) && (decision === "replace" || decision === "auto");

    return {
      songs: songsApplied.items,
      setlists: setlistsApplied.items,
      team: {
        members: membersApplied.items,
        rolePresets,
      },
      agenda,
      applySettings,
      settings: applySettings ? plan.settings : null,
    };
  }

  function hasConflicts(plan) {
    return Boolean(plan?.conflicts?.length);
  }

  const api = {
    cloneItem,
    incomingIsNewer,
    songPayload,
    setlistPayload,
    memberPayload,
    agendaPayload,
    planItems,
    planImport,
    applyImportPlan,
    hasConflicts,
  };

  root.ChordBookBackup = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

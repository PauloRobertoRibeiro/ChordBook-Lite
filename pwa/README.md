# ChordBook Lite

Nucleo leve do ChordBook: biblioteca, palco e setlists, sem Flutter, audio pesado, Demucs ou modelos de IA.

## Rodar localmente

```powershell
cd C:\Users\Jairo\Desktop\ChordBook-Lite\pwa
python -m http.server 5177
```

Depois abra:

```text
http://localhost:5177
```

## O que esta versao cobre

- biblioteca de cifras no navegador
- editor com acordes entre colchetes
- visualizacao de palco com transposicao
- favoritos, busca e categorias
- setlists
- importacao/exportacao de `.chordbook` e `.chordbook-library`
- armazenamento em `localStorage`

Audio pesado, Demucs e modelos IA ficam fora do nucleo. A ideia e manter o
repertorio rapido e confiavel, e tratar stems como modulo opcional.

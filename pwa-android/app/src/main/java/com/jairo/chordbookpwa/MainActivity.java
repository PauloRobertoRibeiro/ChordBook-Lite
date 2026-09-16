package com.jairo.chordbookpwa;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.MimeTypeMap;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {
    private static final String ASSET_HOST = "appassets.androidplatform.net";
    private static final String ASSET_INDEX = "https://appassets.androidplatform.net/assets/index.html";
    private static final String PREFS = "chordbook";

    private WebView webView;
    private boolean stageKeys;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
        }

        webView.setWebChromeClient(new WebChromeClient());
        webView.addJavascriptInterface(new ChordBookBridge(), "ChordBookAndroid");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (ASSET_HOST.equals(uri.getHost())) {
                    return serveAsset(uri);
                }
                return super.shouldInterceptRequest(view, request);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return openOutsideApp(request.getUrl());
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return openOutsideApp(Uri.parse(url));
            }
        });
        boolean httpsAssets = getSharedPreferences(PREFS, MODE_PRIVATE).getBoolean("https_assets", false);
        webView.loadUrl(httpsAssets ? ASSET_INDEX : "file:///android_asset/index.html");
        setContentView(webView);
    }

    private WebResourceResponse serveAsset(Uri uri) {
        String path = uri.getPath() == null ? "" : uri.getPath();
        if (path.startsWith("/assets/")) {
            path = path.substring("/assets/".length());
        }
        if (path.startsWith("/")) {
            path = path.substring(1);
        }
        if (path.isEmpty()) {
            path = "index.html";
        }
        if (path.contains("..")) {
            return textResponse(404, "Not Found", "text/plain", "");
        }
        try {
            InputStream stream = getAssets().open(path);
            String mime = mimeFor(path);
            String encoding = needsUtf8(mime) ? "UTF-8" : null;
            Map<String, String> headers = new HashMap<>();
            headers.put("Cache-Control", "no-store");
            return new WebResourceResponse(mime, encoding, 200, "OK", headers, stream);
        } catch (Exception ignored) {
            return textResponse(404, "Not Found", "text/plain", "");
        }
    }

    private static boolean needsUtf8(String mime) {
        return mime.startsWith("text/") || mime.contains("javascript") || mime.contains("json");
    }

    private WebResourceResponse textResponse(int status, String reason, String mime, String body) {
        byte[] bytes = body.getBytes();
        return new WebResourceResponse(
            mime,
            "UTF-8",
            status,
            reason,
            Collections.emptyMap(),
            new ByteArrayInputStream(bytes)
        );
    }

    private static String mimeFor(String path) {
        String name = path.toLowerCase();
        int dot = name.lastIndexOf('.');
        String ext = dot >= 0 ? name.substring(dot + 1) : "";
        if ("html".equals(ext) || "htm".equals(ext)) return "text/html";
        if ("js".equals(ext)) return "text/javascript";
        if ("css".equals(ext)) return "text/css";
        if ("png".equals(ext)) return "image/png";
        if ("jpg".equals(ext) || "jpeg".equals(ext)) return "image/jpeg";
        if ("webp".equals(ext)) return "image/webp";
        if ("svg".equals(ext)) return "image/svg+xml";
        if ("json".equals(ext)) return "application/json";
        if ("webmanifest".equals(ext)) return "application/manifest+json";
        String mapped = MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext);
        return mapped != null ? mapped : "application/octet-stream";
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
            if (event.getAction() == KeyEvent.ACTION_DOWN && event.getRepeatCount() == 0) {
                sendAppBack();
            }
            return true;
        }
        if (stageKeys && event.getAction() == KeyEvent.ACTION_DOWN) {
            int code = event.getKeyCode();
            if (code == KeyEvent.KEYCODE_VOLUME_UP || code == KeyEvent.KEYCODE_MEDIA_NEXT) {
                sendStageStep("next");
                return true;
            }
            if (code == KeyEvent.KEYCODE_VOLUME_DOWN || code == KeyEvent.KEYCODE_MEDIA_PREVIOUS) {
                sendStageStep("prev");
                return true;
            }
        }
        return super.dispatchKeyEvent(event);
    }

    private void sendStageStep(String direction) {
        if (webView == null) return;
        webView.evaluateJavascript(
            "window.ChordBookNative&&window.ChordBookNative.stageStep('" + direction + "')",
            null
        );
    }

    private void sendAppBack() {
        if (webView == null) {
            finish();
            return;
        }
        webView.evaluateJavascript(
            "(function(){try{return !!(window.ChordBookNative&&window.ChordBookNative.goBack&&window.ChordBookNative.goBack());}catch(e){return false;}})()",
            value -> {
                if (!"true".equals(value)) {
                    runOnUiThread(this::finish);
                }
            }
        );
    }

    private class ChordBookBridge {
        @JavascriptInterface
        public void setKeepScreenOn(boolean on) {
            runOnUiThread(() -> {
                if (on) {
                    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                } else {
                    getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                }
            });
        }

        @JavascriptInterface
        public void setStageKeys(boolean on) {
            stageKeys = on;
        }

        @JavascriptInterface
        public String getVersionName() {
            try {
                PackageInfo info = MainActivity.this.getPackageManager()
                    .getPackageInfo(MainActivity.this.getPackageName(), 0);
                return info.versionName != null ? info.versionName : "1.1.1";
            } catch (Exception ignored) {
                return "1.1.1";
            }
        }

        @JavascriptInterface
        public void finishFileOrigin(String library, String look) {
            getSharedPreferences(PREFS, MODE_PRIVATE).edit()
                .putBoolean("https_assets", true)
                .putString("mig_library", library != null ? library : "")
                .putString("mig_look", look != null ? look : "")
                .apply();
            runOnUiThread(() -> {
                if (webView != null) {
                    webView.loadUrl(ASSET_INDEX);
                }
            });
        }

        @JavascriptInterface
        public String consumeMigration() {
            SharedPreferences prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
            String library = prefs.getString("mig_library", "");
            String look = prefs.getString("mig_look", "");
            if ((library == null || library.isEmpty()) && (look == null || look.isEmpty())) {
                return "";
            }
            prefs.edit().remove("mig_library").remove("mig_look").apply();
            try {
                JSONObject data = new JSONObject();
                data.put("library", library != null ? library : "");
                data.put("look", look != null ? look : "");
                return data.toString();
            } catch (Exception ignored) {
                return "";
            }
        }
    }

    private boolean openOutsideApp(Uri uri) {
        String scheme = uri.getScheme();
        if (ASSET_HOST.equalsIgnoreCase(uri.getHost())) {
            return false;
        }
        if (!"http".equalsIgnoreCase(scheme) && !"https".equalsIgnoreCase(scheme)) {
            return false;
        }

        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        startActivity(intent);
        return true;
    }
}

package com.jairo.chordbookpwa;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
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
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return openOutsideApp(request.getUrl());
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return openOutsideApp(Uri.parse(url));
            }
        });
        webView.loadUrl("file:///android_asset/index.html");
        setContentView(webView);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
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
                return info.versionName != null ? info.versionName : "1.0.0";
            } catch (Exception ignored) {
                return "1.0.0";
            }
        }
    }

    private boolean openOutsideApp(Uri uri) {
        String scheme = uri.getScheme();
        if (!"http".equalsIgnoreCase(scheme) && !"https".equalsIgnoreCase(scheme)) {
            return false;
        }

        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        startActivity(intent);
        return true;
    }
}

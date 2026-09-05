apply(plugin = "com.android.application")

android {
    namespace = "com.jairo.chordbookpwa"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.jairo.chordbookpwa"
        minSdk = 23
        targetSdk = 36
        versionCode = 1
        versionName = "0.1.0"
    }

    sourceSets {
        getByName("main") {
            assets.srcDir("../../pwa")
        }
    }
}

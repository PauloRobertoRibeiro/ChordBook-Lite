apply(plugin = "com.android.application")

android {
    namespace = "com.jairo.chordbookpwa"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.jairo.chordbookpwa"
        minSdk = 23
        targetSdk = 36
        versionCode = 104
        versionName = "1.1.3"
    }

    sourceSets {
        getByName("main") {
            assets.srcDir("../../pwa")
        }
    }
}

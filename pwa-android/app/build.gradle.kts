apply(plugin = "com.android.application")

android {
    namespace = "com.jairo.chordbookpwa"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.jairo.chordbookpwa"
        minSdk = 23
        targetSdk = 36
        versionCode = 102
        versionName = "1.1.1"
    }

    sourceSets {
        getByName("main") {
            assets.srcDir("../../pwa")
        }
    }
}

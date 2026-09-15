import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Shrija AI",
  slug: "shrijaai-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "shrijaai",
  userInterfaceStyle: "automatic",
  ios: { supportsTablet: false, bundleIdentifier: "com.app.shrijaaimobile" },
  android: {
    package: "com.app.shrijaaimobile",
    softwareKeyboardLayoutMode: "resize",
    adaptiveIcon: {
      // backgroundColor: "#10A37F",
      backgroundColor: "#d32a8d",
      foregroundImage: "./assets/images/android-icon-foreground.png",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      { image: "./assets/images/splash-icon.png", imageWidth: 200, resizeMode: "contain", backgroundColor: "#FFFFFF" },
    ],
    "expo-speech-recognition",
  ],
};

export default config;

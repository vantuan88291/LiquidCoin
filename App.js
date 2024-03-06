// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import React from "react"
import { registerRootComponent } from "expo"
import { Platform } from "react-native"
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return Platform.select({
    ios: () => {
      const App = require("./app/app.tsx").default
      return <App hideSplashScreen={SplashScreen.hideAsync} />
    },
    android: () => {
      const App = require("./app/app.tsx").default
      return <App hideSplashScreen={SplashScreen.hideAsync} />
    },
    web: () => {
      const AppWeb = require("./app/appWeb").default
      return <AppWeb hideSplashScreen={SplashScreen.hideAsync} />
    }
  })();
}

if (Platform.OS !== "web") {
  registerRootComponent(IgniteApp)
}

export default IgniteApp

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashContextProvider } from "./src/hooks/useSplash";
import { Routes } from "./src/routes/index.routes";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SplashContextProvider>
            <StatusBar style="dark" backgroundColor="transparent" translucent />
            <Routes />
          </SplashContextProvider>
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

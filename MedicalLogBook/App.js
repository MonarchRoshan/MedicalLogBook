import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AppNavigation from "./navigation/AppNavigation";
import { store } from "./redux/store";
import { StatusBar, useColorScheme } from "react-native";
import CommonSnackbar from "./components/Snackbar";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar
            translucent={true}
            animated={true}
            barStyle="dark-content"
            backgroundColor={"transparent"}
          />
          <AppNavigation />
          <CommonSnackbar />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;

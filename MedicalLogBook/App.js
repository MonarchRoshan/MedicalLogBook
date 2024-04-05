import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AppNavigation from "./navigation/AppNavigation";
import { store } from "./redux/store";
import { StatusBar } from "react-native";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          translucent={true}
          animated={true}
          barStyle="dark-content"
          backgroundColor={"transparent"}
        />
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

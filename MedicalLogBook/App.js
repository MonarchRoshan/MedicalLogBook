import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AppNavigation from "./navigation/AppNavigation";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;

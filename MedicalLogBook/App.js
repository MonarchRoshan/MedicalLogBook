import AppNavigation from "./navigation/AppNavigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;

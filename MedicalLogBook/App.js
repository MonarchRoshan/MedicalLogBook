

import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';

 function App() {
  return (
    <Provider store={store}>
            <AppNavigation/>
    </Provider>
    
  );
}

export default App;
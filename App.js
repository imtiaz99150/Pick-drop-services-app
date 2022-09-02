import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './app/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app/navigation';

export default function App() {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 0);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

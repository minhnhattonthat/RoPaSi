import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './app/Router';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

const prefix = Platform.OS === 'android' ? 'ropasi://ropasi/' : 'ropasi://';

export default class App extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }

  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation uriPrefix={prefix} />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './app/Router';
import store from './app/store';

const prefix = Platform.OS === 'android' ? 'ropasi://ropasi/' : 'ropasi://';

export default class App extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      // LocationStore.startWatch();
      SplashScreen.hide();
    }, 500);
  }

  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation uriPrefix={prefix} />
        </Provider>
      </SafeAreaProvider>
    );
  }
}

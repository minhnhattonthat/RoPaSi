import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import MainScreen from './modules/main/screen/MainScreen';
import MenuScreen from './modules/menu/screen/MenuScreen';
import HistoryScreen from './modules/history/screen/HistoryScreen';
import OptionsScreen from './modules/options/screen/OptionsScreen';

const RootStack = createStackNavigator(
  {
    MenuScreen: {
      screen: MenuScreen,
    },
    MainScreen: {
      screen: MainScreen,
    },
    OptionsScreen: {
      screen: OptionsScreen,
      headerMode: 'screen',
      navigationOptions: {
        headerShown: true,
        headerTransparent: true,
      },
    },
    HistoryScreen: {
      screen: HistoryScreen,
    },
  },
  {
    initialRouteName: 'MenuScreen',
    headerMode: 'none',
    mode: 'card',
    navigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
      // ...TransitionPresets.ScaleFromCenterAndroid,
    },
  },
);

const Navigation = createAppContainer(RootStack);

export default Navigation;

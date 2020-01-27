import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import MainScreen from './modules/main/screen/MainScreen';
import MenuScreen from './modules/menu/screen/MenuScreen';

const RootStack = createStackNavigator(
  {
    MenuScreen: {
      screen: MenuScreen,
    },
    MainScreen: {
      screen: MainScreen,
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
    },
    // navigationOptions: {
    //   headerShown: false,
    //   headerTransparent: true,
    // },
  },
);

const Navigation = createAppContainer(RootStack);

export default Navigation;

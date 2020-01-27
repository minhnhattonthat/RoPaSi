import React, { Component } from 'react';
import {
  Animated,
  BackHandler,
  View,
  Image,
  TouchableHighlight,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Colors from '../../../global/Colors';
import Dimens from '../../../global/Dimens';
import Images from '../../../global/Images';
import { connect } from 'react-redux';
import Themes from '../../../global/Themes';
import { THEME_DARK_TOGGLE, THEME_LIGHT_TOGGLE } from '../../../actions/type';

class MenuScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
      interpolateColor: null,
    };
  }

  componentDidMount() {
    const { theme } = this.props;
    this.interpolateColor = this.state.animatedValue.interpolate({
      inputRange: [0, 300],
      outputRange: [
        Themes[theme].backgroundColor,
        theme === 'dark'
          ? Themes.light.backgroundColor
          : Themes.dark.backgroundColor,
      ],
    });
  }

  _onToggleTheme = () => {
    this.props.dispatch({
      type:
        this.props.theme === 'light' ? THEME_DARK_TOGGLE : THEME_LIGHT_TOGGLE,
    });
    Animated.timing(this.state.animatedValue, {
      toValue: this.state.animatedValue._value === 300 ? 0 : 300,
      duration: 1000,
    }).start();
  };

  _onPressStart = () => {
    this.props.navigation.push('MainScreen');
  };

  _onPressExit = () => {
    BackHandler.exitApp();
  };

  render() {
    const { theme } = this.props;
    return (
      <Animated.View
        style={[
          styles.root,
          {
            backgroundColor: this.interpolateColor
              ? this.interpolateColor
              : Themes[theme].backgroundColor,
          },
        ]}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={Themes[theme].backgroundColor}
        />
        <Switch
          style={styles.switch}
          value={theme === 'dark'}
          onValueChange={this._onToggleTheme}
          ios_backgroundColor={Colors.primary}
          trackColor={{
            false: Colors.lightColor,
            true: Colors.darkColor,
          }}
          thumbColor={Colors.primary}
        />
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <TouchableOpacity style={styles.button} onPress={this._onPressStart}>
          <Text style={styles.buttonText(theme)}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText(theme)}>Options</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._onPressExit}>
          <Text style={styles.buttonText(theme)}>Exit</Text>
        </TouchableOpacity>
        <View style={styles.logo} />
      </Animated.View>
    );
  }
}

const statusBarHeight = Platform.OS === 'android' ? 0 : isIphoneX() ? 44 : 20;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  switch: {
    position: 'absolute',
    top: Dimens.sm + statusBarHeight,
    right: Dimens.sm,
  },
  logo: {
    width: 200,
    height: 200,
  },
  button: {
    padding: Dimens.sm,
  },
  buttonText: theme => ({
    color: Themes[theme].textColor,
    fontSize: Themes[theme].regularFontSize,
  }),
});

export default connect(state => ({ theme: state.theme }))(MenuScreen);

import React, { PureComponent } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Platform,
  Switch,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { THEME_DARK_TOGGLE, THEME_LIGHT_TOGGLE } from '../actions/type';
import Themes from '../global/Themes';
import Dimens from '../global/Dimens';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Colors from '../global/Colors';
import Images from '../global/Images';

export default class ThemedView extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
      .isRequired,
    theme: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    showBack: PropTypes.bool,
    showThemeSwitch: PropTypes.bool,
    navigation: PropTypes.object.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    showBack: false,
    showThemeSwitch: false,
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };
    this.interpolateColor = null;
    this.didFocusSubscription = null;
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

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
  }

  _onToggleTheme = () => {
    this.props.dispatch({
      type:
        this.props.theme === 'light' ? THEME_DARK_TOGGLE : THEME_LIGHT_TOGGLE,
    });
    Animated.timing(this.state.animatedValue, {
      toValue: this.state.animatedValue._value === 300 ? 0 : 300,
      duration: 500,
    }).start();
  };

  _onPressBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { theme, style, showBack, showThemeSwitch } = this.props;
    return (
      <Animated.View
        style={[
          style,
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
        {this.props.children}
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={this._onPressBack}>
            <Image source={Images.backIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {showThemeSwitch && (
          <View style={styles.switchContainer}>
            <Image source={Images.lightIcon} style={styles.icon} />
            <Switch
              style={styles.switch}
              value={theme === 'dark'}
              onValueChange={this._onToggleTheme}
              ios_backgroundColor={Colors.primary}
              trackColor={{
                false: Themes.light.trackColor,
                true: Themes.dark.trackColor,
              }}
              thumbColor={Themes[theme].thumbColor}
            />
            <Image source={Images.darkIcon} style={styles.icon} />
          </View>
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: Dimens.sm + getStatusBarHeight(true),
    left: Dimens.sm,
  },
  switchContainer: {
    position: 'absolute',
    top: Dimens.sm + getStatusBarHeight(true),
    right: Dimens.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    marginHorizontal: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

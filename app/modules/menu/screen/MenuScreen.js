import React, { Component } from 'react';
import {
  BackHandler,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Dimens from '../../../global/Dimens';
import Images from '../../../global/Images';
import { connect } from 'react-redux';
import Themes from '../../../global/Themes';
import ThemedView from '../../../components/ThemedView';

class MenuScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  _onPressStart = () => {
    this.props.navigation.navigate('MainScreen');
  };

  _onPressOptions = () => {
    this.props.navigation.navigate('OptionsScreen');
  };

  _onPressHistory = () => {
    this.props.navigation.navigate('HistoryScreen');
  };

  _onPressExit = () => {
    BackHandler.exitApp();
  };

  render() {
    const { navigation, theme, dispatch } = this.props;
    return (
      <ThemedView
        showThemeSwitch
        theme={theme}
        dispatch={dispatch}
        style={styles.root}
        navigation={navigation}>
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
        <TouchableOpacity style={styles.button} onPress={this._onPressStart}>
          <Text style={styles.buttonText(theme)}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._onPressOptions}>
          <Text style={styles.buttonText(theme)}>Options</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._onPressHistory}>
          <Text style={styles.buttonText(theme)}>History</Text>
        </TouchableOpacity>
        {Platform.OS === 'android' && (
          <TouchableOpacity style={styles.button} onPress={this._onPressExit}>
            <Text style={styles.buttonText(theme)}>Exit</Text>
          </TouchableOpacity>
        )}
        <View style={styles.logo} />
      </ThemedView>
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

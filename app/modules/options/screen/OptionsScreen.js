import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Picker,
  PickerItem,
  Dimensions,
  Platform,
} from 'react-native';
import ThemedView from '../../../components/ThemedView';
import { connect } from 'react-redux';
import Colors from '../../../global/Colors';
import Themes from '../../../global/Themes';
import Dimens from '../../../global/Dimens';
import {
  GAME_MODE_3,
  GAME_MODE_5,
  PLAY_AS_MAN,
  PLAY_AS_COM,
} from '../../../actions/type';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';

const MODES = [
  {
    value: GAME_MODE_3,
    label: 'Rock Paper Scissors',
  },
  {
    value: GAME_MODE_5,
    label: 'Rock Paper Scissors Lizard Spock',
  },
];

const PLAYER_TYPES = [
  {
    value: PLAY_AS_MAN,
    label: 'Human',
  },
  {
    value: PLAY_AS_COM,
    label: 'Computer',
  },
];

class OptionsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.options.mode,
      player: props.options.player,
    };
  }

  _onChangeMode = (itemValue, itemPosition) => {
    this.setState({ mode: itemValue }, () => {
      this.props.dispatch({ type: itemValue });
    });
  };

  _onChangePlayer = (itemValue, itemPosition) => {
    this.setState({ player: itemValue }, () => {
      this.props.dispatch({ type: itemValue });
    });
  };

  render() {
    const { theme, dispatch, navigation } = this.props;
    const { mode, player } = this.state;
    return (
      <ThemedView
        theme={theme}
        dispatch={dispatch}
        navigation={navigation}
        showBack
        style={styles.root}>
        <Text style={styles.titleText(theme)}>Options</Text>
        <View style={styles.row}>
          <Text style={styles.text(theme)}>Mode: </Text>
          <Picker
            selectedValue={mode}
            onValueChange={this._onChangeMode}
            style={styles.picker}
            itemStyle={styles.itemStyle(theme)}>
            {MODES.map(m => (
              <Picker.Item label={m.label} value={m.value} key={m.value} />
            ))}
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.text(theme)}>Play as: </Text>
          <Picker
            selectedValue={player}
            onValueChange={this._onChangePlayer}
            style={styles.picker}
            itemStyle={styles.itemStyle(theme)}>
            {PLAYER_TYPES.map(m => (
              <Picker.Item label={m.label} value={m.value} key={m.value} />
            ))}
          </Picker>
        </View>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : 0,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  row: {
    padding: Dimens.sm,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: theme => ({
    padding: Dimens.sm,
    color: Themes[theme].textColor,
    fontSize: Themes[theme].titleFontSize,
    fontWeight: 'bold',
  }),
  text: theme => ({
    color: Themes[theme].textColor,
    fontSize: Themes[theme].regularFontSize,
  }),
  picker: {
    width: Dimensions.get('window').width - 64,
  },
  itemStyle: theme => ({
    color: Themes[theme].textColor,
    fontSize: Themes[theme].regularFontSize,
  }),
});

export default connect(state => ({
  theme: state.theme,
  options: state.options,
}))(OptionsScreen);

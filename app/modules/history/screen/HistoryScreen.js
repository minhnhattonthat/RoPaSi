import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ThemedView from '../../../components/ThemedView';
import Pie from 'react-native-pie';
import { connect } from 'react-redux';
import Colors from '../../../global/Colors';
import Themes from '../../../global/Themes';
import Dimens from '../../../global/Dimens';
import { RESET } from '../../../actions/type';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

class HistoryScreen extends PureComponent {
  _onPressReset = () => {
    this.props.dispatch({ type: RESET });
  };

  render() {
    const { counter, theme, dispatch, navigation } = this.props;
    const { winCount, loseCount, drawCount } = counter;
    const total = winCount + loseCount + drawCount;
    const sections = [
      {
        percentage: Math.round((winCount / total) * 100),
        color: Colors.yellowLight2,
      },
      {
        percentage: Math.round((loseCount / total) * 100),
        color: Colors.purpleLight2,
      },
      {
        percentage: Math.round((drawCount / total) * 100),
        color: Colors.blueLight2,
      },
    ];
    return (
      <ThemedView
        theme={theme}
        dispatch={dispatch}
        navigation={navigation}
        showBack
        style={styles.root}>
        <Text style={styles.titleText(theme)}>History</Text>
        <View style={{ height: Dimens.lg }} />
        <Pie
          style={styles.pie}
          radius={80}
          innerRadius={50}
          strokeCap="butt"
          sections={total > 0 ? sections : []}
        />
        <View style={{ height: Dimens.lg }} />
        <View style={styles.row}>
          <View style={styles.mark} />
          <Text style={styles.text(theme)}>Win: {winCount}</Text>
        </View>
        <View style={styles.row}>
          <View
            style={[styles.mark, { backgroundColor: Colors.purpleLight2 }]}
          />
          <Text style={styles.text(theme)}>Lose: {loseCount}</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.mark, { backgroundColor: Colors.blueLight2 }]} />
          <Text style={styles.text(theme)}>Draw: {drawCount}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this._onPressReset}>
          <Text style={[styles.text(theme), styles.resetText]}>Reset</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingTop: getStatusBarHeight(true),
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  pie: {
    marginTop: Dimens.sm,
  },
  mark: {
    backgroundColor: Colors.yellowLight2,
    width: 15,
    height: 15,
    marginRight: Dimens.sm,
  },
  row: {
    padding: Dimens.sm,
    flexDirection: 'row',
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
  resetText: {
    color: 'red',
    marginTop: Dimens.sm,
  },
});

export default connect(state => ({
  theme: state.theme,
  counter: state.counter,
}))(HistoryScreen);

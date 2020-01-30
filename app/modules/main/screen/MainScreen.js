import React, { Component, Fragment } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import ThemedView from '../../../components/ThemedView';
import { connect } from 'react-redux';
import HandCard from '../element/HandCard';
import Themes from '../../../global/Themes';
import CircularCarousel from '../element/CircularCarousel';
import { ELEMENT_SET, compareElement } from '../../../util/GameLogic';
import {
  GAME_MODE_3,
  DRAW_INCREASE,
  WIN_INCREASE,
  LOSE_INCREASE,
  PLAY_AS_MAN,
  PLAY_AS_COM,
} from '../../../actions/type';
import Dimens from '../../../global/Dimens';
import Colors from '../../../global/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const RESULTS = {
  '-1': { text: 'LOSE', color: Colors.purple },
  '0': { text: 'DRAW', color: Colors.blue },
  '1': { text: 'WIN', color: Colors.yellow },
};

function wp(percentage) {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(value);
}

function hp(percentage) {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(value);
}

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementSet: ELEMENT_SET.slice(0, props.options.mode),
      showResult: false,
      player1: 'question',
      player2: 'question',
    };
  }

  _onPressStart = () => {};

  _onPressWildCard = () => {
    const { elementSet } = this.state;
    const index1 = Math.floor(Math.random() * elementSet.length);
    const index2 = Math.floor(Math.random() * elementSet.length);
    this.startGame(elementSet[index1], elementSet[index2]);
  };

  startGame = (player1, player2) => {
    const result = compareElement(player1, player2);
    const actionType =
      result === 0 ? DRAW_INCREASE : result > 0 ? WIN_INCREASE : LOSE_INCREASE;
    this.setState(
      {
        showResult: true,
        player1,
        player2,
        result,
      },
      () => {
        this.props.dispatch({ type: actionType });
      },
    );
  };

  _onPressElement = index1 => {
    const { elementSet } = this.state;
    const index2 = Math.floor(Math.random() * elementSet.length);
    this.startGame(elementSet[index1], elementSet[index2]);
  };

  closeModal = () => {
    this.setState({
      showResult: false,
      player1: 'question',
      player2: 'question',
    });
  };

  render() {
    const { theme, dispatch, navigation, options, counter } = this.props;
    const { mode, player } = options;
    const oppositeTheme = theme === 'light' ? 'dark' : 'light';
    const { currentStreak, highestStreak } = counter;
    const { player1, player2, showResult, result } = this.state;
    const resultText = RESULTS[result] ? RESULTS[result].text : '';
    const resultColor = RESULTS[result] ? RESULTS[result].color : Colors.yellow;
    return (
      <ThemedView
        theme={theme}
        dispatch={dispatch}
        navigation={navigation}
        style={styles.root}
        showBack>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={Themes[oppositeTheme].backgroundColor}
        />
        <View
          style={[
            styles.field,
            { backgroundColor: Themes[oppositeTheme].backgroundColor },
          ]}>
          <HandCard element={player2} theme={oppositeTheme} />
          <Text
            style={[styles.onScreenText(oppositeTheme), styles.opponentText]}>
            Opponent
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.field}>
          {player === PLAY_AS_MAN && (
            <CircularCarousel
              theme={theme}
              containerWidth={SCREEN_WIDTH}
              containerHeight={
                mode === GAME_MODE_3
                  ? SCREEN_HEIGHT / 2 - 40
                  : SCREEN_HEIGHT / 2 - 140
              }
              itemStyle={{
                width: wp(mode === GAME_MODE_3 ? 40 : 30),
                height: hp(mode === GAME_MODE_3 ? 25 : 20),
              }}
              dataSource={this.state.elementSet}
              onItemPress={this._onPressElement}
            />
          )}
          {player === PLAY_AS_COM && (
            <HandCard
              element={player1}
              theme={theme}
              onPressCard={this._onPressWildCard}
            />
          )}
          <Text style={[styles.onScreenText(theme), styles.playerText]}>
            You
          </Text>
          <Text style={[styles.onScreenText(theme), styles.score]}>
            Score: {currentStreak}
          </Text>
          <Text style={[styles.onScreenText(theme), styles.highestScore]}>
            Highest: {highestStreak}
          </Text>
        </View>
        <TouchableOpacity
          disabled
          style={styles.startButton}
          onPress={this._onPressStart}>
          <Fragment>
            <View style={styles.halfCircle(theme)} />
            <View style={styles.halfCircle(oppositeTheme)} />
          </Fragment>
        </TouchableOpacity>
        <Modal isVisible={showResult}>
          <TouchableWithoutFeedback
            style={styles.rootModal}
            onPress={this.closeModal}>
            <View style={styles.rootModal}>
              <HandCard
                element={player1}
                theme={theme}
                width={wp(30)}
                height={wp(40)}
              />
              <Text style={[styles.resultText, { color: resultColor }]}>
                {resultText}
              </Text>
              <HandCard
                element={player2}
                theme={oppositeTheme}
                width={wp(30)}
                height={wp(40)}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  separator: {
    width: SCREEN_WIDTH,
    height: 5,
    backgroundColor: Colors.blue,
  },
  startButton: {
    position: 'absolute',
    flexDirection: 'column',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: Colors.blue,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  halfCircle: theme => ({
    backgroundColor: Themes[theme].backgroundColor,
    flex: 1,
    width: 100,
  }),
  onScreenText: theme => ({
    color: Themes[theme].textColor,
    fontSize: Themes[theme].regularFontSize,
    fontWeight: 'bold',
    position: 'absolute',
  }),
  playerText: {
    top: Dimens.sm,
    left: Dimens.sm,
  },
  opponentText: {
    bottom: Dimens.sm,
    right: Dimens.sm,
  },
  score: {
    bottom: Dimens.sm,
    left: Dimens.sm,
  },
  highestScore: {
    bottom: Dimens.sm,
    right: Dimens.sm,
  },
  rootModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    paddingHorizontal: Dimens.lg,
    color: Colors.yellow,
    fontWeight: 'bold',
  },
});

export default connect(state => ({
  theme: state.theme,
  counter: state.counter,
  options: state.options,
}))(MainScreen);

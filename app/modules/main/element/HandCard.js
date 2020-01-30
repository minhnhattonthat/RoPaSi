import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../../global/Images';
import Themes from '../../../global/Themes';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function wp(percentage) {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(value);
}

function hp(percentage) {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(value);
}

const HandCard = ({
  element,
  theme,
  width = wp(45),
  height = wp(65),
  onPressCard,
}) => {
  const style = { width, height };
  return (
    <TouchableOpacity
      disabled={!onPressCard}
      style={[styles.container(theme), style]}
      onPress={onPressCard}>
      <Image
        source={Images[`${element}Hand`]}
        style={styles.image(theme)}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

HandCard.propTypes = {
  element: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onPressCard: PropTypes.func,
};

const styles = StyleSheet.create({
  container: theme => ({
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme === 'light' ? 5 : 0,
    borderColor: Themes[theme].borderColor,
    backgroundColor: Themes[theme].cardColor,
  }),
  image: theme => ({
    flex: 1,
    alignSelf: 'stretch',
    height: undefined,
    width: undefined,
    tintColor: Themes[theme].elementColor,
  }),
});

export default HandCard;

import Colors from './Colors';

const defaultTheme = {
  regularFontSize: 20,
  titleFontSize: 24,
};

export default {
  light: {
    ...defaultTheme,
    thumbColor: Colors.yellow,
    backgroundColor: Colors.yellow,
    textColor: Colors.purpleDark2,
    trackColor: Colors.yellowLight2,
    borderColor: Colors.yellowDark3,
    cardColor: Colors.yellowLight2,
    elementColor: Colors.yellowDark3,
  },
  dark: {
    ...defaultTheme,
    thumbColor: Colors.purpleDark2,
    backgroundColor: Colors.purpleDark2,
    textColor: Colors.yellow,
    trackColor: Colors.purpleDark3,
    borderColor: Colors.purpleLight2,
    cardColor: Colors.purpleLight2,
    elementColor: Colors.purpleDark3,
  },
};

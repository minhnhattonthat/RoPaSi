//
// Circular Carousel
//
//  Modified from https://github.com/khanshamshad32/Carousel/blob/master/CircularCarousel.js
//

import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  PanResponder,
  Platform,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
// import Math from 'mathjs';
import Images from '../../../global/Images';
import Themes from '../../../global/Themes';

const duration = Platform.OS === 'ios' ? 1 : 0;
const elevationConstant = Math.cos(Math.PI / 2.3);
const rotationRate = Platform.OS === 'ios' ? 5 : 10;
const penRotationRate = 1;

export default class CircularCarousel extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    radius: PropTypes.number,
    theme: PropTypes.string,
    itemStyle: PropTypes.object,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemPress: PropTypes.func,
  };

  static defaultProps = {
    radius: 150,
    theme: 'light',
    itemStyle: { width: 100, height: 150 },
    containerWidth: 450,
    containerHeight: 300,
    style: {},
    onItemPress: () => {},
  };

  constructor(props) {
    super(props);

    const arr = [];
    for (let i = 0; i < props.dataSource.length; i++) {
      arr[i] = { X: 0, Y: 0, angle: 0, w: 0, h: 0, opacity: 1, zIndex: 100 };
    }

    this.state = {
      dataSource: props.dataSource,
      radius: props.radius,
      itemWidth: props.itemStyle.width,
      itemHeight: props.itemStyle.height,
      containerWidth: props.containerWidth,
      containerHeight: props.containerHeight,
      active: 0,
      frontItemAngle: 290,
      maxMarginX: 0,
      maxMarginY: 0,
      minMarginX: 0,
      minMarginY: 0,
      items: arr,
      sortedItemsDepth: [],
    };
    this.setUpConstants();
    this.addPenGesture();
  }

  componentDidMount() {
    this.arrangeItemsInCircle(0, 0);
  }

  itemPressed(index) {
    var activeItem = this.state.active;
    if (index === activeItem) {
      this.props.onItemPress(index);
      return;
    }

    this.rotateCarousel(index);
  }

  renderItem(data, index) {
    const item = this.state.items[index];
    const theme = this.props.theme;

    const cardStyle = {
      marginTop: item.Y,
      marginLeft: item.X,
      zIndex: item.zIndex,
      width: item.w,
      height: item.h,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: theme === 'light' ? 5 : 0,
      borderColor: Themes[theme].borderColor,
      backgroundColor: Themes[theme].cardColor,
      opacity: item.opacity,
      position: 'absolute',
      padding: 10,
      borderRadius: 15,
    };

    const imageStyle = {
      // flex: 1,
      tintColor: Themes[theme].elementColor,
      width: '90%',
      height: '90%',
    };

    // For iOS
    if (Platform.OS === 'ios') {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.itemPressed(index)}
          key={index}
          activeOpacity={1}>
          <View style={cardStyle}>
            <Image
              pointerEvents="none"
              style={imageStyle}
              source={Images[`${data}Hand`]}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }

    // For android
    return (
      <TouchableNativeFeedback
        onPress={() => this.itemPressed(index)}
        key={index}>
        <View style={cardStyle}>
          <Image
            pointerEvents="none"
            style={imageStyle}
            source={Images[`${data}Hand`]}
            resizeMode="contain"
          />
        </View>
      </TouchableNativeFeedback>
    );
  }

  render() {
    const fItem = this.getFrontItem();
    const { containerWidth, containerHeight } = this.props;
    return (
      <View
        style={[
          styles.containerStyle,
          this.props.style,
          { width: containerWidth, height: containerHeight },
        ]}
        {...this.panResponder.panHandlers}>
        {this.state.sortedItemsDepth.map((data, index) =>
          this.renderItem(
            this.state.dataSource[data.index],
            data.index,
            fItem === data.index,
          ),
        )}
      </View>
    );
  }

  //----------------------- L O G I C ---------------------------//

  addPenGesture() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        // Since we want to handle presses on individual items as well
        // Only start the pan responder when there is some movement
        this.state.items.length > 1 && Math.abs(gestureState.dx) > 10,

      onPanResponderMove: (evt, gestureState) => {
        const angle = (gestureState.moveX - gestureState.x0) * penRotationRate;
        this.arrangeItemsInCircle(angle, this.state.active);
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.rotateCarousel();
      },
    });
  }

  arrangeItemsInCircle(angle, item, setState = true) {
    var r = this.state.radius;
    var n = this.state.items.length;
    var marginY = this.state.itemHeight / 3;
    var marginX = this.state.containerWidth / 2 - this.state.itemWidth / 2;
    var i = 0;

    while (i < n) {
      var q = ((i * 360) / n + angle) % 360;
      var alpha = q * (Math.PI / 180);

      var sinalpha = Math.sin(alpha);
      var cosalpha = Math.cos(alpha);
      var x = r * sinalpha + marginX;
      var y = r * cosalpha * elevationConstant + marginY;

      this.state.items[item].X = x;
      this.state.items[item].Y = y;

      this.state.items[item].angle = q;
      item = (item + 1) % n;
      i++;
    }
    this.rearrangeItemsDimension();
    this.rearrangeItemsDepth();
    if (setState) {
      this.setState({ active: item });
    }
  }

  rearrangeItemsDepth() {
    var arr = [];
    var n = this.state.items.length;

    for (let i = 0; i < n; i++) {
      arr[i] = {
        index: i,
        depth: this.state.items[i].Y,
      };
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j].depth > arr[j + 1].depth) {
          var tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }

    this.state.sortedItemsDepth = arr;
  }

  rotateCarousel(item) {
    const activeItem = item !== undefined ? item : this.getFrontItem();
    const fAngle = this.state.frontItemAngle;
    const cAngle = this.state.items[activeItem].angle;

    let rotationAngle = (fAngle - cAngle + 360) % 360;

    if (rotationAngle > 180) {
      rotationAngle = rotationAngle - 360;
    } // make angle negative

    const rotateItems = i => {
      var ang = (rotationAngle < 0 ? -rotationRate : rotationRate) * i++;

      if (Math.abs(ang) > Math.abs(rotationAngle)) {
        this.arrangeItemsInCircle(0, activeItem);
        return;
      }
      this.arrangeItemsInCircle(cAngle + ang, activeItem);

      setTimeout(() => {
        rotateItems(i);
      }, duration);
    };

    rotateItems(1);
  }

  getFrontItem() {
    var n = this.state.items.length;
    var max = this.state.items[0].Y;
    var frontIndex = 0;

    for (var i = 1; i < n; i++) {
      if (max < this.state.items[i].Y) {
        max = this.state.items[i].Y;
        frontIndex = i;
      }
    }

    return frontIndex;
  }

  setUpConstants() {
    this.arrangeItemsInCircle(0, 0, false);

    var n = this.state.items.length;
    this.state.frontItemAngle = this.state.items[0].angle;
    this.state.maxMarginX = this.state.items[0].X;
    this.state.maxMarginY = this.state.items[0].Y;
    this.state.minMarginX = this.state.items[n - 1].X;
    this.state.minMarginY = this.state.items[n - 1].Y;
  }

  rearrangeItemsDimension() {
    for (var i = 0; i < this.state.items.length; i++) {
      var c = this.getItemScalingCoefficient(this.state.items[i]);

      var newWidth = this.state.itemWidth * c;
      var diff = this.state.itemWidth - newWidth;

      var x = this.state.items[i].X;
      this.state.items[i].X = x + diff / 2;

      this.state.items[i].w = newWidth;
      this.state.items[i].h = this.state.itemHeight * c;
      this.state.items[i].opacity = 0.5;
      this.state.items[i].zIndex = 100 * c;
    }
  }

  getItemScalingCoefficient(item) {
    var yMax = this.state.maxMarginY;
    var y = item.Y;
    var d = (yMax - this.state.minMarginY) * 9;
    if (d === 0) {
      d = 1;
    }
    var c = Math.abs(1 - (yMax - y) / d);
    return c;
  }
}

const styles = StyleSheet.create({
  activeStyle: {
    // transform: 'scale(0.5)',
  },
  containerStyle: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    // justifyContent: 'center',
  },
});

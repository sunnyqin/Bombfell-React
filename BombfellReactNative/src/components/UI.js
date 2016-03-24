'use strict';

import React, {
  TouchableHighlight,
  TouchableOpacity,
  View,
  Component,
  PropTypes,
  Text,
  Image,
  ListView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export class Background extends Component {
  render() {
    switch (this.props.type) {
    case 'home-step1':
      return <LinearGradient style={{flex: 1}}
        colors={['#176BC3', '#30B1D7']} start={[0, 0]} end={[0.23, 1]}
        {...this.props} />;
    case 'home-step2':
      return <LinearGradient style={{flex: 1}}
        colors={['#1769C2', '#38C8DD']} start={[0.26, 0.12]} end={[0.14, 0.98]}
        {...this.props} />;
    default:
      return (
      <LinearGradient style={{flex: 1}}
        colors={['#1076CD', '#2BACD0', '#31BBDE']}
        locations={[0, 0.85, 0.93]} start={[0.17, 0]} end={[0.4, 1]}
        {...this.props} />
      );
    }
  }
}

export class GeneralCell extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    ...View.propTypes
  };

  render() {
    let {style, onClick, children, ...otherProps} = this.props;
    var newChildren;
    if (onClick) {
      newChildren = (
        <TouchableOpacity style={styles.cellTouch} onPress={onClick}>
        {children}
        </TouchableOpacity>
      );
    } else {
      newChildren = children;
    }
    return (
      <View style={[styles.cell, style]} {...otherProps}>
      {newChildren}
      </View>
    )
  }
}

export class Row extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    weight: PropTypes.number,
    ...View.propTypes
  };

  render() {
    var {children, weight, disclosure, onClick, ...otherProps} = this.props;
    if (disclosure) {
      let image = (
        <Image style={{alignSelf: 'center', marginLeft: 12}} key={'disclosure'} source={require('./images/disclosure_button.png')} />
      );
      let count = React.Children.count(children);
      if (count == 1) {
        children = [children, image];
      } else {
        children = [children[0], (<View key={'fixed'} style={{flexDirection: 'row'}}>{children[1]}{image}</View>)]
      }
    }
    let margins;
    if (weight >= 25) {
      margins = {marginTop: 20, marginLeft: 28, marginBottom: 20, marginRight: 18}
    } else if (weight >= 20) {
      margins = {marginTop: 20, marginLeft: 20, marginBottom: 20, marginRight: disclosure ? 14 : 34}
    } else if (weight >= 15) {
      margins = {marginTop: 16, marginLeft: 28, marginBottom: 16, marginRight: 14}
    } else if (weight >= 10) {
      margins = {marginTop: 12, marginLeft: 15, marginBottom: 12, marginRight: 14}
    }
    return (
      <TouchableOpacity style={[sharedStyles.cellContent, margins]} {...otherProps} onPress={onClick}>
      {children}
      </TouchableOpacity>
    );
  }
}

export class Divider extends Component {
  static propTypes = {
    vertical: PropTypes.bool
  };

  render() {
    let vertical = this.props.vertical || false;
    let start, end, style, groupStyle;
    if (vertical) {
      start = [0.5, 0];
      end = [0.5, 1];
      style = {width: 1.5};
      groupStyle = {flexDirection: 'row', transform: [{rotate: '180deg'}]};
    } else {
      start = [0, 0.5];
      end = [1, 0.5];
      style = {height: 1.5};
    }
    let locations = [0, 0.25, 0.75, 1];
    return (
      <View style={[groupStyle, this.props.style]}>
        <LinearGradient style={style}
          colors={['#ffffff0f', '#ffffff68', '#ffffff68', '#ffffff0f']}
          locations={locations} start={start} end={end} />
        <LinearGradient style={style}
          colors={['#00000002', '#00000019', '#00000019', '#00000002']}
          locations={locations} start={start} end={end} />
      </View>
    );
  }
}

export class Button extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  _onPressButton() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    var {style, title, onClick, children, colors, ...otherProps} = this.props;
    if (!colors) {
      colors = ['#AEE248', '#76C223'];
    }

    return (
      <TouchableHighlight style={[style, {alignSelf: 'center'}]} onPress={onClick} underlayColor={'transparent'}>
        <View>
          <LinearGradient style={styles.button}
            colors={colors} {...otherProps}>
            <Text style={styles.buttonText}>{title}</Text>
          </LinearGradient>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = React.StyleSheet.create({
  cell: {
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 14,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 19,
    shadowOpacity: 0.06,
    shadowColor: 'black',
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'black',
    width: 175,
    height: 44,
    shadowColor: '#101112',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.15,
  },
  buttonText: {
    backgroundColor: "transparent",
    fontFamily: 'ProximaNova-Bold',
    fontSize: 15,
    color: 'white',
    letterSpacing: 1.07,
  },
  cellTouch: {
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export const TextShadow = {
  shadowColor: '#004188',
  shadowOpacity: 0.22,
  shadowOffset: {width: 0, height: 5},
  shadowRadius: 6
};

export const sharedStyles = React.StyleSheet.create({
  cellContent: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
  },
  navText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 18,
    color: '#FFFFFF'
  },
  shadowText: {
    color: 'white',
    ...TextShadow
  },
  boldText: {
    fontFamily: 'ProximaNova-Bold',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.93,
  },
  cellTitleText: {
    color: '#1C252E',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 20,
  }
});

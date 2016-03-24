'use strict';

import React, {Component, View, Text} from 'react-native';

export class Sections extends Component {
  render() {
    let {style, children, ...otherProps} = this.props;
    return (
      <View style={[styles.container, style]} {...otherProps}>
        <View style={styles.shadowWrapper}>
          <View style={styles.shadow} />
        </View>
        {children}
      </View>
    );
  }
}

export class Section extends Component {
  render() {
    let {title, ...otherProps} = this.props;
    return (
      <View>
        <Text style={styles.headerText}>{title.toUpperCase()}</Text>
        <View {...otherProps} style={styles.cells} />
      </View>
    );
  }
}

const styles = React.StyleSheet.create({
  container: {
    backgroundColor:'#F0F5F6',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  shadowWrapper: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    overflow: 'visible',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  cells: {
    marginTop: 13,
  },
  shadow: {
    flex: 1,
    backgroundColor: 'black',
    height: 10,
    marginTop: -10,
    overflow: 'visible',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 16,
  },
  headerText: {
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#888889',
    letterSpacing: 1
  },
});
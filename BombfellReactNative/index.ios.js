/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
var React = require('react-native');
var SearchPage = require('./src/scenes/SearchPage');
var ProfilePage = require('./src/scenes/ProfilePage');

class HelloWorld extends React.Component {
  render() {
    return <React.Text style={styles.text}>Hello World (Again)</React.Text>;
  }
}

class BombfellReactNative extends React.Component {
  render() {
    return (
       <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'PROFILE',
          component: ProfilePage,
        }}/>
    );
  }
}

const styles = React.StyleSheet.create({
  container: {
    flex: 1
  },
});

React.AppRegistry.registerComponent('BombfellReactNative', () => BombfellReactNative);

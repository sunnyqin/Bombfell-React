/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
var React = require('react-native');
var SearchPage = require('./src/scenes/SearchPage');
var ProfilePage = require('./src/scenes/ProfilePage');
var LoginPage = require('./src/scenes/LoginPage');

class HelloWorld extends React.Component {
  render() {
    return <React.Text style={styles.text}>Hello World (Again)</React.Text>;
  }
}

class BombfellReactNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }

  render() {
    if (this.state.isLogin) {
        return (
          <React.NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'PROFILE',
              component: ProfilePage,
            }}/>
        );
    } else {
       return (
        <React.NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'SIGN IN',
            component: LoginPage,
          }}/>
      );
    }
  }
}

const styles = React.StyleSheet.create({
  container: {
    flex: 1
  },
});

React.AppRegistry.registerComponent('BombfellReactNative', () => BombfellReactNative);

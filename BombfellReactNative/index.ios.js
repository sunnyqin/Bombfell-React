/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React from 'react-native';
import ProfilePage from './src/scenes/ProfilePage';
import LoginPage from './src/scenes/LoginPage';
import Realm from 'realm';
import User from './src/database/user';
import {AlertIOS} from 'react-native';

class HelloWorld extends React.Component {
  render() {
    return <React.Text style={styles.text}>Hello World (Again)</React.Text>;
  }
}

class BombfellReactNative extends React.Component {
  constructor(props) {
    super(props);
    let realm = new Realm({schema: [User]});
    let users = realm.objects('User');
    this.state = {
      isLogin: users.length > 0
    };
  }

  _logout() {
    let realm = new Realm({schema: [User]});
    realm.write( () => {
      let allusers = realm.objects('User');
      realm.delete(allusers);

      AlertIOS.prompt(
        'Logout Success',
        null,
        [
          {text: 'OK'},
        ],
        'default',
      );
    });
  }

  render() {
    if (this.state.isLogin) {
        return (
          <React.NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'PROFILE',
              component: ProfilePage,
              rightButtonTitle: 'Logout',
              onRightButtonPress: this._logout.bind(this),
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

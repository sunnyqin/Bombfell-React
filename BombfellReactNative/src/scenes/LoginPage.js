'use strict';
var React = require('react-native');
var ProgressHUD = require('react-native-progress-hud');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AlertIndicatorIOS,
    ActivityIndicatorIOS,
    AlertIOS,
    Image,
    Dimensions,
    Component,
    TextInput,
    TouchableHighlight,
} = React;

var loginAPI = "https://www.bombfell.com/api/login";
var SuccessLoginPage = require('./ProfilePage');

class LoginPage extends Component {
  contextTypes: {
    showProgressHUD: React.PropTypes.func.isRequired,
    dismissProgressHUD: React.PropTypes.func.isRequired
  }
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
      isHudVisisible: false,
		}
	}

	onSignInPressed() {
    if (this.state.username.length == 0 || this.state.password.length == 0) {
      AlertIOS.prompt(
        'Invalid username/password',
        null,
        [
          {text: 'OK'},
        ],
        'default',
      );
      return;
    }

    this._showProgressHUD();
    this.props.navigator.push({
            title: "PROFILE",
            component: SuccessLoginPage,
            wrapperStyle: styles.customWrapperStyle,
            passProps: {username: this.state.username, password: this.state.password},
    });
    this._dismissProgressHUD();
    return;

		fetch(loginAPI, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'email':  this.state.username,
				'password': this.state.password,
			})
		}).then((response) => response.json()).then((json) => {
      this._dismissProgressHUD();
      if (json["status"] != 0) {
        this.props.navigator.replace({
                title: "PROFILE",
                component: SuccessLoginPage,
                passProps: {username: this.state.username, password: this.state.password},
            });
      } else {
        AlertIOS.prompt(
          'Invalid creditical',
          null,
          [
            {text: 'OK'},
          ],
          'default',
        );
      }

		}).catch((error) => {
			console.log(error);
		});
	}

  _showProgressHUD() {
    this.setState({isHudVisisible: true});
  }

  _dismissProgressHUD() {
    this.setState({isHudVisisible: false});
  }

	_onUsernameChanged(event) {
		this.setState({
			username: event.nativeEvent.text
		})
	}

	_onPasswordChanged(event) {
		this.setState({
			password: event.nativeEvent.text
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.customTextField}>
					<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={styles.labelText}>Email</Text>
					<TextInput editable={true} style={styles.textInput} onChange={this._onUsernameChanged.bind(this)}/>
				</View>
				<View style={styles.separator}/>
				</View>
				<View style={styles.customTextField}>
					<View style={{flex: 1, flexDirection: 'row'}}>
					<Text style={styles.labelText}>Password</Text>
					<TextInput editable={true} secureTextEntry={true} style={styles.textInput} onChange={this._onPasswordChanged.bind(this)}/>
				</View>
				<View style={styles.separator}/>
				</View>
				<TouchableHighlight style={styles.button} onPress={this.onSignInPressed.bind(this)} underlayColor='#EFFFFF'>
					<Text style={styles.buttonText}>Sign In</Text>
				</TouchableHighlight>
        <ProgressHUD isVisible={this.state.isHudVisisible}
            isDismissible={true} overlayColor='rgba(0, 0, 0, 0.11)'
            />
			</View>
		);
	}
}

var styles = StyleSheet.create( {
  customWrapperStyle: {
    backgroundColor: '#bbdddd'
  },
	container: {
		flex: 1,
		paddingTop: 64,
	},
	customTextField: {
		height: 40,
		marginTop: 20,
	},
	textInput: {
		flex: 1,
		width: 200,
		flexDirection: 'row',
	},
	labelText: {
		width: 70,
		textAlign: 'left',
		marginLeft: 15,
		marginRight: 10,
		backgroundColor: 'rgba(0,0,0,0)',
		fontSize: 14,
		paddingVertical: 5,
		fontWeight: '100',
		alignSelf: 'center',
	},
	textInput: {
		height: 30,
		marginRight: 15,
		flex: 1,
		textAlign: 'left',
		backgroundColor: 'rgba(0,0,0,0)',
		fontSize: 14,
		paddingLeft: 10,
		paddingVertical: 5,
		fontWeight: '300',
  	borderWidth: 0,
  	borderColor: '#48BBEC',
  	borderRadius: 8,
  	color: '#030303',
  	alignSelf: 'center',
	},
	separator: {
		marginLeft: 15,
		marginRight: 15,
		height: 0.5,
		backgroundColor: '#030303',
	},
	button: {
		height: 36,
		backgroundColor: 'rgba(0,0,0,0)',
		borderColor: '#030303',
		borderWidth: 1,
		marginTop: 50,
		marginLeft: 15,
		marginRight: 15,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 14,
		color: '#030303',
		fontWeight: 'bold',
		textAlign: 'center',
	}
});

module.exports = LoginPage

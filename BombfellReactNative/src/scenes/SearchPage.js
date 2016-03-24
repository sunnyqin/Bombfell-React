'use strict';
var React = require('react-native')
var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicatorIOS,
	Image,
	Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 10,
    marginTop: 185,
    alignItems: 'center'
  },
  flowRight: {
  flexDirection: 'row',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 3,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 0,
  marginBottom: 50,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 15,
  marginRight: 15,
  flex: 15,
  fontSize: 18,
  borderWidth: 5,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
}
});

  function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;
 
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
 
  return 'http://api.nestoria.co.uk/api?' + querystring;
};



class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'London',
      isLoading: false
    };
  }
  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState ({searchString: event.nativeEvent.text});
  }

  _executeQuery(query) {
    console.log(query);
    this.setState( { isLoading: true });
  }



  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }




	render() {
             var spinner = this.state.isLoading ?
  ( <ActivityIndicatorIOS
      hidden='true'
      size='large'/> ) :
  ( <View/>);

		return (
    
		    <View style={styles.container}>
        	<Text style={styles.description}>
          		Search for houses to buy!
        	</Text>
        	<Text style={styles.description}>
         		 Search by place-name, postcode or search near your location.
        	</Text>
          <View style={styles.flowRight}>
            <TextInput
              style={styles.searchInput}
              value={this.state.searchString}
              onChange={this.onSearchTextChanged.bind(this)}
              placeholder='Search via name or postcode'/>
            <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed.bind(this)}>
             <Text style={styles.buttonText}>Go</Text>
             </TouchableHighlight>
          </View>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
          </TouchableHighlight>
          {spinner}
      	</View>
		);
	}
}

module.exports = SearchPage
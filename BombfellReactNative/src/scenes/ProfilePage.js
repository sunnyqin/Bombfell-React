'use strict';
var React = require('react-native');
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
} = React;

var API_URL = 'http://demo9383702.mockable.io/users';

var HeaderView = React.createClass({
	render: function() {
		return (
			<Image style={styles.headerImage} source={require('../images/profilebg.png')} />
		);
	}
});

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.bindMethods();
    }

    bindMethods() {
        if (! this.bindableMethods) {
            return;
        }   

        for (var methodName in this.bindableMethods) {
            this[methodName] = this.bindableMethods[methodName].bind(this);
        }
    }

    getInitialState() {
        return {
            dataSource : new ListView.DataSource({
                rowHasChanged           : (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged : (s1, s2) => s1 !== s2
            })
        }
    }
    
    componentDidMount() {
        this.fetchData();
    }
    
    fetchData () {
    	var organizations = ["MEASUREMENTS", "SIZES", "BODY&SKIN", "STYLES", "SHIRT BRANDS", "PANT BRANDS", "NEVER WEAR", "BUDGETS"]
        this.setState({
            dataSource : this.state.dataSource.cloneWithRows(organizations),
        });
    }

    render() {
        return this.renderListView();
    }

    renderListView() {
        return (
        	<View>
            <View style={styles.headerView}>
        		<HeaderView></HeaderView>
        	</View>
            <View>
                <ListView
                    dataSource = {this.state.dataSource}
                    style      = {styles.listview}
                    renderRow  = {this.renderRow}
                    renderSectionHeader = {this.renderSectionHeader}
                />
            </View>
            </View>
        );
    }

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.section}>
                <Text style={styles.headerText}>ABOUT YOU</Text>
            </View>
        ); 
    }
};

Object.assign(ProfilePage.prototype, {
    bindableMethods : {
        renderRow : function (rowData, sectionID, rowID) {
            return (
                <TouchableOpacity onPress={() => this.onPressRow(rowData, sectionID)}>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowText}>{rowData}</Text>        
                    </View>
                </TouchableOpacity>
            );
        },
        onPressRow : function (rowData, sectionID) {
            var buttons = [
                {
                    text : 'Cancel'
                },
                {
                    text    : 'OK',
                    onPress : () => this.createCalendarEvent(rowData, sectionID)
                }
            ]
            AlertIOS.alert('Click ' + rowData, null, null);
        }

    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activityIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerView: {
    	flexDirection: 'row',
    	justifyContent: 'center',
    	marginTop: 64,
    	width: 375,
    	height: 150,
    },
    headerImage: {
    	alignSelf: 'stretch',
    	width: 375,
    	height: 150
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: '#8A8A8A'
    },
    text: {
        color: 'white',
        paddingHorizontal: 8,
        fontSize: 16
    },
    rowStyle: {
        paddingVertical: 20,
        paddingLeft: 16,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderWidth: 1,
        backgroundColor: '#FFFFFF'
    },
    rowText: {
        color: '#030303',
        fontSize: 13
    },
    subText: {
        fontSize: 14,
        color: '#757575'
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: '#F1F1F1'
    }
});

module.exports = ProfilePage
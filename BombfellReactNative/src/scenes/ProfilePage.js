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
    Dimensions,
    Component,
} = React;

var API_URL = 'http://demo9383702.mockable.io/users';
var {width, height} = Dimensions.get('window');

class MeasurementLabel extends Component {
	render() {
		return (
			<View style={{flexDirection: 'column', flex: 1}}>
				<Text style={styles.measurementLabel}>{this.props.label}</Text>
				<Text style={styles.measurementValue}>{this.props.value}</Text>
			</View>
		);
	}
}

class ProfileHeader extends Component {
	render() {
		return (
			<View style={{flex: 1, flexDirection: 'column'}}>
				<Image resizeMode="stretch" style={styles.avatar} source={require('../images/avatar.png')}/>
				<Text style={styles.titleText}>Daniel Lane</Text>
				<Text style={styles.subtitleText}>daniel@interactivelabs.co</Text>
				<View style={styles.measurementView}>
					<MeasurementLabel label="HEIGHT" value="5"/>
					<MeasurementLabel label="WEIGHT" value="205lbs"/>
					<MeasurementLabel label="SHOE" value="9.5"/>
					<MeasurementLabel label="SHIRT" value="XL"/>
					<MeasurementLabel label="PANT" value="32"/>
				</View>
			</View>
		);
	}
}

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
        	<View style={{flexDirection: 'column', alignItems: 'stretch', paddingTop: 64}}>
        	<Image resizeMode="stretch" style={styles.headerImage} source={require('../images/profilebg.png')}>
        		<ProfileHeader>
        		</ProfileHeader>
        	</Image>
            <View>
                <ListView
                	automaticallyAdjustContentInsets={false}
                    dataSource = {this.state.dataSource}
                    style = {styles.listView}
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
    headerImage: {
    	width: width,
    	height: 250,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: '#8A8A8A'
    },
    listView: {
    	backgroundColor: '#FFFFFF',
    },
    text: {
        color: 'white',
        paddingHorizontal: 8,
        fontSize: 16,
    },
    avatar: {
    	marginTop: 28,
    	width: 100,
    	height: 100,
    	alignSelf: 'center'
    },
    titleText: {
    	marginTop: 10,
    	color: 'white',
    	paddingVertical: 5,
    	fontSize: 20,
    	textAlign: 'center',
    	backgroundColor: 'rgba(0,0,0,0)',
    },
    subtitleText: {
    	color: 'white',
    	paddingVertical: 1,
    	fontSize: 12,
    	fontWeight: '100',
    	textAlign: 'center',
    	backgroundColor: 'rgba(0,0,0,0)',
    },
    measurementLabel: {
    	marginTop: 15,
    	color: 'white',
    	paddingVertical: 0,
    	fontSize: 12,
    	fontWeight: '100',
    	textAlign: 'center',
    	backgroundColor: 'rgba(0,0,0,0)',
    },
    measurementValue: {
    	marginTop: 0,
    	color: 'white',
    	paddingVertical: 2,
    	fontSize: 15,
    	fontWeight: '500',
    	textAlign: 'center',
    	backgroundColor: 'rgba(0,0,0,0)',
    },
    measurementView: {
    	flex: 1,
    	flexDirection: 'row',
    	justifyContent: 'space-around',
    	backgroundColor: 'rgba(0,0,0,0)',
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
'use strict';

import React, {
	Component,
	View,
	StyleSheet,
	PropTypes,
	Text,
	Image,
} from 'react-native';
import {GeneralCell, Row, sharedStyles} from './UI';

class ProfileCell extends Component {
	PropTypes = {
		title: PropTypes.string.isRequired,
	};
	render() {
		let {title} = this.props;
		return (
		<GeneralCell {...otherProps}>
        	<Row weight={25} onClick={this.props.onSelect.bind(this)}>
          		<View style={{flexDirection: 'column', flex: 1}}>
            	<Text style={styles.cellTitle}>{name}</Text>
          		</View>
        	</Row>
      	</GeneralCell>
      );
	}
}

const styles = StyleSheet.create({
  schoolCellContent: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
  },
  cellTitle: {
    fontSize: 20,
    paddingVertical: 31,
    color: '#030303'
  },
});
// Import libraries for making a Component

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

// Make the Component

const Header = (props) => {
	const { textStyle, viewStyle } = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.albumText}</Text>	
			<Text style={textStyle}>{props.headerText}</Text>	
		</View>
	);
};

// Styling for all Tags within this file

const styles = {
	viewStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20
	}
};


// Make the Component available to other parts of the app

Header.propTypes = {
	headerText: PropTypes.string.isRequired
};

export { Header };

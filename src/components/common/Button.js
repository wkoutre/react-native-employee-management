import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
	const { buttonStyle, textStyle } = styles;

	return (
		<TouchableOpacity onPress={() => props.onPress()} style={buttonStyle}>
			<Text style={textStyle}>
				{props.children}
			</Text>	
		</TouchableOpacity>
	);
};

const styles = {
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#007AFF',
		marginLeft: 5,
		marginRight: 5
	},
	textStyle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#007add',
		alignSelf: 'center',
		paddingTop: 10,
		paddingBottom: 10
	}
};

Button.propTypes = {
	onPress: PropTypes.func.isRequired
};

export { Button };

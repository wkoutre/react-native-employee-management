import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { 
	emailChanged,
	passwordChanged,
	loginUser
} from '../actions';

class LoginForm extends React.Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		console.log('props', this.props);

		const { email, password } = this.props;

		this.props.loginUser({ email, password });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="small" />;
		}

		return <Button	onPress={this.onButtonPress.bind(this)}>Login</Button>;
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input
						autoCapitalize={'none'}
						onChangeText={this.onEmailChange.bind(this)}
						label="Email"
						placeholder="email@gmail.com"
						value={this.props.email}
					/>
				</CardSection>

				<CardSection>
					<Input
						onChangeText={this.onPasswordChange.bind(this)}
						secureTextEntry
						label="Password"
						placeholder="password"
						value={this.props.password}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.props.error}
				</Text>
					
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

const mapStateToProps = state => {
	const { email, password, loading, error } = state.auth;

	return {
		email,
		password,
		loading,
		error
	};
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	loginUser
})(LoginForm);

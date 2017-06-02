import React from 'react';
import _ from 'lodash';
import Communications from 'react-native-communications';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends React.Component {
	state = { showModal: false };

	componentWillMount() {
		// lodash to let us do a forEach with an Object
		// we take all values on the employee object and pass them to employeeUpdate

		// we're not touching the actual data on our employee, hence why it's being passed through
		// the action creator

		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUpdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name, phone, shift } = this.props;

		this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
	}

	onTextPress() {
		const { phone, shift } = this.props;

		Communications.text(phone, `Your upcoming shift is on ${shift}`);
	}

	onAccept() {
		console.log('deleting');
		const { uid } = this.props.employee;

		this.props.employeeDelete({ uid });
	}

	render() {
		return (
			<Card>
				<EmployeeForm />

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onTextPress.bind(this)}>
						Text Schedule
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Delete Employee
					</Button>
				</CardSection>

				<Confirm
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={() => this.setState({ showModal: false })}
				>
					{`Are you sure you want to delete ${this.props.name}?`}
				</Confirm>
			</Card>
		);
	}
}

const mapStateToProps = state => {
	const { name, phone, shift } = state.employeeForm;

	return { name, phone, shift };
};

export default connect(mapStateToProps, {
	employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);

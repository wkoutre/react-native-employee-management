import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardSection, Button, Card } from './common';
import { employeeUpdate, employeeCreate } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends React.Component {
	onButtonPress() {
		console.log('Saving employee...');
		const { name, phone, shift } = this.props;

		this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
	}

	render() {
		return (
			<Card>
				<EmployeeForm {...this.props} />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Create
					</Button>
				</CardSection>
			</Card>
		);
	}
}

export const mapStateToProps = state => {
	const { name, phone, shift } = state.employeeForm;

	return { name, phone, shift };
};

export default connect(mapStateToProps, {
	employeeUpdate,
	employeeCreate 
})(EmployeeCreate);

/*
	Employee:
		name
		phone
		shift: list of options from which user can select

		need form validation and form submission as well
*/

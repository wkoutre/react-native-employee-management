import React from 'react';
import _ from 'lodash';
// import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends React.Component {
	componentWillMount() {
		this.props.employeesFetch();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps === next set of props that will be received
		// this.props === old set of props

		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {
			const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		// cloneWithRows can only work with Arrays... so we'll do that in mapStateToProps

		this.dataSource = ds.cloneWithRows(employees);
	}

	renderRow(employee) {
		return <ListItem employee={employee} />;
	}

	render() {
		console.log(this.props);

		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const mapStateToProp = state => {
	// for  each key/value pair, run the function... it will be called with each value and key
	// val === userModel (name, shift, phone)
	// uid === employeeId
	// then we return all the userModel values, but with the id on there, as well

	// employees is the Array resulting from calling map
	const employees = _.map(state.employees, (val, uid) => {
			return { ...val, uid };
	});

	return { employees };
};

export default connect(mapStateToProp, { employeesFetch })(EmployeeList);

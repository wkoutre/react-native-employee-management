import React from 'react';
// import PropTypes from 'prop-types';
// import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

console.log('EmployeeEdit', EmployeeEdit);

const RouterComponent = () => {
	const handleLogout = () => {
		firebase.auth().signOut()
			.then(() => Actions.auth({ type: 'reset' }));
	};

	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene key='auth'>
				<Scene key='login' component={LoginForm} title={'Please Login'} />
			</Scene>

			<Scene key='main'>
				<Scene
					initial
					rightTitle='Add'
					onRight={() => Actions.employeeCreate()}
					leftTitle='Logout'
					onLeft={() => handleLogout()}
					key='employeeList'
					component={EmployeeList}
					title={'Employees'}
				/>
				<Scene
					key='employeeCreate'
					component={EmployeeCreate}
					title={'Create Employee'}
				/>
				<Scene
					key='employeeEdit'
					component={EmployeeEdit}
					title={'Edit Employee'}
				/>
			</Scene>
		</Router>
	);
};

export default RouterComponent;

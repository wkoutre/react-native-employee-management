import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as T from './types';

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: T.EMPLOYEE_FORM_UPDATE,
		payload: { prop, value }
	};
};

// to push to Firebase, we don't really need a response from Firebase... no need to return an action
// So we PRETEND to use redux-thunk by returning a FUNCTION that does what we need 

// type: 'reset' tells the router to go to the screen and reset the Scene routing stack

export const employeeCreate = ({ name, phone, shift }) => {
	// get access to currently authenticated user
	const { currentUser } = firebase.auth();
	// access firebase DB; make a reference to users/[current-user-uid]/employees JSON datastore path
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
		.push({ name, phone, shift })
		.then(() => {
			dispatch({ type: T.EMPLOYEE_CREATE });
			Actions.employeeList({ type: 'reset' });
		});
	};
};

export const employeesFetch = () => {
	const { currentUser } = firebase.auth();

	// anytime we have a value on this ref, call a function that has the OBJECT ('snapshot')
	// that describes the data we have at that ref in our database

	// on value is PERSISTENT... once this is called once, at any point in the App's lifecycle,
	// we'll automatically fetch the data from Firebase

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
				dispatch({ type: T.EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const employeeSave = ({ name, phone, shift, uid }) => {
	const { currentUser } = firebase.auth();
	
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.set({ name, phone, shift })
			.then(() => {
				Actions.employeeList({ type: 'reset' });
				dispatch({ type: T.EMPLOYEE_SAVE_SUCCESS });
			});
	};
};

// removal of records is just the method, 'remove()'
// we're not using dispatch because the employeesFetch action creator will take care of
// updating things as we want

export const employeeDelete = ({ uid }) => {
	console.log('deleting', uid);
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.remove()
			.then(() => {
				Actions.employeeList({ type: 'reset' });
			});
	};
};

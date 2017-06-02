import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as T from './types';

export const emailChanged = (text) => {
	return {
		type: T.EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: T.PASSWORD_CHANGED,
		payload: text
	};
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({ type: T.LOGIN_USER_SUCCESS, payload: user });
	Actions.main();
};

const loginUserFail = (dispatch) => {
	dispatch({ type: T.LOGIN_USER_FAIL });
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: T.LOGIN_USER_START });
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user))
		.catch((error) => {
				console.log('error', error);
				firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(user => loginUserSuccess(dispatch, user))
				.catch(() => loginUserFail(dispatch));
		});
	};
};

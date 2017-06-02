import * as T from '../actions/types';

const INITIAL_STATE = {};

// the payload is an object of all employees in the current user's database

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case T.EMPLOYEES_FETCH_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};

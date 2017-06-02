import * as T from '../actions/types';

const INITIAL_STATE = {
	name: '',
	phone: '',
	shift: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case T.EMPLOYEE_FORM_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case T.EMPLOYEE_CREATE:
		case T.EMPLOYEE_SAVE_SUCCESS:
			return INITIAL_STATE;
		default:
			return state;
	}
};

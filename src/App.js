import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';
// import LoginForm from './components/LoginForm';

// const logMiddleware = (store) => (next) => (action) => {
// 	console.log('middleware action:', action);

// 	return next(action);
// };

class App extends React.Component {
	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyBudgRG1CFEqZziGxb1DT-6WFh2zUC-dWU',
			authDomain: 'employee-management-9e50d.firebaseapp.com',
			databaseURL: 'https://employee-management-9e50d.firebaseio.com',
			projectId: 'employee-management-9e50d',
			storageBucket: 'employee-management-9e50d.appspot.com',
			messagingSenderId: '1079407111038'
		};

		firebase.initializeApp(config);
	}

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import asyncActionCallbackMiddleware from './asyncActionCallbackMiddleware';
import utilsMiddleware from './utilsMiddleware';
import minPendingTimeMiddleware from './minPendingTime';
import createLogger from 'redux-logger';
import reducers from '../reducers';


const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
const logger = createLogger({
	predicate: (getState, action) => isDebuggingInChrome,
	collapsed: true,
	duration: true
});

const middlewares = [
	thunkMiddleware,
	promiseMiddleware,
	asyncActionCallbackMiddleware,
	minPendingTimeMiddleware,
	utilsMiddleware,
	logger
];


export default function configureStore(initialState) {
	const store = applyMiddleware(
		...middlewares
	)(createStore)(reducers, initialState);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('../reducers/index').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	if (isDebuggingInChrome) {
		window.store = store;
	}

	return store;
}







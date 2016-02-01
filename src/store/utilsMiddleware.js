import * as types from '../constants/ActionTypes';
import { createAction }  from 'redux-actions';
import * as utilsActions from '../actions/utils';

export default function utilsMiddleware({ dispatch }) {
	return next => action => {
		const { meta = {}, payload, error, type } = action;
		const { toast } = meta;

		const dispatchToast = (...args)=> {
			dispatch(utilsActions.toast(...args));
		};

		if (toast) {
			if (typeof toast === 'function') {
				toast(dispatchToast);
			}

			if (typeof toast === 'string' || typeof toast === 'number') {
				dispatchToast(toast.text);
			}
		}
		next(action);
	}
}

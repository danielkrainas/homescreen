import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';
import * as actions from './actions';
const exec = nwbridge.require('child_process').exec;

var initialState = {
	launchpad: {
		launchers: [],
		launchersById: {},
		active: null
	}
};

const createExecutor = function ({ getState }) {
	return (next) => (action) => {
		if (action.type == actions.EXEC_LAUNCHER) {
			exec(action.launcher.cmd, (err, b) => {
				if (err) {
					alert('error running launcher: ' + err);
				}
			});

			return;
		}

		return next(action);
	};
};

export default createStore(reducer, initialState, applyMiddleware(createExecutor));
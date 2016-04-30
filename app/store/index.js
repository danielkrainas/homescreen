import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';
import * as actions from './actions';

var initialState = {
	launchpad: {
		launchers: [],
		launchersById: {},
		active: null
	}
};

const createExecutor = function ({ getState }) {
	var exec = window.childProcess.exec;

	return (next) => (action) => {
		if (action.type == actions.EXEC_LAUNCHER) {
			exec(action.launcher.cmd, (err) => {
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
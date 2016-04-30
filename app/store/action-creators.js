import _ from 'lodash';
import uuid from 'uuid-v4';

import * as actions from './actions';

export function addLauncher(launcher) {
	return {
		type: actions.ADD_LAUNCHER,
		launcher: _.merge({ active: false, id: uuid() }, launcher)
	};
}

export function setActiveLauncher(launcher) {
	return {
		type: actions.SET_ACTIVE_LAUNCHER,
		launcherId: launcher.id
	};
}

export function execLauncher(launcher) {
	return {
		type: actions.EXEC_LAUNCHER,
		launcher: launcher
	};
}
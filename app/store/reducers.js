import _ from 'lodash';

import * as actions from './actions';

function launcherReducer(state, action) {
	if (action.type === actions.ADD_LAUNCHER) {
		state = _.cloneDeep(state);
		let launcher = action.launcher;
		state.launchers.push(launcher);
		state.launchersById[launcher.id] = launcher;
		if (!state.active) {
			state.active = launcher.id;
		}
	} else if (action.type == actions.SET_ACTIVE_LAUNCHER) {
		state = _.assign(_.cloneDeep(state), { active: action.launcherId });
	}

	return state;
}

export default function reducer(state, action) {
	state = _.merge(_.clone(state), {
		launchpad: launcherReducer(state.launchpad, action)
	});

	return state;
}

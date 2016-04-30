import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';

var initialState = {
	launchpad: {
		launchers: [],
		launchersById: {},
		active: null
	}
};

export default createStore(reducer, initialState, applyMiddleware());
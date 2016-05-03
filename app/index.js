import riot from 'riot';
import Mousetrap from 'mousetrap';
import reduxMixin from 'riot-redux-mixin';

import { addLauncher } from './store/action-creators';
import { loadConfig } from './config';
import store from './store';

/* Components */
import './components/launch-item.tag';
import './components/launchpad.tag';

const path = nwbridge.require('path');

var config = null;

const HOME_CONFIG = path.join(process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'], './.homescreen.json');

loadConfig(process.argv[1] || process.env.HOMESCREEN_CONFIG || HOME_CONFIG, function (err, newConfig) {
	if (err) {
		return alert('error loading config: ' + err);
	}

	config = newConfig;
	if (config && config.launchers) {
		config.launchers.forEach(function (l) {
			store.dispatch(addLauncher(l));
		});
	}
});

riot.mixin('redux', reduxMixin(store));
riot.mixin('kb', {
	init: function () {
		this.on('mount', () => {
			this.kb = Mousetrap(document);
		});

		this.on('unmount', () => {
			this.kb.reset();
			this.kb = null;
		});
	},

	bindKb: function () {
		if (this.kb) {
			this.kb.bind.apply(this.kb, arguments);
		}
	}
});

riot.mount('*', {});

import riot from 'riot';
import Mousetrap from 'mousetrap';
import reduxMixin from 'riot-redux-mixin';

import { addLauncher } from './store/action-creators';
import store from './store';

/* Components */
import './components/launch-item.tag';
import './components/launchpad.tag';

store.dispatch(addLauncher({
	title: 'TV',
	icon: 'fa-tv',
	cmd: 'echo test-tv'
}));

store.dispatch(addLauncher({
	title: 'Web',
	icon: 'fa-chrome',
	cmd: 'echo test-web'
}));

store.dispatch(addLauncher({
	title: 'Steam',
	icon: 'fa-steam',
	cmd: 'echo test-steam'
}));

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

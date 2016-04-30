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
	icon: 'fa-tv'
}));

store.dispatch(addLauncher({
	title: 'Web',
	icon: 'fa-chrome'
}));

store.dispatch(addLauncher({
	title: 'Steam',
	icon: 'fa-steam'
}));

riot.mixin('redux', reduxMixin(store));
riot.mixin('controls', {
	init: function () {
		this.on('mount', () => {
			this.controls = Mousetrap(document);
		});

		this.on('unmount', () => {
			this.controls.reset();
			this.controls = null;
		});
	},

	bind: function () {
		if (this.controls) {
			this.controls.bind.apply(this.controls, arguments);
		}
	}
});

riot.mount('*', {});

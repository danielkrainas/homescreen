import riot from 'riot';
import reduxMixin from 'riot-redux-mixin';

import "./components/launchitem.tag";
import "./components/launchpad.tag";

import storeFactory from './store';
import * as wares from './store/middleware';

var store = storeFactory(wares.logging);

riot.mixin('redux', reduxMixin(store));
riot.mount('*', {});

import { setActiveLauncher, execLauncher } from '../store/action-creators';

<launchpad>
	<div class="row">
		<div class="col-md-4" each={ launcher, index in items }>
			<launchitem title={ launcher.title } icon={ launcher.icon } active={ index == activeIndex }></launchitem>
		</div>
	</div>

	<script>
		this.mixin('redux');
		this.mixin('kb');

		const selectNext = () => {
			var i = this.activeIndex;
			var ni = i+1;
			if (ni >= this.items.length) {
				ni = 0;
			}

			this.dispatch(setActiveLauncher(this.items[ni]));
		};

		const selectPrevious = () => {
			var i = this.activeIndex;
			var pi = i-1;
			if (pi < 0) {
				pi = this.items.length - 1;
			}

			this.dispatch(setActiveLauncher(this.items[pi]));
		};

		const doLaunch = () => {
			this.dispatch(execLauncher(this.items[this.activeIndex]));
		};

		this.on('mount', () => {
			this.bindKb('left', selectPrevious);
			this.bindKb('right', selectNext);
			this.bindKb(['enter', 'return'], doLaunch);
		});

		this.subscribe(state => {
			return {
				activeIndex: state.launchpad.launchers.indexOf(state.launchpad.launchers.find(x => x.id === state.launchpad.active)),
 				items: state.launchpad.launchers
			};
		});
	</script>
</launchpad>
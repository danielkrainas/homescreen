import { setActiveLauncher } from '../store/action-creators';

<launchpad>
	<div class="row">
		<div class="col-md-4" each={ launcher, index in items }>
			<launchitem title={ launcher.title } icon={ launcher.icon } active={ index == activeIndex }></launchitem>
		</div>
	</div>

	<script>
		this.mixin('redux');
		this.mixin('controls');

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

		this.handleKey = e => {
			switch (e.which) {
				case 37: //left
					selectPrevious();
					break;

				case 39: // right
					selectNext();
					break;
			}
		};

		this.on('mount', () => {
			this.bind('left', selectPrevious);
			this.bind('right', selectNext);
		});

		this.subscribe(state => {
			return {
				activeIndex: state.launchpad.launchers.indexOf(state.launchpad.launchers.find(x => x.id === state.launchpad.active)),
 				items: state.launchpad.launchers
			};
		});
	</script>
</launchpad>
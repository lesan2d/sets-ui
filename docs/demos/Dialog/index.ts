import { withInstall } from '@packages/utils';
import BasicInstace from './DialogBasic.vue';
import SlotInstace from './DialogSlot.vue';
import DirectionInstace from './DialogDirection.vue';

export const Basic = withInstall({
  ...BasicInstace,
	name: 'DialogBasic',
});

export const Slot = withInstall({
  ...SlotInstace,
	name: 'DialogSlot',
});

export const Direction = withInstall({
  ...DirectionInstace,
	name: 'DialogDirection',
});

export default [Basic, Slot, Direction];

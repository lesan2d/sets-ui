import { withInstall } from '@nopon-web/utils/vue';
import BasicInstace from './dialog-Basic.vue';
import SlotInstace from './dialog-Slot.vue';
import DirectionInstace from './dialog-Direction.vue';

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

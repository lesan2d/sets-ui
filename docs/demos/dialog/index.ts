import { withInstall } from '@nopon-web/utils/vue';
import BasicInstace from './dialog-basic.vue';
import SlotInstace from './dialog-slot.vue';
import DirectionInstace from './dialog-direction.vue';

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

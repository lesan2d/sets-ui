import { withInstall } from '@packages/utils';
import DialogBasicInstace from './DialogBasic.vue';
import DialogSlotInstace from './DialogSlot.vue';

export const DialogBasic = withInstall({
  ...DialogBasicInstace,
	name: 'DialogBasic',
});

export const DialogSlot = withInstall({
  ...DialogSlotInstace,
	name: 'DialogSlot',
});

export default [DialogBasic, DialogSlot];

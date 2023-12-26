import { withInstall } from '@packages/utils';
import DialogBasicInstace from './DialogBasic.vue';

export const DialogBasic = withInstall({
  ...DialogBasicInstace,
	name: 'DialogBasic',
});

export default [DialogBasic];

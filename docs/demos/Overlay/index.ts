import { withInstall } from '@packages/utils';
import PopupBasicInstace from './OverlayBasic.vue';

export const OverlayBasic = withInstall({
  ...PopupBasicInstace,
	name: 'OverlayBasic',
});

export default [OverlayBasic];

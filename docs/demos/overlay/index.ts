import { withInstall } from '@nopon-web/utils/vue';
import PopupBasicInstace from './overlay-basic.vue';

export const OverlayBasic = withInstall({
  ...PopupBasicInstace,
	name: 'OverlayBasic',
});

export default [OverlayBasic];

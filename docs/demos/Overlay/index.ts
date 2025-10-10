import { withInstall } from '@nopon-web/utils/vue';
import PopupBasicInstace from './OverlayBasic.vue';

export const OverlayBasic = withInstall({
  ...PopupBasicInstace,
	name: 'OverlayBasic',
});

export default [OverlayBasic];

import { withInstall } from '@packages/utils';
import PopupBasicInstace from './OverlayBasic.vue';

export const OverlayBasic = withInstall({
	name: 'OverlayBasic',
	...PopupBasicInstace,
});

export default OverlayBasic;

import { withInstall } from '@nopon-web/utils/vue';
import PopupBasicInstace from './popup-basic.vue';
import PopupOverlayInstace from './popup-overlay.vue';
import PopupDirectionInstace from './popup-direction.vue';

export const PopupBasic = withInstall({
	...PopupBasicInstace,
	name: 'PopupBasic',
});

export const PopupOverlay = withInstall({
	...PopupOverlayInstace,
	name: 'PopupOverlay',
});

export const PopupDirection = withInstall({
	...PopupDirectionInstace,
	name: 'PopupDirection',
});

export default [PopupBasic, PopupOverlay, PopupDirection];

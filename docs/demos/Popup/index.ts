import { withInstall } from '@nopon-web/utils/vue';
import PopupBasicInstace from './PopupBasic.vue';
import PopupOverlayInstace from './PopupOverlay.vue';
import PopupDirectionInstace from './PopupDirection.vue';

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

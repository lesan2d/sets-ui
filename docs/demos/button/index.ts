import { withInstall } from '@nopon-web/utils/vue';
import ButtonBasicInstace from './button-basic.vue';
import ButtonSizeInstace from './button-size.vue';
import ButtonColorInstace from './button-color.vue';
import ButtonTextInstace from './button-text.vue';
import ButtonShapeInstace from './button-shape.vue';

export const ButtonBasic = withInstall({
	...ButtonBasicInstace,
	name: 'ButtonBasic',
});

export const ButtonSize = withInstall({
	...ButtonSizeInstace,
	name: 'ButtonSize',
});

export const ButtonColor = withInstall({
	...ButtonColorInstace,
	name: 'ButtonColor',
});

export const ButtonText = withInstall({
	...ButtonTextInstace,
	name: 'ButtonText',
});

export const ButtonShape = withInstall({
	...ButtonShapeInstace,
	name: 'ButtonShape',
});

export default [ButtonBasic, ButtonSize, ButtonColor, ButtonText, ButtonShape];

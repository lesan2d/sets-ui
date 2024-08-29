import { withInstall } from '@packages/utils';
import ButtonBasicInstace from './ButtonBasic.vue';
import ButtonSizeInstace from './ButtonSize.vue';
import ButtonColorInstace from './ButtonColor.vue';
import ButtonTextInstace from './ButtonText.vue';
import ButtonShapeInstace from './ButtonShape.vue';

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

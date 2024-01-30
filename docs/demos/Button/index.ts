import { withInstall } from '@packages/utils';
import ButtonBasicInstace from './ButtonBasic.vue';
import ButtonSizeInstace from './ButtonSize.vue';
import ButtonColorInstace from './ButtonColor.vue';

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

export default [ButtonBasic, ButtonSize, ButtonColor];

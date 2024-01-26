import { withInstall } from '@packages/utils';
import ButtonBasicInstace from './ButtonBasic.vue';
import ButtonSizeInstace from './ButtonSize.vue';

export const ButtonBasic = withInstall({
  ...ButtonBasicInstace,
	name: 'ButtonBasic',
});

export const ButtonSize = withInstall({
	...ButtonSizeInstace,
	name: 'ButtonSize',
});


export default [ButtonBasic, ButtonSize];

import { withInstall } from '@packages/utils';
import ButtonBasicInstace from './ButtonBasic.vue';

export const ButtonBasic = withInstall({
  ...ButtonBasicInstace,
	name: 'ButtonBasic',
});

export default [ButtonBasic];

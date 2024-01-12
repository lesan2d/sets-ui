import { withInstall } from '@packages/utils';
import RadioBasicInstace from './RadioBasic.vue';
import RadioGroupInstace from './RadioGroup.vue';

export const RadioBasic = withInstall({
	...RadioBasicInstace,
	name: 'RadioBasic',
});

export const RadioGroup = withInstall({
	...RadioGroupInstace,
	name: 'RadioGroup',
});

export default [RadioBasic, RadioGroup];

import { withInstall } from '@nopon-web/utils/vue';
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

import { withInstall } from '@nopon-web/utils/vue';
import RadioBasicInstace from './radio-basic.vue';
import RadioGroupInstace from './radio-group.vue';

export const RadioBasic = withInstall({
	...RadioBasicInstace,
	name: 'RadioBasic',
});

export const RadioGroup = withInstall({
	...RadioGroupInstace,
	name: 'RadioGroup',
});

export default [RadioBasic, RadioGroup];

import { withInstall } from '@nopon-web/utils/vue';
import InputBasicInstace from './InputBasic.vue';
import InputClearableInstace from './InputClearable.vue';

export const InputBasic = withInstall({
	...InputBasicInstace,
	name: 'InputBasic',
});

export const InputClearable = withInstall({
	...InputClearableInstace,
	name: 'InputClearable',
});

export default [InputBasic, InputClearable];

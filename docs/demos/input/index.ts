import { withInstall } from '@nopon-web/utils/vue';
import InputBasicInstace from './input-basic.vue';
import InputClearableInstace from './input-clearable.vue';

export const InputBasic = withInstall({
	...InputBasicInstace,
	name: 'InputBasic',
});

export const InputClearable = withInstall({
	...InputClearableInstace,
	name: 'InputClearable',
});

export default [InputBasic, InputClearable];

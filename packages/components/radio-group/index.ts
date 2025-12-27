import { withInstall } from '@nopon-web/utils/vue';
import RadioGroup from './src/radio-group.vue';

export const SRadioGroup = withInstall(RadioGroup as any);

export default SRadioGroup;

export * from './src/types'
export * from './src/constants'

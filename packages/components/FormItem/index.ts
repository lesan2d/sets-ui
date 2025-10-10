import { withInstall } from '@nopon-web/utils/vue';
import FormItem from './src/FormItem.vue';

export const SFormItem = withInstall(FormItem as any);

export default SFormItem;

export * from './src/types';
export * from './src/constants';
export * from './src/composables';

import { withInstall } from '@nopon-web/utils/vue';
import FormItem from './src/form-item.vue';

export const SFormItem = withInstall(FormItem as any);

export default SFormItem;

export * from './src/types';
export * from './src/constants';

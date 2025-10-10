import { withInstall } from '@nopon-web/utils/vue';
import Form from './src/Form.vue';

export const SForm = withInstall(Form as any);

export default SForm;

export * from './src/types';
export * from './src/constants';
export * from './src/composables';

export type FormInstance = InstanceType<typeof Form>

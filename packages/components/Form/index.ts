import { withInstall } from '@packages/utils';
import Form from './src/Form.vue';

export const SForm = withInstall(Form);

export default SForm;

export * from './src/types';
export * from './src/constants';
export * from './src/composables';

export type FormInstance = InstanceType<typeof Form>

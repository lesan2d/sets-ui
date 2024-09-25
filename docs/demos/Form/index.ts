import { withInstall } from '@packages/utils';
import BasicInstace from './FormBasic.vue';

const COMPONENT_NAME = 'Form';

export const Basic = withInstall({
	...BasicInstace,
	name: `${COMPONENT_NAME}Basic`,
});

export default [Basic];

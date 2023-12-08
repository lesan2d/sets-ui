import { withInstall } from '@packages/utils';
import GridBasicInstace from './GridBasic.vue';

export const GridBasic = withInstall({
	name: 'GridBasic',
	...GridBasicInstace,
});

export default GridBasic;

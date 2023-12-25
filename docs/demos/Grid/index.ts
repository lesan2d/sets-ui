import { withInstall } from '@packages/utils';
import GridBasicInstace from './GridBasic.vue';

export const GridBasic = withInstall({
  ...GridBasicInstace,
	name: 'GridBasic',
});

export default [GridBasic];

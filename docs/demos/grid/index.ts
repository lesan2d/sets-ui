import { withInstall } from '@nopon-web/utils/vue';
import GridBasicInstace from './grid-basic.vue';

export const GridBasic = withInstall({
  ...GridBasicInstace,
	name: 'GridBasic',
});

export default [GridBasic];

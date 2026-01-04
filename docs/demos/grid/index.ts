import { withInstall } from '@nopon-web/utils/vue';
import GridBasicInstace from './grid-basic.vue';
import GridDisplayInstace from './grid-display.vue';

export const GridBasic = withInstall({
  ...GridBasicInstace,
	name: 'GridBasic',
});

export const GridDisplay = withInstall({
  ...GridDisplayInstace,
	name: 'GridDisplay',
});

export default [GridBasic, GridDisplay];

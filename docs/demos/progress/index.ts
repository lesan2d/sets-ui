import { withInstall } from '@nopon-web/utils/vue';
import ProgressBasicInstace from './progress-basic.vue';

export const ProgressBasic = withInstall({
  ...ProgressBasicInstace,
  name: 'ProgressBasic',
});

export default [ProgressBasic];

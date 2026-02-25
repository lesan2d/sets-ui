import { withInstall } from '@nopon-web/utils/vue';
import TextBasicInstace from './text-basic.vue';

export const TextBasic = withInstall({
  ...TextBasicInstace,
  name: 'TextBasic',
});

export default [TextBasic];

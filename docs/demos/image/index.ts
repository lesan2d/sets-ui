import { withInstall } from '@nopon-web/utils/vue';
import ImageBasicInstace from './image-basic.vue';

export const ImageBasic = withInstall({
	...ImageBasicInstace,
	name: 'ImageBasic',
});

export default [ImageBasic];

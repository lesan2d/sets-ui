import { withInstall } from '@nopon-web/utils/vue';
import ImageBasicInstace from './image-basic.vue';
import ImageExtraInstace from './image-extra.vue';

export const ImageBasic = withInstall({
	...ImageBasicInstace,
	name: 'ImageBasic',
});

export const ImageExtra = withInstall({
	...ImageExtraInstace,
	name: 'ImageExtra',
});

export default [ImageBasic, ImageExtra];

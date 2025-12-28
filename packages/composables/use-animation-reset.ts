import type { Ref } from 'vue';

import { ref, watch } from 'vue';

// 重置动画
export function useAnimationReset(on: Ref<boolean>) {
	const style = ref<{ [key: string]: any }>({});

	watch(on, (val) => {
		if (val) {
			style.value = {
				animationDuration: 'auto',
				animationTimingFunction: 'ease',
				animationName: 'none',
			};
		} else {
			style.value = {};
		}
	});

	return {
		style,
	};
}

import type { Ref } from 'vue';

import { ref, watch } from 'vue';

export function useAnimationReverse(on: Ref<boolean>) {
	const style = ref<{ [key: string]: any }>({});

	watch(on, (val) => {
		if (val) {
			style.value = {
				animationDuration: 'auto',
				animationTimingFunction: 'ease',
				animationName: 'none',
			};
			setTimeout(() => {
				style.value = {
					animationDirection: 'reverse',
				};
			}, 0);
		} else {
			style.value = {};
		}
	});

	return {
		style,
	};
}

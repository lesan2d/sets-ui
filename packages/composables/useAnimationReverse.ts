import type { Ref } from 'vue';

import { ref, watch } from 'vue';

// 动画倒放(自带动画重置效果)
export function useAnimationReverse(on: Ref<boolean>) {
	const style = ref<{ [key: string]: any }>({});
	let reversing = false; // 倒放中
	let timer: NodeJS.Timeout | number = 0;
	const clearTimer = () => {
		if (timer) clearTimeout(timer);
		timer = 0;
	};

	watch(on, (val) => {
		if (reversing && timer) {
			clearTimer();
			style.value = {};
		}
		if (val) {
			reversing = true;
			style.value = {
				animationDuration: 'auto',
				animationTimingFunction: 'ease',
				animationName: 'none',
			};
			timer = setTimeout(() => {
				style.value = {
					animationDirection: 'reverse',
				};
				reversing = false;
				clearTimer();
			}, 0);
		} else {
			style.value = {};
		}
	});

	return {
		style,
	};
}

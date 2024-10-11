import type { Ref } from 'vue';

import { ref, watch } from 'vue';

// 动画倒放
export function useAnimationReverse(on: Ref<boolean>) {
	const style = ref<{ [key: string]: any }>({});
	let reversing = false; // 倒放中
	let timer: NodeJS.Timeout | null = null;
	const clearTimer = () => {
		if (timer) clearTimeout(timer);
		timer = null;
	};

	watch(on, (val) => {
		if (reversing && timer) {
			console.log('正在倒放...');
			clearTimer();
			style.value = {};
		}
		if (val) {
			console.log('开始动画倒放', val);
			reversing = true;
			style.value = {
				animationDuration: 'auto',
				animationTimingFunction: 'ease',
				animationName: 'none',
			};
			timer = setTimeout(() => {
				console.log('倒放中', reversing);
				console.log('倒放动画');
				style.value = {
					animationDirection: 'reverse',
				};
				reversing = false;
				clearTimer();
			}, 0);
		} else {
			console.log();

			style.value = {};
		}
	});

	return {
		style,
	};
}

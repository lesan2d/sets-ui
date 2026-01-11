import type { Ref } from 'vue';

import { ref, unref } from 'vue';
import { setStyle } from '@nopon-web/utils/dom';

export const useAnimate = (el: Ref<HTMLElement | null>) => {
  const isReversing = ref(false);

  // 重置动画
  const reset = () => {
    const element = unref(el);
    if (!element) return;

    setStyle(element, {
      animationName: 'none',
    });
  }

  // 倒放动画
  const reverse = () => {
    const element = unref(el);
    if (!element) return;

    isReversing.value = true;

    reset();

    requestAnimationFrame(() => {
      setStyle(element, {
        animationName: '',
        animationDirection: 'reverse',
      });
    });
  };

  const clear = () => {
    const element = unref(el);
    if (!element) return;

    setStyle(element, {
      animationName: '',
      animationDirection: '',
    });

    isReversing.value = false;
  };

  return {
    reset,
    reverse,
    clear,
    isReversing,
  }
}
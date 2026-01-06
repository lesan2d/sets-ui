import type { PropsProgress, PropsProgressSegment } from '../types';
import { computed } from 'vue';

interface UseProgressOptions {
  props: PropsProgress;
}

export const useProgress = (options: UseProgressOptions) => {
  const { props } = options;

  // 自动计算片段宽度
  const segmentsNormalized = computed(() => {
    const list = props.segments || [];
    return list.map((item, index, list) => {
      const prev = list[index - 1];
      return {
        ...item,
        width: prev ? item.value - prev.value : item.value,
      };
    });
  });

  // 片段宽度反转(rtl)
  const segmentsReverse = computed(() => {
    return segmentsNormalized.value.map((item) => ({
      ...item,
      value: 100 - item.value,
    }));
  })

  // 用于渲染的片段
  const segmentsDisplay = computed(() => {
    return props.direction === 'rtl' ? segmentsReverse.value : segmentsNormalized.value;
  });

  // 进度计算的上限值
  const progressEnd = computed(() => {
    if (!segmentsNormalized.value.length) return 100;
    return props.direction === 'rtl'
      ? 100
      : segmentsDisplay.value[segmentsDisplay.value.length - 1].value;
  });

  const isSegmentActive = (segment: PropsProgressSegment) => {
    const value = props.percentage && props.percentage >= (
      props.direction === 'rtl'
        ? progressEnd.value - segment.value
        : segment.value
    );
    return Boolean(value);
  };

  return {
    segmentsNormalized,
    segmentsReverse,
    segmentsDisplay,
    progressEnd,
    isSegmentActive,
  };
};


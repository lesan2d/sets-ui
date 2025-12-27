import { ref } from 'vue';

export const useFormLabelWidth = () => {
  const lableWidths = ref<number[]>([]); // 由于被 FormContext 通过 reactive 包裹无法使用 Ref<number>

  const getLabelWidthIndex = (width: number) => {
    const index = lableWidths.value.indexOf(width);
    return index;
  }

  const registerLabelWidth = (val: number, oldVal: number) => {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal)
      lableWidths.value.splice(index, 1, val)
    } else if (val) {
      lableWidths.value.push(val)
    }
  }

  const deregisterLabelWidth = (val: number) => {
    const index = getLabelWidthIndex(val)
    if (index > -1) {
      lableWidths.value.splice(index, 1)
    }
  }

  return {
    lableWidths,
    registerLabelWidth,
    deregisterLabelWidth,
  };
};

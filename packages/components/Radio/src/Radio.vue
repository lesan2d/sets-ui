<script setup lang="ts">
import type { RadioProps, RadioEmits } from './types';

import { inject, computed, watch } from 'vue';
import { RADIO_GROUP_KEY } from '@sets-ui/components/RadioGroup';
import { genBEMClass } from '@packages/utils';

import { useTheme } from '@sets-ui/config';
import { useFormItem } from '@sets-ui/components/FormItem';

defineOptions({
  name: 'Radio',
});

const props = withDefaults(defineProps<RadioProps>(), {
  value: 'on',
});

const { name: themeName } = useTheme();
const { validate } = useFormItem();

// 当 model 与 props.value 相等时,Radio为选中状态
const model = defineModel<string | number | boolean>({ default: '' });

// 选中状态
const picked = computed(() => {
  return model.value === props.value;
});

const extendsClass = genBEMClass('s-radio', [...themeName].filter((p) => Boolean(p)) as Array<string>);


const radioGroup = inject(RADIO_GROUP_KEY, undefined);

watch(() => radioGroup, (val) => {
  if (!val) return;
  model.value = val?.modelValue.value;
}, {
  deep: true,
  immediate: true,
});


const emit = defineEmits<RadioEmits>();

function handleChange() {
  if (radioGroup?.changeModelValue) radioGroup.changeModelValue(model.value);
  validate?.('change');
  emit('change', model.value);
}
</script>

<template>
  <label class="s-radio" :class="[extendsClass, { 's-radio--picked': picked }]">
    <input type="radio" class="s-radio--input" v-model="model" :value="props.value" @change="handleChange" />
    <div class="s-radio--case"></div>
    <div class="s-radio--label">
      <slot></slot>
    </div>
  </label>
</template>

<style lang="scss">
.s-radio {
  --s-radio-size: calc(var(--base-font-size) + 2px);
  --s-radio-series-gap: 10px;
  cursor: pointer;
  display: inline-grid;
  grid-template-columns: var(--s-radio-size) auto;
  column-gap: 5px;
  align-items: center;

  &--input {
    display: none;

    &:checked {
      &+.s-radio--case {
        border-color: var(--theme-color);

        &::after {
          transform: translateY(-50%) scale(0.75);
        }
      }
    }
  }

  &--case {
    position: relative;
    width: var(--s-radio-size);
    height: var(--s-radio-size);
    border-radius: 50%;
    border: 1px solid var(--color-icon);

    &::after {
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 0px;
      z-index: 1;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: var(--theme-color);
      transform-origin: 50% center;
      transform: translateY(-50%) scale(0);
    }

    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 0px;
      z-index: 1;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: var(--base-color-lighter);
      transform-origin: 50% center;
      transform: translateY(-50%) scale(1);
    }
  }

  &--label {
    font-size: var(--base-font-size);
  }

  +.s-radio {
    margin-left: var(--s-radio-series-gap);
  }
}
</style>

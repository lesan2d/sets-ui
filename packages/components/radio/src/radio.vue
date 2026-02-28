<script setup lang="ts">
import type { RadioProps, RadioEmits } from './types';

import { inject, computed, watch } from 'vue';
import { RADIO_GROUP_KEY } from '@sets-ui/components/radio-group';
import { genBEMClass } from '@nopon-web/utils/css';

import { useTheme } from '@sets-ui/config';
import { useFormItem } from '@sets-ui/components/form-item/src/composables/use-form-item';

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
  --s-radio-size: calc(var(--text-sm) + 2px);
  --s-radio-gap: 10px;
  cursor: pointer;
  display: inline-grid;
  grid-template-columns: var(--s-radio-size) auto;
  column-gap: 5px;
  align-items: center;
  line-height: inherit;

  &--input {
    display: none;

    &:checked {
      &+.s-radio--case {
        border-color: var(--color-theme-500);

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
    border: 1px solid var(--color-icon-500);

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
      background-color: var(--color-theme-500);
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
      background-color: var(--color-base-250);
      transform-origin: 50% center;
      transform: translateY(-50%) scale(1);
    }
  }

  &--label {
    font-size: var(--text-sm);
  }

  &:has(+ .s-radio) {
    margin-right: var(--s-radio-gap);
  }
}
</style>

<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue';
import { CONST_COMPONENT } from '@packages/constants';

defineOptions({
  name: 'SRadio',
});

interface SRadioProps {
  value: string | number | boolean
}
const props = defineProps<SRadioProps>();

// 当 model 与 props.value 相等时,Radio为选中状态
const model = defineModel<string | number | boolean>({ default: '' });

// 选中状态
const picked = computed(() => {
  return model.value === props.value;
});

const radioGroup = inject(CONST_COMPONENT.RADIO_GROUP_KEY, () => ({
  modelValue: ref<string | number | boolean>(''),
  changeModel: (value: string | number | boolean) => value,
}), true);

function handleChange() {
  radioGroup.changeModel(model.value);
}

watch(() => radioGroup.modelValue, (val) => {
  model.value = val.value;
}, {
  deep: true
});
</script>

<template>
  <label class="s-radio" :class="{ 's-radio--picked': picked }">
    <input type="radio" class="s-radio--input" v-model="model" :value="props.value" @change="handleChange" />
    <div class="s-radio--case"></div>
    <div class="s-radio--label">
      <slot></slot>
    </div>
  </label>
</template>

<style lang="scss">
.s-radio {
  --s-radio-size: 16px;
  cursor: pointer;

  &--input {
    display: none;

    &:checked {
      &+.s-radio--case {
        &::after {
          transform: translateY(-50%) scale(0.75);
        }
      }
    }
  }

  &--case {
    position: relative;
    display: inline-block;
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
      transition: transform 0.25s ease;
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
      background-color: #fff;
      transform-origin: 50% center;
      transform: translateY(-50%) scale(1);
      transition: transform 0.4s ease;
    }
  }

  &--label {
    display: inline-block;
  }

  &:hover {
    .s-radio--case {
      border-color: var(--theme-color);
    }
  }

  &:active {
    .s-radio--case {
      background-color: var(--color-bg-light);

      &::before {
        transform: translateY(-50%) scale(0);
      }
    }
  }
}
</style>

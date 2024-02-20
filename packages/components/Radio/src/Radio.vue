<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue';
import { CONST_COMPONENT } from '@sets-ui/constants';

defineOptions({
  name: 'SRadio',
});

interface SRadioProps {
  value?: string | number | boolean
}
const props = withDefaults(defineProps<SRadioProps>(), {
  value: 'on',
});

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

watch(() => radioGroup.modelValue, (val) => {
  model.value = val.value;
}, {
  deep: true,
  immediate: true,
});


const emit = defineEmits<{
  (e: 'change', value: typeof model.value): void
}>();

function handleChange() {
  radioGroup.changeModel(model.value);
  emit('change', model.value);
}
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
      transition: transform 0.25s ease;
    }
  }

  +.s-radio {
    margin-left: var(--s-radio-series-gap);
  }

  &:hover {
    .s-radio--case {
      border-color: var(--theme-color);
    }
  }

  &:active {
    .s-radio--case {
      background-color: var(--color-bg-light);

      &::after {
        transform: translateY(-50%) scale(0.25);
      }

      &::before {
        transform: translateY(-50%) scale(0);
      }
    }
  }
}
</style>

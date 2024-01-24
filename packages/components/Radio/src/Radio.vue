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
        background-color: var(--theme-color);
      }
    }
  }

  &--case {
    display: inline-block;
    width: var(--s-radio-size);
    height: var(--s-radio-size);
    border-radius: 50%;
    border: 1px solid var(--color-icon);
  }

  &--label {
    display: inline-block;
  }
}
</style>

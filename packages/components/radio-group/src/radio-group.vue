<script setup lang="ts">
import type { RadioGroupEmits } from './types';
import { provide, watch } from 'vue';
import { RADIO_GROUP_KEY } from './constants';

defineOptions({
  name: 'RadioGroup',
});

const model = defineModel<string | number | boolean>({ default: '' });

const changeModelValue = (value: string | number | boolean) => {
  model.value = value;
}

provide(RADIO_GROUP_KEY, {
  modelValue: model,
  changeModelValue,
});

const emit = defineEmits<RadioGroupEmits>();

watch(model, (val) => {
  emit('change', val);
});
</script>

<template>
  <div class="s-radio--group">
    <slot></slot>
  </div>
</template>

<style scoped lang='scss'></style>

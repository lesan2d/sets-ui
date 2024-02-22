<script setup lang="ts">
import { provide, watch } from 'vue';
import { CONST_COMPONENT } from '@sets-ui/constants';

defineOptions({
  name: 'RadioGroup',
});

const model = defineModel<string | number | boolean>({ default: '' });

const changeModel = (value: string | number | boolean) => {
  model.value = value;
}

provide(CONST_COMPONENT.RADIO_GROUP_KEY, {
  modelValue: model,
  changeModel,
});

const emit = defineEmits<{
  (e: 'change', value: typeof model.value): void
}>();

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

<script setup lang="ts">
import { provide } from 'vue';
import { CONST_COMPONENT } from '@packages/constants';

defineOptions({
  name: 'SRadioGroup',
});

const model = defineModel<string | number | boolean>({ default: '' });

const changeModel = (value: string | number | boolean) => {
  model.value = value;
}

provide(CONST_COMPONENT.RADIO_GROUP_KEY, {
  modelValue: model,
  changeModel,
});
</script>

<template>
  <div class="s-radio--group">
    <slot></slot>
  </div>
</template>

<style scoped lang='scss'></style>

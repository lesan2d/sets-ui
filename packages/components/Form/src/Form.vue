<script setup lang="ts">
import type { FormProps } from './types';

import { provide } from 'vue';
import { FORM_KEY } from './constants';

defineOptions({
  name: 'Form',
});

const props = withDefaults(defineProps<FormProps>(), {});

provide(FORM_KEY, {
  model: props?.model,
  rules: props?.rules,
});
</script>

<template>
  <form action="" method="get" class="form-example">
    <slot></slot>
  </form>
</template>

<style scoped lang='scss'></style>

<script setup lang="ts">
import type { FormItemProps } from './types';

import { inject, computed, } from 'vue';
import { FORM_KEY } from '@sets-ui/components/Form/index';

defineOptions({
  name: 'FormItem',
});


const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  name: '',
});


const fromContext = inject(FORM_KEY, undefined);

const rules = computed(() => {
  return fromContext?.rules?.[props.name];
});

console.log(rules);


console.log(fromContext);
console.log(props);
</script>

<template>
  <label>
    <span>{{ props.label }}</span>
    <slot></slot>
  </label>
</template>

<style scoped lang='scss'></style>

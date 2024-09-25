<script setup lang="ts">
import { inject } from 'vue';
import { CONST_COMPONENT } from '@sets-ui/constants';

defineOptions({
  name: 'FormItem',
});

interface SFormItemProps {
  name: string;
}
const props = withDefaults(defineProps<SFormItemProps>(), {
  name: '',
});


const fromContext = inject(CONST_COMPONENT.FORM_KEY, () => ({}), true);

console.log(fromContext);
console.log(props);
</script>

<template>
  <label>
    <slot></slot>
  </label>
</template>

<style scoped lang='scss'></style>

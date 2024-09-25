<script setup lang="ts">
import { provide } from 'vue';
import { CONST_COMPONENT } from '@sets-ui/constants';

defineOptions({
  name: 'Form',
});

interface RuleItem {
  require?: boolean;
  message: string;
  trigger: string; // 触发方式(事件)
};

interface SFormProps {
  rules?: {
    [key: string]: Array<RuleItem>,
  },
}
const props = withDefaults(defineProps<SFormProps>(), {
});

console.log(props.rules);


provide(CONST_COMPONENT.FORM_KEY, {
  rules: props.rules,
});
</script>

<template>
  <form action="" method="get" class="form-example">
    <slot></slot>
  </form>
</template>

<style scoped lang='scss'></style>

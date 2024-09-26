<script setup lang="ts">
import type { FormItemProps } from './types';

import { provide, inject, computed, } from 'vue';
import { FORM_KEY } from '@sets-ui/components/Form/index';
import { FORM_ITEM_KEY } from './constants';

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

const validate = async (trigger: string) => {
  const filterRules = rules.value?.filter((rule) => rule.trigger === trigger);
  if (filterRules) {
    for (const rule of filterRules) {
      const { validator } = rule;
      if (validator) {
        const valid = await validator(props.name);
        console.log(valid);
      }
    }
  }
  return true;
};

console.log(rules);


console.log(fromContext);
console.log(props);

provide(FORM_ITEM_KEY, { rules, validate })
</script>

<template>
  <label>
    <span>{{ props.label }}</span>
    <slot></slot>
  </label>
</template>

<style scoped lang='scss'></style>

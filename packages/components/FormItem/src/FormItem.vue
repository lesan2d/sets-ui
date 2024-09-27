<script setup lang="ts">
import type { FormItemProps } from './types';
import type { Rules } from '@sets-ui/components/Form';

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


const formContext = inject(FORM_KEY, undefined);

const fieldValue = computed(() => {
  const model = formContext?.model
  if (!model || !props.name) return undefined;
  return model[props.name];
});

const rules = computed(() => {
  return formContext?.rules?.[props.name];
});


// todo 使用 form name key 校验 表单，不传入key时校验全部
const validator = async (rules: Array<Rules>) => {
  for (const rule of rules) {
    if (rule.validator) {
      const valid = await rule.validator(fieldValue.value);
      console.log(valid);
    }
  }
};

const validate = async (trigger: string) => {
  const filterRules = rules.value?.filter((rule) => rule.trigger === trigger);
  if (filterRules) await validator(filterRules);
  return true;
};

provide(FORM_ITEM_KEY, { validate })
</script>

<template>
  <label>
    <span>{{ props.label }}</span>
    <slot></slot>
  </label>
</template>

<style scoped lang='scss'></style>

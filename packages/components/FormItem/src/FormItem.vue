<script setup lang="ts">
import type { FormItemProps } from './types';

import { provide, computed, } from 'vue';
import { FORM_ITEM_KEY } from './constants';

import { useForm } from '@sets-ui/components/Form';

defineOptions({
  name: 'FormItem',
});


const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  name: '',
});

const formContext = useForm();

const fieldValue = computed(() => {
  const model = formContext?.model
  if (!model || !props.name) return undefined;
  return model[props.name];
});

const rules = computed(() => {
  return formContext?.rules?.[props.name];
});

const validate = async (trigger: string) => {
  if (!formContext?.validator) return Promise.reject(true);
  const filterRules = rules.value?.filter((rule) => rule.trigger === trigger);
  if (!filterRules?.length) return Promise.resolve(true);
  return formContext?.validator({
    [props.name]: fieldValue,
  }, {
    [props.name]: filterRules,
  }).then((res) => {
    console.log('校验结果', res);
    return Promise.resolve(true);
  }).catch(() => {
    return Promise.reject(false);
  });
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

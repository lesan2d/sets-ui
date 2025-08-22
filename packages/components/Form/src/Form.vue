<script setup lang="ts">
import type { FormProps, FormContext } from './types';
import type { ValidateErrorInfo } from '@packages/composables/useValidator';
import type { FormItemContext } from '@sets-ui/components/FormItem';

import { ref, computed, provide } from 'vue';
import { FORM_KEY } from './constants';

defineOptions({
  name: 'Form',
});

const props = withDefaults(defineProps<FormProps>(), {});

const fields: FormItemContext[] = [];
const fieldsLableWidth = ref<Array<number>>([]);

const labelWidth = computed(() => {
  const fieldsMaxLabelWidth = fieldsLableWidth.value.length ? Math.max(...fieldsLableWidth.value) : undefined;
  console.log('变化', fieldsMaxLabelWidth);
  const value = props.labelWidth || fieldsMaxLabelWidth;
  return value;
});

const addField = (field: FormItemContext) => {
  fields.push(field);
  if (field?.labelOffsetWidth?.value) fieldsLableWidth.value.push(field.labelOffsetWidth.value);
}

const filterFields = (names: Array<string>) => {
  return names.length > 0 ? fields.filter((field) => names.includes(field?.name?.value || '')) : fields;
};

const validateField = async (names: Array<string>) => {
  let validationErrors: ValidateErrorInfo = {};
  const validateTasks = [];

  for (const field of filterFields(names)) {
    validateTasks.push(field.validate(''));
  }

  await Promise.allSettled(validateTasks);

  if (Object.keys(validationErrors).length === 0) return null;
  return Promise.reject(validationErrors);
};

const validate = () => validateField([]);

const clearValidate = () => {
  fields.forEach((field) => field.clearValidate())
};

const resetFields = () => {
  fields.forEach((field) => field.resetField())
};

const context: FormContext = {
  model: props?.model,
  rules: props?.rules,
  addField,
  labelWidth,
};

provide(FORM_KEY, context);

defineExpose({
  validateField,
  validate,
  clearValidate,
  resetFields,
})
</script>

<template>
  <form class="s-form">
    <slot></slot>
  </form>
</template>

<style scoped lang='scss'></style>

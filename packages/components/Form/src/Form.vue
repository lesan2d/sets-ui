<script setup lang="ts">
import type { FormProps } from './types';
import type { ValidateErrorInfo } from '@packages/composables/useValidator';
import type { FormItemContext } from '@sets-ui/components/FormItem';

import { provide } from 'vue';
import { FORM_KEY } from './constants';

defineOptions({
  name: 'Form',
});

const props = withDefaults(defineProps<FormProps>(), {});

const fields: FormItemContext[] = [];

const addField = (field: FormItemContext) => {
  fields.push(field);
}

const filterFields = (names: Array<string>) => {
  return names.length > 0 ? fields.filter((field) => names.includes(field?.name?.value || '')) : fields;
};

const validateField = async (names: Array<string>) => {
  let validationErrors: ValidateErrorInfo = {};
  for (const field of filterFields(names)) {
    try {
      await field.validate('');
    } catch (fieldError) {
      validationErrors = { ...validationErrors, ...(fieldError as ValidateErrorInfo) };
    }
  }

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

provide(FORM_KEY, {
  model: props?.model,
  rules: props?.rules,
  addField,
});

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

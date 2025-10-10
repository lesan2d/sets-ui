<script setup lang="ts">
import type { FormProps, FormContext } from './types';
import type { ValidateErrorInfo } from '@sets-ui/composables/useValidator';
import type { FormItemContext } from '@sets-ui/components/FormItem';

import { reactive, computed, provide } from 'vue';
import { FORM_KEY } from './constants';

import { useFormLabelWidth } from './composables/use-form-label-width';

defineOptions({
  name: 'Form',
});

const props = withDefaults(defineProps<FormProps>(), {});

const fields = reactive<FormItemContext[]>([]);

const formLabelWidth = useFormLabelWidth();

const lableWidthMax = computed(() => {
  const fieldsLableWidths = formLabelWidth.lableWidths.value.map(f => f);
  const value = fieldsLableWidths.length ? Math.max(...fieldsLableWidths) : 0;
  return value;
});

const computedLabelWidth = computed(() => {
  const value = props.labelWidth || lableWidthMax.value;
  return value;
});

const addField = (field: FormItemContext) => {
  fields.push(field);
}

const filterFields = (names: Array<string>) => {
  return names.length > 0 ? fields.filter((field) => names.includes(field?.name || '')) : fields;
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

const context: FormContext = reactive({
  model: props?.model,
  rules: props?.rules,
  addField,
  computedLabelWidth,
  ...formLabelWidth,
});

// 为 form-item 注入上下文
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

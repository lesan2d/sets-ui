<script setup lang="ts">
import type { FormProps, FormValidator, ValidateErrorInfo, } from './types';
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
  console.log(fields);
}

const filterFields = (names: Array<string>) => {
  return names.length > 0 ? fields.filter((field) => names.includes(field?.name?.value || '')) : fields;
};

const validator: FormValidator = async (formModel, formRules) => {
  const validateErrorInfo: {
    [key: string]: any;
  } = {};
  for (const fieldName in formRules) {
    const fieldValue = formModel[fieldName];
    const validateFieldErrorInfo = [];
    for (const rule of formRules[fieldName]) {
      const { required, min, max, } = rule;

      // 必需
      if (required && !Boolean(fieldValue.value)) {
        validateFieldErrorInfo.push(new Error(rule.message));
      }

      // 最小长度
      if (min && ['string', 'number'].includes(typeof fieldValue.value) && fieldValue.value.length < min) {
        validateFieldErrorInfo.push(new Error(rule.message));
      }

      // 最大长度
      if (max && ['string', 'number'].includes(typeof fieldValue.value) && fieldValue.value.length > max) {
        validateFieldErrorInfo.push(new Error(rule.message));
      }

      // 自定义规则
      if (rule.validator) {
        await rule.validator(fieldValue.value).catch((errMsg) => {
          validateFieldErrorInfo.push(new Error(errMsg));
        });
      }
    }
    if (validateFieldErrorInfo.length) validateErrorInfo[fieldName] = validateFieldErrorInfo;
  }

  // 校验失败
  if (Object.keys(validateErrorInfo).length > 0) return Promise.reject(validateErrorInfo);
  // 校验成功
  return Promise.resolve(null);
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
  validator,
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

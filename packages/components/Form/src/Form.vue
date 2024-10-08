<script setup lang="ts">
import type { FormProps, FormValidator } from './types';
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

const validator: FormValidator = async (formModel, formRules) => {
  const formRulesMsg: {
    [key: string]: any;
  } = {};
  for (const fieldName in formRules) {
    const fieldValue = formModel[fieldName];
    const ruleErrorMsg = [];
    for (const rule of formRules[fieldName]) {
      const { required, min, max, } = rule;

      // 必需
      if (required && !Boolean(fieldValue.value)) {
        ruleErrorMsg.push(new Error(rule.message));
      }

      // 最小长度
      if (min && ['string', 'number'].includes(typeof fieldValue.value) && fieldValue.value.length < min) {
        ruleErrorMsg.push(new Error(rule.message));
      }

      // 最大长度
      if (max && ['string', 'number'].includes(typeof fieldValue.value) && fieldValue.value.length > max) {
        ruleErrorMsg.push(new Error(rule.message));
      }

      // 自定义规则
      if (rule.validator) {
        await rule.validator(fieldValue.value).catch((errMsg) => {
          ruleErrorMsg.push(new Error(errMsg));
        });
      }
    }
    if (ruleErrorMsg.length) formRulesMsg[fieldName] = ruleErrorMsg;
  }

  // 校验失败
  if (Object.keys(formRulesMsg).length > 0) return Promise.reject(formRulesMsg);
  // 校验成功
  return Promise.resolve(undefined);
};

const validate = async () => {
  for (const field of fields) {
    console.log(field);
    try {
      await field.validate('');
    } catch (err) {
      console.log(err);
      return Promise.reject(false);
    }
  }
  console.log('校验成功');
  return Promise.resolve(true);
};

const validateField = (name: string) => { };

provide(FORM_KEY, {
  model: props?.model,
  rules: props?.rules,
  validator,
  validate,
  addField,
});

defineExpose({
  validate,
})
</script>

<template>
  <form class="s-form">
    <slot></slot>
  </form>
</template>

<style scoped lang='scss'></style>

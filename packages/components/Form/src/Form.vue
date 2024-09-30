<script setup lang="ts">
import type { FormProps, FormValidator } from './types';

import { provide } from 'vue';
import { FORM_KEY } from './constants';

defineOptions({
  name: 'Form',
});

const props = withDefaults(defineProps<FormProps>(), {});

const validator: FormValidator = async (formModel, formRules) => {
  const formRulesMsg: {
    [key: string]: any;
  } = {};
  for (const fieldName in formRules) {
    const fieldValue = formModel[fieldName];
    const ruleErrorMsg = [];
    for (const rule of formRules[fieldName]) {
      const { required } = rule;

      // 必需
      if (required && !Boolean(fieldValue.value)) {
        ruleErrorMsg.push(new Error(rule.message));
      }

      // 自定义规则
      if (rule.validator) {
        await rule.validator(fieldValue.value).catch((errMsg) => {
          ruleErrorMsg.push(new Error(errMsg));
        });
      }
    }
    formRulesMsg[fieldName] = ruleErrorMsg;
  }
  return Promise.resolve(formRulesMsg);
};

const validate = () => { };

const validateField = (name: string) => { };

provide(FORM_KEY, {
  model: props?.model,
  rules: props?.rules,
  validator,
});
</script>

<template>
  <form action="" method="get" class="form-example">
    <slot></slot>
  </form>
</template>

<style scoped lang='scss'></style>

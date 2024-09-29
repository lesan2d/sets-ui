<script setup lang="ts">
import type { FormItemProps } from './types';
import type { FormRules, RuleItem } from '@sets-ui/components/Form';

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

const validatorErrorMsg = (fieldName: string, message: string) => {
  return {
    [fieldName]: [new Error(message)],
  }
}

// todo 使用 form name key 校验 表单，不传入key时校验全部
const validator = async (formRules: FormRules): Promise<typeof validatorErrorMsg | undefined> => {
  for (const fieldName in formRules) {
    for (const rule of formRules[fieldName]) {
      const { required } = rule;

      if (required && !Boolean(fieldValue.value)) {
        return Promise.reject(validatorErrorMsg(fieldName, rule.message));
      }

      if (rule.validator) {
        await rule.validator(fieldValue.value).catch((err) => {
          return Promise.reject(validatorErrorMsg(fieldName, err));
        });
        // console.log(valid);
      }
    }
  }
};

const validate = async (trigger: string) => {
  const filterRules = rules.value?.filter((rule) => rule.trigger === trigger);
  if (!filterRules?.length) return Promise.resolve(true);
  return validator({
    [props.name]: filterRules,
  }).then((res) => {
    console.log('res', res);
    return Promise.resolve(true);
  }).catch((err) => {
    console.error('err', err);
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

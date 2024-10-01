<script setup lang="ts">
import type { FormItemProps } from './types';
import type { FormValidatorErrorInfo } from '@sets-ui/components/Form'

import { provide, ref, computed, } from 'vue';
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

const validateMessage = ref('');

const fieldValue = computed(() => {
  const model = formContext?.model
  if (!model || !props.name) return undefined;
  return model[props.name];
});

const rules = computed(() => {
  return formContext?.rules?.[props.name];
});

const validationSucceeded = () => {
  validateMessage.value = '';
}

const validationFailed = (error: FormValidatorErrorInfo) => {
  if (!error) {
    console.error(error)
  }

  const errors = error[props.name];

  validateMessage.value = errors
    ? errors?.[0]?.message ?? `${props.name} is required`
    : '';
}

const validate = async (trigger: string) => {
  if (!formContext?.validator) return Promise.reject(true);
  const filterRules = rules.value?.filter((rule) => rule.trigger === trigger);
  if (!filterRules?.length) return Promise.resolve(true);
  return formContext?.validator({
    [props.name]: fieldValue,
  }, {
    [props.name]: filterRules,
  }).then(() => {
    validationSucceeded();
    return Promise.resolve(true);
  }).catch((err) => {
    validationFailed(err);
    return Promise.reject(false);
  });
};

provide(FORM_ITEM_KEY, { validate })
</script>

<template>
  <div class="s-form--item flex items-center">
    <div class="s-form--item_label">
      <span>{{ props.label }}</span>
    </div>
    <div class="s-form--item_content">
      <slot></slot>
      <div v-if="validateMessage" class="s-form--item_error">
        <span>{{ validateMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.s-form {
  &--item {
    margin-bottom: 10px;

    &_content {
      position: relative;
    }

    &_error {
      position: absolute;
      bottom: 0;
      transform: translateY(100%);
      color: red;
    }
  }
}
</style>

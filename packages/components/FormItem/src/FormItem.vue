<script setup lang="ts">
import type { FormItemProps, FormItemValidateState } from './types';
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

const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('');

const atomicClass = computed(() => ({
  'is-validating': validateState.value === 'validating',
  'is-success': validateState.value === 'success',
  'is-error': validateState.value === 'error',
}));

const fieldValue = computed(() => {
  const model = formContext?.model
  if (!model || !props.name) return undefined;
  return model[props.name];
});

const fieldRules = computed(() => {
  return formContext?.rules?.[props.name];
});

const validationSucceeded = () => {
  validateState.value = 'success';
  validateMessage.value = '';
}

const validationFailed = (error: FormValidatorErrorInfo) => {
  if (!error) {
    console.error(error)
  }

  validateState.value = 'error';
  const errors = error[props.name];

  validateMessage.value = errors
    ? errors?.[0]?.message ?? `${props.name} is required`
    : '';
}

const validate = async (trigger: string) => {
  if (!formContext?.validator) return Promise.reject(true);
  const filterRules = fieldRules.value?.filter((rule) => rule.trigger === trigger);
  if (!filterRules?.length) return Promise.resolve(true);

  validateState.value = 'validating';
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
  <div class="s-form--item" :class="[atomicClass]">
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
    --s-form-item-size-base: var(--base-font-size);
    --s-form-item-grap-label: 12px;
    display: flex;
    margin-bottom: calc(var(--s-form-item-size-base) + 2px);

    &_label {
      margin-right: var(--s-form-item-grap-label);

      span {
        font-size: var(--s-form-item-size-base);
        line-height: calc(var(--s-form-item-size-base)* 2);
      }
    }

    &_content {
      position: relative;
    }

    &_error {
      position: absolute;
      bottom: -2px;
      line-height: 1;
      transform: translateY(100%);
      color: var(--color-danger);

      span {
        font-size: var(--s-form-item-size-base);
      }
    }

    &.is-error {
      .s-form--item {
        &_content {
          ::v-deep {
            .s-input--wrapper {
              --s-input-color-border: var(--color-danger);
            }
          }
        }
      }
    }
  }
}
</style>

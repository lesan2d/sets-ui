<script setup lang="ts">
import type { FormItemProps, FormItemValidateState, FormItemContext } from './types';
import type { ValidateErrorInfo } from '@packages/composables/useValidator'

import { provide, ref, computed, onMounted, nextTick, toRefs, } from 'vue';
import { clone } from 'lodash-unified';
import { FORM_ITEM_KEY } from './constants';

import { useValidator } from '@packages/composables';
import { useForm } from '@sets-ui/components/Form';

defineOptions({
  name: 'FormItem',
});


const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  name: '',
});

const formContext = useForm();
const { validator } = useValidator();

const formItemLabelRef = ref<HTMLElement>();
let initialValue: any = undefined;
const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('');

const atomicClass = computed(() => ({
  'is-validating': validateState.value === 'validating',
  'is-success': validateState.value === 'success',
  'is-error': validateState.value === 'error',
}));

const labelOffsetWidth = computed(() => {
  const value = props?.labelWidth || formItemLabelRef?.value?.offsetWidth;
  return value;
});

const computedLabelWidth = computed(() => {
  const value = props?.labelWidth || formContext?.labelWidth?.value || labelOffsetWidth.value;
  return value;
});

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

const validationFailed = (error: ValidateErrorInfo) => {
  if (!error) {
    console.error(error)
  }

  validateState.value = 'error';
  const errors = error?.[props.name];

  validateMessage.value = errors
    ? errors?.[0]?.message ?? `${props.name} is required`
    : '';
}

const validate = async (trigger: string) => {
  if (!props.name) {
    return null; // 没有 name 即没有 rules，默认为校验通过
  }

  // 可能需要注意在后代组件中，trigger触发校验时与 resetField 方法的状态冲突
  const filterRules = fieldRules.value?.filter((rule) => trigger ? rule?.trigger === trigger : true);
  if (!filterRules?.length) return null;

  validateState.value = 'validating';
  return validator({
    [props.name]: fieldValue,
  }, {
    [props.name]: filterRules,
  }).then(() => {
    validationSucceeded();
    return null;
  }).catch((fieldError) => {
    validationFailed(fieldError);
    return Promise.reject(fieldError);
  });
};

const clearValidate = () => {
  validateState.value = '';
  validateMessage.value = '';
}

const resetField = () => {
  const model = formContext?.model;
  if (!model || !props.name) return;

  model[props.name] = clone(initialValue);
  nextTick(() => {
    clearValidate();
  });
};

const context: FormItemContext = {
  ...toRefs(props),
  labelOffsetWidth,
  validate,
  clearValidate,
  resetField,
};

provide(FORM_ITEM_KEY, context);

onMounted(() => {
  if (props.name) {
    formContext?.addField(context);
    initialValue = clone(fieldValue.value)
  }
});
</script>

<template>
  <div class="s-form--item" :class="[atomicClass]">
    <div class="s-form--item_label_wrap" :style="{ width: `${computedLabelWidth}px` }">
      <div ref="formItemLabelRef" class="s-form--item_label">
        <span>{{ props.label }}</span>
      </div>
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
    margin-bottom: calc(var(--s-form-item-size-base) + 4px);

    &_label {
      &_wrap {
        display: flex;
        flex-wrap: nowrap;
      }

      padding-right: var(--s-form-item-grap-label);

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
      bottom: 0;
      line-height: 1;
      transform: translateY(100%);
      color: var(--color-danger);

      span {
        font-size: calc(var(--s-form-item-size-base) - 2px);
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

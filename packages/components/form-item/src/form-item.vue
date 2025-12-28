<script setup lang="ts">
import type { FormItemProps, FormItemValidateState, FormItemContext } from './types';
import type { ValidateErrorInfo } from '@sets-ui/composables/use-validator'

import { provide, ref, reactive, computed, watch, useTemplateRef, onMounted, nextTick, toRefs, } from 'vue';
import { clone } from 'lodash-unified';
import { FORM_ITEM_KEY } from './constants';

import { useResizeObserver } from '@vueuse/core'
import { useValidator } from '@sets-ui/composables';
import { useForm } from '@sets-ui/components/form/src/composables/use-form';

defineOptions({
  name: 'FormItem',
});


const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  name: '',
});

const formContext = useForm();
const { validator } = useValidator();

// label
const labelEl = useTemplateRef('label');
const labelOffsetWidth = ref(0);

// field
let initialValue: any = undefined;
const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('');

const atomicClass = computed(() => ({
  'is-validating': validateState.value === 'validating',
  'is-success': validateState.value === 'success',
  'is-error': validateState.value === 'error',
}));

const computedLabelWidth = computed(() => {
  const value = props?.labelWidth || formContext?.computedLabelWidth;
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

watch(labelOffsetWidth, (val, oldVal) => {
  formContext?.registerLabelWidth(val, oldVal)
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

const context: FormItemContext = reactive({
  // todo 需要考虑非原始值时使用 toRefs 的类型提供问题
  ...toRefs(props), // 解构 props 对象时使用 toRefs 保持响应性
  labelOffsetWidth,
  validate,
  clearValidate,
  resetField,
});

provide(FORM_ITEM_KEY, context);

onMounted(() => {
  if (labelEl.value) {
    // 监听 label 宽度变化
    useResizeObserver(labelEl.value, (entries) => {
      const entry = entries[0];
      // const { width } = entry.contentRect;
      const target = entry.target as HTMLElement;
      const width = target.offsetWidth;
      labelOffsetWidth.value = width;
    });
  }

  // init form field
  if (props.name) {
    formContext?.addField(context);
    initialValue = clone(fieldValue.value)
  }
});
</script>

<template>
  <div class="s-form--item" :class="[atomicClass]">
    <div class="s-form--item_label_wrap" :style="{ width: `${computedLabelWidth}px` }">
      <div ref="label" class="s-form--item_label">
        <span>{{ props.label }}</span>
      </div>
    </div>
    <div class="s-form--item_content">
      <slot></slot>
      <div v-if="validateMessage" class="s-form--item_error">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@mixin form-item-content-center {
  line-height: calc(var(--s-form-item-size-base) * 2 + calc(var(--size-unit) * 4));
  display: flex;
  align-items: center;
}

.s-form {
  &--item {
    --s-form-item-size-base: var(--text-sm);
    --s-form-item-grap-label: var(--text-sm);
    display: flex;
    align-items: flex-start;
    margin-bottom: calc(var(--s-form-item-size-base) + 4px);

    &_label_wrap {
      display: flex;
      justify-content: flex-end;
      flex-wrap: nowrap;
    }

    &_label {
      @include form-item-content-center;
      padding-right: var(--s-form-item-grap-label);
      box-sizing: content-box;
      white-space: nowrap;

      span {
        display: block;
        font-size: var(--s-form-item-size-base);
      }
    }

    &_content {
      @include form-item-content-center;
      position: relative;
    }

    &_error {
      position: absolute;
      bottom: 0;
      padding-top: calc(var(--size-unit) * 2);
      line-height: 1;
      font-size: calc(var(--s-form-item-size-base) - 2px);
      transform: translateY(100%);
      color: var(--color-danger-500);
    }

    &.is-error {
      .s-form--item {
        &_content {
          :deep(.s-input--wrapper) {
            --s-input-color-border: var(--color-danger-500);
          }
        }
      }
    }
  }
}
</style>

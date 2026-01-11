<script lang="ts" setup>
import type { PropsDialog } from './types';
import { computed } from 'vue';
import { SPopup } from '@sets-ui/components/popup';
import { SButton } from '@sets-ui/components/button';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: 'Dialog',
});

const props = withDefaults(defineProps<PropsDialog>(), {
  modelValue: false,
  showFooter: true,
});

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm']);

const ns = useNamespace('dialog');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
]);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function onCancel() {
  visible.value = false;
  emit('cancel');
}

function onConfirm() {
  visible.value = false;
  emit('confirm');
}
</script>

<template>
  <SPopup v-model="visible" :class="classes">
    <div v-if="title || $slots.header" :class="ns.e('header')">
      <slot name="header">
        <span class="s-h4">{{ title }}</span>
      </slot>
    </div>
    <div :class="ns.e('body')">
      <slot></slot>
    </div>
    <div v-if="showFooter" :class="ns.e('footer')">
      <slot name="footer">
        <div :class="ns.em('footer', 'action')">
          <s-button size="small" @click="onCancel">取消</s-button>
          <s-button type="primary" size="small" @click="onConfirm">确定</s-button>
        </div>
      </slot>
    </div>
  </SPopup>
</template>
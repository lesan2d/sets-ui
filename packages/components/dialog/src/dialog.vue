<script lang="ts" setup>
import { computed } from 'vue';
import { SPopup } from '@sets-ui/components/popup';
import { SButton } from '@sets-ui/components/button';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: 'Dialog',
});

interface Props {
  modelValue: boolean;
  title?: string;
  showFooter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
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

function handleCancel() {
  visible.value = false;
  emit('cancel');
}

function handleConfirm() {
  visible.value = false;
  emit('confirm');
}
</script>

<template>
  <s-popup v-model="visible" :class="classes">
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
          <s-button size="small" @click="handleCancel">取消</s-button>
          <s-button type="primary" size="small" @click="handleConfirm">确定</s-button>
        </div>
      </slot>
    </div>
  </s-popup>
</template>
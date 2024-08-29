<script lang="ts" setup>
import { computed } from 'vue';
import { SPopup } from '@sets-ui/components/Popup';
import { SButton } from '@sets-ui/components/Button';

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
  <s-popup v-model="visible" class="s-dialog">
    <div v-if="title || $slots.header" class="s-dialog--header">
      <slot name="header">
        <h4>{{ title }}</h4>
      </slot>
    </div>
    <div class="s-dialog--body">
      <slot></slot>
    </div>
    <div v-if="showFooter" class="s-dialog--footer">
      <slot name="footer">
        <div class="s-dialog--footer_action">
          <s-button size="small" @click="handleCancel">取消</s-button>
          <s-button type="primary" size="small" @click="handleConfirm">确定</s-button>
        </div>
      </slot>
    </div>
  </s-popup>
</template>

<style lang="scss">
.s-dialog {
  --s-popup-padding: 0;
  --s-dialog-width: 30%;
  --s-dialog-padding-header: 10px;
  --s-dialog-padding-body: 15px;
  --s-dialog-padding-footer: 10px;
  --s-dialog-border-width: 1px;
  --s-dialog-border-style: solid;
  --s-dialog-border-color: var(--color-border);
  width: var(--s-dialog-width, 50%);
  display: grid;
  grid-template-rows: auto 1fr auto;

  &--header {
    padding: var(--s-dialog-padding-header);
    border-bottom: var(--s-dialog-border-width) var(--s-dialog-border-style) var(--s-dialog-border-color);

    h4 {
      font-weight: 500;
    }
  }

  &--body {
    padding: var(--s-dialog-padding-body);
    overflow: hidden;
  }

  &--footer {
    padding: var(--s-dialog-padding-footer);
    &_action {
      text-align: right;
    }
  }
}
</style>

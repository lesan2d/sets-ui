<script lang="ts" setup>
import { computed } from 'vue';
import { SPopup } from '@packages/components/Popup';
import { SButton } from '@packages/components/Button';

defineOptions({
  name: 'SDialog',
});

interface Props {
  modelValue: boolean
  overlay?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  overlay: true,
});
const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
});
</script>

<template>
  <s-popup v-model="visible" class="s-dialog">
    <div class="s-dialog--header">
      <h4>{{ title }}</h4>
    </div>
    <div class="s-dialog--body">
      <slot></slot>
    </div>
    <div class="s-dialog--footer">
      <s-button size="small">取消</s-button>
    </div>
  </s-popup>
</template>

<style>
.s-dialog {
  --s-popup-padding: 0;
  --s-dialog-width: 30%;
  --s-dialog-padding-header: 8px;
  --s-dialog-padding-body: 15px;
  --s-dialog-border-width: 1px;
  --s-dialog-border-style: solid;
  --s-dialog-border-color: var(--color-border);
  width: var(--s-dialog-width, 50%);
}

.s-dialog--header {
  padding: var(--s-dialog-padding-header);
  border-bottom: var(--s-dialog-border-width) var(--s-dialog-border-style) var(--s-dialog-border-color);

  h4 {
    font-weight: 500;
  }
}

.s-dialog--body {
  padding: var(--s-dialog-padding-body);
}
</style>

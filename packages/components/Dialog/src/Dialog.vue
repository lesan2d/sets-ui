<script lang="ts" setup>
import { computed } from 'vue';
import { SOverlay } from '@packages/components/Overlay';

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
    <div class="s-dialog--footer"></div>
  </s-popup>
</template>

<style>
.s-dialog {
  --s-popup-padding: 0;
  --s-dialog-padding--header: 5px;
}

.s-dialog--header {
  padding: var(--s-dialog-padding--header);
}
</style>

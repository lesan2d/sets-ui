<script lang="ts" setup>
import { computed } from 'vue';
import { SOverlay } from '@packages/components/Overlay';

interface Props {
  modelValue: Boolean,
}

defineOptions({
  name: 'SPopup',
});

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});
const emit = defineEmits(['update:modelValue'])

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
  <s-overlay v-model="visible">
    <div class="s-popup">
      <div class="s-popup--content">
        <slot></slot>
      </div>
    </div>
  </s-overlay>
</template>

<style scoped>
.s-popup {
  --s-popup-padding: 20px;
  --s-popup-z-index: 1;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: calc(var(--z-index-top) + var(--s-popup-z-index));
  padding: var(--s-popup-padding);
  border-radius: var(--radius-box);
  box-shadow: var(--shadow-box);
  transform: translate(-50%, -50%);
  background-color: var(--color-bg);
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  modelValue: boolean;
  destroyOnClose?: boolean;
  closeOnClickOverlay?: boolean;
}

defineOptions({
  name: 'Overlay',
});

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  destroyOnClose: false,
  closeOnClickOverlay: true,
});
const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function handleClick() {
  if (props.closeOnClickOverlay) visible.value = false;
}
</script>

<template>
  <template v-if="props.destroyOnClose">
    <div v-if="visible" class="s-overlay" @click.self="handleClick">
      <slot></slot>
    </div>
  </template>
  <div v-else v-show="visible" class="s-overlay" @click.self="handleClick">
    <slot></slot>
  </div>
</template>

<style scoped>
.s-overlay {
  --opacity-overlay: 0.5;
  position: fixed;
  left: 0;
  top: 0;
  z-index: calc(var(--z-index-top) - 1);
  width: 100%;
  height: 100%;
  transition: opacity 0.5s;
  background-color: rgba(0, 0, 0, var(--opacity-overlay));
}
</style>

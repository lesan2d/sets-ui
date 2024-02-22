<script lang="ts" setup>
import { computed } from 'vue';
import { genBEMClass } from '@packages/utils';
import { SOverlay } from '@sets-ui/components/Overlay';

defineOptions({
  name: 'Popup',
  inheritAttrs: false,
});

interface Props {
  modelValue: boolean
  overlay?: boolean
  position?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  overlay: true,
  position: 'center',
});

const emit = defineEmits(['update:modelValue']);

const extendsClass = genBEMClass('s-popup', [props.position].filter((p) => Boolean(p)) as Array<string>);

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
  <s-overlay v-if="overlay" v-model="visible">
    <div class="s-popup" :class="[extendsClass]" v-bind="$attrs">
      <slot></slot>
    </div>
  </s-overlay>
  <div v-else-if="visible" class="s-popup" :class="[extendsClass]" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.s-popup {
  --s-popup-padding: 20px;
  --s-popup-z-index: 1;
  position: fixed;
  z-index: calc(var(--z-index-top) + var(--s-popup-z-index));
  padding: var(--s-popup-padding);
  border-radius: var(--radius-box);
  box-shadow: var(--shadow-box);
  transform: translate(-50%, -50%);
  background-color: var(--color-bg-lightest);

  &--center {
    left: 50%;
    top: 50%;
  }
}
</style>

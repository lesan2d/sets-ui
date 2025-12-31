<script lang="ts" setup>
import type { PropsImage } from './types';
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';
import { useImage } from './composables/use-image';

defineOptions({
  name: 'Image',
});

const props = defineProps<PropsImage>()

const ns = useNamespace('image');

const { ratio } = useImage({ props });

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  ns.is('ratio', ratio.value !== undefined),
]);

const styles = computed(() => {
  const values: Record<string, string> = {};

  if (ratio.value !== undefined) {
    values['--aspect-ratio'] = String(ratio.value);
  }

  return values;
});
</script>

<template>
  <div :class="classes" :style="styles">
    <div v-if="$slots.overlay" :class="ns.e('overlay')">
      <slot name="overlay"></slot>
    </div>
    <div v-if="$slots.decoration" :class="ns.e('decoration')">
      <slot name="decoration"></slot>
    </div>
    <img :class="ns.e('content')" :src="props.src">
    <div v-if="$slots.bg" :class="ns.e('bg')">
      <slot name="bg"></slot>
    </div>
  </div>
</template>

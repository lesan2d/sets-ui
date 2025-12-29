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
    <img :src="props.src">
  </div>
</template>

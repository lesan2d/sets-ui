<script setup lang="ts">
import type { PropsGrid } from './types';
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: 'Grid',
});

const props = withDefaults(defineProps<PropsGrid>(), {
  display: 'grid',
  col: 1,
  wrap: false,
  gap: '0px',
  onlyCenter: false,
});

const ns = useNamespace('grid');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  ns.is('grid', props.display === 'grid'),
  ns.is('flex', props.display === 'flex'),
  ns.is('wrap', props.wrap),
  ns.is('only-center', props.onlyCenter),
]);

const styles = computed(() => {
  const values: Record<string, string> = {};

  if (props.col !== undefined) {
    values['--col'] = String(props.col);
  }

  if (props.gap !== undefined) {
    values['--gap'] = String(props.gap);
  }

  return values;
});
</script>

<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

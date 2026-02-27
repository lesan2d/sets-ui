<script lang="ts" setup>
import type { PropsText } from './types';
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: 'Text',
});

const props = withDefaults(defineProps<PropsText>(), {
  size: 'md',
});

const ns = useNamespace('text');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  ns.m(props.size),
  ns.is('ellipsis', props.ellipsis),
]);
</script>


<template>
  <span :class="classes">
    <slot></slot>
  </span>
</template>


<style scoped></style>

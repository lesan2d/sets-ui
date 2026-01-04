<script lang="ts" setup>
import type { PropsIcon } from './types';
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: 'Icon',
});

const props = withDefaults(defineProps<PropsIcon>(), {
  name: '',
  circle: false,
});

const ns = useNamespace('icon');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  props.name && ns.e(props.name),
  ns.is('circle', props.circle),
]);
</script>

<template>
  <i :class="classes"></i>
</template>

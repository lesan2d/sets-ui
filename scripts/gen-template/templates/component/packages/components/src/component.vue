<script lang="ts" setup>
import type { Props{{PascalName}} } from './types';
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: '{{PascalName}}',
});

const props = defineProps<Props{{PascalName}}>()

const ns = useNamespace('{{name}}');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
]);
</script>


<template>
  <div :class="classes">
  </div>
</template>


<style scoped></style>

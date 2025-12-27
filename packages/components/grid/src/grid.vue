<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'Grid',
});

const props = withDefaults(defineProps<{
  templateColumns?: Array<string> | number | string,
  templateRows?: Array<string> | number | string,
  gap?: Array<string> | number | string,
}>(), {
  templateColumns: 'repeat(24, 1fr)',
  templateRows: () => [],
  gap: 0,
});

const styles = computed(() => {
  return {
    'grid-template-columns': Array.isArray(props.templateColumns) ? props.templateColumns.join(' ') : props.templateColumns,
    'grid-template-rows': Array.isArray(props.templateRows) ? props.templateRows.join(' ') : props.templateRows,
    'grid-gap': Array.isArray(props.gap) ? props.gap.join(' ') : props.gap,
  };
});

console.log(styles);

</script>

<template>
  <div class="s-grid" :style="styles">
    <slot></slot>
  </div>
</template>

<style>
.s-grid {
  display: grid;
}
</style>

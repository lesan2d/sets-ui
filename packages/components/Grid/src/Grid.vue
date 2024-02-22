<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'Grid',
});

const props = withDefaults(defineProps<{
  templateColumns?: Array<string>,
  templateRows?: Array<string>,
}>(), {
  templateColumns: () => ['repeat(24, 1fr)'],
  templateRows: () => [],
});

const styles = computed(() => {
  return {
    'grid-template-columns': props.templateColumns.join(' '),
    'grid-template-rows': props.templateRows.join(' '),
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

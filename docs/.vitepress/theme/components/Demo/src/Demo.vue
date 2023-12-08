<script setup lang="ts">
defineOptions({
  name: 'Demo',
});

const props = withDefaults(defineProps<{
  demoName?: string,
}>(), {
  demoName: '',
});
</script>

<template>
  <div class="demo">
    <div class="demo-example">
      <component :is="props.demoName"></component>
    </div>
    <div class="demo-code">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>

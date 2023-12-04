<script setup lang="ts">
defineOptions({
  name: 'SGrid',
})
</script>

<template>
  <div class="s-grid">
    <slot></slot>
  </div>
</template>

<style scoped>
.s-grid {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
}
</style>

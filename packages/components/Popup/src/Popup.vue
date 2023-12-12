<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({
  name: 'SPopup',
});

const visible = ref(false);
</script>

<template>
  <div v-if="visible" class="s-popup">
    <div class="s-popup--content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.s-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-bg);
  border-radius: 20px;
  box-shadow: var(--shadow-box);
}
</style>

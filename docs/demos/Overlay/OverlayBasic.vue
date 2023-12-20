<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<Boolean>(false);
</script>

<template>
  <s-button @click="visible = true">打开</s-button>
  <s-overlay v-model="visible">
    <p>测试内容</p>
  </s-overlay>
</template>

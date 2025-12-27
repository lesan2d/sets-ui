<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<Boolean>(false);
</script>

<template>
  <s-button @click="visible = true">打开</s-button>
  <s-dialog v-model="visible" title="标题" show-close>
    <p>测试内容</p>
  </s-dialog>
</template>

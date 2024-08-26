<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<Boolean>(false);
</script>

<template>
  <s-button @click="visible = true">打开</s-button>
  <s-dialog v-model="visible" show-close>
    <template #header>
      <h4>自定义头部</h4>
    </template>
    <p>对话框内容</p>
    <template #footer>
      <s-button type="primary" @click="visible = false">自定义底部按钮</s-button>
    </template>
  </s-dialog>
</template>

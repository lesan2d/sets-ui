<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<Boolean>(false);
</script>

<template>
  <s-button @click="visible = true">打开</s-button>
  <s-popup v-model="visible" :overlay="false">
    <s-button text @click="visible = false">点击关闭</s-button>
  </s-popup>
</template>

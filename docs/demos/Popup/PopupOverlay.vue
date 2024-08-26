<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<Boolean>(false);
</script>

<template>
  <s-button @click="visible = true">打开</s-button>
  <s-popup v-model="visible" :overlay="false" show-close>
    <p style="margin: 10px;">显示内容</p>
  </s-popup>
</template>

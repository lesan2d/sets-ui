<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <s-input v-model="value" placeholder="请输入内容" clearable style="width: 200px;" />
</template>

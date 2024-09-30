<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');

const handleFocus = (e) => {
  console.log(e);
};

const handleBlur = (e) => {
  console.log(e);
};
</script>

<template>
  <s-input v-model="value" placeholder="请输入内容" style="width: 200px;" @focus="handleFocus" @blur="handleBlur" />
</template>

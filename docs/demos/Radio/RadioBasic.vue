<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <s-radio v-model="value" value="Option">Radio</s-radio>
  <p>value: {{ value }}</p>
  <s-button size="small" @click="value = ''">cancel</s-button>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <p>value: {{ value }}</p>
  <s-radio v-model="value" value="Option">Radio Option</s-radio>
  <s-radio v-model="value">Default Value</s-radio><br />
  <s-button size="small" @click="value = ''">cancel</s-button>
</template>


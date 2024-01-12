<script setup lang="ts">
import { ref } from 'vue';

const value = ref('OptionA');
</script>

<template>
  <p>Value: {{ value }}</p>
  <s-radio-group v-model="value">
    <s-radio value="a">OptionA</s-radio>
    <s-radio value="b">OptionB</s-radio>
    <s-radio value="c">OptionC</s-radio>
  </s-radio-group>
</template>

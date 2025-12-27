<script setup lang="ts">
import { ref } from 'vue';

const direction = ref('');
const visible = ref<Boolean>(false);
</script>

<template>
  <s-radio v-model="direction" value="ttb">上</s-radio>
  <s-radio v-model="direction" value="rtl">右</s-radio>
  <s-radio v-model="direction" value="btt">下</s-radio>
  <s-radio v-model="direction" value="ltr">左</s-radio>
  <s-button @click="visible = true" style="margin-left: 15px;">打开</s-button>
  <s-popup v-model="visible" :direction="direction">
    <span>弹出层</span>
  </s-popup>
</template>

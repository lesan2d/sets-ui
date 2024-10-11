<script setup lang="ts">
import { ref } from 'vue';

const direction = ref('');
const visible = ref<Boolean>(false);

const test = () => {
  visible.value = false;
  setTimeout(() => {
    visible.value = true;
  });
}

const close = () => {
  visible.value = false;
}
</script>

<template>
  <s-radio v-model="direction" value="ttb">上</s-radio>
  <s-radio v-model="direction" value="rtl">右</s-radio>
  <s-radio v-model="direction" value="btt">下</s-radio>
  <s-radio v-model="direction" value="ltr">左</s-radio>
  <s-button @click="visible = true" style="margin-left: 15px;">打开</s-button>
  <s-button @click="test" style="margin-left: 15px;">重启</s-button>
  <s-button @click="close" style="margin-left: 15px;">关闭</s-button>
  <s-dialog v-model="visible" title="标题" show-close :direction="direction" :overlay="false">
    <p>测试内容</p>
  </s-dialog>
</template>

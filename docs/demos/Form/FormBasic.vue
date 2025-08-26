<script setup lang="ts">
import type { FormInstance } from '@sets-ui/main';
import { ref, reactive } from 'vue'

const formRef = ref<FormInstance>();

const form = reactive({
  name: '',
  type: '',
})

const hanldeSubmit = () => {
  console.log('submit!');
};
</script>

<template>
  <s-form ref="formRef" :model="form">
    <s-form-item label="名称">
      <s-input v-model="form.name" placeholder="请输入名称" style="width: 200px;" />
    </s-form-item>
    <s-form-item label="工作类型">
      <s-radio-group v-model="form.type">
        <s-radio value="A">前端开发</s-radio>
        <s-radio value="B">后端开发</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item>
      <s-button type="primary" @click="hanldeSubmit">提交</s-button>
    </s-form-item>
  </s-form>
</template>

<script setup lang="ts">
import type { FormInstance } from '@sets-ui/main';
import { ref, reactive } from 'vue'

const formRef = ref<FormInstance>();

const form = reactive({
  name: '',
  type: '',
})

const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 4, message: '请输入2到4位的名称', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请选择类型' },
  ],
};

const hanldeSubmit = () => {
  if (!formRef.value) return;
  formRef.value.validate().then((res) => {
    console.log('校验成功', res);
  }).catch((res) => {
    console.log('校验失败', res);
  });
};
</script>

<template>
  <s-form ref="formRef" :model="form" :rules="rules">
    <s-form-item label="名称" name="name">
      <s-input v-model="form.name" placeholder="请输入名称" style="width: 200px;" />
    </s-form-item>
    <s-form-item label="工作类型" name="type">
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

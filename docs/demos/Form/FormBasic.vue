<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref(null);

const form = reactive({
  name: '',
  salary: '',
})
const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    {
      validator: (value: any) => {
        console.log(value);
        return new Promise((resolve, reject) => {
          window.setTimeout(() => {
            if (value !== '黑奴') {
              reject('错误，为您查询到名称，黑奴')
            } else {
              resolve(true);
            }
          }, 2000);
        })
      },
      trigger: 'blur',
    }
  ],
  salary: [
    { required: true, message: 'Please select type' },
    {
      validator: (value: any) => {
        console.log(value);
        if (value !== '2100') {
          return Promise.reject('期望薪资不能高于2100');
        } else {
          return Promise.resolve();
        }
      },
      trigger: 'change',
    }
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
    <s-form-item label="期望薪资" name="salary">
      <s-radio-group v-model="form.salary">
        <s-radio value="2100">2100</s-radio>
        <s-radio value="5000">5000</s-radio>
        <s-radio value="10000">10000</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item>
      <s-button type="primary" @click="hanldeSubmit">提交</s-button>
    </s-form-item>
  </s-form>
</template>

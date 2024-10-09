<script setup lang="ts">
import type { FormInstance } from '@sets-ui/main';
import { ref, reactive } from 'vue'

const salary = ref('salary');

const formRef = ref<FormInstance>();

const form = reactive({
  name: '',
  salary: '',
})
const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 2, max: 3, message: 'Length should be 2 to 3', trigger: 'blur' },
    {
      validator: (value: any) => {
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

const hanldeSubmitField = () => {
  if (!formRef.value) return;
  formRef.value.validateField(['salary']).then((res) => {
    console.log('校验成功', res);
  }).catch((res) => {
    console.log('校验失败', res);
  });
};

const hanldeReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
}
</script>

<template>
  <s-form ref="formRef" :model="form" :rules="rules">
    <s-form-item label="名称" name="name">
      <s-input v-model="form.name" placeholder="请输入名称" style="width: 200px;" />
    </s-form-item>
    <s-form-item label="期望薪资" :name="salary">
      <s-radio-group v-model="form.salary">
        <s-radio value="2100">2100</s-radio>
        <s-radio value="5000">5000</s-radio>
        <s-radio value="10000">10000</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item>
      <s-button type="primary" @click="hanldeSubmit">提交</s-button>
      <s-button type="primary" @click="hanldeSubmitField">校验</s-button>
      <s-button @click="hanldeReset">重置</s-button>
    </s-form-item>
  </s-form>
</template>

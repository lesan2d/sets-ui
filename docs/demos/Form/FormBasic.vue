<script setup lang="ts">
import type { FormInstance } from '@sets-ui/main';
import { ref, reactive } from 'vue'

const formRef = ref<FormInstance>();

const form = reactive({
  name: '',
  salary: '1000',
  type: '',
})

const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, message: '名称最少为两位', trigger: 'blur' },
    {
      validator: (value: any) => {
        return new Promise((resolve, reject) => {
          if (value !== '黑奴') {
            reject('名称错误，为您查询到名称: 黑奴')
          } else {
            resolve(true);
          }
        })
      },
      trigger: 'blur',
    }
  ],
  salary: [
    { required: true, message: '请输入期望薪资', trigger: 'blur' },
    {
      validator: (value: any) => {
        return new Promise((resolve, reject) => {
          console.log('薪资', value);
          if (isNaN(parseFloat(value))) return reject('请输入数字！');
          window.setTimeout(() => {
            if (Number.parseInt(value, 10) > 2100) {
              reject('期望薪资不能高于2100！')
            } else {
              resolve(true);
            }
          }, 3000);
        })
      },
      trigger: 'blur',
    }
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
    <s-form-item label="期望薪资" name="salary">
      <s-input v-model="form.salary" placeholder="请输入期望薪资" style="width: 200px;" />
    </s-form-item>
    <s-form-item label="工作类型" name="type">
      <s-radio-group v-model="form.type">
        <s-radio value="A">前端开发</s-radio>
        <s-radio value="B">后端开发</s-radio>
      </s-radio-group>
    </s-form-item>
    <s-form-item>
      <s-button type="primary" @click="hanldeSubmit">提交</s-button>
      <s-button type="primary" @click="hanldeSubmitField">校验</s-button>
      <s-button @click="hanldeReset">重置</s-button>
    </s-form-item>
  </s-form>
</template>

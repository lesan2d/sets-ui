<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
})
const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'focus' },
    {
      validator: (value: any) => {
        console.log(value);
        if (value !== 'laowang') {
          return Promise.reject('你必须叫laowang');
        } else {
          return Promise.resolve();
        }
      },
      trigger: 'blur',
    }
  ],
};
</script>

<template>
  <s-form :model="form" :rules="rules">
    <s-form-item label="名称" name="name">
      <s-input v-model="form.name" placeholder="请输入内容" style="width: 200px;" />
    </s-form-item>
  </s-form>
</template>

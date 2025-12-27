---
title: Form
---

# Form 表单

## 基础用法

最基础的表单功能，使用 `form-item` 组件作为 `form` 输入项的容器

:::demo
<<< @/demos/form/form-basic.vue
:::

## 表单校验

为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `name` 属性设置为需要验证的键值即可

:::demo
<<< @/demos/form/form-rules.vue
:::

## 自定义校验

为 `rules` 属性传入约定的验证规则，可以使用 `validator` 字段返回一个 `Promise` 来确定校验状态

:::demo
<<< @/demos/form/form-validator.vue
:::

## Form API

### Form Attributes

| 名称        |     说明     |                     类型 | 默认值 |
| ----------- | :----------: | -----------------------: | ------ |
| model       | 表单数据对象 | { \[key: string\]: any } | -      |
| rules       | 表单验证规则 |                FormRules | -      |
| label-width |  标签的长度  |                   number | -      |

### Form Exposes

| 名称          |                       说明                       |                                                   类型 | 默认值 |
| ------------- | :----------------------------------------------: | -----------------------------------------------------: | ------ |
| validateField |               验证具体的某个字段。               | (names: Array\<string\>) => Promise(ValidateErrorInfo) | -      |
| validate      |            对整个表单的内容进行验证。            | (names: Array\<string\>) => Promise(ValidateErrorInfo) | false  |
| clearValidate |             清理整个表单的验证信息。             |                                             () => void | -      |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果 |

## Form Item API

### Form Item Attributes

| 名称        |     说明     |   类型 | 默认值 |
| ----------- | :----------: | -----: | ------ |
| label       |   标签文本   | string | -      |
| name        | model 的键名 | string | -      |
| label-width |  标签的长度  | number | -      |

### Form Item CSS

| 名称                     |           说明           |                默认值 |
| ------------------------ | :----------------------: | --------------------: |
| --s-form-item-size-base  | 基准规格(字体、行高)大小 | var(--text-sm) |
| --s-form-item-grap-label |   label与content的检举   |                  12px |
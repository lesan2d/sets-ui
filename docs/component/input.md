---
title: Input
---

# Input 输入框

## 基础用法

:::demo
<<< @/demos/Input/InputBasic.vue
:::

## 可清空的

通过 clearable 属性可启用一键清空按钮

:::demo
<<< @/demos/Input/InputClearable.vue
:::

## API

### Input Attributes

| 名称        |      说明      |   类型 | 默认值 |
| ----------- | :------------: | -----: | ------ |
| placeholder | 输入框占位文本 | string | ''     |

### Input CSS

| 名称                    |       说明       |                默认值 |
| ----------------------- | :--------------: | --------------------: |
| --s-input-size-base     | 输入框大小基准值 | var(--base-font-size) |
| --s-input-size-D        |  输入框大小差值  |                   0px |
| --s-input-padding       |   输入框内边距   |              1px 10px |
| --s-input-border-radius |    输入框圆角    |                   4px |
| --s-input-color-border  |  输入框边框颜色  |   var(--color-border) |

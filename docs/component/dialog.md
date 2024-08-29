---
title: Dialog
---

# Dialog 对话框

::: tip
Dialog 基于 Popup 开发，通过 [透传 Attributes](https://cn.vuejs.org/guide/components/attrs.html) 可以使用 Popup 的所有属性和方法，该部分API不在此文档中重复，请查阅 [Popup文档](/component/popup.html#api)。
:::

## 基础用法

:::demo
<<< @/demos/Dialog/DialogBasic.vue
:::

## 自定义插槽

:::demo
<<< @/demos/Dialog/DialogSlot.vue
:::

## API

### Dialog Attributes

部分属性继承 Popup 组件，详情请参考文档

| 名称  | 说明  |   类型 | 默认值 |
| ----- | :---: | -----: | ------ |
| title | 标题  | string | ''     |

### Dialog Slots

| 名称   |     说明     |
| ------ | :----------: |
| header | 顶部标题区域 |
| footer | 底部操作区域 |

### Dialog Events

| 名称    |     说明     |     类型 |
| ------- | :----------: | -------: |
| confirm | 弹窗提交回调 | Function |
| cancel  | 弹窗关闭回调 | Function |

### Dialog CSS

| 名称                      |      说明      |              默认值 |
| ------------------------- | :------------: | ------------------: |
| --s-dialog-width          |      宽度      |                 30% |
| --s-dialog-padding-header |   头部内边距   |                10px |
| --s-dialog-padding-body   |   内容内边距   |                15px |
| --s-dialog-padding-footer |   底部内边距   |                10px |
| --s-dialog-border-width   | 区域间隔线宽度 |                 1px |
| --s-dialog-border-style   | 区域间隔线样式 |               solid |
| --s-dialog-border-color   | 区域间隔线颜色 | var(--color-border) |
---
title: Popup
---

# Popup 弹出层

## 基础用法

代码演示

:::demo test
<<< @/demos/popup/PopupBasic.vue
:::

## 隐藏遮罩

将 `overlay` 设为 `false`

:::demo test
<<< @/demos/popup/PopupOverlay.vue
:::

## 弹出方向

通过 `direction` 属性的 `ttb` `rtl` `btt` `ltr` 设定弹出方向，当值为 `''` 空时默认居中

:::demo test
<<< @/demos/popup/PopupDirection.vue
:::

## API

### Popup Attributes

| 名称             |       说明       |    类型 | 默认值 |
| ---------------- | :--------------: | ------: | ------ |
| overlay          |  是否显示遮罩层  | boolean | true   |
| destroy-on-close |  关闭时销毁元素  | boolean | false  |
| show-close        | 是否显示关闭按钮 | boolean | false  |
| direction        |     弹出方向     |    enum | ''     |

### Popup Events

| 名称    |     说明     |     类型 |
| ------- | :----------: | -------: |
| close | 弹出层关闭回调 | Function |

---
title: Popup
---

# Popup 弹出层

## 基础用法

代码演示

:::demo test
<<< @/demos/popup/popup-basic.vue
:::

## 隐藏遮罩

将 `overlay` 设为 `false`

:::demo
<<< @/demos/popup/popup-overlay.vue
:::

## 弹出方向

通过 `direction` 属性的 `ttb` `rtl` `btt` `ltr` 设定弹出方向，当值为 `''` 空时默认居中

:::demo
<<< @/demos/popup/popup-direction.vue
:::

## API

### Popup Attributes

| 名称                   |       说明       |    类型 | 默认值 |
| ---------------------- | :--------------: | ------: | ------ |
| overlay                |  是否显示遮罩层  | boolean | true   |
| destroy-on-close       |  关闭时销毁元素  | boolean | false  |
| show-close             | 是否显示关闭按钮 | boolean | false  |
| direction              |     弹出方向     |    enum | ''     |
| close-on-click-overlay |  点击遮罩时关闭  | boolean | true   |

### Popup Events

| 名称  |      说明      |     类型 |
| ----- | :------------: | -------: |
| close | 弹出层关闭回调 | Function |

### Popup CSS

| 名称              |  说明  | 默认值 |
| ----------------- | :----: | -----: |
| --s-popup-padding | 内边距 |   20px |
| --s-popup-z-index |  层级  |      1 |


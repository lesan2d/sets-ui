---
title: Button
---

# Button 按钮

## 基础用法

通过 `type` 属性定义不同的按钮样式

:::demo test
<<< @/demos/Button/ButtonBasic.vue
:::

## 按钮大小

预制了 `large` 和 `small` 两种值配置大小，可使用 CSS 变量自定义尺寸

:::demo test
<<< @/demos/Button/ButtonSize.vue
:::

## 按钮颜色

通过 `color` 属性设置按钮颜色

:::demo test
<<< @/demos/Button/ButtonColor.vue
:::

## 文本按钮

通过 `Text` 属性使按钮呈现文本样式

:::demo test
<<< @/demos/Button/ButtonText.vue
:::

## Button API

### Button CSS

| 名称                         |    说明    |                   默认值 |
| ---------------------------- | :--------: | -----------------------: |
| --s-button-theme-color       | 按钮主题色 |       var(--theme-color) |
| --s-button-theme-color-light | 按钮辅助色 | var(--theme-color-light) |

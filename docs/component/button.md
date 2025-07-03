---
title: Button
---

# Button 按钮

## 基础用法

通过 `type` 属性定义不同的按钮样式

:::demo
<<< @/demos/Button/ButtonBasic.vue
:::

## 按钮形状

通过 `round` `circle` 属性定义不同的按钮形状

:::demo
<<< @/demos/Button/ButtonShape.vue
:::

## 按钮大小

预制了 `large` 和 `small` 两种值配置大小，可使用 CSS 变量自定义尺寸

:::demo
<<< @/demos/Button/ButtonSize.vue
:::

## 按钮颜色

通过 `color` 属性设置按钮颜色

:::demo
<<< @/demos/Button/ButtonColor.vue
:::

## 文本按钮

通过 `Text` 属性使按钮呈现文本样式

:::demo
<<< @/demos/Button/ButtonText.vue
:::

## API

### Button Attributes

| 名称  |                说明                |    类型 | 默认值               |
| ----- | :--------------------------------: | ------: | -------------------- |
| type  |              样式类型              |    enum | 'default'\|'primary' |
| size  |              按钮大小              |    enum | 'small'\|'large'     |
| color | 自定义按钮颜色, 自动计算按钮辅助色 |  string | -                    |
| text  |           是否为文字按钮           | boolean | false                |
| bg    |           是否显示背景色           | boolean | true                 |

### Button CSS

| 名称                        |           说明           |                         默认值 |
| --------------------------- | :----------------------: | -----------------------------: |
| --s-button-theme-color      |        按钮主题色        |         var(--theme-color-500) |
| --s-button-theme-color-50   |        按钮辅助色        |          var(--theme-color-50) |
| --s-button-color-text       |        按钮字体色        |              var(--color-text) |
| --s-button-color-text-hover |      按钮字体移入色      |    var(--s-button-theme-color) |
| --s-button-color-bg         |       按钮默认背景       |          var(--color-base-250) |
| --s-button-color-bg-hover   |    按钮默认背景移入色    | var(--s-button-theme-color-50) |
| --s-button-size             | 按钮大小(仅形状按钮适用) |                         30unit |
| --s-button-size-text        |         字体大小         |                 var(--text-sm) |
| --s-button-padding          |          内边距          |                  12unit 14unit |
| --s-button-gap              |        按钮间边距        |                         10unit |
| --s-button-round            |      椭圆形按钮圆角      |                         20unit |

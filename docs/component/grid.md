---
title: Grid
---

# Grid 布局网格

## 基础用法

代码演示

:::demo test
<<< @/demos/grid/GridBasic.vue{1 vue}
:::

## API

### Grid Attributes

| 名称             |               说明                |                           类型 | 默认值            |
| ---------------- | :-------------------------------: | -----------------------------: | ----------------- |
| template-columns | 同 CSS 属性 grid-template-columns | Array[string]\| number\|string | 'repeat(24, 1fr)' |
| template-rows    |  同 CSS 属性 grid-template-rows   | Array[string]\| number\|string | ''                |
| gap              |       同 CSS 属性 grid-gap        | Array[string]\| number\|string | 0                 |


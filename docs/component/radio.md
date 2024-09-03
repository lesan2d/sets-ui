---
title: Radio
---

# Radio 按钮

## 基础用法

Radio 选中值为其绑定的 `value` 属性，当 Radio `v-model` 的值与其 `value` 全等时，Radio 处于选中状态。

::: tip
如果你忽略了 `value` 属性，Radio 则会根据 [W3C标准](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)) 提交 `'on'` 的默认值

:::

:::demo
<<< @/demos/Radio/RadioBasic.vue
:::

## 单选框组

使用 s-radio-group 来组合互斥选项

:::demo
<<< @/demos/Radio/RadioGroup.vue
:::

## API

### Radio CSS

| 名称                 |        说明        |                             默认值 |
| -------------------- | :----------------: | ---------------------------------: |
| --s-radio-size       | 单选框框大小基准值 | calc(var(--base-font-size) * 1.25) |
| --s-radio-series-gap |  单选框之间的间距  |                               10px |
---
title: Radio
---

# Radio 按钮

## 基础用法

Radio 选中值为其绑定的 `value` 属性，当 Radio `v-model` 的值与其 `value` 全等时，Radio 处于选中状态。

::: tip
如果你忽略了 `value` 属性，Radio 则会根据[原生规则](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value)默认分配 `'on'` 的提交值

:::

:::demo test
<<< @/demos/Radio/RadioBasic.vue
:::

## 单选框组

使用 s-radio-group 来组合互斥选项

:::demo test
<<< @/demos/Radio/RadioGroup.vue
:::

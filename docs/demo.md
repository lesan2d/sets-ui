---
title: Grid
---
# Demo

## GitHub 样式的表

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## 目录
[[toc]]

## 自定义容器
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 自定义标题
::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
:::

## raw
::: raw
Wraps in a <div class="vp-raw">111</div>
:::

## 代码块中的语法突出显示
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

## 代码块中的行突出显示
```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```

## 代码块中的彩色差异
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## 导入代码片段
<<< @/demo.vue

## 代码组
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

<<< @/demo.vue

:::

# Markdown 文件导入
<!--@include: ./component/grid.md-->

它还支持选择范围：
<!--@include: ./parts/basics.md{3,}-->

## Vue模板
1+1: {{ 1 + 1}}

<span v-for="i in 3">{{ i }}</span>

<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
import Demo from './demo.vue'

const { page } = useData()

const count = ref(0)
</script>

## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>

## 访问 VitePress 的运行时 API
<pre>{{ page }}</pre>

## 使用组件
<Demo />

# 全局配置

`sets-ui` 支持在安装插件时通过 `app.use` 传入全局配置，用于统一控制 **组件命名、BEM 类名生成规则、状态类名 以及 多主题扩展**。

## 命名空间

要实现完全的自定义，需要同时配置 Vue 插件参数 和 SCSS 预处理器变量，并确保二者保持一致。

### 1. 配置 Vue 插件

在应用入口文件中传入配置对象:

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import SetsUi from 'sets-ui';

const app = createApp(App);
app.use(SetsUi, {
	namespace: 'custom', // 1. 修改全局类名/组件前缀
	componentNamePrefix: 'Custom', // 2. 自定义组件标签前缀 (例如 <CustomButton>)
});
app.mount('#app');
```

### 2. 配置 SCSS 变量

为了让样式库生成的 CSS 类名与 JS 逻辑保持一致，需要在 vite.config.ts 中覆盖 SCSS 默认变量:

::: tip
SCSS 变量值必须与 JS 配置中的 [InstallOptions](/guide/config-global.html#api)。 保持一致，否则会导致样式失效。
:::

```ts
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // 使用 @forward ... with 语法覆盖库内部变量
        additionalData: `@forward '@nopon-web/styles/_config.scss' with (
          $namespace: 'custom'
        );`,
      },
    },
  },
});
```

### 3. 渲染效果对比

配置完成后，组件的调用方式和生成的 DOM 结构将发生变化：

**使用组件**

```vue
<!-- 组件前缀变为配置的 componentNamePrefix (或者 namespace) -->
<custom-button>基础按钮</custom-button>
```

**渲染结果**

```html
<!-- 类名生成规则改变：s-button -> custom-button -->
<button class="custom-button custom-button--default">基础按钮</button>
```

## 主题扩展系统

`sets-ui` 支持通过 `themes` 参数注入多个主题类名，方便进行样式覆盖和切换。

### 启用多主题

```ts
// main.ts
app.use(SetsUi, {
	// 注册 default, dark, glass 三个主题
	themes: ['default', 'dark', 'glass'],
});
```

### 渲染结果

配置后，所有组件的根元素上会自动追加对应的主题类名：

```html
<button class="s-button s-button--default s-button--dark s-button--glass">基础按钮</button>
```

### 样式接入

你需要根据注册的主题名称，引入或编写对应的样式文件。例如：

1.  **移除默认主题**：如果你不需要库自带的样式，可以在 `themes` 数组中移除 `'default'`。
2.  **编写自定义主题**：利用生成的 `.s-button--dark` 等类名编写 CSS 样式。

```scss
/* 示例：自定义 dark 主题样式 */
.s-button--dark {
	background-color: #000;
	color: #fff;
}
```

## API

### InstallOptions 配置项

`app.use(SetsUi, options)` 接收的参数对象。所有字段均为可选，未传入时将使用默认值。

| 参数                    | 类型       | 默认值        | 说明                                                              |
| :---------------------- | :--------- | :------------ | :---------------------------------------------------------------- |
| **namespace**           | `string`   | `'s'`         | 全局命名空间，影响组件类名起始部分。                              |
| **componentNamePrefix** | `string`   | `''`          | 组件注册名称前缀。若为空，通常默认使用 `namespace` 或库默认前缀。 |
| **commonSeparator**     | `string`   | `'-'`         | 命名空间与块名之间的连接符。                                      |
| **elementSeparator**    | `string`   | `'__'`        | 元素（Element）连接符 (BEM)。                                     |
| **modifierSeparator**   | `string`   | `'--'`        | 修饰符（Modifier）连接符 (BEM)。                                  |
| **statePrefix**         | `string`   | `'is'`        | 状态类名前缀 (如 `is-disabled`)。                                 |
| **themes**              | `string[]` | `['default']` | 启用的主题列表，会自动挂载对应类名。                              |

### BEM 与变量映射表

下表展示了 Plugin 配置与 SCSS 变量的对应关系及最终类名的生成逻辑。

**类名生成公式：**
`namespace` + `commonSeparator` + `block` + `elementSeparator` + `element` + `modifierSeparator` + `modifier`

| 概念             | JS 配置项 (`InstallOptions`) | SCSS 变量 (`_config.scss`) | 默认值 | 示例结果            |
| :--------------- | :--------------------------- | :------------------------- | :----- | :------------------ |
| **命名空间**     | `namespace`                  | `$namespace`               | `'s'`  | `s-*`               |
| **公共连接符**   | `commonSeparator`            | `$common-separator`        | `'-'`  | `s-block`           |
| **元素连接符**   | `elementSeparator`           | `$element-separator`       | `'__'` | `block__element`    |
| **修饰符连接符** | `modifierSeparator`          | `$modifier-separator`      | `'--'` | `element--modifier` |
| **状态前缀**     | `statePrefix`                | `$state-prefix`            | `'is'` | `is-active`         |

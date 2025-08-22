# 主题配置

## 内置主题

`sets-ui` 内置了默认主题，可按需引入

```js
import 'sets-ui/theme-default'; // 完整引入
import 'sets-ui/dist/theme-default/button/button.css'; // 按需引入
```

## 自定义主题

你可以通过插件参数为组件统一配置全局主题 `Class Name`，以便进行自定义样式扩展。

```js
import { createApp } from 'vue';
import App from './App.vue';
import SetsUi from 'sets-ui';

const app = createApp(App);
app.use(SetsUi, {
	theme: {
		// theme_default 为默认主题使用的 Class Name，如不需要时可去除
		name: ['theme_default', 'custom_theme_name'],
	},
});
app.mount('#app');
```

组件会自动在根元素上附加你配置的 `Class Name`，从而实现主题样式的灵活切换

```html
<button class="s-button s-button--default s-button--theme_default s-button--custom_theme_name">
	<div class="s-button--content">按钮</div>
</button>
```

接下来，你只需基于 `custom_theme_name` 编写对应的样式，即可完成主题定制。

## 主题变量

`sets-ui` 提供一套灵活的主题变量系统，自动注入至 `:root` 选择器，可用于控制颜色、字体、尺寸、层级等全局样式。

```scss
:root {
	// 🌈 主题色
	--theme-color-50: #ede6ff;
	--theme-color-500: #6e64c8;

	// 🎨 基础颜色
	--color-base-50: #fff;
	--color-base-250: #f5f6f7;
	--color-base-500: #eee;
	--color-base-inverse-50: #777777;
	--color-base-inverse-250: #333333;
	--color-base-inverse-500: #000000;
	--color-danger-500: #ff7b7b;

	// 🔤 尺寸系统基准
	--size-root: 16;
	// 定义最小尺寸单位（即 1px 的等效值）：
	--size-unit: calc(1 / var(--size-root) * 1rem);

	// 🔠 字体尺寸（可基于 --size-root 等比缩放）
	--text-6xs: calc(var(--text-base) * 0.125);
	--text-5xs: calc(var(--text-base) * 0.25);
	--text-4xs: calc(var(--text-base) * 0.375);
	--text-3xs: calc(var(--text-base) * 0.5);
	--text-2xs: calc(var(--text-base) * 0.625);
	--text-xs: calc(var(--text-base) * 0.75);
	--text-sm: calc(var(--text-base) * 0.875);
	--text-base: calc(16 * var(--size-unit));
	--text-lg: calc(var(--text-base) * 1.125);
	--text-xl: calc(var(--text-base) * 1.25);
	--text-2xl: calc(var(--text-base) * 1.5);
	--text-3xl: calc(var(--text-base) * 1.875);
	--text-4xl: calc(var(--text-base) * 2.25);
	--text-5xl: calc(var(--text-base) * 3);
	--text-6xl: calc(var(--text-base) * 3.75);
	--text-7xl: calc(var(--text-base) * 4.5);
	--text-8xl: calc(var(--text-base) * 6);
	--text-9xl: calc(var(--text-base) * 8);

	// 🧱 层级控制
	--z-index-base: 1000;

	// 🎯 语义色扩展（从基础色继承）
	--color-text-500: var(--color-base-inverse-500);
	--color-text-inverse-500: var(--color-base-50);
	--color-icon-500: var(--color-base-inverse-500);
	--color-border-500: var(--color-base-500);
	--color-bg-500: var(--color-base-250);

	// 🌙 深色主题
	&.dark {
		--color-base-inverse-50: #fff;
		--color-base-inverse-250: #f5f6f7;
		--color-base-inverse-500: #eee;
		--color-base-50: #000000;
		--color-base-250: #333333;
		--color-base-500: #777777;
	}

	font-size: calc(var(--size-root) * 1px);
}
```

### 命名空间

所有主题变量均采用命名空间分类，每个命名空间对应一类用途，便于在项目中进行有组织、可扩展的全局样式管理。

你可以在以下命名空间中自定义变量，用于组件库的样式覆盖、响应式缩放、主题切换等场景。

| 命名空间         |                                     功能说明                                     |
| ---------------- | :------------------------------------------------------------------------------: |
| --theme-\*       |                           主题控制相关变量（预留空间）                           |
| --theme-color-\* |               主题主色及分级，如 `--theme-color-500` 表示主色主调                |
| --color-\*       |        语义色变量，如 `--color-text-` ` --color-bg-` `--color-border-` 等        |
| --color-base-\*  | 基础色池，供继承或直接使用，如 `--color-text-500: var(--color-base-inverse-500)` |
| --size-\*        |          尺寸系统变量，控制基础比例单位（如 rem / vw 的切换）、全局缩放          |
| --text-\*        |      字体大小变量，命名规则与 Tailwind 类似（如 `--text-sm`, `--text-2xl`）      |
| --z-index-\*     |                                   层级控制变量                                   |

## 尺寸系统

`sets-ui` 内置一套灵活的尺寸系统，只需配置 **2 个核心变量** 即可在全局切换布局单位。

为了适配不同场景，推荐搭配以下方案使用：

- [flexible](https://github.com/amfe/lib-flexible)（基于 `rem`）
- [viewport](https://fedev.cn/css/vw-for-layout.html)（基于 `vw`）

默认情况下，`sets-ui` 使用 flexible（rem 模式），根字号设为 `16px`。

```scss
:root {
	--size-root: 16; // 尺寸基准值，控制整体缩放比例
	--size-unit: calc(1 / var(--size-root) * 1rem); // 最小单位：等效于 1px
}
```

- `--size-root`：全局基准值，用于确定设计稿与页面的缩放比例
  - rem 模式：设置为 **设计稿宽度 ÷ 10**（如 750 → 75），PC 默认 `16`
  - vw 模式：设置为 **设计稿宽度**（如 750）
- `--size-unit`: 定义 `1px` 的等效值，推荐在样式中替代 `px`
  - rem 模式：`1px = (1 / --size-root) rem`
  - vw 模式：`1px = (1 / --size-root * 100vw)`

::: tip
借助这套体系，所有尺寸都可通过变量自动缩放，无需手动换算，从而在不同屏幕和布局模式下保持一致的视觉比例。
:::

### 示例

假设你的设计稿尺寸为 750px，那么你需要修改变量值为：

| 模式 |                                示例定义值                                 | 效果说明        |
| ---- | :-----------------------------------------------------------------------: | --------------- |
| rem  |  `--size-root: 75`<br/> `--size-unit: calc(1 / var(--size-root) * 1rem)`  | 1px ≈ 0.0133rem |
| vw   | `--size-root: 750`<br/> `--size-unit: calc(1 / var(--size-root) * 100vw)` | 1px ≈ 0.1333vw  |

组件库中的所有尺寸均通过 `--size-unit` 计算，例如：

```scss
div {
	width: calc(30 * var(--size-unit)); // 自动适配 rem 或 vw，等效于 30px
}
```

所以全局组件都会根据 `--size-root` `--size-unit` 自动计算 `rem` 或者 `vw` 适应当前屏幕尺寸。

同时你也可以根据这个规则，自主选用 `--size-unit` 变量编写样式来开发你的组件

::: warning

- 推荐使用 `rem` 方案，兼容性更佳，适配场景更广；

- 若需引入 `flexible.js` 实现动态 `font-size`，请确保同步更新 `--size-root`；

- 所有尺寸推荐通过 `--size-unit` 计算，避免直接写死 `px` 或 `rem`，便于后期维护与切换模式。

:::

## 颜色系统

颜色变量设计参考了 [Tailwind CSS](https://tailwindcss.com/docs/colors) 的色阶体系。每种颜色分为 11 个等级，从 50（最浅）到 950（最深），适用于不同层级的文本、背景、边框等样式需求。

目前默认提供了部分基础色池与常用语义色，支持通过变量继承实现自定义主题扩展。

```scss
:root {
	// 基础色池
	--color-base-50: #fff;
	--color-base-250: #f5f6f7;
	--color-base-500: #eee;
	--color-base-inverse-50: #777777;
	--color-base-inverse-250: #333333;
	--color-base-inverse-500: #000000;

	// 扩展色
	--color-text-500: var(--color-base-inverse-500);
	--color-text-inverse-500: var(--color-base-50);
	--color-icon-500: var(--color-base-inverse-500);
	--color-border-500: var(--color-base-500);
	--color-bg-500: var(--color-base-250);
}
```

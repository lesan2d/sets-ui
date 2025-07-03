# 主题配置

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

## 命名空间

所有主题变量均采用命名空间分类，每个命名空间对应一类用途，便于在项目中进行有组织、可扩展的全局样式管理。

你可以在以下命名空间中自定义变量，用于组件库的样式覆盖、响应式缩放、主题切换等场景。

| 命名空间             | 功能说明                                                              |
| ---------------- |:-----------------------------------------------------------------:|
| --theme-\*       | 主题控制相关变量（预留空间）                                                    |
| --theme-color-\* | 主题主色及分级，如 `--theme-color-500` 表示主色主调                              |
| --color-\*       | 语义色变量，如 `--color-text-` ` --color-bg-` `--color-border-` 等        |
| --color-base-\*  | 基础色池，供继承或直接使用，如 `--color-text-500: var(--color-base-inverse-500)` |
| --size-\*        | 尺寸系统变量，控制基础比例单位（如 rem / vw 的切换）、全局缩放                              |
| --text-\*        | 字体大小变量，命名规则与 Tailwind 类似（如 `--text-sm`, `--text-2xl`）             |
| --z-index-\*     | 层级控制变量                                                            |

## 尺寸系统

`sets-ui` 内置一套灵活的尺寸系统，通过 2 个核心变量实现全局布局单位的自由切换，默认采用 rem 模式，同时兼容 vw 方案。

```scss
:root {
    --size-root: 16; // 尺寸基准值，控制整体缩放比例
    --size-unit: calc(1 / var(--size-root) * 1rem); // 最小单位：等效于 1px
}
```

- --size-root：控制设计稿与真实页面的缩放比例
  - 在 rem 模式下：设为 **设计稿宽度 / 10**（如 750 → 75）
  - 在 vw 模式下：设为 **设计稿宽度**（如 750）
- --size-unit: 定义 1px 的等效值，用于替代 px 编写组件尺寸
  - rem 模式：`1px = (1 / --size-root) rem`
  - vw 模式：`1px = (1 / --size-root * 100vw)`

### 自定义方案

假设你的设计稿尺寸为 750px，那么你需要修改变量值为：

| 模式  | 示例定义值                                                                     | 效果说明            |
| --- |:-------------------------------------------------------------------------:| --------------- |
| rem | `--size-root: 75`<br/> `--size-unit: calc(1 / var(--size-root) * 1rem)`   | 1px ≈ 0.0133rem |
| vw  | `--size-root: 750`<br/> `--size-unit: calc(1 / var(--size-root) * 100vw)` | 1px ≈ 0.1333vw  |

### 使用方式

组件库中的所有尺寸均通过 `--size-unit` 计算，例如：

```scss
div {
    width: calc(30 * var(--size-unit)); // 自动适配 rem 或 vw，等效于 30px
}
```

所以全局组件都会根据 `--size-root` `--size-unit` 自动计算 `rem` 或者 `vw` 适应当前屏幕尺寸。

同时你也可以根据这个规则，自主选用 `--size-unit` 变量编写样式来开发你的组件



### 建议

- 推荐默认使用 `rem` 方案，兼容性更佳，适配场景更广；

- 若需引入 `flexible.js` 实现动态 `font-size`，请确保同步更新 `--size-root`；

- 所有尺寸推荐通过 `--size-unit` 计算，避免直接写死 `px` 或 `rem`，便于后期维护与切换模式。



## 颜色

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

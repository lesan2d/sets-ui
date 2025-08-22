# 快速开始

## 安装

```sh
npm install sets-ui
```

## 使用

### 完整引入

为了便于二次开发，`sets-ui` 默认仅提供最基础的样式。

如果需要更丰富的样式，可以按需引入主题包（参考 [主题样式](/guide/config-theme.html#主题样式)）。

```js
import { createApp } from 'vue';
import App from './App.vue';
import SetsUi from 'sets-ui';
import 'sets-ui/dist/index.css'; // 基础样式包

const app = createApp(App);
app.use(SetsUi);
app.mount('#app');
```

### 手动引入

当前基础样式包尚未拆分，需整体引入。

主题包则支持**组件级别的按需加载**，可避免无效样式。

```js
import { SButton } from 'sets-ui';
import 'sets-ui/dist/theme-default/button/button.css';
```

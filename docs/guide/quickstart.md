# 快速开始

## 安装

```sh
npm install sets-ui
```

## 使用
此处只引入了基本样式，Sest 内置了默认主题，可按需引入
```js
import { createApp } from 'vue';
import App from './App.vue';
import SetsUi from 'sets-ui';

const app = createApp(App);
app.use(SetsUi);
app.mount('#app');
```

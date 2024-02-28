# 全局配置

## 命名空间

通过插件参数 `namespace`，可以自定义全局组件名称前缀

```js
import { createApp } from 'vue';
import App from './App.vue';
import SetsUi from 'sets-ui';

const app = createApp(App);
app.use(SetsUi, {
	namespace: 'St',
});
app.mount('#app');
```

使用组件

```vue
<st-button>基础按钮</st-button>
```

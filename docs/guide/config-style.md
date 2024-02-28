# 样式配置

## 默认主题

Sest 内置了默认主题，可按需引入

```js
import 'sets-ui/theme-default';
```

## 自定义主题

通过插件参数，可以自定义全局组件主题 `Class Name`

```js
import { createApp } from 'vue';
import App from './App.vue';
import SetsUi from 'sets-ui';

const app = createApp(App);
app.use(SetsUi, {
  theme: {
    // theme_default 为默认主题使用的 Class Name，如不需要时可去除
    name: ['theme_default', 'custom_theme_name']
  }
});
app.mount('#app');
```

你的组件会按照配置添加上你在 `name` 中输入的 `Class Name`

```html
<button class="s-button s-button--default s-button--theme_default s-button--custom_theme_name">
  <div class="s-button--content">按钮</div>
</button>
```
import { createApp } from 'vue';
import App from './App.vue';
import setsUi from '@packages/sets-ui';

const app = createApp(App);
app.use(setsUi);
app.mount('#app');

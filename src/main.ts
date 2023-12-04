import { createApp } from 'vue';
import App from './App.vue';
import segmentUi from '@packages/segment-ui';

const app = createApp(App);
app.use(segmentUi);
app.mount('#app');

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import SetsUi from '@sets-ui/main';
import GlobalComponents from './components';
import Demos from '../../demos';

import '@sets-ui/theme-default';
import './style.css';

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		});
	},
	enhanceApp({ app, router, siteData }) {
		app.use(SetsUi, {
      namespace: 's',
    });
		app.use(GlobalComponents);
		app.use(Demos);
	},
} satisfies Theme;

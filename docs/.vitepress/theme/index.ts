// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import SetsUi from '@packages/sets-ui';
import GlobalComponents from './components';
import Demos from '../../demos';


export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		});
	},
	enhanceApp({ app, router, siteData }) {
		app.use(SetsUi);
		app.use(GlobalComponents);
		app.use(Demos);
	},
} satisfies Theme;

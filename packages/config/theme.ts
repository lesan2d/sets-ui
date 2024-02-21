import type { App } from 'vue';
import { inject } from 'vue';

export function configTheme<T>(config: T, app: App): void {
	if (!app) return;
	app.provide('theme', config);
}

type ThemeConfig = {
	name: string[];
};

export function useTheme(): ThemeConfig {
	const config = inject('theme', {
		name: ['theme_default'],
	} as ThemeConfig);
	return config;
}

import type { App } from 'vue';
import { inject } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';

export function configTheme<T>(config: T, app: App): void {
	if (!app) return;
	app.provide(CONST_CONFIG.THEME, config);
}

type ThemeConfig = {
	name: string[];
};

export function useTheme(): ThemeConfig {
	const config = inject(CONST_CONFIG.THEME, {
		name: ['theme_default'],
	} as ThemeConfig);
	return config;
}

import type { App } from 'vue';
import { inject } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';

export function configNamespace(config: string, app: App): void {
	if (!app) return;
	app.provide(CONST_CONFIG.NAMESPACE, config);
}
export function useNamespace(): string {
	const config = inject(CONST_CONFIG.NAMESPACE, 'S');
	return config;
}

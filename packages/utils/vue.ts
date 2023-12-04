import type { Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(plugin: T) {
	const comp = plugin as SFCWithInstall<T> & { name: string };
	comp.install = (app: any): void => {
		app.component(comp.name, plugin);
	};
	return plugin;
}

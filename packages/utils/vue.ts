import type { Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export type SFCWithInstallOptions = {
	namespace?: string;
};

export function withInstall<T>(plugin: T) {
	const comp = plugin as SFCWithInstall<T> & { name: string };
	comp.install = (
		app: any,
		options: SFCWithInstallOptions = {
			namespace: '',
		},
	): void => {
		const { namespace } = options;
		app.component(`${namespace}${comp.name}`, plugin);
	};
	return plugin as SFCWithInstall<T>;
}

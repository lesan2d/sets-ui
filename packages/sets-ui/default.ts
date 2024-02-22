import type { App, Plugin } from 'vue';
import Components from '@sets-ui/components';
import { configNamespace, configTheme } from '@sets-ui/config';

type InstallOptions = {
	namespace?: string;
	theme?: {
		name?: string[];
	};
};

const installer = (plugin: Plugin[]) => {
	return {
		install: (
			app: App,
			options: InstallOptions = {
				namespace: 'S',
			},
		) => {
			const { namespace, theme } = options;
			if (namespace) configNamespace(namespace, app);
			if (theme) configTheme(theme, app);
			plugin.forEach((comp) => {
				app.use(comp, options);
			});
		},
	};
};

export default installer(Components);

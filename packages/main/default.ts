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
		install: (app: App, options: InstallOptions = {}) => {
			const { namespace = 'S', theme } = options;
			if (namespace) configNamespace(namespace, app);
			if (theme) configTheme(theme, app);
			plugin.forEach((comp) => {
				app.use(comp, {
          namespace,
					...options,
				});
			});
		},
	};
};

export default installer(Components);

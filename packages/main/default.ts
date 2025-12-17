import type { App, Plugin } from 'vue';
import Components from '@sets-ui/components';
import { configTheme } from '@sets-ui/config';
import { configNamespace } from '@sets-ui/hooks';

type InstallOptions = {
	namespace?: string;
	theme?: {
		name?: string[];
	};
};

const installer = (plugin: Plugin[]) => {
	return {
		install: (app: App, options: InstallOptions = {}) => {
			const { namespace = 's', theme } = options;
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

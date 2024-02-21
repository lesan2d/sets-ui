import type { App, Plugin } from 'vue';
import Components from '@sets-ui/components';
import { configTheme } from '@sets-ui/config';

type installOptions = {
	theme?: {
		name?: string[];
	};
};

const installer = (plugin: Plugin[]) => {
	return {
		install: (app: App, options: installOptions = {}) => {
			const { theme } = options;
			if (theme) configTheme(theme, app);
			plugin.forEach((comp) => {
				app.use(comp, options);
			});
		},
	};
};

export default installer(Components);

import type { App, Plugin } from 'vue';
import Components from '@sets-ui/components';

const installer = (plugin: Plugin[]) => {
	return {
		install: (app: App) => {
			plugin.forEach((i) => {
				app.use(i);
			});
		},
	};
};

export default installer(Components);

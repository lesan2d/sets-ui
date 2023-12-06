import { Demo } from './Demo';

const Components = [Demo];

const installer = (plugin: Array<any>) => {
	return {
		install: (app: any) => {
			plugin.forEach((i) => {
				app.use(i);
			});
		},
	};
};

export default installer(Components);

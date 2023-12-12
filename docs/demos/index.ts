import { GridBasic } from './Grid';
import { ButtonBasic } from './Button';
import { PopupBasic } from './Popup';

const demos = [GridBasic, ButtonBasic, PopupBasic];

const installer = (plugin: Array<any>) => {
	return {
		install: (app: any) => {
			plugin.forEach((i) => {
				app.use(i);
			});
		},
	};
};

export default installer(demos);

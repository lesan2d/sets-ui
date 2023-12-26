import GridDemos from './Grid';
import ButtonDemos from './Button';
import OverlayDemos from './Overlay';
import PopupDemos from './Popup';
import DialogDemos from './Dialog';

const demos = [...GridDemos, ...ButtonDemos, ...OverlayDemos, ...PopupDemos, ...DialogDemos];

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

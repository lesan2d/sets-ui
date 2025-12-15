import ButtonDemos from './Button';
import DialogDemos from './Dialog';
import FormtDemos from './Form';
import GridDemos from './Grid';
import ImageDemos from './image';
import InputDemos from './Input';
import OverlayDemos from './Overlay';
import PopupDemos from './Popup';
import RadioDemos from './Radio';

const demos = [
	...ButtonDemos,
	...DialogDemos,
	...FormtDemos,
	...GridDemos,
  ...ImageDemos,
	...InputDemos,
	...OverlayDemos,
	...PopupDemos,
	...RadioDemos,
];

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

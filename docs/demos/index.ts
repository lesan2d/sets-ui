import ButtonDemos from './button';
import DialogDemos from './dialog';
import FormtDemos from './form';
import GridDemos from './grid';
import ImageDemos from './image';
import InputDemos from './input';
import OverlayDemos from './overlay';
import PopupDemos from './popup';
import ProgressDemos from './progress';
import RadioDemos from './radio';

const demos = [
	...ButtonDemos,
	...DialogDemos,
	...FormtDemos,
	...GridDemos,
  ...ImageDemos,
	...InputDemos,
	...OverlayDemos,
	...PopupDemos,
  ...ProgressDemos,
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

import type { App, Plugin } from 'vue';
import type { InstallOptions } from '@sets-ui/hooks';
import { configTheme } from '@sets-ui/config';
import { provideGlobalConfig } from '@sets-ui/hooks';

export const installer = (plugin: Plugin[]) => {

  const install = (app: App, options: InstallOptions = {}) => {
    provideGlobalConfig(options, app);

    const { namespace = 's', theme } = options;

    if (theme) configTheme(theme, app);
    plugin.forEach((comp) => {
      app.use(comp, {
        namespace,
        ...options,
      });
    });
  }

  return {
    install,
  };
};


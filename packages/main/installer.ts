import type { App, Plugin } from 'vue';
import type { InstallOptions } from '@sets-ui/hooks';
import { configTheme } from '@sets-ui/config';
import { mergeGlobalConfig, provideGlobalConfig } from '@sets-ui/hooks';

export const installer = (plugin: Plugin[]) => {

  const install = (app: App, options: InstallOptions = {}) => {
    const mergeOptions = mergeGlobalConfig(options);
    provideGlobalConfig(mergeOptions, app);

    const { theme } = options;

    if (theme) configTheme(theme, app);

    plugin.forEach((comp) => {
      app.use(comp, {
        ...options,
        namespace: mergeOptions.componentNamePrefix ?? mergeOptions.namespace,
      });
    });
  }

  return {
    install,
  };
};


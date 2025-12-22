import type { App, Plugin } from 'vue';
import type { InstallOptions } from '@sets-ui/hooks';
import { configTheme } from '@sets-ui/config';
import { mergeOptions, provideGlobalConfig } from '@sets-ui/hooks';

export const installer = (plugin: Plugin[]) => {

  const install = (app: App, options: InstallOptions = {}) => {
    const mergedOptions = mergeOptions(options);

    provideGlobalConfig(mergedOptions, app);

    const { componentNamePrefix, namespace } = mergedOptions;

    const { themes } = mergedOptions;

    if (themes) configTheme({
      name: themes,
    }, app);

    plugin.forEach((comp) => {
      app.use(comp, {
        ...mergedOptions,
        namespace: componentNamePrefix ?? namespace,
      });
    });
  }

  return {
    install,
  };
};


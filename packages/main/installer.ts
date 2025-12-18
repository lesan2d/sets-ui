import type { App, Plugin } from 'vue';
import { configTheme } from '@sets-ui/config';
import { useGlobalConfig, configNamespace } from '@sets-ui/hooks';

type InstallOptions = {
  namespace?: string;
  theme?: {
    name?: string[];
  };
};

export const installer = (plugin: Plugin[]) => {

  const install = (app: App, options: InstallOptions = {}) => {
    const { namespace = 's', theme } = options;
    const config = useGlobalConfig(options, app);
    console.log('useGlobalConfig', config);
    if (namespace) configNamespace(namespace, app);
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


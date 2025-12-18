import type { App } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';
import { inject } from 'vue';

type InstallOptions = {
  namespace?: string;
  theme?: {
    name?: string[];
  };
};

const setGlobalConfig = (options: InstallOptions, app: App | null) => {
  if (!app) return;
  app.provide(CONST_CONFIG.NAMESPACE, options);
}

const getGlobalConfig = (): InstallOptions => {
  const config = inject<InstallOptions>(CONST_CONFIG.NAMESPACE);
  return config || {};
}


export const useGlobalConfig = (options: InstallOptions = {}, app?: App) => {
  setGlobalConfig(options, app || null);
  return getGlobalConfig();
}

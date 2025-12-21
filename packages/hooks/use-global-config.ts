import type { App } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';
import { inject } from 'vue';

export type InstallOptions = {
  namespace?: string;
  componentNamePrefix?: string,
  theme?: {
    name?: string[];
  };
};

const DEFAULT_INSTALL_OPTIONS: InstallOptions = {
  namespace: 's',
};

export const mergeOptions = (options: InstallOptions = {}) => {
  const merged = {
    ...DEFAULT_INSTALL_OPTIONS,
    ...options,
  };

  return merged;
}

export const provideGlobalConfig = (options: InstallOptions, app: App | null) => {
  if (!app) return;
  app.provide(CONST_CONFIG.GLOBAL_CONFIG, options);
}


export const useGlobalConfig = () => {
  const config = inject<InstallOptions>(CONST_CONFIG.GLOBAL_CONFIG, DEFAULT_INSTALL_OPTIONS);
  return config;
}

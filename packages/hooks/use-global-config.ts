import type { App } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';
import { inject } from 'vue';

export type InstallOptions = {
  namespace?: string;
  componentNamePrefix?: string,
  themes?: string[],
};

export type GlobalConfig = Readonly<Required<InstallOptions>>;

const DEFAULT_INSTALL_OPTIONS: GlobalConfig = {
  namespace: 's',
  componentNamePrefix: '',
  themes: ['default'],
};

export const mergeOptions = (options: InstallOptions = {}): GlobalConfig => {
  const merged = {
    ...DEFAULT_INSTALL_OPTIONS,
    ...options,
  };

  return merged;
}

export const provideGlobalConfig = (options: GlobalConfig, app: App | null) => {
  if (!app) return;
  app.provide(CONST_CONFIG.GLOBAL_CONFIG, options);
}


export const useGlobalConfig = () => {
  const config = inject<GlobalConfig>(CONST_CONFIG.GLOBAL_CONFIG, DEFAULT_INSTALL_OPTIONS);
  return config;
}

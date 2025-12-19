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

export const DEFAULT_INSTALL_OPTIONS: Required<
  Pick<InstallOptions, 'namespace' | 'componentNamePrefix'>
> = {
  namespace: 'sddd',
  componentNamePrefix: 'S',
};

export const mergeGlobalConfig = (options: InstallOptions) => {
  const value = {
    ...DEFAULT_INSTALL_OPTIONS,
    ...options,
  };
  console.log(value);
  return value;
}

export const provideGlobalConfig = (options: InstallOptions, app: App | null) => {
  if (!app) return;
  app.provide(CONST_CONFIG.GLOBAL_CONFIG, options);
}


export const useGlobalConfig = (key?: string) => {
  const config = inject<InstallOptions>(CONST_CONFIG.GLOBAL_CONFIG);
  return config || {};
}

import type { App } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';
import { inject } from 'vue';

export type InstallOptions = {
  namespace?: string;
  theme?: {
    name?: string[];
  };
};

export const provideGlobalConfig = (options: InstallOptions, app: App | null) => {
  if (!app) return;
  app.provide(CONST_CONFIG.GLOBAL_CONFIG, options);
}


export const useGlobalConfig = (key?: string) => {
  const config = inject<InstallOptions>(CONST_CONFIG.GLOBAL_CONFIG);
  return config || {};
}

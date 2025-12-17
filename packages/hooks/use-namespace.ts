import type { App } from 'vue';
import { inject } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';

export function configNamespace(config: string, app: App): void {
  if (!app) return;
  app.provide(CONST_CONFIG.NAMESPACE, config);
}

export const useNamespace = (block: string) => {
  const namespace = inject(CONST_CONFIG.NAMESPACE, 's');

  return {
    b: () => `${namespace}_${block}`,
  }
}

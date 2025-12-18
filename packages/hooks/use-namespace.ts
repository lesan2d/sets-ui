import { useGlobalConfig } from '@sets-ui/hooks';

export const useNamespace = (block: string) => {
  const { namespace } = useGlobalConfig();

  return {
    b: () => `${namespace}_${block}`,
  }
}

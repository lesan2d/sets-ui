import { useGlobalConfig } from '@sets-ui/hooks';

export const useNamespace = (block: string) => {
  const { namespace, themes } = useGlobalConfig();

  const t = () => themes.map(theme => `${namespace}_${block}_${theme}`);

  const b = () => `${namespace}_${block}`;

  const e = (element: string) => `${namespace}_${block}-${element}`;

  const is = (name: string, state: boolean) => name && state ? `is-${name}` : '';

  return {
    t,
    b,
    e,
    is,
  }
}

import { useGlobalConfig } from '@sets-ui/hooks';

export const useNamespace = (block: string) => {
  const { namespace, themes } = useGlobalConfig();

  const t = () => themes.map(theme => `${namespace}_${block}_${theme}`);

  const b = () => `${namespace}_${block}`;

  const e = (element: string) => `${namespace}_${block}-${element}`;


  return {
    t,
    b,
    e,
  }
}

import { useGlobalConfig } from '@sets-ui/hooks';

interface BEMOptions {
	namespace: string;
	block: string;
	element?: string;
	modifier?: string;
}

const bem = ({ namespace, block, element, modifier }: BEMOptions) => {
	let cls = `${namespace}-${block}`;

	if (element) cls += `__${element}`;
	if (modifier) cls += `--${modifier}`;

	return cls;
};

export const useNamespace = (block: string) => {
	const { namespace, themes = [] } = useGlobalConfig();

	const bemClass = (options?: Pick<BEMOptions, 'element' | 'modifier'>) => bem({ namespace, block, ...options });

	const b = () => bemClass();

	const e = (element: string) => bemClass({ element });

	const m = (modifier?: string) => bemClass({ modifier });

	const em = (element: string, modifier?: string) => bemClass({ element, modifier });

	const t = () => themes.map((theme) => bemClass({ modifier: `theme-${theme}` }));

	const is = (name: string, state: boolean) => (name && state ? `is-${name}` : '');

	return {
		b,
		e,
		m,
		em,
		t,
		is,
	};
};

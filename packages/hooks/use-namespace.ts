import { useGlobalConfig } from '@sets-ui/hooks';

interface BEMOptions {
	namespace: string;
	block: string;
	element?: string;
	modifier?: string;
	commonSeparator: string;
	elementSeparator: string;
	modifierSeparator: string;
}

const bem = ({
	namespace,
	block,
	element,
	modifier,
	commonSeparator,
	elementSeparator,
	modifierSeparator,
}: BEMOptions) => {
	let cls = `${namespace}${commonSeparator}${block}`;

	if (element) cls += `${elementSeparator}${element}`;
	if (modifier) cls += `${modifierSeparator}${modifier}`;

	return cls;
};

export const useNamespace = (block: string) => {
	const {
		namespace,
		commonSeparator,
		elementSeparator,
		modifierSeparator,
		statePrefix,
		themes = [],
	} = useGlobalConfig();

	const bemClass = (options?: Pick<BEMOptions, 'element' | 'modifier'>) => {
		return bem({
			namespace,
			block,
			commonSeparator,
			elementSeparator,
			modifierSeparator,
			...options,
		});
	};

	const b = () => bemClass();

	const e = (element: string) => bemClass({ element });

	const m = (modifier?: string) => bemClass({ modifier });

	const em = (element: string, modifier?: string) => bemClass({ element, modifier });

	const t = () => themes.map((theme) => bemClass({ modifier: `theme-${theme}` }));

	const is = (name: string, state: boolean) => (name && state ? `${statePrefix}${commonSeparator}${name}` : '');

	return {
		b,
		e,
		m,
		em,
		t,
		is,
	};
};

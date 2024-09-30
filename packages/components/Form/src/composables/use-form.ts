import type { FormContext } from '../types';

import { inject } from 'vue';
import { FORM_KEY } from '../constants';

export const useForm = () => {
	const formContext = inject(FORM_KEY, undefined);
	const defaultValue: FormContext = {
		model: {},
		rules: undefined,
		validator: () => Promise.resolve({}),
	};
	return formContext || defaultValue;
};

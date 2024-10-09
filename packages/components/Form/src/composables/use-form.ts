import { inject } from 'vue';
import { FORM_KEY } from '../constants';

export const useForm = () => {
	const formContext = inject(FORM_KEY, undefined);
	return formContext;
};

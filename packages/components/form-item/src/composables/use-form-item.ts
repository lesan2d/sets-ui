import { inject } from 'vue';
import { FORM_ITEM_KEY } from '@sets-ui/components/form-item';

export const useFormItem = () => {
	const formItemContext = inject(FORM_ITEM_KEY, undefined);
	return (
		formItemContext || {
			validate: undefined,
		}
	);
};

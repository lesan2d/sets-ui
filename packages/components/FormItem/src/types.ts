import type { FormValidatorErrorInfo } from '@sets-ui/components/Form';

export interface FormItemProps {
	label?: string;
	name?: string;
}

export interface FormItemContext {
	validate: (trigger: string) => Promise<FormValidatorErrorInfo | undefined>;
}

export type FormItemValidateState = '' | 'success' | 'error' | 'validating';

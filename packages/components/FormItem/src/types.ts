import type { ValidateErrorInfo } from '@sets-ui/components/Form';

export interface FormItemProps {
	label?: string;
	name?: string;
}

export interface FormItemContext {
	validate: (trigger: string) => Promise<ValidateErrorInfo>;
}

export type FormItemValidateState = '' | 'success' | 'error' | 'validating';

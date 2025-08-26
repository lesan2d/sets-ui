import type { ValidateErrorInfo } from '@packages/composables/useValidator';

export interface FormItemProps {
	label?: string;
	name?: string;
  labelWidth?: number;
}

export interface FormItemContext extends FormItemProps {
	validate: (trigger: string) => Promise<ValidateErrorInfo>;
	clearValidate(): void;
	resetField(): void;
}

export type FormItemValidateState = '' | 'success' | 'error' | 'validating';

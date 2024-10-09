import type { ToRefs } from 'vue';
import type { ValidateErrorInfo } from '@packages/composables/useValidator';

export interface FormItemProps {
	label?: string;
	name?: string;
}

export interface FormItemContext extends ToRefs<FormItemProps> {
	validate: (trigger: string) => Promise<ValidateErrorInfo>;
	clearValidate(): void;
	resetField(): void;
}

export type FormItemValidateState = '' | 'success' | 'error' | 'validating';

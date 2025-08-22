import type { ToRefs, Ref } from 'vue';
import type { ValidateErrorInfo } from '@packages/composables/useValidator';

export interface FormItemProps {
	label?: string;
	name?: string;
  labelWidth?: number;
}

export interface FormItemContext extends ToRefs<FormItemProps> {
  labelOffsetWidth: Ref<number | 0>;
	validate: (trigger: string) => Promise<ValidateErrorInfo>;
	clearValidate(): void;
	resetField(): void;
}

export type FormItemValidateState = '' | 'success' | 'error' | 'validating';

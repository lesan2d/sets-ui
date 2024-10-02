export interface FormItemProps {
	label?: string;
	name?: string;
}

export interface FormItemContext {
	validate: (trigger: string) => Promise<boolean>;
}

export type FormItemValidateState = '' | 'success' | 'error' | 'validating';

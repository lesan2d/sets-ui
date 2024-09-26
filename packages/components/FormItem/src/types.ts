export interface FormItemProps {
	label?: string;
	name?: string;
}

export interface FormItemContext {
	validate: (trigger: string) => Promise<boolean>;
}

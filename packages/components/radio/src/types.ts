export interface RadioProps {
	value?: string | number | boolean;
}

export interface RadioEmits {
	(e: 'change', value: string | number | boolean): void;
}

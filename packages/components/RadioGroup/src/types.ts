import type { Ref } from 'vue';

export interface RadioGroupEmits {
	(e: 'change', value: string | number | boolean): void;
}

export interface RadioGroupContext {
	modelValue: Ref<string | number | boolean>;
	changeModelValue: (value: string | number | boolean) => void;
}

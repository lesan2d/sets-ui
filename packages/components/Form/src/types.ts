import type { ComputedRef } from 'vue';
import type { Rules } from '@packages/composables/useValidator';
import type { FormItemContext } from '@sets-ui/components/FormItem';

export interface FormModel {
	[key: string]: any;
}

export interface FormRules {
	[key: string]: Rules;
}

export interface FormProps {
	model: FormModel;
	rules?: FormRules;
	labelWidth?: number;
}

export interface FormContext {
	model: FormModel;
	rules?: FormRules;
	addField: (field: FormItemContext) => void;
	labelWidth: ComputedRef<number | undefined>;
}

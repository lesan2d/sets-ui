export interface RuleItem {
	required?: boolean;
	min?: number;
	max?: number;
	message: string;
	trigger: string; // 触发方式(事件)
	validator?: (value: any) => Promise<string | undefined>;
}

export type Rules = Array<RuleItem>;

export interface FormModel {
	[key: string]: any;
}

export interface FormRules {
	[key: string]: Rules;
}

export interface FormProps {
	model: FormModel;
	rules?: FormRules;
}

export type FormValidatorErrorMsg = Array<Error>;

export interface FormValidatorErrorInfo {
	[key: string]: FormValidatorErrorMsg;
}

export type FormValidator = (formModel: FormModel, formRules: FormRules) => Promise<FormValidatorErrorInfo | undefined>;

export interface FormContext {
	model: FormModel;
	rules?: FormRules;
	validator: FormValidator;
}

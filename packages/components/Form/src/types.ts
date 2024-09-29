export interface RuleItem {
	required?: boolean;
	message: string;
	trigger: string; // 触发方式(事件)
	validator?: (value: any) => Promise<string | undefined>;
}

export type Rules = Array<RuleItem>;

export interface FormRules {
	[key: string]: Rules;
}

export interface FormProps {
	model: {
		[key: string]: any;
	};
	rules?: FormRules;
}

export interface FormContext {
	model: {
		[key: string]: any;
	};
	rules: FormRules | undefined;
}

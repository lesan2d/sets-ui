export interface RuleItem {
	require?: boolean;
	message: string;
	trigger: string; // 触发方式(事件)
}

export interface Rules {
	[key: string]: Array<RuleItem> | [];
}

export interface FormProps {
	rules?: Rules;
}

export interface FormContext {
	rules: Rules | undefined;
}

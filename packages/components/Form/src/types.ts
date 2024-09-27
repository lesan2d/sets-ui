export interface RuleItem {
	require?: boolean;
	message: string;
	trigger: string; // 触发方式(事件)
	validator?: (value: any) => void;
}

export interface Rules {
	[key: string]: Array<RuleItem> | [];
}

export interface FormProps {
	model: {
		[key: string]: any;
	};
	rules?: Rules;
}

export interface FormContext {
	model: {
		[key: string]: any;
	};
	rules: Rules | undefined;
}

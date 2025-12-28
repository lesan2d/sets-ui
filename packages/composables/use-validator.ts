export interface RuleItem {
	required?: boolean;
	min?: number;
	max?: number;
	message: string;
	trigger?: string; // 触发方式(事件)
	validator?: (value: any) => Promise<string | undefined>;
}

export type Rules = Array<RuleItem>;

export type ValidateErrorInfoItem = Array<Error>;

export type ValidateErrorInfo = {
	[key: string]: ValidateErrorInfoItem;
} | null;

export type Validator = (
	fieldsValue: {
		[key: string]: any;
	},
	formRules: {
		[key: string]: Rules;
	},
) => Promise<ValidateErrorInfo>;

export function useValidator() {
	const validator: Validator = async (fieldsValue, fieldsRules) => {
		const validateErrorInfo: {
			[key: string]: any;
		} = {};

		for (const fieldName in fieldsRules) {
			const fieldValue = fieldsValue[fieldName];
			const validateFieldErrorInfo = [];
			for (const rule of fieldsRules[fieldName]) {
				const { required, min, max } = rule;

				// 必需
				if (required && !Boolean(fieldValue.value)) {
					validateFieldErrorInfo.push(new Error(rule.message));
				}

				// 最小长度
				if (min && ['string', 'number'].includes(typeof fieldValue.value) && fieldValue.value.length < min) {
					validateFieldErrorInfo.push(new Error(rule.message));
				}

				// 最大长度
				if (max && ['string', 'number'].includes(typeof fieldValue.value) && fieldValue.value.length > max) {
					validateFieldErrorInfo.push(new Error(rule.message));
				}

				// 自定义规则
				if (rule.validator) {
					await rule.validator(fieldValue.value).catch((errMsg) => {
						validateFieldErrorInfo.push(new Error(errMsg));
					});
				}
			}
			if (validateFieldErrorInfo.length) validateErrorInfo[fieldName] = validateFieldErrorInfo;
		}

		// 校验失败
		if (Object.keys(validateErrorInfo).length > 0) return Promise.reject(validateErrorInfo);
		// 校验成功
		return Promise.resolve(null);
	};

	return {
		validator,
	};
}

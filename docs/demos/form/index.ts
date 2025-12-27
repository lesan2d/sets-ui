import { withInstall } from '@nopon-web/utils/vue';
import BasicInstace from './form-basic.vue';
import RulesInstace from './form-rules.vue';
import ValidatorInstace from './form-validator.vue';

const COMPONENT_NAME = 'Form';

export const Basic = withInstall({
	...BasicInstace,
	name: `${COMPONENT_NAME}Basic`,
});

export const Rules = withInstall({
  ...RulesInstace,
	name: `${COMPONENT_NAME}Rules`,
});

export const Validator = withInstall({
  ...ValidatorInstace,
	name: `${COMPONENT_NAME}Validator`,
});

export default [Basic, Rules, Validator];

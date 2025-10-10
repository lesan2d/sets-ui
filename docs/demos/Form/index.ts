import { withInstall } from '@nopon-web/utils/vue';
import BasicInstace from './FormBasic.vue';
import RulesInstace from './FormRules.vue';
import ValidatorInstace from './FormValidator.vue';

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

import type { UnwrapRef } from 'vue';
import type { Rules } from '@packages/composables/useValidator';
import type { FormItemContext } from '@sets-ui/components/FormItem';

import { useFormLabelWidth } from './composables/use-form-label-width';

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

export type FormLabelWidthContext = ReturnType<typeof useFormLabelWidth>

export type FormContext = {
  model: FormModel;
  rules?: FormRules;
  addField: (field: FormItemContext) => void;
  computedLabelWidth: number;
} & UnwrapRef<FormLabelWidthContext>;

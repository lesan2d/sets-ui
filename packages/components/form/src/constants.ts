import type { InjectionKey } from 'vue';
import type { FormContext } from './types';

export const FORM_KEY: InjectionKey<FormContext> = Symbol('formKey');

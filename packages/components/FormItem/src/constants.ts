import type { InjectionKey } from 'vue';
import type { FormItemContext } from './types';

export const FORM_ITEM_KEY: InjectionKey<FormItemContext> = Symbol('formiTEMKey');

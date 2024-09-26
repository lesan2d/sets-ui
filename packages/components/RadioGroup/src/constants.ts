import type { InjectionKey } from 'vue';
import type { RadioGroupContext } from './types';

export const RADIO_GROUP_KEY: InjectionKey<RadioGroupContext> = Symbol('radioGroupKey');

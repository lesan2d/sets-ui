export * from './Button';
export * from './Cell';
export * from './Dialog';
export * from './Form';
export * from './FormItem';
export * from './Grid';
export * from './Input';
export * from './Overlay';
export * from './Popup';
export * from './Radio';
export * from './RadioGroup';

import { SButton } from './Button';
import { SCell } from './Cell';
import { SDialog } from './Dialog';
import { SForm } from './Form';
import { SFormItem } from './FormItem';
import { SGrid } from './Grid';
import { SInput } from './Input';
import { SOverlay } from './Overlay';
import { SPopup } from './Popup';
import { SRadio } from './Radio';
import { SRadioGroup } from './RadioGroup';

import './Icon';

import type { Plugin } from 'vue';

export default [
	SButton,
	SCell,
	SDialog,
	SForm,
	SFormItem,
	SGrid,
	SInput,
	SOverlay,
	SPopup,
	SRadio,
	SRadioGroup,
] as Plugin[];

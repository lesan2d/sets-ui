export * from './Grid';
export * from './Cell';
export * from './Button';
export * from './Input';
export * from './Radio';
export * from './RadioGroup';
export * from './Overlay';
export * from './Popup';
export * from './Dialog';

import { SGrid } from './Grid';
import { SCell } from './Cell';
import { SButton } from './Button';
import { SInput } from './Input';
import { SRadio } from './Radio';
import { SRadioGroup } from './RadioGroup';
import { SOverlay } from './Overlay';
import { SPopup } from './Popup';
import { SDialog } from './Dialog';

import './Icon';

import type { Plugin } from 'vue';

export default [SGrid, SCell, SButton, SInput, SRadio, SRadioGroup, SOverlay, SPopup, SDialog] as Plugin[];

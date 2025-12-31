
import type { DirectionType } from '#/component';

export interface PropsPopup {
  modelValue: boolean;
  overlay?: boolean;
  showClose?: boolean;
  destroyOnClose?: boolean;
  direction?: DirectionType;
  closeOnClickOverlay?: boolean;
}
<script lang="ts" setup>
import Color from 'color';
import { inject, computed } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';
import { useTheme } from '@sets-ui/config';
import { genBEMClass } from '@packages/utils';

defineOptions({
  name: 'Button',
});

interface Props {
  type?: string;
  size?: string;
  color?: string;
  text?: boolean;
  bg?: boolean;
  round?: boolean;
  circle?: boolean;
};

// TODO 应用namespace
// const namespace = inject(CONST_CONFIG.NAMESPACE);

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  text: false,
  bg: true,
  round: false,
  circle: false,
});

const { name: themeName } = useTheme();

const extendsClass = computed(() => genBEMClass('s-button', [props.type, props.size, ...themeName].filter((p) => Boolean(p)) as Array<string>));
const atomicClass = computed(() => ({
  'is-text': props.text,
  'no-bg': !props.bg,
  'is-round': props.round,
  'is-circle': props.circle,
}));

const style = computed(() => {
  let styles: {
    [key: string]: string;
  } = {};

  const buttonColor = props.color;
  if (buttonColor) {
    let color = null;
    try {
      color = Color(props.color);
    } catch (e) {
      return styles;
    }
    Object.assign(styles, {
      '--s-button-theme-color': color.string(),
      '--s-button-theme-color-light': color.fade(0.5).string(),
    });
  }

  return styles;
});
</script>

<template>
  <button class="s-button" :class="[...extendsClass, atomicClass]" :style="style">
    <div class="s-button--content">
      <slot></slot>
    </div>
  </button>
</template>

<style lang="scss">
.s-button {
  // 按钮颜色
  --s-button-theme-color: var(--theme-color); // 原子变量
  --s-button-theme-color-light: var(--theme-color-light); // 原子变量
  --s-button-color-text: var(--color-text);
  --s-button-color-text-hover: var(--s-button-theme-color);
  --s-button-color-bg: var(--base-color-light);
  --s-button-color-bg-hover: var(--s-button-theme-color-light);
  // 按钮尺寸
  --s-button-size: 30px;
  --s-button-font-size: 14px;
  --s-button-padding: 8px 14px;
  --s-button-series-gap: 10px;
  --s-button-round: 20px;
  position: relative;
  padding: var(--s-button-padding);
  border: none;
  line-height: 1;
  font-size: var(--s-button-font-size);
  box-sizing: border-box;
  cursor: pointer;
  color: var(--s-button-color-text);
  overflow: hidden;

  +.s-button {
    margin-left: var(--s-button-series-gap, 10px);
  }

  &--content {
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--s-button-color-bg);
  }

  // 类型
  &--primary {
    --s-button-color-text: var(--color-text-inverse);
    --s-button-color-bg: var(--s-button-theme-color);

    &:active,
    &:focus {
      --s-button-color-text-hover: var(--color-text-inverse);
      --s-button-color-bg-hover: var(--s-button-theme-color)
    }
  }

  // 椭圆
  &.is-round {
    border-radius: var(--s-button-round);
  }

  // 圆型
  &.is-circle {
    width: var(--s-button-size);
    height: var(--s-button-size);
    padding: 0;
    border-radius: 50%;
  }

  // 大小
  &--small {
    --s-button-size: 22px;
    --s-button-font-size: 12px;
    --s-button-padding: 5px 10px;
  }

  &--large {
    --s-button-size: 38px;
    --s-button-font-size: 14px;
    --s-button-padding: 12px 18px;
  }

  // 文本
  &.is-text {
    background-color: transparent;
    --s-button-color-bg: transparent;

    &.s-button--primary {
      --s-button-color-text: var(--s-button-theme-color);
    }
  }

  // 背景
  &.no-bg {
    background-color: transparent;
    --s-button-color-bg: transparent;
    --s-button-color-bg-hover: transparent;
    --s-button-color-text-hover: var(--s-button-theme-color);

    &.s-button--primary {
      --s-button-color-text: var(--s-button-theme-color);
    }
  }
}
</style>

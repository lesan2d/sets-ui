<script lang="ts" setup>
import Color from 'color';
import { computed } from 'vue';
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
};

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  text: false,
  bg: true,
});

const { name: themeName } = useTheme();

const extendsClass = computed(() => genBEMClass('s-button', [props.type, props.size, ...themeName].filter((p) => Boolean(p)) as Array<string>));
const atomicClass = computed(() => ({
  'is-text': props.text,
  'no-bg': !props.bg,
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
  --s-button-color-border: var(--color-border);
  --s-button-color-border-hover: var(--s-button-theme-color);
  --s-button-color-bg: var(---theme-color-light);
  --s-button-color-bg-hover: var(--s-button-theme-color-light);
  // 按钮尺寸
  --s-button-font-size: 14px;
  --s-button-padding: 8px 14px;
  --s-button-series-gap: 10px;
  position: relative;
  padding: var(--s-button-padding);
  line-height: 1;
  font-size: var(--s-button-font-size);
  border: 1px solid;
  box-sizing: border-box;
  cursor: pointer;
  color: var(--s-button-color-text);
  border-color: var(--s-button-color-border);
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

  &--primary {
    --s-button-color-text: var(--color-text-lightest-reverse);
    --s-button-color-border: var(--s-button-theme-color);
    --s-button-color-bg: var(--s-button-theme-color);

    &:active,
    &:focus {
      --s-button-color-text-hover: var(--color-text-lightest-reverse);
      --s-button-color-bg-hover: var(--s-button-theme-color)
    }
  }

  // 大小
  &--small {
    --s-button-font-size: 12px;
    --s-button-padding: 5px 10px;
  }

  &--large {
    --s-button-font-size: 14px;
    --s-button-padding: 12px 18px;
  }

  // 文本
  &.is-text {
    --s-button-color-border: transparent;
    --s-button-color-border-hover: transparent;
    --s-button-color-bg: transparent;

    &.s-button--primary {
      --s-button-color-text: var(--s-button-theme-color);
    }
  }

  // 背景
  &.no-bg {
    --s-button-color-bg: transparent;
    --s-button-color-bg-hover: transparent;
    --s-button-color-text-hover: var(--s-button-theme-color);

    &.s-button--primary {
      --s-button-color-text: var(--s-button-theme-color);
    }
  }
}
</style>

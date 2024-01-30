<script lang="ts" setup>
import Color from 'color';
import { computed } from 'vue';
import { genBEMClass } from '@packages/utils';

defineOptions({
  name: 'SButton',
});

interface Props {
  type?: string,
  size?: string,
  color?: string,
};

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
});

const extendsClass = genBEMClass('s-button', [props.type, props.size].filter((p) => Boolean(p)) as Array<string>);

const style = computed(() => {
  const buttonColor = props.color;
  let styles: {
    [key: string]: string;
  } = {};
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
  <button class="s-button" :class="[extendsClass]" :style="style">
    <div class="s-button--content">
      <slot></slot>
    </div>
  </button>
</template>

<style lang="scss">
.s-button {
  // 按钮尺寸
  --s-button-font-size: 14px;
  --s-button-padding: 8px 14px;
  --s-button-series-gap: 10px;
  // 按钮颜色
  --s-button-theme-color: var(--theme-color);
  --s-button-theme-color-light: var(--theme-color-light);
  --s-button-color-text: var(--color-text);
  --s-button-color-text-hover: var(--s-button-theme-color);
  --s-button-color-border: var(--color-border);
  --s-button-color-border-hover: var(--s-button-theme-color);
  --s-button-color-bg: var(---theme-color-light);
  --s-button-color-bg-hover: var(--s-button-theme-color-light);
  position: relative;
  display: inline-block;
  padding: var(--s-button-padding);
  line-height: 1;
  font-size: var(--s-button-font-size);
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  color: var(--s-button-color-text);
  border-color: var(--s-button-color-border);
  transition: 0.1s;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--s-button-color-bg);
    transition: background-color .25s ease;
  }


  +.s-button {
    margin-left: var(--s-button-series-gap, 10px);
  }

  &:hover,
  &:active,
  &:focus {
    color: var(--s-button-color-text-hover);
    border-color: var(--s-button-color-border-hover);

    &::after {
      background-color: var(--s-button-color-bg-hover);
    }
  }

  &--primary {
    --s-button-color-text: var(--color-text-lightest-reverse);
    --s-button-color-border: var(--s-button-theme-color);
    --s-button-color-bg: var(--s-button-theme-color);

    &:active,
    &:focus {
      color: #fff;

      &::after {
        background-color: var(--s-button-theme-color);
      }
    }

    &:active {
      &::after {
        filter: saturate(0.6);
      }
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
}
</style>

<script lang="ts" setup>
import { genBEMClass } from '@packages/utils';

defineOptions({
  name: 'SButton',
});

interface Props {
  type?: string,
  size?: string,
};

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
});

const extendsClass = genBEMClass('s-button', [props.type, props.size].filter((p) => Boolean(p)) as Array<string>);
</script>

<template>
  <button class="s-button" :class="[extendsClass]">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.s-button {
  --s-button-font-size: 14px;
  --s-button-padding: 8px 14px;
  --s-button-series-gap: 10px;
  display: inline-block;
  padding: var(--s-button-padding);
  line-height: 1;
  font-size: var(--s-button-font-size);
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: var(--color-bg-light);
  border-color: var(--color-border);
  color: var(--color-text);
  transition: 0.1s;

  &:hover {
    background-color: var(--theme-color-light);
    border-color: var(--theme-color);
    color: var(--theme-color);
  }

  &:active {
    background-color: var(--theme-color);
    color: #fff;
  }

  +.s-button {
    margin-left: var(--s-button-series-gap, 10px);
  }

  &--primary {
    background-color: var(--theme-color);
    color: #fff;
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

<script lang="ts" setup>
defineOptions({
  name: 'SButton',
});

interface Props {
  type?: String,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
})
</script>

<template>
  <button class="s-button" :class="[`s-button--${props.type}`]">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.s-button {
  display: inline-block;
  padding: 8px 14px;
  line-height: 1;
  font-size: 14px;
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

  &--primary {
    background-color: var(--theme-color);
    color: #fff;
  }
}
</style>

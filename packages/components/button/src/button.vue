<script lang="ts" setup>
import type { PropsButton } from './types';
import Color from 'color';
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: 'Button',
});

const props = withDefaults(defineProps<PropsButton>(), {
  type: 'default',
  plain: false,
  text: false,
  bg: true,
  round: false,
  circle: false,
});

const ns = useNamespace('button');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  ns.m(props.type),
  ns.m(props.size),
  ns.is('plain', props.plain),
  ns.is('text', props.text),
  ns.is('round', props.round),
  ns.is('circle', props.circle),
  ns.is('no-bg', !props.bg),
]);

const styles = computed(() => {
  const values: Record<string, string> = {};

  const buttonColor = props.color;
  if (buttonColor) {
    let color = null;
    try {
      color = Color(props.color);
      values['--button-color-theme-500'] = color.string();
      values['--button-color-theme-50'] = color.fade(0.5).string();
    } catch {
      console.log('Invalid color:', props.color);
    }
  }

  return values;
});
</script>

<template>
  <button type="button" :class="classes" :style="styles">
    <div :class="ns.e('content')">
      <slot></slot>
    </div>
  </button>
</template>
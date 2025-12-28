<script lang="ts" setup>
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: 'Image',
});

type AspectRatio = number | string | [number, number];

interface Props {
  src?: string,
  aspectRatio?: AspectRatio,
}

const { src = '', aspectRatio = '' } = defineProps<Props>()

const ns = useNamespace('image');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  ns.is('ratio', ratio.value !== undefined),
]);

const styles = computed(() => {
  let values: {
    [key: string]: string;
  } = {};

  if (ratio) {
    Object.assign(values, {
      '--aspect-ratio': ratio.value,
    });
  }

  return values;
});

function parseAspectRatio(r?: AspectRatio): number | undefined {
  if (!r) return;

  if (typeof r === 'number') {
    return r > 0 ? r : undefined;
  }

  if (Array.isArray(r)) {
    const [w, h] = r;
    return w > 0 && h > 0 ? w / h : undefined;
  }

  if (typeof r === 'string') {
    const value = r.includes('/') || r.includes(':')
      ? (() => {
        const [w, h] = r.split(/[/\:]/).map(Number);
        return w > 0 && h > 0 ? w / h : undefined;
      })()
      : Number(r);

    return value && value > 0 ? value : undefined;
  }
}

const ratio = computed(() => parseAspectRatio(aspectRatio));
</script>

<template>
  <div :class="classes" :style="styles">
    <img :src="src">
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/hooks';

defineOptions({
  name: 'Image',
});

interface Props {
  src?: string,
  fit?: string,
}

const { src = '' } = defineProps<Props>()

const ns = useNamespace('image');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
]);
</script>

<template>
  <div :class="classes">
    <div :class="ns.e('content')">
      <img :src="src">
    </div>
  </div>
</template>

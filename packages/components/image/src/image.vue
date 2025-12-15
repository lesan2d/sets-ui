<script lang="ts" setup>
import { inject, computed } from 'vue';
import { CONST_CONFIG } from '@sets-ui/constants';
import { useTheme } from '@sets-ui/config';
import { genBEMClass } from '@nopon-web/utils/css';

defineOptions({
  name: 'Image',
});

const namespace = inject(CONST_CONFIG.NAMESPACE);

console.log(namespace);

const { name: themeName } = useTheme();

const extendsClass = computed(() => genBEMClass('s-image', [...themeName].filter((p) => Boolean(p)) as Array<string>));
</script>

<template>
  <div class="s-image" :class="[...extendsClass]">
  </div>
</template>

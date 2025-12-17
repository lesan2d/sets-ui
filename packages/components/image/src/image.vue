<script lang="ts" setup>
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/hooks';
import { useTheme } from '@sets-ui/config';
import { genBEMClass } from '@nopon-web/utils/css';

defineOptions({
  name: 'Image',
});

const ns = useNamespace('image');
const { name: themeName } = useTheme();

const extendsClass = computed(() => genBEMClass(ns.b(), [...themeName].filter((p) => Boolean(p)) as Array<string>));
</script>

<template>
  <div :class="[ns.b(), ...extendsClass]">
    <img src="https://global.bing.com/th?id=OHR.FrostySquirrel_ZH-CN4613360783_1920x1080.jpg" alt="">
  </div>
</template>

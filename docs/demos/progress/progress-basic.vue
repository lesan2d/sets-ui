<script lang="ts" setup>
const segments = [
  {
    text: '20%',
    value: 20,
  },
  {
    text: '50%',
    value: 50,
  },
  {
    text: '66%',
    value: 66,
  },
  {
    text: '88.8%',
    value: 88.8,
  },
  {
    text: '100%',
    value: 100,
  },
];
</script>

<template>
  <s-progress :percentage="88.8" :segments="segments" />
</template>

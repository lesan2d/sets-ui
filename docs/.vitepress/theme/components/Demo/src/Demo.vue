<script setup>
defineOptions({
  name: 'Demo',
});

const props = defineProps({
  data: () => ({}),
});

console.log(props.data);

</script>

<template>
  <div class="demo">test demo</div>
</template>

<style scoped></style>

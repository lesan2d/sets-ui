<script setup lang="ts">
defineOptions({
  name: 'Demo',
});

const props = withDefaults(defineProps<{
  demoName?: string,
  content?: string,
}>(), {
  demoName: '',
  content: '',
});
</script>

<template>
  <div class="demo">
    <div class="demo-example">
      <component :is="props.demoName"></component>
    </div>
    <div v-if="props.content" class="demo-content">
      <p>{{ props.content }}</p>
    </div>
    <div class="demo-code">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.demo {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;

  &-example {
    padding: 10px 20px 15px;
  }

  p {
    margin: 0;
  }

  div[class*='language-'] {
    margin: 0;
    border-radius: 0;
  }
}
</style>

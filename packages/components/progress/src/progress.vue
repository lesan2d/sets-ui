<script lang="ts" setup>
import type { PropsProgress } from './types';
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';

defineOptions({
  name: 'Progress',
});

const props = withDefaults(defineProps<PropsProgress>(), {
  percentage: 0,
});

const ns = useNamespace('progress');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
]);

const styles = computed(() => {
  const values: Record<string, string> = {};

  if (props.percentage !== undefined) {
    values['--progress-percentage'] = `${props.percentage}%`;
  }

  return values;
});
</script>

<template>
  <div :class="classes" :style="styles">
    <div :class="ns.e('wrapper')">
      <div :class="ns.e('stages')">
        <template v-if="props.stages">
          <div :class="ns.e('stage')" class="is-active" v-for="(it, idx) in props.stages" :key="idx"
            :style="{ '--progress-stage-width': `calc(${it.value}% - ${idx === 0 ? 0 : props.stages[idx - 1].value}%)` }">
            <div :class="ns.em('stage', 'wrapper')">
              <div :class="ns.em('stage', 'point')"></div>
              <div :class="ns.em('stage', 'content')">
                <span class="s-text">{{ it.text }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div :class="ns.e('bar')">
        <div :class="ns.em('bar', 'outer')">
          <div :class="ns.em('bar', 'inner')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropsProgress } from './types';
import { computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';
import { useProgress } from './composables/use-progress';

defineOptions({
  name: 'Progress',
});

const props = withDefaults(defineProps<PropsProgress>(), {
  percentage: 0,
  direction: 'ltr',
});

const ns = useNamespace('progress');

const { segmentsDisplay, isSegmentActive } = useProgress({ props });

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  ns.is(props.direction, true)
]);

const styles = computed(() => {
  const values: Record<string, string> = {};

  if (props.percentage !== undefined) {
    values['--progress-value'] = `${props.percentage}%`;
  }

  return values;
});
</script>

<template>
  <div :class="classes" :style="styles">
    <div :class="ns.e('wrapper')">
      <div :class="ns.e('segments')">
        <template v-if="segmentsDisplay.length">
          <div :class="[ns.e('segment'), ns.is('active', isSegmentActive(it))]" v-for="(it, idx) in segmentsDisplay" :key="idx"
            :style="{ '--progress-segment-width': `${it.width}%` }">
            <div :class="ns.em('segment', 'wrapper')">
              <div :class="ns.em('segment', 'point')"></div>
              <div :class="ns.em('segment', 'content')">
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

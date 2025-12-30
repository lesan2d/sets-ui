<script lang="ts" setup>
import type { PropsInput } from './types';
import { ref, computed } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';
import { useFormItem } from '@sets-ui/components/form-item/src/composables/use-form-item';

defineOptions({
  name: 'Input',
});

const props = withDefaults(defineProps<PropsInput>(), {
  placeholder: '',
  clearable: false,
});

const emit = defineEmits(['focus', 'blur']);

const ns = useNamespace('input');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  ns.is('focus', focused.value),
]);

const { validate } = useFormItem();

const model = defineModel<string | number>({ required: true });
const focused = ref(false);

function handleFocus(e: FocusEvent) {
  focused.value = true;
  validate?.('focus');
  emit('focus', e);
};
function handleBlur(e: FocusEvent) {
  focused.value = false;
  validate?.('blur');
  emit('blur', e);
};
function handleClearable() {
  model.value = '';
}
</script>

<template>
  <div :class="classes">
    <div :class="ns.e('wrapper')">
      <input :class="ns.e('inner')" v-model="model" :placeholder="props.placeholder" @focus="handleFocus"
        @blur="handleBlur" />
      <div v-if="props.clearable" :class="ns.e('clearable')">
        <!-- todo -->
        <i v-show="model" class="s-icon s-icon--close circle" @click.stop="handleClearable"></i>
      </div>
    </div>
  </div>
</template>
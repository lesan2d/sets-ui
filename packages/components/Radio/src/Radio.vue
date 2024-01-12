<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue';
import { CONST_COMPONENT } from '@packages/constants';

defineOptions({
  name: 'SRadio',
});

interface SRadioProps {
  value: string | number | boolean
}
const props = defineProps<SRadioProps>();

const model = defineModel<string | number | boolean>({ default: '' });

const picked = computed(() => {
  return model.value === props.value;
});

const radioGroup = inject(CONST_COMPONENT.RADIO_GROUP_KEY, () => ({
  modelValue: ref<string | number | boolean>(''),
  changeModel: (value: string | number | boolean) => value,
}), true);

function handleChange() {
  radioGroup.changeModel(model.value);
}

watch(() => radioGroup.modelValue, (val) => {
  console.log('radioGroupModel', val.value);
  model.value = val.value;
}, {
  deep: true
});
</script>

<template>
  <label class="s-radio">
    <input type="radio" class="s-radio--input" v-model="model" :value="props.value" :class="{ 's-radio--picked': picked }"
      @change="handleChange" />
    <div class="s-radio--case"></div>
    <div class="s-radio--label">
      <slot></slot>
    </div>
  </label>
</template>

<style lang="scss">
.s-radio {
  --s-radio-size: 16px;
  cursor: pointer;

  &--input {

    &:checked {
      &+.s-radio--case {
        background-color: red;
      }
    }
  }

  &--case {
    width: var(--s-radio-size);
    height: var(--s-radio-size);
  }
}
</style>

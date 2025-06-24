<script lang="ts" setup>
import { ref, computed } from 'vue';
import { genBEMClass } from '@packages/utils';
import { useTheme } from '@sets-ui/config';
import { useFormItem } from '@sets-ui/components/FormItem';

defineOptions({
  name: 'Input',
});

interface Props {
  placeholder?: string;
  clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  clearable: false,
});

const emit = defineEmits(['focus', 'blur']);

const { name: themeName } = useTheme();
const { validate } = useFormItem();

const extendsClass = genBEMClass('s-input', [...themeName].filter((p) => Boolean(p)) as Array<string>);
const atomicClass = computed(() => ({
  'is-focus': focused.value,
}));

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
  <div class="s-input" :class="[extendsClass, atomicClass]">
    <div class="s-input--wrapper">
      <input v-model="model" :placeholder="props.placeholder" class="s-input--inner" @focus="handleFocus"
        @blur="handleBlur" />
      <div v-if="props.clearable" class="s-input--clearable">
        <i v-show="model" class="s-icon s-icon--close circle" @click.stop="handleClearable"></i>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.s-input {
  --s-input-border-radius: 4px;
  --s-input-size-base: var(--text-sm);
  --s-input-size-D: 0px;
  --s-input-padding: 1px 10px;
  --s-input-color-border: var(--color-border-500);
  position: relative;
  display: inline-flex;
  width: 100%;
  font-size: 0;
  line-height: 1;


  &--wrapper {
    display: inline-flex;
    flex-grow: 1;
    border-width: 1px;
    border-style: solid;
    border-color: var(--s-input-color-border);
    border-radius: var(--s-input-border-radius);
    padding: var(--s-input-padding);
    background-color: var(--color-base-250);
    overflow: hidden;

    &:hover {
      .s-input--clearable {
        opacity: 1;
      }
    }
  }

  &--inner {
    flex-grow: 1;
    min-width: 0;
    padding: 0;
    border: none;
    outline: none;
    font-size: var(--s-input-size-base);
    line-height: calc(var(--s-input-size-base) * 2);
    background-color: transparent;
    color: inherit;
  }

  &--clearable {
    opacity: 0;
    display: inline-flex;
    align-items: center;
    height: calc(var(--s-input-size-base) * 2);
    padding-left: 2px;
    color: var(--color-border-500);
    background-color: var(--color-base-250);
    transition: opacity 0.2s ease-in-out;

    >i {
      cursor: pointer;
    }
  }
}
</style>

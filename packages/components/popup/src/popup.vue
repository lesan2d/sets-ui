<script lang="ts" setup>
import type { PropsPopup } from './types';
import { ref, computed, watch, useTemplateRef, } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';
import { useAnimate } from '@sets-ui/composables/use-animate';
import { SOverlay } from '@sets-ui/components/overlay';
import { SButton } from '@sets-ui/components/button';
import { SIcon } from '@sets-ui/components/icon';

// 弹窗状态
type PopupStatus = 'closed' | 'opening' | 'opened' | 'closing';

defineOptions({
  name: 'Popup',
  inheritAttrs: false, // 禁用 Attributes 继承
});

const props = withDefaults(defineProps<PropsPopup>(), {
  modelValue: false,
  overlay: true,
  destroyOnClose: false,
  showClose: false,
  direction: '',
  closeOnClickOverlay: true,
});

const emit = defineEmits(['update:modelValue', 'close', 'closed']);

const ns = useNamespace('popup');
const wrapper = useTemplateRef('wrapper');
const animate = useAnimate(wrapper);

const status = ref<PopupStatus>(props.modelValue ? 'opened' : 'closed');

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  ns.is(status.value, true),
  props.direction && ns.is(props.direction, true),
]);

// popup 是否显示
const isVisible = computed(() => status.value !== 'closed');

// popup 是否渲染
const isMounted = computed(() => {
  if (props.destroyOnClose) {
    return isVisible.value;
  }
  return true;
});

// 遮罩层显示
const visibleOverlay = computed({
  get() {
    return isVisible.value;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

// v-model 同步
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

watch(visible, (val) => {
  if (val) open();
  else close();
});

// 打开
const open = () => {
  if (status.value === 'opened' || status.value === 'opening') return;

  animate.clear();
  status.value = 'opening';
};

// 关闭
const close = () => {
  if (status.value === 'closed' || status.value === 'closing') return;

  emit('close');
  status.value = 'closing';
  animate.reverse();
};

// 动画结束（唯一收敛点）
const onAnimationEnd = () => {
  if (status.value === 'opening') {
    status.value = 'opened';
  } else if (status.value === 'closing') {
    animate.clear();
    status.value = 'closed';
    emit('closed');
  }
};

const onClose = () => {
  visible.value = false;
};
</script>

<template>
  <SOverlay v-if="props.overlay" v-model="visibleOverlay" :destroy-on-close="props.destroyOnClose"
    :close-on-click-overlay="props.closeOnClickOverlay" />
  <div v-if="isMounted" v-show="isVisible" :class="classes" v-bind="$attrs">
    <div ref="wrapper" :class="ns.e('wrapper')" @animationend.self="onAnimationEnd">
      <SButton v-if="props.showClose" :class="ns.e('close')" text circle @click="onClose">
        <SIcon name="close"></SIcon>
      </SButton>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropsPopup } from './types';
import { ref, computed, watch, } from 'vue';
import { useNamespace } from '@sets-ui/composables/use-namespace';
import { useAnimationReverse } from '@sets-ui/composables/use-animation-reverse';
import { SOverlay } from '@sets-ui/components/overlay';
import { SButton } from '@sets-ui/components/button';
import { SIcon } from '@sets-ui/components/icon';

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

const classes = computed(() => [
  ns.b(),
  ...ns.t(),
  props.direction,
  {
    opened: opened.value,
    closed: closed.value,
  }
]);

const shouldVisible = ref(props.modelValue); // 不确定的弹窗状态(判断动画过渡后才能确定显示状态)
const opened = ref(false); // 弹窗打开中
const closed = ref(false); // 弹窗关闭中
let animationPlaying = ref(false); // 过渡动画播放中
let timer: NodeJS.Timeout | number = 0;

const { style: animationReverseStyle } = useAnimationReverse(closed);

const animationStyles = computed(() => {
  const value = {
    ...animationReverseStyle.value,
  };
  return value;
})

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const overlayVisible = computed({
  get() {
    return shouldVisible.value;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

watch(visible, (val) => {
  changeShouldVisible(val);
});

const clearTimer = () => {
  clearInterval(timer);
  timer = 0;
};

// 异步控制弹窗显示
const changeShouldVisible = (val: boolean) => {
  if (timer) clearTimer();

  opened.value = val;
  closed.value = !val;
  if (!val) emit('close'); // 弹窗关闭回调

  timer = setInterval(() => {
    if (animationPlaying.value) return; // 动画播放中时继续轮询
    opened.value = false; // 重置开启中状态
    closed.value = false; // 重置关闭中状态
    shouldVisible.value = val; // 更新弹窗显示
    if (timer) clearTimer();
    if (!val) emit('closed'); // 关闭动画结束回调
  }, 100);
};

const handleClose = () => {
  visible.value = false;
};

const handleAnimationstart = () => {
  animationPlaying.value = true;
};

const handleAnimationend = () => {
  animationPlaying.value = false;
}
</script>

<template>
  <SOverlay v-if="props.overlay" v-model="overlayVisible" :destroy-on-close="props.destroyOnClose"
    :close-on-click-overlay="props.closeOnClickOverlay" />
  <div v-if="props.destroyOnClose ? shouldVisible : true" v-show="shouldVisible" :class="classes" v-bind="$attrs">
    <div :class="ns.e('wrapper')" :style="animationStyles" @animationstart.self="handleAnimationstart"
      @animationend.self="handleAnimationend">
      <SButton v-if="props.showClose" :class="ns.e('close')" text circle @click="handleClose">
        <SIcon name="close"></SIcon>
      </SButton>
      <slot></slot>
    </div>
  </div>
</template>

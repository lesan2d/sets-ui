<script lang="ts" setup>
import type { DirectionType } from '#/component';
import { ref, computed, watch, nextTick } from 'vue';
import { genBEMClass } from '@packages/utils';
import { useAnimationReset, useAnimationReverse } from '@packages/composables';
import { useTheme } from '@sets-ui/config';
import { SOverlay } from '@sets-ui/components/Overlay';
import { SButton } from '@sets-ui/components/Button';

const { name: themeName } = useTheme();

defineOptions({
  name: 'Popup',
  inheritAttrs: false, // 禁用 Attributes 继承
});

interface Props {
  modelValue: boolean;
  overlay?: boolean;
  showClose?: boolean;
  destroyOnClose?: boolean;
  direction?: DirectionType;
  closeOnClickOverlay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  overlay: true,
  destroyOnClose: false,
  showClose: false,
  direction: '',
  closeOnClickOverlay: true,
});

const emit = defineEmits(['update:modelValue', 'close', 'closed']);

const extendsClass = genBEMClass('s-popup', [...themeName].filter((p) => Boolean(p)) as Array<string>);

const shouldVisible = ref(props.modelValue); // 不确定的弹窗状态(判断动画过渡后才能确定显示状态)
const closed = ref(false); // 弹窗关闭中
const animationPlaying = ref(false); // 过渡动画播放中
const timer = ref<number>();

const { style: animationReverseStyle } = useAnimationReverse(closed);

const animationStyle = computed(() => {
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
  clearInterval(timer.value);
  timer.value = 0;
};

// 异步控制弹窗显示
const changeShouldVisible = (val: boolean) => {
  if (timer.value) clearTimer();

  closed.value = !val;
  if (!val) emit('close'); // 弹窗关闭回调

  timer.value = setInterval(() => {
    if (animationPlaying.value) return; // 动画播放中时继续轮询
    closed.value = false; // 重置关闭中状态
    shouldVisible.value = val; // 更新弹窗显示
    if (timer.value) clearTimer();
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
  <s-overlay v-if="props.overlay" v-model="overlayVisible" :destroy-on-close="props.destroyOnClose"
    :close-on-click-overlay="props.closeOnClickOverlay" />
  <div v-if="props.destroyOnClose ? shouldVisible : true" v-show="shouldVisible" class="s-popup"
    :class="[extendsClass, props.direction]" v-bind="$attrs">
    <div class="s-popup--wrapper" :style="animationStyle" @animationstart.self="handleAnimationstart"
      @animationend.self="handleAnimationend">
      <SButton v-if="props.showClose" text circle class="btn-close" @click="handleClose">
        <i class="s-icon s-icon--close"></i>
      </SButton>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.s-popup {
  --s-popup-padding: 20px;
  --s-popup-z-index: 1;
  position: fixed;
  z-index: calc(var(--z-index-top) + var(--s-popup-z-index));
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &--wrapper {
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
    padding: var(--s-popup-padding);
    background-color: var(--base-color-lighter);

    .btn-close {
      position: absolute;
      top: 4px;
      right: 4px;
      z-index: 1;
    }
  }

  &.ttb {
    width: 100%;
    top: 0;
    transform: translate(-50%, 0%);
  }

  &.rtl {
    height: 100%;
    top: 0;
    left: auto;
    right: 0;
    transform: translate(0%, 0%);
  }

  &.btt {
    width: 100%;
    top: auto;
    bottom: 0;
    transform: translate(-50%, 0%);
  }

  &.ltr {
    height: 100%;
    top: 0;
    left: 0;
    right: auto;
    transform: translate(0%, 0%);
  }

}
</style>

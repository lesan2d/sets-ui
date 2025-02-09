<script lang="ts" setup>
import type { DirectionType } from '#/component';
import { ref, computed, watch, } from 'vue';
import { genBEMClass } from '@packages/utils';
import { useAnimationReverse } from '@packages/composables';
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
const opened = ref(false); // 弹窗打开中
const closed = ref(false); // 弹窗关闭中
let animationPlaying = ref(false); // 过渡动画播放中
let timer: NodeJS.Timeout | number = 0;

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

const handleClickOverlay = () => {
  if (props.closeOnClickOverlay) overlayVisible.value = false;
}

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
  <s-overlay v-if="props.overlay" v-model="overlayVisible" :destroy-on-close="props.destroyOnClose" />
  <div v-if="props.destroyOnClose ? shouldVisible : true" v-show="shouldVisible" class="s-popup" :class="[extendsClass, props.direction, {
    'opened': opened,
    'closed': closed,
  }]" v-bind="$attrs" @click="handleClickOverlay">
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &--wrapper {
    display: inline-grid;
    grid-template-rows: auto 1fr auto;
    padding: var(--s-popup-padding);
    background-color: var(--base-color-lighter);

    .btn-close {
      position: absolute;
      top: 4px;
      right: 4px;
      z-index: 1;
    }
  }

  // 默认居中
  &:not(.ttb, .rtl, .btt, .ltr) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.ttb {
    .s-popup--wrapper {
      width: 100%;
    }
  }

  &.rtl {
    display: flex;
    justify-content: flex-end;

    .s-popup--wrapper {
      height: 100%;
    }
  }

  &.btt {
    display: flex;
    align-items: flex-end;

    .s-popup--wrapper {
      width: 100%;
    }
  }

  &.ltr {
    .s-popup--wrapper {
      height: 100%;
    }
  }
}
</style>

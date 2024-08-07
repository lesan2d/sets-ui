<script lang="ts" setup>
import type { DirectionType } from '#/component';
import { computed } from 'vue';
import { genBEMClass } from '@packages/utils';
import { SOverlay } from '@sets-ui/components/Overlay';
import { useTheme } from '@sets-ui/config';

defineOptions({
	name: 'Popup',
	inheritAttrs: false, // 禁用 Attributes 继承
});

interface Props {
	modelValue: boolean;
	overlay?: boolean;
	direction?: DirectionType;
	destroyOnClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	overlay: true,
	direction: '',
	destroyOnClose: false,
});

const { name: themeName } = useTheme();

const emit = defineEmits(['update:modelValue']);

const extendsClass = genBEMClass('s-popup', [...themeName].filter((p) => Boolean(p)) as Array<string>);

const visible = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});
</script>

<template>
	<s-overlay v-if="props.overlay" v-model="visible" :destroy-on-close="props.destroyOnClose" />
	<template v-if="props.destroyOnClose">
		<div v-if="visible" class="s-popup" :class="[extendsClass, props.direction]" v-bind="$attrs">
			<slot></slot>
		</div>
	</template>
	<div v-else v-show="visible" class="s-popup" :class="[extendsClass, props.direction]" v-bind="$attrs">
		<slot></slot>
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
	display: grid;
	padding: var(--s-popup-padding);
	transform: translate(-50%, -50%);
	background-color: var(--color-bg-lightest);

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

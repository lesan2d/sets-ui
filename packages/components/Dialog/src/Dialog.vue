<script lang="ts" setup>
import { computed } from 'vue';
import { SPopup } from '@sets-ui/components/Popup';
import { SButton } from '@sets-ui/components/Button';

defineOptions({
	name: 'Dialog',
});

interface Props {
	modelValue: boolean;
	title?: string;
	showClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	showClose: false,
});
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm']);

const visible = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	},
});

function handleCancel() {
	visible.value = false;
	emit('cancel');
}

function handleConfirm() {
	visible.value = false;
	emit('confirm');
}
</script>

<template>
	<s-popup v-model="visible" class="s-dialog">
		<div class="s-dialog--header">
			<h4>{{ title }}</h4>
			<s-button v-if="props.showClose" text :bg="false" class="btn-close" @click="handleCancel">
				<i class="s-icon s-icon--close"></i>
			</s-button>
		</div>
		<div class="s-dialog--body">
			<slot></slot>
		</div>
		<div class="s-dialog--footer">
			<s-button size="small" @click="handleCancel">取消</s-button>
			<s-button type="primary" size="small" @click="handleConfirm">确定</s-button>
		</div>
	</s-popup>
</template>

<style lang="scss">
.s-dialog {
	--s-popup-padding: 0;
	--s-dialog-width: 30%;
	--s-dialog-padding-header: 8px;
	--s-dialog-padding-body: 15px;
	--s-dialog-padding-footer: 8px;
	--s-dialog-border-width: 1px;
	--s-dialog-border-style: solid;
	--s-dialog-border-color: var(--color-border);
	width: var(--s-dialog-width, 50%);
	display: grid;
	grid-template-rows: auto 1fr auto;

	&--header {
		padding: var(--s-dialog-padding-header);
		border-bottom: var(--s-dialog-border-width) var(--s-dialog-border-style) var(--s-dialog-border-color);

		h4 {
			font-weight: 500;
		}
		.btn-close {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 1;
		}
	}

	&--body {
		padding: var(--s-dialog-padding-body);
		overflow: hidden;
	}

	&--footer {
		padding: var(--s-dialog-padding-footer);
		border-top: var(--s-dialog-border-width) var(--s-dialog-border-style) var(--s-dialog-border-color);
		text-align: right;
	}
}
</style>

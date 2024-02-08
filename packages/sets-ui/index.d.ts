declare const installer: (app: import('vue').App<any>) => void;

declare module 'vue' {
	export interface GlobalComponents {
		SGrid: typeof import('@packages/components/Grid');
		SCell: typeof import('@packages/components/Cell');
		SButton: typeof import('@packages/components/Button');
		SRadio: typeof import('@packages/components/Radio');
		SRadioGroup: typeof import('@packages/components/RadioGroup');
		SOverlay: typeof import('@packages/components/Overlay');
		SPopup: typeof import('@packages/components/Popup');
		SDialog: typeof import('@packages/components/Dialog');
	}
}

export {};

export default installer;

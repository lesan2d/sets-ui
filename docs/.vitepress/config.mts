import fs from 'fs';
import { defineConfig } from 'vitepress';
import mdItContainer from 'markdown-it-container';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'sets-ui',
	description: 'sets-ui docs',
	srcDir: './',
	base: '/sets-ui/',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '首页', link: '/' },
			{ text: '指南', link: '/guide/quickstart' },
			{ text: '组件', link: '/component/button' },
		],

		sidebar: {
			'/guide': [
				{
					text: '基础',
					items: [
						{ text: '简介', link: '/guide/introduction' },
						{ text: '快速开始', link: '/guide/quickstart' },
					],
				},
				{
					text: '配置',
					items: [
						{ text: '全局配置', link: '/guide/config' },
						{ text: '样式配置', link: '/guide/config-style' },
					],
				},
			],
			'/component/': [
				{
					text: '基础',
					items: [
						{ text: 'Grid 布局网格', link: '/component/grid' },
						{ text: 'Button 按钮', link: '/component/button' },
						{ text: 'Input 输入框', link: '/component/input' },
						{ text: 'Radio 单选框', link: '/component/radio' },
					],
				},
				{
					text: '反馈',
					items: [
						{ text: 'Overlay 遮罩层', link: '/component/overlay' },
						{ text: 'Popup 弹出层', link: '/component/popup' },
						{ text: 'Dialog 对话框', link: '/component/dialog' },
					],
				},
			],
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
	},
	markdown: {
		container: {
			tipLabel: '提示',
			warningLabel: '警告',
			dangerLabel: '危险',
			infoLabel: '信息',
			detailsLabel: '详细信息',
		},
		config: (md) => {
			md.use(mdItContainer, 'demo', {
				validate(params) {
					return !!params.trim().match(/^demo\s*(.*)$/);
				},

				render(tokens, idx) {
					const containerToken = tokens[idx];

					if (containerToken.nesting === 1 /* is an opening tag */) {
						// const m = containerToken.info.trim().match(/^demo\s*(.*)$/);
						// // 标题描述
						// const description = md.utils.escapeHtml(m[1]);
						const sourceFileToken = tokens[idx + 1];

						// const sourceFile = sourceFileToken.children?.[0].content ?? '';
						// let source = '';
						const sourceSrc = sourceFileToken.src && sourceFileToken.src.length > 0 ? sourceFileToken.src[0] : '';
						// if (!sourceSrc) throw new Error(`Incorrect source file: ${sourceFile}`);
						// source = fs.readFileSync(sourceSrc, 'utf-8');
            console.log(sourceSrc);

						let vueComponentName = 'ButtonBasic';
						// 文件类型为.vue
						// if (/\.vue/.test(sourceSrc)) {
							// // 自动读取文件内 defineOptions 定义的组件名
							// const startIndex = source.indexOf('defineOptions');
							// const endIndex = source.indexOf('});');
							// // vue define options
							// const vueDefineOptions = source.substring(startIndex, endIndex);
							// const m1 = vueDefineOptions.match(/name:\s*[\'\"]([a-zA-Z]+)[\'\"]/);
							// // define options name value
							// const vueDefineOptionsName = m1 ? m1[1] : '';
							// vueComponentName = vueDefineOptionsName;

							// 读取文件名作为组件名
							// if (!vueComponentName) {
								// const m2 = sourceSrc.match(/\\([a-zA-Z]+).vue/);
								// const vueDefineOptionsName = m2 ? m2[1] : '';
								// vueComponentName = vueDefineOptionsName;
							// }

							// vue文件无组件名报错
							// if (!vueComponentName) throw new Error(`Incorrect source name: ${sourceSrc}`);
						// }

						return `<Demo demo-name='${vueComponentName}'>`;
					} else {
						return `</Demo>\n`;
					}
				},
			});
		},
	},
});

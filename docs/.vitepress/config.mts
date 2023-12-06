import { defineConfig } from 'vitepress';
import mdItContainer from 'markdown-it-container';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'sets-ui',
	description: 'sets-ui docs',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' },
			{ text: '组件', link: '/component/grid' },
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' },
				],
			},
		],

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
					const data = {
						tokens,
						idx,
					};

          console.log(data);
          

					return `<Demo />`;
				},
			});
		},
	},
});

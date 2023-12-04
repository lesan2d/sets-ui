import path from 'path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';

export default defineConfig({
	plugins: [
		vue(),
		checker({
			typescript: true,
		}),
	],
	build: {
		outDir: 'dist',
		lib: {
			entry: path.resolve(__dirname, './packages/segment-ui/index.ts'), // 库编译入口文件
			name: 'segment-ui',
			fileName: 'index',
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@packages': fileURLToPath(new URL('./packages', import.meta.url)),
		},
	},
});

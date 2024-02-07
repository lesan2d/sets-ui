import path from 'path';
// import type { Plugin } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

// function buildPlugin(): Plugin {
// 	return {
// 		name: 'sets-ui-build',
// 		buildStart() {
// 			this.emitFile({
// 				type: 'chunk',
// 				id: path.resolve(__dirname, './packages/sets-ui/public/theme.ts'),
// 				fileName: `theme`,
// 			});
// 		},
// 		resolveId(source, importer, options) {
// 			console.log('source', source);
// 			console.log('importer', importer);
// 			console.log('options', options);
// 		},
// 		renderChunk(code, chunk) {
// 			console.log('chunk----------', chunk);
// 			if (chunk.name === 'theme') {
// 				console.log('code----------', code, '----------');
// 			}
// 		},
// 	};
// }

export default defineConfig((data) => {
	console.log(data);
	return {
		envDir: './',
		// publicDir: './packages/sets-ui/public',
		plugins: [
			// buildPlugin(),
			vue(),
			checker({
				typescript: true,
			}),
			dts(),
		],
		build: {
			outDir: 'sets-ui/dist',
			sourcemap: true,
			lib: {
				// 库编译入口文件
				entry: path.resolve(__dirname, './packages/sets-ui/index.ts'),
				name: 'sets-ui',
				fileName: 'index',
				// formats: ['es'],
			},
			rollupOptions: {
				external: ['vue'],
				output: {
					globals: {
						vue: 'Vue',
					},
					// inlineDynamicImports: false,
					// manualChunks(id: any) {
					// 	console.log('manualChunks', id);
					// 	if (id.includes('index.scss')) {
					// 		// 需要单独分割那些资源 就写判断逻辑就行
					// 		return 'style';
					// 	}
					// 	if (id.includes('default.module.scss')) {
					// 		console.log('has default.module.scss ------------------------------------------------------------');
					// 		// 需要单独分割那些资源 就写判断逻辑就行
					// 		return 'theme';
					// 	}
					// 	if (id.includes('node_modules')) {
					// 		return id.toString().split('node_modules/')[1].split('/')[0].toString();
					// 	}
					// },
				},
			},
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'@packages': fileURLToPath(new URL('./packages', import.meta.url)),
			},
		},
	};
});

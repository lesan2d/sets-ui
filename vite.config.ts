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

export default defineConfig({
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
		outDir: 'dist/src',
		sourcemap: true,
		lib: {
			// 库编译入口文件
			entry: path.resolve(__dirname, './packages/sets-ui/index.ts'),
			name: 'sets-ui',
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
				inlineDynamicImports: false,
				manualChunks(id: string) {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
					if (id.includes('.vue')) {
						const regex = /\/([^/]+)\.vue$/;
						const match = id.match(regex);
						if (match) return `components/${match[1]}/index`;
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			'@packages': fileURLToPath(new URL('./packages', import.meta.url)),
		},
	},
});

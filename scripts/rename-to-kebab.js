import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * 配置项（你只需要改这里）
 */
const ROOT_DIR = 'packages/components';
const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git']);

/**
 * FooBar / fooBar / foo_bar → foo-bar
 */
function toKebab(name) {
	return name
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/_/g, '-')
		.toLowerCase();
}

/**
 * 深度优先遍历（先子级）
 */
function walk(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	// 先处理子级
	for (const entry of entries) {
		if (IGNORE_DIRS.has(entry.name)) continue;

		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			walk(fullPath);
		}
	}

	// 再处理当前层
	for (const entry of entries) {
		if (IGNORE_DIRS.has(entry.name)) continue;

		const oldPath = path.join(dir, entry.name);
		const kebabName = toKebab(entry.name);

		if (entry.name === kebabName) continue;

		const tmpPath = path.join(dir, `_${kebabName}_tmp`);
		const newPath = path.join(dir, kebabName);

		console.log(`rename: ${oldPath} → ${newPath}`);

		execSync(`git mv "${oldPath}" "${tmpPath}"`);
		execSync(`git mv "${tmpPath}" "${newPath}"`);
	}
}

// 执行
walk(ROOT_DIR);

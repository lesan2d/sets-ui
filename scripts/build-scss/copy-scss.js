import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__filename', __filename);
console.log('__dirname', __dirname);


const SRC = path.resolve(__dirname, '../../packages/styles/src');
const DEST = path.resolve(__dirname, '../../dist/styles');

async function run() {
	if (!(await fs.pathExists(SRC))) {
		throw new Error(`SCSS source not found: ${SRC}`);
	}

	await fs.remove(DEST);
	await fs.copy(SRC, DEST);

	console.log('✅ SCSS copied:', DEST);
}

run().catch(console.error);

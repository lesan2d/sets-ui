// 按照BEM规范生成Class
export function genBEMClass(prefix: string, suffix: Array<string>): Array<string> | [] {
	return suffix.map((s) => `${prefix}--${s}`);
}

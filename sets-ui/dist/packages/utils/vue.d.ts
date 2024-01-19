import type { Plugin } from 'vue';
export type SFCWithInstall<T> = T & Plugin;
export declare function withInstall<T>(plugin: T): T;

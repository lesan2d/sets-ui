export interface PropsProgressSegment {
  value: number;
  text: string;
  [key: string]: any;
}

export interface PropsProgress {
  percentage?: number;
  segments?: Array<PropsProgressSegment>,
  direction?: string,
};
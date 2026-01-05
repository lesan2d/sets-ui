export interface PropsProgress {
  percentage?: number;
  stages?: Array<{
    value: number;
    text: string;
  }>,
};
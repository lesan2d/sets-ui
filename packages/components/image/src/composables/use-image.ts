import type { PropsImage, AspectRatio } from '../types';
import { computed } from 'vue';

interface UseImageOptions {
  props: PropsImage;
}

const parseAspectRatio = (r?: AspectRatio): number | undefined => {
  if (!r) return;

  if (typeof r === 'number') {
    return r > 0 ? r : undefined;
  }

  if (Array.isArray(r)) {
    const [w, h] = r;
    return w > 0 && h > 0 ? w / h : undefined;
  }

  if (typeof r === 'string') {
    if (r.includes('/') || r.includes(':')) {
      const [w, h] = r.split(/[/\:]/).map(Number);
      return w > 0 && h > 0 ? w / h : undefined;
    }

    const n = Number(r);
    return n > 0 ? n : undefined;
  }
}

export const useImage = (options: UseImageOptions) => {
  const { props } = options;

  const ratio = computed(() => parseAspectRatio(props.aspectRatio));

  return {
    ratio,
  };
};

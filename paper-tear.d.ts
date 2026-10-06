export interface PaperTearOptions {
  image?: string;
  color?: string;
  background?: string;
  edgeOpacity?: number;
  start?: number;
  end?: number;
  maxDpr?: number;
  mode?: 'scroll' | 'manual';
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
}
export interface PaperTearInstance {
  destroy(): void;
  refresh(): void;
  getProgress(): number;
  setProgress(progress: number): void;
  useScroll(): void;
}
export function createPaperTear(container: HTMLElement, options?: PaperTearOptions): Promise<PaperTearInstance>;

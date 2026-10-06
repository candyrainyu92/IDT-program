import React, { useEffect, useRef, useState } from 'react';
import { createPaperTear, type PaperTearOptions, type PaperTearInstance } from './paper-tear.js';

export interface PaperTearProps extends PaperTearOptions {
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}

export const PaperTear: React.FC<PaperTearProps> = ({
  image,
  color = '#1D2440',
  background = '#2B2B2B',
  edgeOpacity = 0.9,
  start = 1,
  end = 0.12,
  maxDpr = 2,
  mode = 'scroll',
  height = '100vh',
  className = '',
  style,
  fallback,
  onProgress,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const errorHandler = useRef(onError);
  errorHandler.current = onError;
  const onProgressHandler = useRef(onProgress);
  onProgressHandler.current = onProgress;

  useEffect(() => {
    let cancelled = false;
    let instance: PaperTearInstance | undefined;

    if (!containerRef.current) return;

    setHasError(false);

    const options: PaperTearOptions = {
      color,
      background,
      edgeOpacity,
      start,
      end,
      maxDpr,
      mode,
      onProgress: (p) => onProgressHandler.current?.(p),
      onError: (err) => {
        setHasError(true);
        errorHandler.current?.(err);
      },
    };
    if (image) {
      options.image = image;
    }

    createPaperTear(containerRef.current, options)
      .then((val) => {
        if (cancelled) {
          val.destroy();
        } else {
          instance = val;
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setHasError(true);
          errorHandler.current?.(err);
        }
      });

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [image, color, background, edgeOpacity, start, end, maxDpr, mode]);

  if (hasError && fallback) {
    return <div className={`relative w-full ${className}`} style={{ height, ...style }}>{fallback}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height, ...style }}
    />
  );
};

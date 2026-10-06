import { useEffect, useRef } from 'react';
import { createPaperTear } from './paper-tear.js';

/** Put torn.jpg beside paper-tear.js, or pass a public image URL. */
export function PaperTear({ image, color = '#1D2440', background = '#2b2b2b',
  edgeOpacity = 0.9, start = 1, end = 0.12, height = '100vh', onError }) {
  const ref = useRef(null);
  const errorHandler = useRef(onError);
  errorHandler.current = onError;
  useEffect(() => {
    let cancelled = false;
    let instance;
    const options = { color, background, edgeOpacity, start, end,
      onError: error => errorHandler.current?.(error) };
    if (image) options.image = image;
    createPaperTear(ref.current, options).then(value => {
      if (cancelled) value.destroy();
      else instance = value;
    }).catch(error => { if (!cancelled) errorHandler.current?.(error); });
    return () => { cancelled = true; instance?.destroy(); };
  }, [image, color, background, edgeOpacity, start, end]);
  return <div ref={ref} style={{ width: '100%', height }} />;
}

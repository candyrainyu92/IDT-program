import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const PdfPageCanvas: React.FC<{
  pdf: any;
  pageNumber: number;
  containerWidth: number;
}> = ({ pdf, pageNumber, containerWidth }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(pageNumber <= 4);
  const [renderedWidth, setRenderedWidth] = useState<number>(0);

  useEffect(() => {
    if (isVisible) return;
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !pdf || !canvasRef.current || containerWidth <= 0) return;
    if (renderedWidth === containerWidth) return;

    let isCancelled = false;
    let renderTask: any = null;

    const renderPage = async () => {
      try {
        const page = await pdf.getPage(pageNumber);
        if (isCancelled || !canvasRef.current) return;

        const unscaledViewport = page.getViewport({ scale: 1 });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const fitScale = containerWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale: fitScale * dpr });

        const canvas = canvasRef.current;
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(viewport.width / dpr)}px`;
        canvas.style.height = `${Math.floor(viewport.height / dpr)}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        renderTask = page.render({
          canvasContext: ctx,
          canvas,
          viewport,
        });
        await renderTask.promise;
        if (!isCancelled) {
          setRenderedWidth(containerWidth);
        }
      } catch {
        // Ignore cancelled render tasks
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTask && typeof renderTask.cancel === 'function') {
        try {
          renderTask.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [isVisible, pdf, pageNumber, containerWidth, renderedWidth]);

  const aspectHeight = Math.round(containerWidth * (792 / 612));

  return (
    <div
      ref={wrapperRef}
      style={{ width: `${containerWidth}px`, minHeight: `${aspectHeight}px` }}
      className="bg-white shadow-[0_8px_28px_rgba(0,0,0,0.35)] rounded-sm flex items-center justify-center shrink-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block max-w-full" />
    </div>
  );
};

export const OriginalPresentationSlidesViewer: React.FC<{ url?: string }> = ({
  url = '/ETEC-6920-Project-Overview.pdf',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(820);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const w = Math.max(280, Math.min(containerRef.current.clientWidth - 36, 880));
        setContainerWidth(w);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setErrorMsg(null);

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url });
        const pdf = await loadingTask.promise;
        if (isCancelled) return;
        setPdfDoc(pdf);
        setPageCount(pdf.numPages);
        setIsLoading(false);
      } catch {
        if (isCancelled) return;
        setErrorMsg('Unable to load PDF document.');
        setIsLoading(false);
      }
    };

    loadPdf();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-y-auto bg-[#525659] py-6 px-3 sm:px-6 flex flex-col items-center gap-5"
    >
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 text-[#F7F3EB] gap-3">
          <div className="w-8 h-8 border-3 border-[#DC9BB5] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium tracking-wide">Loading Project Overview PDF...</span>
        </div>
      )}
      {errorMsg && (
        <div className="text-sm text-red-200 bg-red-900/40 px-4 py-3 rounded-lg">
          {errorMsg}
        </div>
      )}
      {!isLoading &&
        pdfDoc &&
        Array.from({ length: pageCount }, (_, idx) => (
          <PdfPageCanvas
            key={idx + 1}
            pdf={pdfDoc}
            pageNumber={idx + 1}
            containerWidth={containerWidth}
          />
        ))}
    </div>
  );
};

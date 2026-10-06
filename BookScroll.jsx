"use client";
import React, { useEffect, useRef } from 'react';

/** React / Next.js wrapper. Custom element is loaded only in the browser. */
export default function BookScroll({ 
  openWidth = 75, 
  background = '#2B2B2B', 
  coverSrc, 
  title = 'My Project',
  author = 'Yu Liu',
  textColor = '#691B1F',
  isOpen,
  onOpen,
  onClose,
  className, 
  style 
}) {
  const host = useRef(null);
  useEffect(() => { import('./book-scroll.js'); }, []);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    element.setAttribute('open-width', String(openWidth));
    element.setAttribute('background', background);
    element.setAttribute('title', title);
    element.setAttribute('author', author);
    element.setAttribute('text-color', textColor);
    if (coverSrc) element.setAttribute('cover-src', coverSrc);
    else element.removeAttribute('cover-src');
    if (isOpen !== undefined) element.setAttribute('is-open', String(isOpen));
  }, [openWidth, background, coverSrc, title, author, textColor, isOpen]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const handleOpen = () => onOpen?.();
    const handleClose = () => onClose?.();
    element.addEventListener('book-open', handleOpen);
    element.addEventListener('book-close', handleClose);
    return () => {
      element.removeEventListener('book-open', handleOpen);
      element.removeEventListener('book-close', handleClose);
    };
  }, [onOpen, onClose]);

  return React.createElement('book-scroll', { ref: host, class: className, style });
}

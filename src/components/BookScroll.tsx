import React, { useEffect, useRef } from 'react';
import './book-scroll.js';

export interface BookScrollProps {
  openWidth?: number;
  background?: string;
  scrollHeight?: number;
  coverSrc?: string;
  showLabels?: boolean;
  title?: string;
  leafTitle?: string;
  author?: string;
  textColor?: string;
  paragraph1?: string;
  paragraph2?: string;
  isOpen?: boolean;
  mode?: 'projects' | 'letter' | 'research';
  onToggle?: (isOpen: boolean) => void;
  onGalleryClick?: (project?: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const BookScroll: React.FC<BookScrollProps> = ({
  openWidth = 75,
  background = '#2B2B2B',
  scrollHeight = 360,
  coverSrc,
  showLabels = true,
  title = 'My Project',
  leafTitle = 'Project Gallery',
  author = 'Yu Liu',
  textColor = '#691B1F',
  paragraph1,
  paragraph2,
  isOpen,
  mode,
  onToggle,
  onGalleryClick,
  className = '',
  style,
}) => {
  const host = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    element.setAttribute('open-width', String(openWidth));
    element.setAttribute('background', background);
    element.setAttribute('scroll-height', String(scrollHeight));
    element.setAttribute('show-labels', String(showLabels));
    element.setAttribute('title', title);
    if (leafTitle) {
      element.setAttribute('leaf-title', leafTitle);
    }
    element.setAttribute('author', author);
    element.setAttribute('text-color', textColor);
    if (mode) {
      element.setAttribute('mode', mode);
    } else {
      element.removeAttribute('mode');
    }
    if (paragraph1) {
      element.setAttribute('paragraph1', paragraph1);
    } else {
      element.removeAttribute('paragraph1');
    }
    if (paragraph2) {
      element.setAttribute('paragraph2', paragraph2);
    } else {
      element.removeAttribute('paragraph2');
    }
    if (typeof isOpen === 'boolean') {
      element.setAttribute('is-open', String(isOpen));
    }
    if (coverSrc) {
      element.setAttribute('cover-src', coverSrc);
    } else {
      element.removeAttribute('cover-src');
    }
  }, [openWidth, background, scrollHeight, coverSrc, showLabels, title, leafTitle, author, textColor, paragraph1, paragraph2, isOpen, mode]);

  useEffect(() => {
    const element = host.current;
    if (!element || !onToggle) return;
    const handleToggle = (e: Event) => {
      const customEvt = e as CustomEvent<{ isOpen: boolean }>;
      onToggle(customEvt.detail?.isOpen ?? false);
    };
    element.addEventListener('booktoggle', handleToggle);
    return () => {
      element.removeEventListener('booktoggle', handleToggle);
    };
  }, [onToggle]);

  useEffect(() => {
    const element = host.current;
    if (!element || !onGalleryClick) return;
    const handleGallery = (e: Event) => {
      const customEvt = e as CustomEvent<{ project?: string }>;
      onGalleryClick(customEvt.detail?.project);
    };
    element.addEventListener('galleryclick', handleGallery);
    return () => {
      element.removeEventListener('galleryclick', handleGallery);
    };
  }, [onGalleryClick]);

  return React.createElement('book-scroll', { 
    ref: host, 
    class: className, 
    style 
  });
};

export default BookScroll;

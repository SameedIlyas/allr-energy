'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { Testimonial } from '@/content/quotes';
import styles from './Testimonials.module.css';

const AUTOPLAY_MS = 6000;
const SWIPE_PX = 50;

interface TestimonialsProps {
  items: readonly Testimonial[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const dragStart = useRef<number | null>(null);
  const count = items.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const autoplay = playing && !hovered && !focused && !tabHidden;
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, index, go]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > SWIPE_PX) go(index + (delta < 0 ? 1 : -1));
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Voices on industrial strategy"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false)}
      onKeyDown={onKeyDown}
    >
      <div className={styles.buttons}>
        <button type="button" className={styles.iconBtn} onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause autoplay' : 'Start autoplay'}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button type="button" className={styles.iconBtn} onClick={() => go(index - 1)} aria-label="Previous slide">
          <ChevronLeft size={18} />
        </button>
        <button type="button" className={styles.iconBtn} onClick={() => go(index + 1)} aria-label="Next slide">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className={styles.viewport} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }} aria-live={autoplay ? 'off' : 'polite'}>
          {items.map((item, i) => (
            <figure
              key={`slide-${i}`}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <div className={styles.side}>
                <div className={styles.photos}>
                  {item.images.map((img) => (
                    <div key={img.src} className={styles.photoItem}>
                      <div className={`${styles.photo} ${item.name ? '' : styles.photoWhole}`}>
                        <Image src={img.src} alt={img.alt} width={img.width} height={img.height} quality={90} draggable={false} />
                      </div>
                      {img.caption && <span className={styles.photoCaption}>{img.caption}</span>}
                    </div>
                  ))}
                </div>
                {item.note && <figcaption className={styles.caption}>{item.note}</figcaption>}
              </div>
              <div className={styles.body}>
                {item.quotes && <Quote className={styles.mark} size={36} aria-hidden="true" />}
                {item.name && (
                  <p className={styles.speaker}>
                    <strong>{item.name}</strong>
                    {item.role && <span>{item.role}</span>}
                  </p>
                )}
                {item.quotes && (
                  <blockquote className={styles.quote}>
                    {item.quotes.map((q) => (
                      <p key={q}>“{q}”</p>
                    ))}
                  </blockquote>
                )}
                {item.statements?.map((st) => (
                  <p key={st} className={styles.statement}>
                    {st}
                  </p>
                ))}
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {items.map((item, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            aria-label={`Show slide ${i + 1}${item.name ? `: ${item.name}` : ''}`}
            aria-current={i === index}
            onClick={() => go(i)}
          >
            {i === index && autoplay && <span key={index} className={styles.progress} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

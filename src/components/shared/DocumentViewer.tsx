"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Download, Maximize2, Minus, Plus, X } from "lucide-react";

const ZOOMS = [1, 1.5, 2, 3, 4];

type Props = {
  src: string;
  pdf?: string | null;
  title: string;
  open: boolean;
  onClose: () => void;
};

/**
 * Полноэкранный просмотр документа: увеличение кнопками, двойным кликом/тапом,
 * Ctrl + колесо, клавишами +/−; перетаскивание мышью, на телефоне — обычная прокрутка.
 */
export function DocumentViewer({ src, pdf, title, open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoomIdx, setZoomIdx] = useState(0);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [box, setBox] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const prevZoom = useRef(1);
  const drag = useRef<{ x: number; y: number; sl: number; st: number } | null>(null);

  const zoom = ZOOMS[zoomIdx];

  // Открытие/закрытие нативного <dialog>: фокус-ловушка и Esc из коробки
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.body.style.overflow = "";
  }, [open]);

  const close = useCallback(() => {
    setZoomIdx(0);
    prevZoom.current = 1;
    onClose();
  }, [onClose]);

  // Размер области просмотра
  useEffect(() => {
    if (!open) return;
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  const fit = natural && box.w && box.h ? Math.min(box.w / natural.w, box.h / natural.h, 1.6) : 0;
  const width = natural ? Math.round(natural.w * fit * zoom) : undefined;
  const height = natural ? Math.round(natural.h * fit * zoom) : undefined;

  // Сохраняем центр при изменении масштаба
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ratio = zoom / prevZoom.current;
    if (ratio !== 1) {
      const cx = el.scrollLeft + el.clientWidth / 2;
      const cy = el.scrollTop + el.clientHeight / 2;
      el.scrollLeft = cx * ratio - el.clientWidth / 2;
      el.scrollTop = cy * ratio - el.clientHeight / 2;
    }
    prevZoom.current = zoom;
  }, [zoom]);

  const zoomIn = useCallback(() => setZoomIdx((i) => Math.min(i + 1, ZOOMS.length - 1)), []);
  const zoomOut = useCallback(() => setZoomIdx((i) => Math.max(i - 1, 0)), []);
  const reset = useCallback(() => setZoomIdx(0), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-" || e.key === "_") zoomOut();
      if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, zoomIn, zoomOut, reset]);

  const btn =
    "grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 disabled:opacity-40";

  return (
    <dialog
      ref={dialogRef}
      className="doc-dialog on-dark"
      aria-label={title}
      onClose={close}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] sm:px-6 sm:pt-4">
          <p className="min-w-0 truncate text-[14px] font-semibold text-white sm:text-[15px]">{title}</p>
          <div className="flex shrink-0 items-center gap-2">
            {pdf && (
              <a href={pdf} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Открыть PDF">
                <Download aria-hidden="true" className="size-5" />
              </a>
            )}
            <button type="button" onClick={close} className={btn} aria-label="Закрыть просмотр" autoFocus>
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative min-h-0 flex-1 overflow-auto overscroll-contain"
          style={{ cursor: zoom > 1 ? "grab" : "zoom-in", touchAction: "pan-x pan-y" }}
          onDoubleClick={() => (zoom > 1 ? reset() : setZoomIdx(2))}
          onWheel={(e) => {
            if (!e.ctrlKey) return;
            e.preventDefault();
            if (e.deltaY < 0) zoomIn();
            else zoomOut();
          }}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || zoom === 1) return;
            const el = viewportRef.current!;
            drag.current = { x: e.clientX, y: e.clientY, sl: el.scrollLeft, st: el.scrollTop };
            el.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            const el = viewportRef.current!;
            el.scrollLeft = drag.current.sl - (e.clientX - drag.current.x);
            el.scrollTop = drag.current.st - (e.clientY - drag.current.y);
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
        >
          <div
            className="grid min-h-full min-w-full place-items-center p-2 sm:p-4"
            style={width && height ? { width: Math.max(width + 32, box.w), height: Math.max(height + 32, box.h) } : undefined}
          >
            {open && (
              // Оригинал в полном разрешении — нужен для чёткого увеличения
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={title}
                draggable={false}
                onLoad={(e) => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
                className="select-none rounded-md bg-white shadow-2xl"
                style={width && height ? { width, height, maxWidth: "none" } : { maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3">
          <button type="button" className={btn} onClick={zoomOut} disabled={zoomIdx === 0} aria-label="Уменьшить">
            <Minus aria-hidden="true" className="size-5" />
          </button>
          <span className="min-w-16 text-center text-[14px] font-semibold tabular-nums text-white" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button type="button" className={btn} onClick={zoomIn} disabled={zoomIdx === ZOOMS.length - 1} aria-label="Увеличить">
            <Plus aria-hidden="true" className="size-5" />
          </button>
          <button type="button" className={btn} onClick={reset} disabled={zoomIdx === 0} aria-label="По размеру экрана">
            <Maximize2 aria-hidden="true" className="size-[18px]" />
          </button>
        </div>
      </div>
    </dialog>
  );
}

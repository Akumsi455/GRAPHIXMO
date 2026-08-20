"use client";

import { useEffect, useRef, useState } from "react";

export default function EditorPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="editor-preview-scene relative mx-auto mt-16 max-w-4xl">
      <div
        className={`editor-preview-glow absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-2xl ${
          visible ? "editor-preview-glow-visible" : ""
        }`}
        aria-hidden="true"
      />

      <div
        className={`editor-preview relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-primary/10 ${
          visible ? "editor-preview-visible" : ""
        }`}
      >
        <div className="flex items-center gap-2 border-b border-border bg-slate-50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="ml-2 text-xs text-muted">GraphixMo Editor</span>
        </div>

        <div className="grid gap-0 md:grid-cols-[200px_1fr]">
          <aside className="hidden border-r border-border bg-slate-50 p-4 md:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Elements
            </p>
            <div className="space-y-2">
              {["Text", "Shapes", "Images", "Icons"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-white px-3 py-2 text-sm text-foreground shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>

          <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-br from-violet-50 via-white to-pink-50 p-8 sm:min-h-[360px]">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <div className="mb-2 h-4 w-3/4 rounded bg-slate-200" />
              <div className="mb-4 h-3 w-1/2 rounded bg-slate-100" />
              <div className="h-8 w-24 rounded-full bg-primary/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

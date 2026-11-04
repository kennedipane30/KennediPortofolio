import { useEffect, useState } from "react";

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const dur = 1700;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setHide(true), 250);
        setTimeout(() => onDone?.(), 850);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`bg-scene fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f3f6fb] transition-opacity duration-500 ${
        hide ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-start font-extrabold text-slate-900">
        <span className="text-7xl tabular-nums sm:text-8xl">{pct}</span>
        <span className="text-gradient mt-3 text-3xl">%</span>
      </div>
      <div className="mt-5 h-[3px] w-48 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-xs tracking-wide text-slate-500">Loading something cool…</p>
    </div>
  );
}

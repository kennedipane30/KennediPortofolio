import { useEffect, useState } from "react";

const LINE_1 = "Welcome to";
const LINE_2 = "My Portfolio";
const FULL = LINE_1 + LINE_2;
const SPEED = 75; // kecepatan mengetik (ms per huruf)
const HOLD = 600; // jeda setelah selesai mengetik
const EXIT = 1300; // durasi transisi ke halaman Home

export default function Loader({ onLeave, onDone }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (count < FULL.length) {
      const t = setTimeout(() => setCount((c) => c + 1), SPEED);
      return () => clearTimeout(t);
    }
    // selesai mengetik -> tahan sebentar -> transisi gradasi -> hilang
    const t1 = setTimeout(() => {
      setExit(true);
      onLeave?.();
    }, HOLD);
    const t2 = setTimeout(() => onDone?.(), HOLD + EXIT);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [count, onLeave, onDone]);

  const text1 = FULL.slice(0, Math.min(count, LINE_1.length));
  const text2 = count > LINE_1.length ? FULL.slice(LINE_1.length, count) : "";
  const onLine2 = count > LINE_1.length;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f3f6fb] px-5 transition-opacity ease-[cubic-bezier(0.4,0,0.2,1)] ${
        exit ? "pointer-events-none opacity-0 delay-200 duration-[1100ms]" : "opacity-100 duration-300"
      }`}
    >
      {/* latar dasar */}
      <div className="bg-scene absolute inset-0" />

      {/* lapisan gradasi yang muncul saat transisi */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#e2eaf5] via-[#c8d6ec] to-[#829cc1] transition-opacity duration-700 ease-out ${
          exit ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute -inset-[20%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.85),transparent_60%)] transition-all duration-[1200ms] ease-out ${
          exit ? "scale-150 opacity-0" : "scale-50 opacity-100"
        }`}
      />

      <h1
        className={`relative text-center text-5xl leading-[1.1] font-extrabold tracking-tight transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] sm:text-7xl ${
          exit ? "-translate-y-4 scale-105 opacity-0 blur-sm" : "translate-y-0 scale-100 opacity-100 blur-0"
        }`}
      >
        <span className="text-gradient">{text1}</span>
        {!onLine2 && <span className="caret" />}
        <br />
        <span className="text-slate-900">{text2}</span>
        {onLine2 && <span className="caret" />}
      </h1>
    </div>
  );
}
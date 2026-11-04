import { useEffect, useState } from "react";

const LINE_1 = "Welcome to";
const LINE_2 = "My Portfolio";
const FULL = LINE_1 + LINE_2;
const SPEED = 75; // kecepatan mengetik (ms per huruf)

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (count < FULL.length) {
      const t = setTimeout(() => setCount((c) => c + 1), SPEED);
      return () => clearTimeout(t);
    }
    // selesai mengetik -> tahan sebentar -> hilang
    const t1 = setTimeout(() => setHide(true), 700);
    const t2 = setTimeout(() => onDone?.(), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [count, onDone]);

  const text1 = FULL.slice(0, Math.min(count, LINE_1.length));
  const text2 = count > LINE_1.length ? FULL.slice(LINE_1.length, count) : "";
  const onLine2 = count > LINE_1.length;

  return (
    <div
      className={`bg-scene fixed inset-0 z-[100] flex items-center justify-center bg-[#f3f6fb] px-5 transition-opacity duration-500 ${
        hide ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="text-center text-5xl leading-[1.1] font-extrabold tracking-tight sm:text-7xl">
        <span className="text-gradient">{text1}</span>
        {!onLine2 && <span className="caret" />}
        <br />
        <span className="text-slate-900">{text2}</span>
        {onLine2 && <span className="caret" />}
      </h1>
    </div>
  );
}
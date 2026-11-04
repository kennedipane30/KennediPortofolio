import { useEffect, useState } from "react";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import Lanyard from "./Lanyard";
import { profile } from "../data/portfolio";

function Typing({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!del && text === word) t = setTimeout(() => setDel(true), 1600);
    else if (del && text === "") {
      setDel(false);
      setI((n) => n + 1);
    } else {
      t = setTimeout(() => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), del ? 40 : 85);
    }
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span>
      {text}
      <span className="caret" />
    </span>
  );
}

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// Buka tab "Projects" di bagian Portfolio, lalu scroll ke sana
const viewProjects = () => {
  window.dispatchEvent(new CustomEvent("portfolio:tab", { detail: "projects" }));
  scrollTo("portfolio");
};

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col pt-28 pb-12 lg:flex-row lg:items-center lg:pt-20">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <div className="fade-up max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open to internships & collaboration
          </span>
          <h1 className="mt-5 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Welcome to</span>
            <br />
            <span className="text-slate-900">My Portfolio</span>
          </h1>
          <p className="mt-4 h-7 text-lg font-bold text-blue-600 sm:text-xl">
            <Typing words={profile.typing} />
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">{profile.heroDesc}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={viewProjects}
              className="group inline-flex items-center gap-2 rounded-xl border border-white bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            >
              View Projects <FiArrowRight className="transition group-hover:translate-x-0.5" />
            </button>
            <a
              href={profile.cvUrl}
              download="CV_Kennedi_Pane.pdf"
              className="group inline-flex items-center gap-2 rounded-xl border border-white bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
            >
              Download CV <FiDownload />
            </a>
          </div>
        </div>

      </div>

      {/* Lanyard: di HP tampil di bawah teks, di laptop menggantung dari atas sisi kanan */}
      <Lanyard className="mt-10 h-[640px] w-full lg:absolute lg:inset-y-0 lg:right-[4%] lg:mt-0 lg:h-auto lg:w-[42%] xl:right-[8%] xl:w-[38%]" />
    </section>
  );
}
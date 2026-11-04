import { FiArrowRight, FiDownload } from "react-icons/fi";
import Lanyard from "./Lanyard";
import { profile } from "../data/portfolio";

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
          <h1 className="mt-5 text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Welcome to</span>
            <br />
            <span className="text-slate-900">My Portfolio</span>
          </h1>
          <p className="mt-4 text-lg font-bold text-blue-600 sm:text-xl">{profile.role}</p>
          <p className="mt-1 text-sm font-semibold tracking-wide text-slate-500">{profile.stackLine}</p>
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
      <Lanyard className="mt-10 h-[680px] w-full lg:absolute lg:inset-y-0 lg:right-[4%] lg:mt-0 lg:h-auto lg:w-[42%] xl:right-[8%] xl:w-[38%]" />
    </section>
  );
}
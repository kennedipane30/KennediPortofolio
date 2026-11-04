import { useEffect, useState } from "react";
import { FiCode, FiAward, FiStar, FiLayers, FiArrowRight, FiX, FiExternalLink, FiCalendar } from "react-icons/fi";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";
import { SectionTitle } from "./About";
import { ProjectThumb, CertThumb } from "./Placeholders";
import { projects, certificates, achievements, techStack } from "../data/portfolio";

const TABS = [
  { id: "projects", label: "Projects", icon: FiCode },
  { id: "certificates", label: "Certificates", icon: FiAward },
  { id: "achievements", label: "Achievements", icon: FiStar },
  { id: "tech", label: "Tech Stack", icon: FiLayers },
];

function ProjectCard({ p, i }) {
  return (
    <div className="fade-up group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5" style={{ animationDelay: `${i * 70}ms` }}>
      <div className="aspect-[16/10] overflow-hidden border-b border-slate-100">
        <div className="h-full w-full transition duration-500 group-hover:scale-105">
          <ProjectThumb project={p} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{p.short}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tech.slice(0, 4).map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">
              <TechIcon name={t} size={11} /> {t}
            </span>
          ))}
        </div>
        <a
          href={`#/project/${p.slug}`}
          className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-blue-600"
        >
          Details <FiArrowRight />
        </a>
      </div>
    </div>
  );
}

function CertCard({ item, i, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="fade-up group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/5"
      style={{ animationDelay: `${i * 70}ms` }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <div className="h-full w-full transition duration-500 group-hover:scale-105">
          <CertThumb item={item} />
        </div>
      </div>
      <div className="p-4">
        <div className="line-clamp-1 font-bold text-slate-900">{item.title}</div>
        <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
          <span>{item.issuer}</span>
          <span className="inline-flex items-center gap-1">
            <FiCalendar size={11} /> {item.date}
          </span>
        </div>
      </div>
    </button>
  );
}

function Modal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="fade-up w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-[4/3] max-h-[70vh] w-full bg-slate-50">
          <CertThumb item={item} contain />
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <div className="font-bold text-slate-900">{item.title}</div>
            <div className="text-sm text-slate-500">
              {item.issuer} · {item.date}
            </div>
          </div>
          <div className="flex gap-2">
            {item.url && item.url !== "#" && item.url !== "" && (
              <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                Verify <FiExternalLink />
              </a>
            )}
            <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200">
              <FiX />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [tab, setTab] = useState("projects");
  const [open, setOpen] = useState(null);

  // Tombol "View Projects" (di Home & About) mengirim event ini
  // supaya tab langsung pindah ke Projects
  useEffect(() => {
    const onOpenTab = (e) => setTab(e.detail || "projects");
    window.addEventListener("portfolio:tab", onOpenTab);
    return () => window.removeEventListener("portfolio:tab", onOpenTab);
  }, []);

  return (
    <section id="portfolio" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle sub="A collection of my projects, certificates, achievements, and the technologies I use.">Portfolio</SectionTitle>

        <Reveal className="mb-10 flex justify-center">
          <div className="flex flex-wrap justify-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition sm:px-4 ${
                  tab === t.id ? "bg-blue-600 text-white shadow-md shadow-blue-600/25" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={tab} className="min-h-[300px]">
          {tab === "projects" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <ProjectCard key={p.slug} p={p} i={i} />
              ))}
            </div>
          )}

          {tab === "certificates" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((c, i) => (
                <CertCard key={c.title} item={c} i={i} onOpen={setOpen} />
              ))}
            </div>
          )}

          {tab === "achievements" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((c, i) => (
                <CertCard key={c.title} item={c} i={i} onOpen={setOpen} />
              ))}
            </div>
          )}

          {tab === "tech" && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {techStack.map((t, i) => (
                <div
                  key={t}
                  className="fade-up group flex h-28 flex-col items-center justify-center gap-2.5 rounded-2xl border border-[#5b7ab0] bg-white p-3 text-center transition hover:-translate-y-1 hover:border-[#3b527c] hover:shadow-lg hover:shadow-blue-900/10"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="transition group-hover:scale-110">
                    <TechIcon name={t} size={30} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {open && <Modal item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
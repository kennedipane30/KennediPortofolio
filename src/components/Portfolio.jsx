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

// Card project lebar: kiri = info, kanan = gambar + highlight
function ProjectCard({ p, i }) {
  const tags = p.tags?.length ? p.tags : [p.role];
  const stack = p.stack?.length ? p.stack : [{ label: "Tech", items: p.tech }];
  const hl = p.highlight || { label: p.year, title: p.title, text: p.short };

  return (
    <div
      className="fade-up group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 lg:grid-cols-2"
      style={{ animationDelay: `${i * 80}ms` }}
    >
      {/* KIRI */}
      <div className="flex flex-col justify-center bg-[#fbfaf8] p-7 sm:p-10">
        <h3 className="text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl">{p.title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{p.short}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-slate-700 uppercase">
              {t}
            </span>
          ))}
        </div>

        <dl className="mt-6 space-y-1.5 text-sm">
          {stack.map((row) => (
            <div key={row.label} className="flex flex-wrap gap-x-2">
              <dt className="font-semibold text-slate-900">{row.label}:</dt>
              <dd className="text-slate-600">{row.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>

        <a
          href={`#/project/${p.slug}`}
          className="mt-7 inline-flex w-fit items-center gap-1.5 rounded-xl border border-white bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
        >
          View Details <FiArrowRight className="transition group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* KANAN */}
      <div className="relative min-h-[320px] overflow-hidden bg-[#2c3e5f]">
        <div className="absolute inset-0 transition duration-700 group-hover:scale-105">
          {p.image ? (
            <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover object-right" />
          ) : (
            <ProjectThumb project={p} />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f2d47]/95 via-[#2c3e5f]/75 to-[#2c3e5f]/10" />
        <div className="relative flex h-full max-w-sm flex-col justify-center p-7 text-white sm:p-10">
          {hl.label && <div className="text-xs font-bold tracking-[0.3em] text-[#c8d6ec] uppercase">{hl.label}</div>}
          <div className="mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">{hl.title}</div>
          <p className="mt-4 text-[15px] leading-relaxed text-white/85">{hl.text}</p>
        </div>
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
          <div className="glass flex flex-wrap justify-center gap-1 rounded-2xl border border-slate-200 p-1.5 shadow-sm">
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
            <div className="grid gap-6">
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
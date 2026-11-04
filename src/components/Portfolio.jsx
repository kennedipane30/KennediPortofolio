import { useEffect, useState } from "react";
import { FiCode, FiAward, FiStar, FiLayers, FiArrowRight, FiX, FiExternalLink, FiCalendar, FiGithub, FiServer, FiSmartphone, FiDatabase, FiBarChart2, FiTool } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";
import { SectionTitle } from "./About";
import { ProjectThumb, CertThumb } from "./Placeholders";
import { projects, certificates, achievements, techStack, socials, mainStack } from "../data/portfolio";

const TABS = [
  { id: "projects", label: "Projects", icon: FiCode },
  { id: "certificates", label: "Certificates", icon: FiAward },
  { id: "achievements", label: "Achievements", icon: FiStar },
  { id: "tech", label: "Tech Stack", icon: FiLayers },
];

// Judul & keterangan tiap tab
const TAB_INTRO = {
  projects: {
    title: "My Most Recent Work",
    desc: "A look at the latest projects I have built, from system design and backend services to web and mobile apps.",
  },
  certificates: {
    title: "Verified Skills & Credentials",
    desc: "Certifications that prove what I can do, from databases to artificial intelligence. Click any certificate to see it up close.",
  },
  achievements: {
    title: "Milestones I'm Proud Of",
    desc: "Recognition from leadership programs and research work that shaped how I learn, lead, and build.",
  },
  tech: {
    title: "The Tools Behind My Work",
    desc: "The technologies I use to design, build, and ship real products, grouped by what they help me do best.",
  },
};

const CATEGORY_ICON = {
  backend: FiServer,
  web: FiSmartphone,
  database: FiDatabase,
  data: FiBarChart2,
  tools: FiTool,
};

// Ukuran card kategori (bento grid, 6 kolom di layar besar)
const BENTO_SPAN = ["lg:col-span-2", "lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

// Cari project yang memakai teknologi tertentu (untuk tooltip "Used in")
const usedIn = (tech) => projects.filter((p) => p.tech?.includes(tech)).map((p) => p.highlight?.title || p.title);

function TechItem({ name }) {
  const isMain = mainStack?.includes(name);
  const used = usedIn(name);
  return (
    <div className="group/item relative flex w-[80px] flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-blue-900/10">
      {isMain && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-white shadow" title="Main Stack">
          <FaStar size={8} />
        </span>
      )}
      <div className="opacity-60 grayscale transition duration-300 group-hover/item:scale-110 group-hover/item:opacity-100 group-hover/item:grayscale-0">
        <TechIcon name={name} size={30} />
      </div>
      <span className="text-[11px] leading-tight font-semibold text-slate-600 transition group-hover/item:text-slate-900">{name}</span>

      {used.length > 0 && (
        <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[200px] -translate-x-1/2 translate-y-1 rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover/item:translate-y-0 group-hover/item:opacity-100">
          Used in: {used.join(", ")}
        </span>
      )}
    </div>
  );
}

function TabIntro({ tab }) {
  const intro = TAB_INTRO[tab];
  if (!intro) return null;
  return (
    <div className="fade-up mb-8 text-center">
      <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{intro.title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">{intro.desc}</p>
    </div>
  );
}

const GITHUB_URL = socials.find((s) => s.icon === "github")?.url || "https://github.com/";

// Urutan project paling atas (berdasarkan slug di data/portfolio.js)
const PINNED = ["posyandu-care", "spekta-academy"];

const orderedProjects = [...projects].sort((a, b) => {
  const ia = PINNED.indexOf(a.slug);
  const ib = PINNED.indexOf(b.slug);
  return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
});

// Card project lebar: kiri = info, kanan = gambar + highlight
function ProjectCard({ p, i }) {
  const tags = p.tags?.length ? p.tags : [p.role];
  const stack = p.stack?.length ? p.stack : [{ label: "Tech", items: p.tech }];
  const hl = p.highlight || { label: p.year, title: p.title, text: p.short };
  // card ke-2, ke-4, dst: gambar di kiri, penjelasan di kanan
  const reverse = i % 2 === 1;

  return (
    <div
      className="fade-up group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 lg:grid-cols-2"
      style={{ animationDelay: `${i * 80}ms` }}
    >
      {/* KIRI */}
      <div className={`flex flex-col justify-center bg-[#fbfaf8] p-7 sm:p-10 ${reverse ? "lg:order-2" : ""}`}>
        <h3 className="text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl">{p.title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{p.short}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="cursor-default rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.15em] text-slate-700 uppercase transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
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
      <div className={`relative min-h-[320px] overflow-hidden bg-[#2c3e5f] ${reverse ? "lg:order-1" : ""}`}>
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
        <SectionTitle>Portfolio</SectionTitle>

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
          <TabIntro tab={tab} />

          {tab === "projects" && (
            <div className="grid gap-6">
              {orderedProjects.map((p, i) => (
                <ProjectCard key={p.slug} p={p} i={i} />
              ))}

              {/* Tombol ke GitHub */}
              <div className="fade-up mt-4 flex justify-center" style={{ animationDelay: `${orderedProjects.length * 80}ms` }}>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-white bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[120%]" />
                  <FiGithub size={18} className="transition duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  View All Projects on GitHub
                  <FiArrowRight className="transition duration-300 group-hover:translate-x-1" />
                </a>
              </div>
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
            <div>
              <div className="fade-up mb-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-white">
                    <FaStar size={8} />
                  </span>
                  Main Stack — what I use the most
                </span>
                <span>Hover an icon to see where I used it</span>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
                {techStack.map((group, gi) => {
                  const GroupIcon = CATEGORY_ICON[group.icon] || FiLayers;
                  const featured = gi === 1;
                  return (
                    <div
                      key={group.category}
                      className={`fade-up group relative rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 ${BENTO_SPAN[gi] || "lg:col-span-2"} ${
                        featured ? "border-blue-200 bg-gradient-to-br from-white via-blue-50/60 to-sky-100/60" : "border-slate-200 bg-white/80"
                      }`}
                      style={{ animationDelay: `${gi * 90}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
                          <GroupIcon size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-lg font-bold text-slate-900">{group.category}</h4>
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700">{group.items.length}</span>
                          </div>
                          <p className="text-[13px] text-slate-500">{group.desc}</p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-1">
                        {group.items.map((t) => (
                          <TechItem key={t} name={t} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {open && <Modal item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
import { FiArrowLeft, FiExternalLink, FiGithub, FiCheckCircle, FiUser, FiCalendar } from "react-icons/fi";
import TechIcon from "../components/TechIcon";
import { ProjectThumb } from "../components/Placeholders";
import { goHome } from "../hooks/useHashRoute";
import { projects } from "../data/portfolio";

export default function ProjectDetail({ slug }) {
  const p = projects.find((x) => x.slug === slug);

  if (!p) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="text-3xl font-extrabold">Project not found</h1>
        <button onClick={() => goHome("portfolio")} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          Back to Portfolio
        </button>
      </div>
    );
  }

  const others = projects.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="fade-up flex items-center gap-3 text-sm">
          <button
            onClick={() => goHome("portfolio")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FiArrowLeft /> Back
          </button>
          <span className="text-slate-400">Projects</span>
          <span className="text-slate-300">›</span>
          <span className="font-semibold text-slate-700">{p.title}</span>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <div className="fade-up">
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl">{p.title}</h1>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-600">{p.description}</p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <FiUser className="text-blue-600" /> {p.role}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar className="text-blue-600" /> {p.year}
              </span>
            </div>

            <h2 className="mt-8 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="h-2 w-2 rounded-full bg-blue-600" /> Technologies Used
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
                  <TechIcon name={t} size={14} /> {t}
                </span>
              ))}
            </div>

            <h2 className="mt-8 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="h-2 w-2 rounded-full bg-blue-600" /> Key Features
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <FiCheckCircle className="shrink-0 text-emerald-500" /> {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700">
                Live Demo <FiExternalLink />
              </a>
              <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                <FiGithub /> Source Code
              </a>
            </div>
          </div>

          <div className="fade-up overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-blue-900/10" style={{ animationDelay: "120ms" }}>
            <div className="aspect-[16/10] overflow-hidden rounded-xl">
              <ProjectThumb project={p} />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-5 text-xl font-bold text-slate-900">Other Projects</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <a key={o.slug} href={`#/project/${o.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[16/9] overflow-hidden">
                  <ProjectThumb project={o} />
                </div>
                <div className="p-4 font-bold text-slate-900 group-hover:text-blue-600">{o.title}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { FiArrowUpRight, FiCode, FiAward, FiStar, FiBookOpen, FiBriefcase, FiMapPin } from "react-icons/fi";
import Reveal from "./Reveal";
import SocialIcon from "./SocialIcon";
import { Avatar } from "./Placeholders";
import { profile, socials, education, experience, projects, certificates, achievements } from "../data/portfolio";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// Buka tab "Projects" di bagian Portfolio, lalu scroll ke sana
const viewProjects = () => {
  window.dispatchEvent(new CustomEvent("portfolio:tab", { detail: "projects" }));
  scrollTo("portfolio");
};

function SectionTitle({ children, sub }) {
  return (
    <Reveal className="mb-12 text-center">
      <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{children}</h2>
      {sub && <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500">{sub}</p>}
    </Reveal>
  );
}
export { SectionTitle };

function TimelineCard({ icon: Icon, title, sub, period, logo }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-900/5">
      {logo ? (
        <img src={logo} alt="" className="h-11 w-11 shrink-0 rounded-xl object-contain" />
      ) : (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={18} />
        </div>
      )}
      <div className="min-w-0">
        <div className="font-bold text-slate-900">{title}</div>
        <div className="text-[13px] text-slate-500">{sub}</div>
        <div className="mt-0.5 text-xs font-medium text-blue-600">{period}</div>
      </div>
    </div>
  );
}

export default function About() {
  const stats = [
    { icon: FiCode, label: "Projects", sub: "Works built", value: projects.length },
    { icon: FiAward, label: "Certificates", sub: "Validated skills", value: certificates.length },
    { icon: FiStar, label: "Awards", sub: "Recognitions earned", value: achievements.length },
  ];

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle>About Me</SectionTitle>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
          <Reveal>
            <p className="text-lg font-semibold text-blue-600">Hi, I'm</p>
            <h3 className="mt-1 text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl">{profile.name}</h3>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
              <FiMapPin size={14} /> {profile.location}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  <SocialIcon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto flex justify-center">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-200/60 via-sky-100 to-indigo-200/60 blur-2xl" />
            <div className="floaty relative">
              <Avatar
                src={profile.photo}
                name={profile.name}
                className="h-80 w-64 rounded-[2rem] border-4 border-white shadow-2xl shadow-blue-900/15 sm:h-[25rem] sm:w-[20rem]"
              />
            </div>
          </Reveal>

          <Reveal delay={220} className="space-y-4 text-[15px] leading-relaxed text-slate-600">
            {profile.aboutDesc.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <button
              onClick={viewProjects}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
            >
              View Projects <FiArrowUpRight />
            </button>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal>
            <h4 className="mb-4 text-center text-xl font-bold text-slate-900">Education</h4>
            <div className="space-y-3">
              {education.map((e) => (
                <TimelineCard key={e.school} icon={FiBookOpen} title={e.school} sub={e.major} period={e.period} logo={e.logo} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h4 className="mb-4 text-center text-xl font-bold text-slate-900">Experience</h4>
            <div className="space-y-3">
              {experience.map((e) => (
                <TimelineCard key={e.title + e.place} icon={FiBriefcase} title={e.title} sub={e.place} period={e.period} />
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 100}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <s.icon size={18} />
                </div>
                <span className="text-4xl font-extrabold text-slate-900">{s.value}</span>
              </div>
              <div className="mt-4 text-sm font-bold tracking-wide text-slate-900 uppercase">{s.label}</div>
              <div className="text-xs text-slate-500">{s.sub}</div>
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-sky-400 transition group-hover:scale-x-100" />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
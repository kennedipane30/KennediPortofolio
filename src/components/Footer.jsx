import SocialIcon from "./SocialIcon";
import { profile, socials } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 sm:flex-row">
        <div className="text-base font-extrabold text-slate-900">
          {profile.shortName.toLowerCase()}
          <span className="text-blue-600">.dev</span>
        </div>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex gap-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <SocialIcon name={s.icon} size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
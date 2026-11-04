import SocialIcon from "./SocialIcon";
import { goHome } from "../hooks/useHashRoute";
import { profile, socials } from "../data/portfolio";

const NAV = [
  ["Home", "home"],
  ["About Me", "about"],
  ["Portfolio", "portfolio"],
  ["Contact", "contact"],
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="text-lg font-extrabold text-slate-900">
            {profile.shortName.toLowerCase()}<span className="text-blue-600">.dev</span>
          </div>
          <p className="mt-2 max-w-xs text-sm text-slate-500">Building modern, fast, and user-friendly web & mobile experiences.</p>
        </div>
        <div>
          <div className="text-xs font-bold tracking-[0.2em] text-slate-400">NAVIGATION</div>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map(([label, id]) => (
              <li key={id}>
                <button onClick={() => goHome(id)} className="text-slate-600 hover:text-blue-600">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold tracking-[0.2em] text-slate-400">CONNECT</div>
          <div className="mt-3 flex gap-2">
            {socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-blue-600">
                <SocialIcon name={s.icon} size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}

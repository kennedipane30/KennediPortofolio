import { useEffect, useState } from "react";
import { goHome } from "../hooks/useHashRoute";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ isDetail }) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (isDetail) {
      setActive("portfolio");
      return;
    }
    const onScroll = () => {
      let current = "home";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDetail]);

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className="flex items-center gap-1 rounded-full border border-[#5b7ab0] bg-white/20 p-1.5 backdrop-blur-sm"
      >
        {LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => goHome(l.id)}
            className={`rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors sm:px-4 ${
              active === l.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
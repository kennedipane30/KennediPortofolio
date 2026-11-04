// Gambar pengganti otomatis saat data image masih kosong

export function Avatar({ src, name, className = "", ...rest }) {
  if (src)
    return (
      <img
        src={src}
        alt={name}
        {...rest}
        className={`bg-gradient-to-b from-[#dbe5f3] to-[#9fb6d6] object-cover object-top ${className}`}
      />
    );
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-[#415c8f] via-[#5b7ab0] to-[#829cc1] font-extrabold text-white ${className}`}
      style={{ containerType: "size" }}
      aria-label={name}
    >
      <span className="leading-none tracking-tight" style={{ fontSize: "38cqmin" }}>
        {initials}
      </span>
    </div>
  );
}

// Mockup "screenshot" project
export function ProjectThumb({ project, className = "" }) {
  if (project.image) {
    return <img src={project.image} alt={project.title} className={`h-full w-full object-cover ${className}`} />;
  }
  const c = project.accent || "#5b7ab0";
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, ${c}22, ${c}08)` }}>
      <div className="absolute inset-x-5 top-5 bottom-0 rounded-t-xl border border-slate-200 bg-white shadow-lg">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-300" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-slate-100" />
        </div>
        <div className="flex gap-3 p-3">
          <div className="hidden w-1/4 space-y-1.5 sm:block">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-2 rounded-full" style={{ background: i === 0 ? c : "#e2e8f0" }} />
            ))}
          </div>
          <div className="flex-1 space-y-2">
            <div className="text-[11px] font-bold" style={{ color: c }}>
              {project.title}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-7 rounded-md" style={{ background: i === 0 ? `${c}33` : "#f1f5f9" }} />
              ))}
            </div>
            <div className="h-10 rounded-md bg-slate-50 p-1.5">
              <svg viewBox="0 0 100 24" className="h-full w-full" preserveAspectRatio="none">
                <polyline fill="none" stroke={c} strokeWidth="2" points="0,20 15,14 30,16 45,8 60,11 75,4 100,7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mockup sertifikat
export function CertThumb({ item, className = "", contain = false }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className={`h-full w-full bg-slate-50 ${contain ? "object-contain" : "object-cover object-center"} ${className}`}
      />
    );
  }
  return (
    <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-50 to-white p-4 ${className}`}>
      <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-amber-300/70 bg-white/80 px-4 text-center outline outline-1 outline-offset-[-7px] outline-amber-200">
        <div className="text-[9px] font-semibold tracking-[0.3em] text-amber-600">CERTIFICATE</div>
        <div className="mt-1 line-clamp-2 text-xs font-bold text-slate-800">{item.title}</div>
        <div className="mt-1 text-[9px] text-slate-500">{item.issuer}</div>
        <div className="mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-[10px] text-white shadow">
          ★
        </div>
        <span className="absolute right-2 bottom-1.5 text-[8px] text-slate-400">dummy</span>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { Avatar } from "./Placeholders";
import { profile } from "../data/portfolio";

// ============================================================
//  Lanyard dengan simulasi tali (Verlet integration)
//  - Tali terdiri dari banyak titik yang saling terhubung -> lentur
//  - Kartu bisa ditarik, dilempar, dan berayun alami
//  - Tulisan nama berulang mengikuti lengkungan tali
// ============================================================

const SEGMENTS = 18;
const GRAVITY = 0.55;
const DAMPING = 0.985;
const ITERATIONS = 28;

const ROPE_TEXT = Array(20).fill(`${profile.name.toUpperCase()}  •  `).join("");

export default function Lanyard({ className = "" }) {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const edgeRef = useRef(null);
  const shineRef = useRef(null);
  const cardRef = useRef(null);
  const sim = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    let raf;
    let visible = true;

    const setup = () => {
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      const CW = card.offsetWidth;
      const CH = card.offsetHeight;
      // di layar besar tali mulai dari atas layar, di HP mulai dari atas kotaknya
      const anchor = { x: W / 2, y: window.innerWidth >= 1024 ? -40 : 0 };
      const ropeLen = Math.max(160, Math.min(H - CH - 30, H * 0.48));
      const segLen = ropeLen / SEGMENTS;
      // posisi awal: tali miring ke kanan supaya langsung berayun saat muncul
      const pts = Array.from({ length: SEGMENTS + 1 }, (_, i) => {
        const x = anchor.x + i * segLen * 0.55;
        const y = anchor.y + i * segLen * 0.83;
        return { x, y, px: x, py: y };
      });
      const last = pts[SEGMENTS];
      const cardLen = CH / 2 + 4;
      const c = { x: last.x + cardLen * 0.6, y: last.y + cardLen * 0.8 };
      sim.current = {
        W, H, CW, CH, anchor, segLen, pts, cardLen,
        card: { ...c, px: c.x, py: c.y },
        drag: null,
      };
    };

    const step = () => {
      const s = sim.current;
      const { pts, card, anchor, segLen, cardLen } = s;

      // 1. integrasi verlet
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }
      if (s.drag) {
        card.px = card.x;
        card.py = card.y;
        card.x += (s.drag.x - card.x) * 0.5;
        card.y += (s.drag.y - card.y) * 0.5;
      } else {
        const vx = (card.x - card.px) * DAMPING;
        const vy = (card.y - card.py) * DAMPING;
        card.px = card.x;
        card.py = card.y;
        card.x += vx;
        card.y += vy + GRAVITY;
      }

      // 2. jaga panjang tiap ruas tali
      for (let k = 0; k < ITERATIONS; k++) {
        pts[0].x = anchor.x;
        pts[0].y = anchor.y;
        for (let i = 0; i < pts.length - 1; i++) {
          const a = pts[i];
          const b = pts[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.001;
          const diff = (d - segLen) / d;
          if (i === 0) {
            b.x -= dx * diff;
            b.y -= dy * diff;
          } else {
            a.x += dx * diff * 0.5;
            a.y += dy * diff * 0.5;
            b.x -= dx * diff * 0.5;
            b.y -= dy * diff * 0.5;
          }
        }
        // sambungan ujung tali <-> kartu (kartu lebih berat)
        const l = pts[pts.length - 1];
        const dx = card.x - l.x;
        const dy = card.y - l.y;
        const d = Math.hypot(dx, dy) || 0.001;
        const diff = (d - cardLen) / d;
        const wCard = s.drag ? 0 : 0.25;
        l.x += dx * diff * (1 - wCard);
        l.y += dy * diff * (1 - wCard);
        card.x -= dx * diff * wCard;
        card.y -= dy * diff * wCard;
      }

      // batas area supaya kartu tidak hilang
      card.x = Math.max(-s.W * 0.4, Math.min(s.W * 1.4, card.x));
      card.y = Math.max(-s.CH, Math.min(s.H + s.CH * 0.3, card.y));
    };

    const render = () => {
      const s = sim.current;
      const { pts, card, CW, CH } = s;
      // path halus melalui titik-titik tali
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
      }
      const l = pts[pts.length - 1];
      d += ` L ${l.x} ${l.y}`;
      pathRef.current.setAttribute("d", d);
      edgeRef.current.setAttribute("d", d);
      shineRef.current.setAttribute("d", d);

      const ang = Math.atan2(card.x - l.x, card.y - l.y);
      const vx = card.x - card.px;
      const twist = Math.max(-38, Math.min(38, vx * 2.6));
      cardRef.current.style.transform =
        `translate(${card.x - CW / 2}px, ${card.y - CH / 2}px) rotate(${(-ang * 180) / Math.PI}deg) perspective(900px) rotateY(${twist}deg)`;
    };

    const loop = () => {
      if (visible) {
        step();
        render();
      }
      raf = requestAnimationFrame(loop);
    };

    setup();
    loop();

    const ro = new ResizeObserver(() => {
      const s = sim.current;
      if (!s) return;
      if (Math.abs(wrap.clientWidth - s.W) > 2 || Math.abs(wrap.clientHeight - s.H) > 2) setup();
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // ---------- interaksi tarik ----------
  const toLocal = (e) => {
    const r = wrapRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = sim.current;
    const p = toLocal(e);
    s.grab = { dx: s.card.x - p.x, dy: s.card.y - p.y };
    s.drag = { x: s.card.x, y: s.card.y };
  };
  const onMove = (e) => {
    const s = sim.current;
    if (!s?.drag) return;
    const p = toLocal(e);
    s.drag = { x: p.x + s.grab.dx, y: p.y + s.grab.dy };
  };
  const onUp = () => {
    const s = sim.current;
    if (s) s.drag = null;
  };

  return (
    <div ref={wrapRef} className={`pointer-events-none relative z-20 select-none ${className}`}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <path id="lanyard-rope" ref={pathRef} d="" />
        </defs>
        {/* pinggir tali */}
        <path ref={edgeRef} d="" fill="none" stroke="#364c75" strokeWidth="28" strokeLinejoin="round" />
        {/* badan tali */}
        <use href="#lanyard-rope" fill="none" stroke="#5b7ab0" strokeWidth="24" strokeLinejoin="round" />
        {/* kilau tipis */}
        <path ref={shineRef} d="" fill="none" stroke="#829cc1" strokeOpacity="0.55" strokeWidth="3" transform="translate(-7 0)" />
        <text fill="#ffffff" fontSize="10.5" fontWeight="800" letterSpacing="2.2" dominantBaseline="central" style={{ fontFamily: "inherit" }}>
          <textPath href="#lanyard-rope" startOffset="0">
            {ROPE_TEXT}
          </textPath>
        </text>
      </svg>

      {/* kartu */}
      <div
        ref={cardRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="pointer-events-auto absolute top-0 left-0 w-[250px] cursor-grab touch-none will-change-transform active:cursor-grabbing sm:w-[300px]"
        style={{ transform: "translate(-9999px,0)" }}
      >
        {/* klip besi */}
        <div className="absolute -top-[18px] left-1/2 h-[26px] w-9 -translate-x-1/2 rounded-md bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 shadow-md">
          <div className="mx-auto mt-[5px] h-1.5 w-5 rounded-full bg-slate-500/60" />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white p-3 pt-5 shadow-2xl shadow-[#364c75]/30">
          <div className="mx-auto mb-2 h-2 w-12 rounded-full bg-slate-200" />
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#415c8f] via-[#5b7ab0] to-[#829cc1] px-3 pt-3 pb-2 text-white">
            <div className="text-[26px] leading-none font-extrabold tracking-tight sm:text-[32px]">DEVELOPER</div>
            <div className="mt-1 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-white/80">INSTITUT TEKNOLOGI DEL</div>
            <div className="pointer-events-none absolute -right-6 -bottom-8 h-24 w-24 rounded-full bg-white/15" />
          </div>
          <div className="relative mt-3 flex gap-3">
            <Avatar src={profile.photo} name={profile.name} className="h-[132px] w-[102px] rounded-lg sm:h-[160px] sm:w-[124px]" draggable={false} />
            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
              <div>
                <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-400">NAME</div>
                <div className="text-base leading-tight font-bold text-slate-900 sm:text-lg">{profile.name}</div>
                <div className="mt-1.5 text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-400">ROLE</div>
                <div className="text-xs leading-tight font-semibold text-slate-700 sm:text-sm">{profile.role}</div>
              </div>
              <div className="flex h-6 items-end gap-[2px]" aria-hidden="true">
                {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2].map((w, i) => (
                  <span key={i} className="h-full bg-slate-800" style={{ width: w }} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-slate-200 pt-2">
            <span className="text-sm font-extrabold tracking-[0.18em] text-[#364c75] sm:text-base">PORTFOLIO</span>
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-400">{profile.nim ? `NIM ${profile.nim}` : "D3 TI"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

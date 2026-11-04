import { useRef, useState } from "react";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiImage, FiMessageCircle, FiChevronRight, FiX, FiCheck } from "react-icons/fi";
import Reveal from "./Reveal";
import SocialIcon from "./SocialIcon";
import { Avatar } from "./Placeholders";
import { profile, socials, seedComments } from "../data/portfolio";

const KEY = "portfolio-comments-v2";

// localStorage bisa gagal (mode private dsb), jadi dibungkus try/catch
function loadComments() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seedComments;
}
function saveComments(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

function timeAgo(iso) {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return "just now";
  if (d < 3600) return `${Math.floor(d / 60)} min ago`;
  if (d < 86400) return `${Math.floor(d / 3600)} hours ago`;
  return `${Math.floor(d / 86400)} days ago`;
}

function Field({ icon: Icon, label, ...props }) {
  const Tag = props.rows ? "textarea" : "input";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      <span className="relative block">
        <Icon className="absolute top-3 left-3 text-slate-400" size={15} />
        <Tag
          {...props}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pr-3 pl-9 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      </span>
    </label>
  );
}

export default function Contact() {
  const [toast, setToast] = useState("");
  const [comments, setComments] = useState(loadComments);
  const [cPhoto, setCPhoto] = useState("");
  const fileRef = useRef(null);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Message from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, "_blank");
    e.currentTarget.reset();
    flash("Your message is ready in your email app ✉️");
  };

  const onPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      flash("Maximum photo size is 2 MB");
      e.target.value = "";
      return;
    }
    const r = new FileReader();
    r.onload = () => setCPhoto(r.result);
    r.readAsDataURL(file);
  };

  const sendComment = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = { name: f.get("cname").trim(), text: f.get("ctext").trim(), photo: cPhoto, date: new Date().toISOString() };
    if (!item.name || !item.text) return;
    const next = [item, ...comments];
    setComments(next);
    saveComments(next);
    e.currentTarget.reset();
    setCPhoto("");
    flash("Comment posted, thank you! 🙌");
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Get In Touch</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500">Have something to discuss? Send me a message or leave a comment.</p>
        </Reveal>

        {/* FIND ME — berjejer ke samping di bawah judul */}
        <Reveal delay={80} className="mb-10">
          <h3 className="mb-3 text-center text-sm font-bold tracking-[0.2em] text-slate-400">FIND ME</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-blue-200 hover:shadow-md hover:shadow-blue-900/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600">
                  <SocialIcon name={s.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-900">{s.name}</span>
                  <span className="block truncate text-xs text-slate-500">{s.handle}</span>
                </span>
                <FiChevronRight className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
              </a>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_1.25fr]">
          <div className="space-y-6">
            <Reveal className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Send a Message</h3>
              <p className="mt-1 text-sm text-slate-500">I will reply as soon as possible.</p>
              <form onSubmit={sendMessage} className="mt-5 space-y-4">
                <Field icon={FiUser} label="Name" name="name" placeholder="Your name" required />
                <Field icon={FiMail} label="Email" name="email" type="email" placeholder="you@example.com" required />
                <Field icon={FiMessageSquare} label="Message" name="message" rows={4} placeholder="Write your message…" required />
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700">
                  <FiSend /> Send Message
                </button>
              </form>
            </Reveal>

          </div>

          <Reveal delay={150} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <FiMessageCircle className="text-blue-600" /> Comments <span className="text-sm font-semibold text-slate-400">({comments.length})</span>
            </h3>

            <form onSubmit={sendComment} className="mt-5 space-y-4">
              <Field icon={FiUser} label="Name" name="cname" placeholder="Enter your name" maxLength={40} required />
              <Field icon={FiMessageSquare} label="Comment" name="ctext" rows={3} placeholder="Write your comment here…" maxLength={300} required />
              <div>
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">Profile Photo (optional)</span>
                <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
                {cPhoto ? (
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-2">
                    <img src={cPhoto} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <span className="flex-1 text-xs text-slate-500">Photo selected</span>
                    <button type="button" onClick={() => { setCPhoto(""); fileRef.current.value = ""; }} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Remove photo">
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 transition hover:border-blue-300 hover:text-blue-600"
                  >
                    <FiImage /> Choose Profile Photo
                  </button>
                )}
                <p className="mt-1 text-center text-[11px] text-slate-400">Maximum file size 2 MB</p>
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
                <FiSend /> Post Comment
              </button>
            </form>

            <ul className="mt-6 max-h-96 space-y-3 overflow-y-auto pr-1">
              {comments.length === 0 && (
                <li className="rounded-2xl bg-slate-50 p-4 text-center text-sm text-slate-400">No comments yet. Be the first to leave one!</li>
              )}
              {comments.map((c, i) => (
                <li key={c.date + i} className="fade-up flex gap-3 rounded-2xl bg-slate-50 p-3">
                  <Avatar src={c.photo} name={c.name || "?"} className="h-9 w-9 shrink-0 rounded-full" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-bold text-slate-900">{c.name}</span>
                      <span className="shrink-0 text-[11px] text-slate-400">{timeAgo(c.date)}</span>
                    </div>
                    <p className="mt-0.5 text-sm break-words text-slate-600">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {toast && (
        <div className="fade-up fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          <FiCheck className="text-emerald-400" /> {toast}
        </div>
      )}
    </section>
  );
}

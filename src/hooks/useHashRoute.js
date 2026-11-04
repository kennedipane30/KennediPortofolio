import { useEffect, useState } from "react";

// Router sederhana tanpa library.
// "#/project/slug" => halaman detail project, selain itu => halaman utama
export function useHashRoute() {
  const read = () => {
    const h = window.location.hash;
    const m = h.match(/^#\/project\/([^/?#]+)/);
    return m ? { page: "project", slug: decodeURIComponent(m[1]) } : { page: "home" };
  };
  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function goHome(sectionId) {
  if (window.location.hash.startsWith("#/project/")) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  if (sectionId) {
    setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 60);
  }
}

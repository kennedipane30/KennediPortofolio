import { useCallback, useState } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectDetail from "./pages/ProjectDetail";
import { useHashRoute } from "./hooks/useHashRoute";

function Background() {
  return (
    <div className="bg-scene pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <span className="shoot" style={{ top: "8%", right: "-10%", animationDelay: "0s" }} />
      <span className="shoot" style={{ top: "30%", right: "-20%", animationDelay: "3.2s" }} />
      <span className="shoot" style={{ top: "55%", right: "-15%", animationDelay: "5.5s" }} />
    </div>
  );
}

export default function App() {
  // "loading" -> animasi ketik, "entering" -> transisi gradasi, "done" -> selesai
  const [phase, setPhase] = useState("loading");
  const route = useHashRoute();
  const leave = useCallback(() => setPhase("entering"), []);
  const done = useCallback(() => setPhase("done"), []);
  // class animasi dilepas setelah selesai, supaya pop-up (position: fixed) tetap normal
  const enterClass = phase === "loading" ? "opacity-0" : phase === "entering" ? "page-enter" : "";

  return (
    <>
      {phase !== "done" && <Loader onLeave={leave} onDone={done} />}
      <Background />
      <div className={phase === "loading" ? "opacity-0" : phase === "entering" ? "soft-fade" : ""}>
        <Navbar isDetail={route.page === "project"} />
      </div>
      <main className={enterClass}>
        {route.page === "project" ? (
          <ProjectDetail slug={route.slug} />
        ) : (
          <>
            <Hero />
            <About />
            <Portfolio />
            <Contact />
          </>
        )}
      </main>
      <div className={enterClass}>
        <Footer />
      </div>
    </>
  );
}
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
  const [loading, setLoading] = useState(true);
  const route = useHashRoute();
  const done = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <Loader onDone={done} />}
      <Background />
      <Navbar isDetail={route.page === "project"} />
      <main>
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
      <Footer />
    </>
  );
}

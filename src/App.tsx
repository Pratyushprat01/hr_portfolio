import { useEffect } from "react";
import "./Components/stars.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Skills from "./Components/Skills";
import Experience from "./Components/Experience";
import Certificates from "./Components/Certificates";

function App() {

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    };

    const animate = () => {
      const stars = document.querySelector(".stars") as HTMLElement;
      const medium = document.querySelector(".medium-stars") as HTMLElement;
      const big = document.querySelector(".big-stars") as HTMLElement;

      if (stars) stars.style.transform = `translate(${mouseX * 0.2}px, ${mouseY * 0.2}px)`;
      if (medium) medium.style.transform = `translate(${mouseX * 0.5}px, ${mouseY * 0.5}px)`;
      if (big) big.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Routes>

      {/* ✅ HOME PAGE */}
      <Route path="/" element={
        <div className="main-container">

          {/* BACKGROUND */}
          <div className="stars"></div>

          <div className="medium-stars">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>

          <div className="big-stars">
            <span></span><span></span><span></span>
            <span></span><span></span>
          </div>

          {/* NAVBAR */}
          <div className="navbar">
            <h2>Portfolio</h2>
            <ul>
              <li className="active"><Link to="/">Home</Link></li>
              <li><Link to="/experience">Experience</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/certificates">Certificates</Link></li>
            </ul>
          </div>

          {/* HERO */}
          <div className="hero">
            <div className="left">
              <h1>
                Anushka <span>Srivastava</span>
              </h1>

              <p>
                HR Operations Specialist with 2+ years of experience in driving
                recruitment excellence, managing end-to-end employee lifecycle,
                and building scalable HR processes.
              </p>

              <div className="buttons">
                <a href="/Anushka Srivastava_CV.pdf" download className="btn primary">
                  Download CV
                </a>

                <a
                  href="https://www.linkedin.com/in/anushkasrivastava28-46221a196/"
                  target="_blank"
                  className="btn outline"
                >
                  LinkedIn
                </a>
              </div>

              <div className="stats">
                <div>
                  <h2>2.5+</h2>
                  <p>Experience</p>
                </div>

                <div>
                  <h2>3</h2>
                  <p>Companies</p>
                </div>
              </div>
            </div>

            <div className="right">
              <img src="/portfolio.png" className="profile-img" alt="profile" />
            </div>
          </div>

        </div>
      } />

      {/* OTHER PAGES */}
      <Route path="/experience" element={<Experience />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/certificates" element={<Certificates />} />

      {/* ✅ FALLBACK (VERY IMPORTANT) */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;
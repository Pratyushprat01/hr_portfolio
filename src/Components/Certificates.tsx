import { useEffect, useState } from "react";
import "./certificates.css";
import ExpandableGallery from "./ExpandableGallery";

const images = [
  "/cert1.png",
  "/cert2.png",
  "/cert3.png",
  "/cert4.png",
  "/cert5.png",
  "/cert6.png",
];

export default function Certificates() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="cert-page">

      {/* 🌌 BACKGROUND */}
      <div className="bg-glow"></div>

      <div className="particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* ✨ MOUSE GLOW */}
      <div
        className="mouse-glow"
        style={{ left: pos.x, top: pos.y }}
      />

      {/* 🧭 NAVBAR */}
      <div className="navbar">
        <h2>Portfolio</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/experience">Experience</a></li>
          <li><a href="/skills">Skills</a></li>
          <li className="active"><a href="/certificates">Certificates</a></li>
        </ul>
      </div>

      {/* 🔥 HEADER */}
      <div className="cert-header">
        <h1>Certificates & Achievements</h1>
        <p>
          A collection of my certifications and milestones showcasing continuous learning and growth.
        </p>
      </div>

      {/* 🔥 GALLERY */}
      <ExpandableGallery images={images} />

    </div>
  );
}
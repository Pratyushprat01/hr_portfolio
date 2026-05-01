import { useEffect, useState } from "react";
import "./experience.css";
import Round from "../Components/round";

const data = [
  {
    title: "BigOhTech – HR Executive",
    date: "September 2025 – Present",
    image: "/company1.png",
    points: [
      "Managed end-to-end employee lifecycle documentation and compliance.",
      "Led pre-onboarding and background verification processes.",
      "Maintained HRMS (Keka) data accuracy.",
      "Monitored probation & confirmations.",
      "HR SPOC – resolved queries.",
      "Managed grievances & SLA coordination."
    ]
  },
  {
    title: "Sparx IT Solutions – Talent Acquisition Specialist",
    date: "Aug 2024 – Aug 2025",
    image: "/company2.png",
    points: [
      "Full-cycle recruitment (tech + non-tech).",
      "Built sourcing strategies.",
      "Partnered with hiring managers.",
      "Screened candidates effectively.",
      "Conducted interviews.",
      "Improved hiring using data.",
      "Handled offers & onboarding."
    ]
  },
  {
    title: "Pylon Consulting – Technical Recruiter",
    date: "June 2022 – Aug 2023",
    image: "/company3.jpeg",
    points: [
      "End-to-end recruitment.",
      "Candidate screening & matching.",
      "Tracked hiring in ATS.",
      "Sourced via Naukri, LinkedIn, Monster.",
      "Clients: Snapdeal, Krafton, ByteDance, BhartPe."
    ]
  },
  {
    title: "Optimum Future – HR Recruiter Intern",
    date: "July 2021 – Nov 2021",
    image: "/company4.png",
    points: [
      "Handled recruitment lifecycle.",
      "Screened candidates.",
      "Coordinated interviews.",
      "Managed documentation.",
      "Ensured smooth onboarding."
    ]
  }
];

export default function Experience() {

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const [isBottom, setIsBottom] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const screenHeight = window.innerHeight;

    setIsBottom(scrollY > screenHeight * 0.6);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <div className="exp-page">

      <div className="bg-glow"></div>

      <div className="particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="mouse-glow" style={{ left: pos.x, top: pos.y }} />

      {/* NAVBAR */}
      <div className="navbar">
        <h2>Portfolio</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li className="active"><a href="/experience">Experience</a></li>
          <li><a href="/skills">Skills</a></li>
          <li><a href="/certificates">Certificates</a></li>
        </ul>
      </div>

      {/* HEADER */}
      <div className="exp-header">
        <h1>Experience</h1>
        <p>
          Across these organizations, I have driven end-to-end HR initiatives,
          optimized recruitment workflows, and supported employee lifecycle excellence.
        </p>
      </div>

      {/* CARDS */}
      <div className="exp-container">
        <div className="card-grid">
          {data.map((item, i) => (
            <div className="card" key={i}>
              <div className="card-inner">

                <div className="card-front">
                  <img src={item.image} />
                  <h3>{item.title}</h3>
                </div>

                <div className="card-back">
                  <h3>{item.title}</h3>
                  <p className="date">{item.date}</p>
                  <ul>
                    {item.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔽 SCROLL BUTTON */}
      <div
        className="scroll-down-btn"
        onClick={() => document.getElementById("sphere-section")?.scrollIntoView({ behavior: "smooth" })}
      >
        <div className="diamond"></div>
      </div>

      {/* 🔥 SPHERE */}
      <div id="sphere-section" className="sphere-section">
        
        <h2 className="sphere-heading">
          Technical Talent Delivery Excellence
        </h2>
        <div className="sphere-line"></div>

        <p className="sphere-sub">
            Successfully sourced, engaged, and closed critical technical roles across multiple domains, ensuring alignment with business and project requirements.

        </p>

        
        
        <Round />
      </div>

      {/* 🔼 TOP BUTTON */}
      <div
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        
      </div>

      <div
  className="scroll-toggle-btn"
  onClick={() => {
    if (isBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }}
>
  <p className="click-text">
    {isBottom ? "Go Up" : "Click Me"}
  </p>

  <div className={`diamond ${isBottom ? "rotate-up" : ""}`}></div>
</div>

    </div>
  );
}
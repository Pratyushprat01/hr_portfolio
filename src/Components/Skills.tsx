import { useEffect, useState } from "react";
import "./ui/orbital.css";
import { Link } from "react-router-dom";
import { User, Briefcase, BarChart3, Settings, Database } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Core Talent Acquisition Skills",
    skills: [
      "End-to-End Recruitment",
      "Talent Sourcing",
      "Tech & Non-Tech Hiring",
      "Candidate Engagement",
      "Negotiation",
    ],
    icon: User,
  },
  {
    id: 2,
    title: "Tools & Platforms",
    skills: [
      "LinkedIn Recruiter",
      "Naukri.com",
      "Excel (HR MIS & Reports)",
      "Boolean Search",
      "Job Portals",
      "Keka HRMS",
      "HR Documentation Tools",
    ],
    icon: Briefcase,
  },
  {
    id: 3,
    title: "Core Stakeholder & Business Management",
    skills: [
      "Stakeholder Management",
      "Hiring Manager Collaboration",
      "Requirement Gathering & Negotiation",
      "Vendor Management",
      "SLA Management",
    ],
    icon: Database,
  },
  {
    id: 4,
    title: "Data, Reporting & Process Excellence",
    skills: [
      "Recruitment Analytics",
      "KPI Tracking & Performance Metrics",
      "OKR Alignment & Tracking",
      "KRA Monitoring & Evaluation",
      "TAT Improvement",
      "Pipeline Management",
    ],
    icon: BarChart3,
  },
  {
    id: 5,
    title: "Core HR Operations",
    skills: [
      "Employee Lifecycle & Workforce Administration",
      "Onboarding, Offboarding & Transition Management",
      "HR Compliance & Audit Readiness",
      "HRMS Management (Keka/Zimyo)",
      "Employee Relations & Grievance Handling",
    ],
    icon: Settings,
  },
];

export default function Skills() {
  const [rotation, setRotation] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  // 🔥 ROTATION CONTROL
  useEffect(() => {
    if (active !== null) return; // stop when open

    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3);
    }, 30);

    return () => clearInterval(interval);
  }, [active]);

  return (
  <>
    

    {/* 🔥 MAIN CONTENT */}
    <div className="orbit-wrapper" onClick={() => setActive(null)}>
      
      {/* NAVBAR */}
      <div className="navbar">
        <h2>Portfolio</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/experience">Experience</Link></li>
          <li className="active"><Link to="/skills">Skills</Link></li>
          <li><Link to="/certificates">Certificates</Link></li>
        </ul>
      </div>

      <div className="orbit-container">
        <div className="orbit-center"></div>
        <div className="orbit-ring"></div>

        {data.map((item, index) => {
          const angle = (index / data.length) * 360 + rotation;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="orbit-node-wrapper"
              style={{
                transform: `
                  rotate(${angle}deg)
                  translate(180px)
                  rotate(-${angle}deg)
                  translate(-50%, -50%)
                `
              }}
            >
              <div
                className={`orbit-node 
                  ${active === item.id ? "active" : ""} 
                  ${active !== null && active !== item.id ? "dim" : ""}
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(active === item.id ? null : item.id);
                }}
              >
                <Icon size={18} />
              </div>

              <div className="node-label">{item.title}</div>

              {active === item.id && (
                <div className="orbit-card">
                  <h3>{item.title}</h3>

                  <div className="skill-box-container">
                    {item.skills.map((skill, i) => (
                      <div key={i} className="skill-box">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </>
)};
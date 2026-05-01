import { useEffect, useState } from "react";
import "./orbital.css";

export default function RadialOrbitalTimeline({ timelineData }: any) {
  const [rotation, setRotation] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  // 🔄 AUTO ROTATE
  useEffect(() => {
    const interval = setInterval(() => {
      if (active === null) {
        setRotation((prev) => (prev + 0.25) % 360);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [active]);

  // ❌ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClick = () => setActive(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const radius = 180; // 🔥 SMALLER CIRCLE

  return (
    <div className="orbit-wrapper">
      <div className="orbit-container">

        <div className="orbit-center"></div>
        <div className="orbit-ring"></div>

        {timelineData.map((item: any, index: number) => {
          const total = timelineData.length;

          // 🎯 PERFECT FIXED CIRCLE (NO DRIFT)
          const angle =
            (index / total) * 2 * Math.PI +
            (rotation * Math.PI) / 180;

          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          const Icon = item.icon;

          const isBottom = y > 80;
          const isLeft = x < 0;

          return (
            <div
              key={item.id}
              className="orbit-node-wrapper"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              {/* ICON */}
              <div
                className={`orbit-node ${active === item.id ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();

                  // 🔥 TOGGLE (CLICK AGAIN CLOSES)
                  if (active === item.id) {
                    setActive(null);
                  } else {
                    setActive(item.id);
                  }
                }}
              >
                <Icon size={18} />
              </div>

              {/* LABEL */}
              <div
                className="node-label"
                style={{
                  textAlign: isLeft ? "right" : "left",
                  transform: isLeft
                    ? "translateX(-110%)"
                    : "translateX(10%)"
                }}
              >
                {item.title}
              </div>

              {/* 🔥 CARD AT NODE */}
              {active === item.id && (
                <div
                  className="orbit-card"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    top: isBottom ? "-180px" : "60px",
                    left: isLeft ? "-260px" : "60px"
                  }}
                >
                  <h3>{item.title}</h3>

                  <div className="skill-box-container">
                    {item.content.map((skill: string, i: number) => (
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
  );
}
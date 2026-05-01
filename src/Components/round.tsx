import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

const roles = [
  "Software Engineer","Full Stack Developer","Frontend Developer","Backend Developer",
  "Mobile App Developer","MERN Stack Developer","Cloud Engineer","DevOps Engineer",
  "Site Reliability Engineer","Platform Engineer","Network Engineer","Data Analyst",
  "Data Scientist","AI/ML Engineer","Data Engineer","Business Intelligence Developer",
  "Cyber Security Engineer","Information Security Analyst","Ethical Hacker",
  "QA Engineer","Automation Test Engineer","Business Analyst","Product Manager",
  "Project Manager","Scrum Master","Technical Program Manager",
  "Blockchain Developer","Web3 Developer","AR/VR Developer","IoT Engineer"
];

// 🔥 TRUE SPHERE (FIBONACCI)
function getPosition(i: number, total: number) {
  const offset = 2 / total;
  const increment = Math.PI * (3 - Math.sqrt(5));

  const y = i * offset - 1 + offset / 2;
  const r = Math.sqrt(1 - y * y);
  const phi = i * increment;

  const x = Math.cos(phi) * r;
  const z = Math.sin(phi) * r;

  return [x * 3.5, y * 3.5, z * 3.5];
}

function Roles() {
  return (
    <>
      {roles.map((role, i) => {
        const [x, y, z] = getPosition(i, roles.length);

        return (
          <Html key={i} position={[x, y, z]}>
            <div className="role-tag">{role}</div>
          </Html>
        );
      })}
    </>
  );
}

export default function Round() {
  return (
    <div className="sphere3d-wrapper">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={1} />
        <Roles />
        <OrbitControls autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
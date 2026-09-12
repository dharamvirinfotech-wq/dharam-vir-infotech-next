import {
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiElasticsearch,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiDocker,
  SiElectron,
  SiCplusplus,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiFirebase,
  SiGraphql,
  SiSqlite,
  SiDotnet,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Cpu } from "lucide-react";

/**
 * Mapping of technology names to their official react-icons and brand colors
 */
export const TECH_ICON_MAP = {
  "React": { icon: SiReact, color: "text-[#61DAFB]" },
  "React Native": { icon: SiReact, color: "text-[#61DAFB]" },
  "Next.js": { icon: SiNextdotjs, color: "text-slate-900" },
  "Node.js": { icon: SiNodedotjs, color: "text-[#339933]" },
  "PostgreSQL": { icon: SiPostgresql, color: "text-[#4169E1]" },
  "MongoDB": { icon: SiMongodb, color: "text-[#47A248]" },
  "Redis": { icon: SiRedis, color: "text-[#DC382D]" },
  "Elasticsearch": { icon: SiElasticsearch, color: "text-[#005571]" },
  "TailwindCSS": { icon: SiTailwindcss, color: "text-[#06B6D4]" },
  "Python": { icon: SiPython, color: "text-[#3776AB]" },
  "FastAPI": { icon: SiFastapi, color: "text-[#05998B]" },
  "Docker": { icon: SiDocker, color: "text-[#2496ED]" },
  "AWS": { icon: FaAws, color: "text-[#FF9900]" },
  "Electron": { icon: SiElectron, color: "text-[#47848F]" },
  "C++": { icon: SiCplusplus, color: "text-[#00599C]" },
  "Flutter": { icon: SiFlutter, color: "text-[#02569B]" },
  "Swift": { icon: SiSwift, color: "text-[#F05138]" },
  "Kotlin": { icon: SiKotlin, color: "text-[#7F52FF]" },
  "Firebase": { icon: SiFirebase, color: "text-[#FFA611]" },
  "GraphQL": { icon: SiGraphql, color: "text-[#E10098]" },
  "SQLite": { icon: SiSqlite, color: "text-[#003B57]" },
  ".NET": { icon: SiDotnet, color: "text-[#512BD4]" },
};

export const getTechIconInfo = (name) => {
  if (!name) return { icon: Cpu, color: "text-accent" };
  const key = Object.keys(TECH_ICON_MAP).find(
    (k) => k.toLowerCase() === String(name).toLowerCase().trim()
  );
  return key ? TECH_ICON_MAP[key] : { icon: Cpu, color: "text-accent" };
};

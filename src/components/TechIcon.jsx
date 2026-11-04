import {
  SiGo, SiPhp, SiLaravel, SiFlutter, SiDart, SiHtml5, SiCss, SiTailwindcss, SiJavascript,
  SiReact, SiC, SiPython, SiPostgresql, SiMysql, SiXampp, SiFigma, SiGit, SiGithub,
  SiBootstrap, SiScikitlearn,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbChartBar, TbChartPie, TbCode, TbDatabase } from "react-icons/tb";

// Nama teknologi => [icon, warna]
export const TECH = {
  Golang: [SiGo, "#00ADD8"],
  PHP: [SiPhp, "#777BB4"],
  Laravel: [SiLaravel, "#FF2D20"],
  Flutter: [SiFlutter, "#02569B"],
  Dart: [SiDart, "#0175C2"],
  HTML: [SiHtml5, "#E34F26"],
  CSS: [SiCss, "#1572B6"],
  "Tailwind CSS": [SiTailwindcss, "#06B6D4"],
  JavaScript: [SiJavascript, "#E6B800"],
  React: [SiReact, "#149ECA"],
  Java: [FaJava, "#E76F00"],
  C: [SiC, "#5C6BC0"],
  Python: [SiPython, "#3776AB"],
  PostgreSQL: [SiPostgresql, "#4169E1"],
  MySQL: [SiMysql, "#00758F"],
  XAMPP: [SiXampp, "#FB7A24"],
  Figma: [SiFigma, "#F24E1E"],
  Git: [SiGit, "#F05032"],
  GitHub: [SiGithub, "#181717"],
  Bootstrap: [SiBootstrap, "#7952B3"],
  Oracle: [TbDatabase, "#C74634"],
  "Machine Learning": [SiScikitlearn, "#F7931E"],
  "Power BI": [TbChartBar, "#E8B500"],
  Tableau: [TbChartPie, "#E97627"],
};

export default function TechIcon({ name, size = 18, colored = true }) {
  const [Icon, color] = TECH[name] || [TbCode, "#5b7ab0"];
  return <Icon size={size} style={colored ? { color } : undefined} aria-hidden="true" />;
}

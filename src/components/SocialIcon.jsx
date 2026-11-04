import { SiInstagram, SiGithub } from "react-icons/si";
import { FiLinkedin, FiMail, FiLink } from "react-icons/fi";

const MAP = { instagram: SiInstagram, github: SiGithub, linkedin: FiLinkedin, mail: FiMail };

export default function SocialIcon({ name, size = 18 }) {
  const Icon = MAP[name] || FiLink;
  return <Icon size={size} aria-hidden="true" />;
}

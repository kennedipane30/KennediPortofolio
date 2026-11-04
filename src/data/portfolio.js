// ============================================================
//  SEMUA DATA PORTFOLIO ADA DI FILE INI
//  Ganti isi di bawah dengan data asli kamu.
//  Gambar: taruh file di folder /public/images lalu isi path-nya,
//  contoh  photo: "/images/profile.jpg"
//  Kalau dikosongkan (""), otomatis tampil gambar placeholder.
// ============================================================

export const profile = {
  name: "Kennedi Pane",
  shortName: "Kennedi",
  role: "Web & Mobile Developer",
  typing: ["Web & Mobile Developer", "Laravel & Golang", "Flutter Enthusiast", "UI/UX Explorer"],
  heroDesc:
    "What started as curiosity has become a passion. I love building web and mobile apps that are clean, fast, and enjoyable to use — from designs in Figma all the way to the backend and database.",
  aboutDesc: [
    "I am an Information Technology diploma student focused on web and mobile application development. I enjoy turning ideas into useful digital products.",
    "With Laravel, Golang, and Flutter, I build information systems that are responsive, well-structured, and easy to use.",
  ],
  photo: "/images/profile.webp",
  nim: "", // isi kalau mau NIM tampil di ID card, contoh: "4232xxxx"
  email: "emailkamu@gmail.com",
  location: "Toba, North Sumatra, Indonesia",
  cvUrl: "/cv.pdf", // taruh file CV kamu di folder public dengan nama cv.pdf
};

export const socials = [
  { name: "Instagram", handle: "@kennediii_pane", url: "https://www.instagram.com/kennediii_pane/", icon: "instagram" },
  { name: "GitHub", handle: "@kennedipane30", url: "https://github.com/kennedipane30", icon: "github" },
  { name: "LinkedIn", handle: "Kennedi Pane", url: "https://www.linkedin.com/in/kennedi-pane/", icon: "linkedin" },
]

export const education = [
  {
    school: "Institut Teknologi Del",
    major: "Diploma (D3) in Information Technology",
    period: "2024 – 2027",
    logo: "", // contoh: "/images/logo-itdel.png"
  },
  {
    school: "SMA Negeri 1 Habinsaran",
    major: "Science Major",
    period: "2021 – 2024",
    logo: "",
  },
];

export const experience = [
  {
    title: "Research Assistant",
    place: "LPPM IT Del — Local-Content Educational Game Application",
    period: "2025",
  },
  {
    title: "Student Leadership Program",
    place: "Institut Teknologi Del",
    period: "2025 – 2026",
  },
  {
    title: "Election Committee (KPU)",
    place: "HIMATIF Chairperson Election",
    period: "2025",
  },
  {
    title: "Student Mentor (Abang Asuh)",
    place: "Institut Teknologi Del",
    period: "2025 – 2026",
  },
];

export const projects = [
  {
    slug: "sistem-informasi-desa",
    title: "Village Information System",
    short: "A village profile and services website for information, news, and resident data.",
    description:
      "A web-based village information system that presents the village profile, news, gallery, and administrative services. Admins manage content and resident data through a dashboard. (Dummy description — replace with real details.)",
    image: "",
    accent: "#5b7ab0",
    tech: ["Laravel", "PHP", "Bootstrap", "MySQL"],
    role: "Frontend & Database",
    year: "2025",
    demo: "#",
    repo: "#",
    features: ["Village profile & news", "Admin dashboard", "Resident data management", "Activity gallery"],
  },
  {
    slug: "sistem-informasi-posyandu",
    title: "Posyandu Information System",
    short: "An offline-first posyandu app for recording child health data and activity schedules.",
    description:
      "An offline-first mobile app for posyandu health workers: child growth tracking, immunization schedules, and data sync when back online. REST API backend built with Golang. (Dummy description.)",
    image: "",
    accent: "#4a6699",
    tech: ["Flutter", "Dart", "Golang", "PostgreSQL"],
    role: "Fullstack",
    year: "2026",
    demo: "#",
    repo: "#",
    features: ["Role-based login", "Offline mode", "Data synchronization", "Growth charts"],
  },
  {
    slug: "spekta-academy",
    title: "Spekta Academy",
    short: "A web & mobile system for a tutoring center: schedules, students, and payments.",
    description:
      "A platform for a tutoring center that manages student data, class schedules, attendance, and payment information, available on web and mobile. (Dummy description.)",
    image: "",
    accent: "#3b527c",
    tech: ["Laravel", "Flutter", "Tailwind CSS", "MySQL"],
    role: "Web & Mobile Developer",
    year: "2026",
    demo: "#",
    repo: "#",
    features: ["Student management", "Schedules & attendance", "Payment info", "Mobile app"],
  },
  {
    slug: "game-edukasi-lokal",
    title: "Local Educational Game",
    short: "An educational game featuring local culture for fun, engaging learning.",
    description:
      "An educational game that uses local cultural content as an interactive learning medium, developed as part of a lecturer's grant-funded research. (Dummy description.)",
    image: "",
    accent: "#829cc1",
    tech: ["Python", "Figma", "UI/UX"],
    role: "Research Assistant",
    year: "2026",
    demo: "#",
    repo: "#",
    features: ["Local cultural content", "Interactive quizzes", "Scoring system", "Child-friendly design"],
  },
];

// SERTIFIKAT
export const certificates = [
  {
    title: "Oracle AI Database Certified Foundations Associate",
    issuer: "Oracle University",
    date: "10 Sep 2026",
    image: "/images/sertifikat-oracle-ai-database.webp",
    url: "",
  },
  {
    title: "Learn the Basics of Structured Query Language (SQL)",
    issuer: "Dicoding Indonesia",
    date: "27 Jan 2026",
    image: "/images/sertifikat-dicoding-sql.webp",
    url: "https://www.dicoding.com/certificates/07Z6JNNKJXQR",
  },
  {
    title: "Learn the Basics of AI",
    issuer: "Dicoding Indonesia",
    date: "12 Nov 2025",
    image: "/images/sertifikat-dicoding-ai.webp",
    url: "https://www.dicoding.com/certificates/0LZ05J8E3X65",
  },
];

// PENCAPAIAN
export const achievements = [
  {
    title: "Student Leadership Program 2025/2026",
    issuer: "Institut Teknologi Del",
    date: "16 Oct 2026",
    image: "/images/sertifikat-slp.webp",
  },
  {
    title: "Research Assistant — Local-Content Educational Game",
    issuer: "LPPM Institut Teknologi Del",
    date: "27 Nov 2025",
    image: "/images/sertifikat-asisten-penelitian.webp",
  },
];

// key icon: lihat daftar di src/components/TechIcon.jsx
export const techStack = [
  "Golang", "PHP", "Laravel", "Flutter", "Dart", "HTML", "CSS", "Tailwind CSS",
  "JavaScript", "React", "Java", "C", "Python", "PostgreSQL", "MySQL", "XAMPP",
  "Figma", "Git", "GitHub", "Power BI", "Tableau", "Bootstrap", "Oracle", "Machine Learning",
];

// Komentar awal yang tampil di kolom komentar
export const seedComments = [];

# Portfolio — React + Vite + Tailwind CSS (Tema Terang)

## Cara menjalankan
```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # hasil siap deploy ada di folder dist/
```
Butuh Node.js 18 atau lebih baru.

## Mengganti data
**Semua data ada di satu file: `src/data/portfolio.js`**
- `profile` → nama, role, teks typing, deskripsi, foto, email, link CV
- `socials` → Instagram, TikTok, GitHub, LinkedIn
- `education`, `experience` → riwayat pendidikan & pengalaman
- `projects` → daftar project (otomatis punya halaman detail `#/project/<slug>`)
- `certificates`, `achievements` → sertifikat & pencapaian (klik untuk preview)
- `techStack` → nama teknologi (icon diatur di `src/components/TechIcon.jsx`)

### Gambar
Taruh file di `public/images/`, lalu isi path-nya, contoh:
```js
photo: "/images/profile.jpg"
image: "/images/sertifikat-aws.jpg"
```
Kalau dikosongkan (`""`), otomatis tampil placeholder.

## Struktur
```
src/
  App.jsx               // susunan halaman + router sederhana
  index.css             // tema, animasi
  data/portfolio.js     // ← DATA KAMU
  hooks/useHashRoute.js // router tanpa library
  components/
    Loader.jsx          // loading 0–100%
    Navbar.jsx          // navbar kapsul melayang
    Hero.jsx            // Welcome to My Portfolio + typing
    Lanyard.jsx         // ID card gantung yang bisa ditarik
    About.jsx           // About, pendidikan, pengalaman, statistik
    Portfolio.jsx       // tab Projects / Certificates / Achievements / Tech Stack
    Contact.jsx         // form pesan (mailto) + kolom komentar
    Footer.jsx
  pages/ProjectDetail.jsx
```

## Catatan
- Komentar disimpan di **localStorage** browser pengunjung (hanya terlihat di browser itu).
  Kalau mau komentar tersimpan untuk semua orang, sambungkan ke Firebase/Supabase di `Contact.jsx`.
- Form "Kirim Pesan" membuka aplikasi email ke alamat `profile.email`.
- Deploy gratis: Vercel / Netlify (build command `npm run build`, output `dist`).

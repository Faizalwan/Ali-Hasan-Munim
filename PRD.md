# PRD: Website "Cak Ali" (Ali Hasan Mun'im, S.E)

Dokumen ini turunan dari [project-brief.md](project-brief.md). Versi 1.0, fase 1 (website statis).

---

## 1. Ringkasan Produk
Website personal branding untuk Cak Ali, calon anggota legislatif Pemilu 2029, dengan fitur interaktif **pendaftaran relawan** dan **kanal aspirasi**. Fase 1 berupa website statis: tampilan lengkap dan responsif, form berfungsi di sisi browser, tanpa backend dan tanpa CMS.

## 2. Tujuan & Non-Tujuan

**Tujuan**
1. Membangun citra Cak Ali sebagai figur yang dekat, merakyat, dan kredibel (prioritas utama).
2. Menjaring calon relawan per wilayah.
3. Menyediakan kanal aspirasi yang mudah dipakai dari HP.

**Non-tujuan (fase 1)**
- CMS atau panel admin sungguhan.
- Penyimpanan data terpusat di server.
- Donasi, halaman kampanye resmi, multibahasa.

## 3. Target Pengguna
| Persona | Konteks | Kebutuhan utama |
|---|---|---|
| **Warga pemilih** (Bondowoso, Situbondo, Banyuwangi) | HP Android, sinyal terbatas, sering dari link WhatsApp | Kenal Cak Ali, lihat program untuk wilayahnya, sampaikan aspirasi |
| **Pengusaha / anggota KADIN** | Desktop dan HP | Lihat latar profesional, gagasan ekonomi/UMKM, jalur kolaborasi |
| **Anak muda** | HP, aktif di Instagram | Tampilan segar, konten visual, mudah dibagikan, daftar relawan cepat |

## 4. Tech Stack

| Aspek | Pilihan | Alasan |
|---|---|---|
| Markup | **HTML5 semantik**, multi-page | Statis, SEO baik, mudah di-hosting |
| Styling | **Tailwind CSS** (build via Tailwind CLI, output `dist/styles.css` yang di-minify) | Utility-first, cepat membuat responsif; build lokal menghindari CDN yang berat dan tidak disarankan untuk produksi |
| Interaksi | **Vanilla JavaScript** (ES modules, tanpa framework) | Ringan untuk sinyal lemah |
| Penyimpanan | **localStorage** | Sesuai permintaan; tanpa backend |
| Font | Satu keluarga sans (mis. Plus Jakarta Sans / Poppins) via self-host atau Google Fonts, `display=swap` | Ramah dan terbaca |
| Ikon | SVG inline | Tanpa dependensi |
| Hosting | Netlify / Cloudflare Pages / Vercel (statis) | Gratis, HTTPS, mudah deploy |
| Domain | `cakali.id` (dibeli belakangan) | |

**Catatan penting tentang localStorage**
localStorage hanya tersimpan **di browser pengunjung itu sendiri**. Tim Cak Ali **tidak akan menerima** data yang diisi pengunjung. Karena itu fase 1 memakai pola berikut:

1. Form disimpan ke localStorage (sebagai draf yang tidak hilang saat halaman ditutup, dan sebagai riwayat "aspirasi saya" untuk pengunjung).
2. Pengiriman nyata ke tim lewat **tombol "Kirim via WhatsApp"** yang membuka `wa.me/<nomor>?text=<pesan terformat>`.
3. Halaman **Admin Demo** (`/admin-demo`) menampilkan isi localStorage browser yang sama, hanya untuk demo ke klien.
4. Pada fase 2, bagian `storage.js` diganti dengan pemanggilan API/form service tanpa mengubah UI.

## 5. Struktur Halaman & Navigasi

### 5.1 Peta situs
```
/index.html                 Beranda
/tentang.html               Tentang Cak Ali
/program.html               Visi & Program
/kegiatan.html              Daftar Kegiatan / Berita
/kegiatan-detail.html?id=   Detail Kegiatan (template tunggal, data dari JS)
/galeri.html                Galeri Foto & Video
/pengusaha.html             Untuk Pengusaha & UMKM
/relawan.html               Pendaftaran Relawan
/aspirasi.html              Kanal Aspirasi
/kontak.html                Kontak & Media Sosial
/privasi.html               Kebijakan Privasi & Disclaimer
/admin-demo.html            Admin Demo (noindex, tidak ditautkan di navigasi)
/404.html                   Halaman tidak ditemukan
```

### 5.2 Navigasi
- **Header (desktop):** Logo "Cak Ali" · Tentang · Program · Kegiatan · Galeri · Pengusaha · Kontak · tombol **Jadi Relawan** (primer) dan **Aspirasi** (sekunder).
- **Header (mobile):** logo + tombol hamburger; menu penuh layar dengan dua CTA di atas.
- **Footer:** ringkasan singkat, tautan cepat, media sosial, tautan Privasi, disclaimer.
- **Tombol WhatsApp mengambang** di pojok kanan bawah (semua halaman, tidak menutupi CTA).
- Header sticky dengan bayangan tipis saat scroll.

## 6. Spesifikasi Per Halaman

### 6.1 Beranda
Urutan seksi:
1. **Hero:** foto Cak Ali, nama, tagline (mis. "Bersama Cak Ali, Membangun Dapil Kita"), 2 CTA (Jadi Relawan, Sampaikan Aspirasi).
2. **Sekilas Cak Ali:** 2-3 kalimat dan tautan "Selengkapnya".
3. **Angka/Fakta singkat:** 3-4 poin (mis. tahun berkiprah, wilayah dapil, bidang). *Isi dari klien; sembunyikan bila belum ada data.*
4. **Program prioritas:** 4-6 kartu ikon.
5. **Kegiatan terbaru:** 3 kartu terbaru.
6. **Untuk pengusaha & UMKM:** banner ajakan.
7. **Kutipan/Pesan Cak Ali:** blok besar bergaya santai.
8. **Ajakan akhir:** relawan dan aspirasi.

### 6.2 Tentang Cak Ali
Profil, foto, perjalanan hidup (timeline vertikal), pendidikan, pengalaman usaha/KADIN, organisasi, alasan maju, nilai-nilai pegangan.

### 6.3 Visi & Program
- Visi dan misi singkat.
- Program per isu (kartu yang bisa di-expand): ekonomi/UMKM, pemuda, infrastruktur, pertanian/nelayan, pendidikan, kesehatan *(final dari klien)*.
- Filter per kabupaten (Bondowoso / Situbondo / Banyuwangi / Semua) dengan JS.

### 6.4 Kegiatan / Berita
- Grid kartu (foto, tanggal, judul, ringkasan), filter kategori, paginasi sederhana atau "Muat lebih banyak".
- **Detail kegiatan:** satu template yang membaca `?id=` dan mengambil data dari `js/data/kegiatan.js`.

### 6.5 Galeri
Grid masonry/responsif, filter foto/video, **lightbox** untuk foto, video tersemat (Instagram/YouTube) dengan lazy loading.

### 6.6 Untuk Pengusaha & UMKM
Gagasan ekonomi, rencana dukungan UMKM, ajakan kolaborasi, tombol WhatsApp "Hubungi Tim" dengan pesan awal terisi.

### 6.7 Pendaftaran Relawan
**Field:** Nama lengkap* · Nomor WhatsApp* · Kabupaten* (dropdown) · Kecamatan* · Desa/Kelurahan · Usia · Pekerjaan · Peran yang diminati (checkbox: koordinator wilayah, konten/medsos, acara, pengusaha/UMKM, lainnya) · Motivasi (opsional) · **Persetujuan data pribadi*** (checkbox).
**Perilaku:** validasi di sisi klien, simpan ke localStorage, tampilkan layar sukses dengan ringkasan dan tombol **Kirim via WhatsApp**, draf tersimpan otomatis selama pengisian.

### 6.8 Kanal Aspirasi
**Field:** Nama (opsional) · Nomor WhatsApp/kontak (opsional) · Kabupaten* · Kecamatan* · Kategori* (infrastruktur, ekonomi/UMKM, pendidikan, kesehatan, pemuda, lainnya) · Judul singkat* · Isi aspirasi* (min. 20 karakter, batas 1000) · Foto (opsional, dikompres di sisi klien, disimpan sebagai data URL dengan batas ukuran kecil) · **Persetujuan data pribadi***.
**Perilaku:** sama dengan relawan, plus bagian **"Aspirasi Saya"** yang menampilkan riwayat dari localStorage di browser itu. Nomor tiket lokal dibuat otomatis (mis. `ASP-20290101-001`).

### 6.9 Kontak
Nomor WhatsApp, email, alamat posko (bila ada), tautan Instagram, peta (tautan Google Maps, tanpa embed berat), form kontak singkat (mengarah ke WhatsApp).

### 6.10 Kebijakan Privasi & Disclaimer
Data apa yang dikumpulkan, tujuan, penyimpanan (fase 1: di perangkat pengunjung dan lewat WhatsApp yang dikirim sendiri), hak pengunjung, kontak. Disclaimer bahwa konten bersifat sosialisasi sesuai aturan KPU/Bawaslu.

### 6.11 Admin Demo (tersembunyi)
Tabel data relawan dan aspirasi dari localStorage, ekspor **CSV**, tombol hapus semua. `noindex`, diberi label jelas "Hanya untuk demo".

### 6.12 404
Pesan ramah, tombol kembali ke beranda.

## 7. Persyaratan Fungsional

| ID | Kebutuhan | Prioritas |
|---|---|---|
| F1 | Semua halaman di 5.1 tersedia dan terhubung lewat navigasi | Wajib |
| F2 | Form relawan dan aspirasi tervalidasi, tersimpan di localStorage, menampilkan status sukses | Wajib |
| F3 | Tombol Kirim via WhatsApp membuat pesan terformat dan membuka `wa.me` | Wajib |
| F4 | Tombol bagikan WhatsApp/Facebook/salin tautan di halaman kegiatan dan beranda | Wajib |
| F5 | Konfigurasi terpusat (nama, nomor WA, email, tautan sosial, tagline, partai, dapil) di `js/config.js` | Wajib |
| F6 | Konten (program, kegiatan, galeri) dipisah di `js/data/*.js` agar mudah diganti | Wajib |
| F7 | Filter program per kabupaten, filter kegiatan per kategori, filter galeri | Sebaiknya |
| F8 | Lightbox galeri | Sebaiknya |
| F9 | Draf form tersimpan otomatis | Sebaiknya |
| F10 | Admin Demo dengan ekspor CSV | Sebaiknya |
| F11 | Mode gelap | Opsional (tidak di fase 1) |

## 8. Persyaratan Non-Fungsional
- **Responsif:** desain **desktop dan mobile**; breakpoint Tailwind `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Diuji di 360px, 390px, 768px, 1024px, 1440px.
- **Pendekatan:** mobile-first CSS; target sentuh minimal 44px; tidak ada scroll horizontal.
- **Performa:** gambar WebP, `loading="lazy"`, ukuran responsif (`srcset`), CSS ter-minify, JS < 50 KB total tanpa pustaka luar; target Lighthouse mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO).
- **Aksesibilitas:** HTML semantik, kontras WCAG AA, label form, fokus terlihat, `alt` pada gambar, navigasi keyboard, tombol hamburger dengan `aria-expanded`.
- **SEO & berbagi:** `<title>` dan meta description per halaman, Open Graph dan Twitter card (pratinjau WhatsApp), `sitemap.xml`, `robots.txt`, favicon; `admin-demo` diberi `noindex`.
- **Keamanan dasar:** escape semua input saat ditampilkan (cegah XSS dari localStorage), tanpa menyimpan data sensitif; header keamanan lewat konfigurasi hosting.
- **Kompatibilitas:** dua versi terakhir Chrome, Safari, Firefox, Edge; Android Chrome dan iOS Safari.
- **Degradasi:** bila localStorage tidak tersedia (mode privat), form tetap bisa dikirim lewat WhatsApp dengan pesan peringatan.

## 9. Desain & Identitas Visual

**Palet (acuan Gerindra, final disesuaikan di desain):**
| Peran | Warna indikatif |
|---|---|
| Primer (merah) | `#C8102E` dan varian lebih gelap `#9B0C23` |
| Aksen (emas) | `#F2B705` |
| Latar | Putih `#FFFFFF` dan abu hangat `#FAF7F5` |
| Teks | `#1F1F1F` / `#4A4A4A` |

Ditempatkan sebagai token di `tailwind.config.js` (`colors.brand.*`) agar mudah diganti.

**Tipografi:** judul tebal dan besar, isi 16-18px, jarak antarbaris longgar.
**Komponen:** tombol primer/sekunder, kartu dengan sudut membulat, badge kategori, timeline, accordion, modal lightbox, toast notifikasi.
**Nuansa:** santai dan hangat, foto kegiatan lapangan, teks bahasa Indonesia sehari-hari. Logo partai/KADIN hanya dipakai bila izin ada.

## 10. Struktur Proyek
```
/
├─ index.html, tentang.html, program.html, kegiatan.html,
│  kegiatan-detail.html, galeri.html, pengusaha.html, relawan.html,
│  aspirasi.html, kontak.html, privasi.html, admin-demo.html, 404.html
├─ src/
│  └─ input.css                 (direktif Tailwind + komponen kustom)
├─ dist/
│  └─ styles.css                (hasil build)
├─ js/
│  ├─ config.js                 (identitas, kontak, tautan)
│  ├─ main.js                   (navigasi, header sticky, tombol WA)
│  ├─ storage.js                (wrapper localStorage, mudah diganti ke API)
│  ├─ forms.js                  (validasi, submit, kirim WA)
│  ├─ filters.js, lightbox.js, share.js, csv.js
│  └─ data/ kegiatan.js, program.js, galeri.js
├─ assets/ img/, video/, fonts/
├─ tailwind.config.js, package.json
├─ sitemap.xml, robots.txt
└─ README.md                    (cara build dan deploy)
```
Header, footer, dan tombol WA dirender dari `main.js` memakai template string agar tidak diulang di tiap halaman (dengan `<noscript>` sebagai fallback tautan dasar).

## 11. Data & Penyimpanan (localStorage)
| Kunci | Isi |
|---|---|
| `cakali:relawan` | Array pendaftar relawan `{id, createdAt, nama, wa, kabupaten, kecamatan, desa, usia, pekerjaan, peran[], motivasi}` |
| `cakali:aspirasi` | Array aspirasi `{id, tiket, createdAt, nama?, kontak?, kabupaten, kecamatan, kategori, judul, isi, foto?}` |
| `cakali:draft:<form>` | Draf sementara form |
| `cakali:v` | Versi skema untuk migrasi |

Semua operasi lewat `storage.js` dengan `try/catch`, batasi ukuran (kuota ~5 MB), dan fallback bila tidak tersedia.

## 12. Konten yang Dibutuhkan dari Klien
Lihat bagian 10 pada project brief. Sementara itu gunakan **konten placeholder** yang jelas bertanda dan mudah dicari-ganti (semua teks utama di `config.js` dan `js/data/`).

## 13. Kepatuhan
- Sebelum masa kampanye resmi, konten hanya berupa sosialisasi dan program, tanpa ajakan mencoblos.
- Persetujuan data pribadi wajib di tiap form; kebijakan privasi mudah diakses.
- Hanya gunakan foto/logo yang ada izinnya.

## 14. Kriteria Penerimaan
1. Seluruh halaman 5.1 dapat dibuka dan tertata baik di desktop (≥1024px) dan mobile (≥360px).
2. Form relawan dan aspirasi menolak input tidak valid, menyimpan input valid ke localStorage, dan menampilkan tautan WhatsApp dengan isi pesan yang benar.
3. Admin Demo menampilkan data tersimpan dan dapat diekspor CSV.
4. Lighthouse mobile ≥ 90 untuk Beranda.
5. Tidak ada galat konsol; tidak ada scroll horizontal pada 360px.
6. Pratinjau Open Graph tampil benar saat tautan dibagikan.
7. Mengganti nama, nomor WA, tagline, dan konten kegiatan cukup dengan mengubah `config.js` dan `js/data/*`.

## 15. Tahapan Pengerjaan
| Tahap | Isi |
|---|---|
| 1. Setup | Inisialisasi proyek, Tailwind CLI, config token warna, struktur folder |
| 2. Kerangka & komponen | Header, footer, tombol WA, komponen dasar |
| 3. Halaman konten | Beranda, Tentang, Program, Kegiatan (+detail), Galeri, Pengusaha, Kontak, Privasi, 404 |
| 4. Fitur interaktif | Form relawan dan aspirasi, storage, kirim WA, Admin Demo |
| 5. Poles & QA | Responsif, aksesibilitas, SEO/OG, performa, uji lintas perangkat |
| 6. Deploy | Hosting statis, domain `cakali.id`, serah terima + README |

## 16. Risiko & Pertanyaan Terbuka
- **Data tidak sampai ke tim** selama masih localStorage; pastikan klien paham, dan rencanakan fase 2 (form service/backend) lebih awal.
- Penyimpanan foto dalam localStorage memakan kuota; batasi ukuran atau tahan fitur foto sampai ada backend.
- Konten asli (bio, program, foto) belum ada; jadwal bergantung pada klien.
- Izin penggunaan logo partai/KADIN belum dikonfirmasi.
- Nomor WhatsApp resmi dan siapa yang memantau pesan masuk belum ditetapkan.
- Timeline dan budget belum ditentukan.

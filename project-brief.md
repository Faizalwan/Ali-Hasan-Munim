# Project Brief: Website "Cak Ali" (Ali Hasan Mun'im, S.E)

## 1. Ringkasan
Website personal branding untuk **Ali Hasan Mun'im, S.E ("Cak Ali")**, calon anggota legislatif Pemilu 2029. Website berfungsi sebagai fondasi citra dan basis dukungan jangka panjang, dengan fitur interaktif berupa **kanal aspirasi** dan **pendaftaran relawan**.

## 2. Latar Belakang Klien
- Politisi, caleg Pemilu 2019: DPRD Provinsi Jawa Timur, **Dapil Jatim IV (Bondowoso, Situbondo, Banyuwangi)**, **Partai Gerindra**, nomor urut 4. Tagline 2019: "Generasi Baru Jawa Timur".
- Terhubung dengan dunia usaha melalui **KADIN Indonesia**.
- Untuk 2029, partai dan dapil **diasumsikan sama** dengan 2019 (belum final, harus mudah diubah).
- Aset saat ini: Instagram [@alihasanmunim](https://www.instagram.com/alihasanmunim/). Belum ada logo personal, panduan brand, atau website.

## 3. Tujuan
1. **Utama: pencitraan/branding.** Membangun figur Cak Ali yang dikenal, dekat, dan kredibel.
2. Menjaring **relawan** per wilayah.
3. Menyediakan **kanal aspirasi** warga.

**Indikator keberhasilan (awal):** website online dan cepat dibuka di HP, jumlah pendaftar relawan, jumlah aspirasi masuk, trafik dari Instagram/WhatsApp.

## 4. Target Audiens
| Segmen | Kebutuhan / pendekatan |
|---|---|
| Pemilih umum (dapil Bondowoso, Situbondo, Banyuwangi) | Bahasa sederhana, program konkret per wilayah, akses lewat HP dan WhatsApp |
| Pengusaha / kalangan KADIN | Sisi profesional, pengalaman usaha, gagasan ekonomi dan UMKM |
| Anak muda | Tampilan segar, konten visual/video, mudah dibagikan |

## 5. Gaya & Identitas Visual
- **Nada:** merakyat, santai, hangat; sapaan "Cak Ali". Bahasa Indonesia sehari-hari, sentuhan lokal secukupnya.
- **Warna:** mengambil palet **Gerindra** (merah, putih, emas/kuning) sebagai warna utama, dengan putih dominan agar bersih dan mudah dibaca. Kontras harus memenuhi standar keterbacaan.
- **Foto:** memakai foto asli Cak Ali (kemeja putih khas), dengan nuansa kegiatan di lapangan.
- **Logo/lambang partai:** dipakai hanya bila ada izin/materi resmi; sediakan slot yang mudah dilepas atau diganti.
- Desain **mobile-first**.

## 6. Ruang Lingkup Fitur

### 6.1 Wajib (fase 1)
- **Beranda:** hero (foto, nama, tagline), ajakan bertindak (Jadi Relawan, Sampaikan Aspirasi), ringkasan program, cuplikan kegiatan.
- **Tentang Cak Ali:** profil, perjalanan, pengalaman usaha/organisasi, alasan maju.
- **Visi & Program:** program prioritas per isu (mis. ekonomi/UMKM, pemuda, infrastruktur, pertanian/nelayan) dan per wilayah dapil.
- **Kegiatan / Berita:** daftar kegiatan statis (kartu dengan foto, tanggal, ringkasan).
- **Galeri:** foto, dan video yang disematkan dari Instagram/YouTube.
- **Form Relawan:** nama, nomor WhatsApp, kabupaten/kecamatan/desa, usia/pekerjaan, motivasi, persetujuan data pribadi.
- **Form Aspirasi:** nama (opsional), kontak, wilayah, kategori masalah, isi aspirasi, unggah foto (opsional), persetujuan data pribadi.
- **Kontak & media sosial:** tombol WhatsApp, tautan Instagram.
- **Tombol bagikan** ke WhatsApp dan media sosial di tiap halaman.
- **Kebijakan Privasi** dan penafian (disclaimer) singkat.

### 6.2 Sebaiknya ada
- Halaman khusus **Pengusaha/UMKM** (gagasan ekonomi, ajakan kolaborasi).
- Peta/kartu per kabupaten di dapil.
- Feed Instagram tertanam.
- SEO dasar dan Open Graph (pratinjau cantik saat dibagikan di WhatsApp).

### 6.3 Fase berikutnya (di luar lingkup sekarang)
- CMS agar tim bisa memperbarui konten sendiri.
- Status tindak lanjut aspirasi yang bisa dilihat publik.
- Halaman masa kampanye resmi (nomor urut, contoh surat suara, hitung mundur, kalender kampanye).
- Donasi/dukungan (wajib ikuti aturan dana kampanye).
- Versi multibahasa/daerah.

## 7. Pendekatan Teknis
- **Website statis** (HTML/CSS/JS, atau generator statis seperti Astro/Eleventy). Tanpa backend dan tanpa CMS di fase ini; konten ditulis langsung di file.
- **Form interaktif tanpa server sendiri:** gunakan layanan form pihak ketiga (mis. Formspree/Web3Forms/Google Forms) yang meneruskan ke email atau Google Sheets, ditambah opsi tombol "kirim via WhatsApp". Keputusan final layanan dibahas saat implementasi.
- **Hosting:** layanan statis gratis/murah (Netlify, Cloudflare Pages, atau Vercel) dengan HTTPS.
- **Domain:** `cakali.id` (dibeli belakangan; pastikan ketersediaan lebih awal).
- **Performa:** ringan untuk sinyal lemah, gambar dioptimasi (WebP, lazy loading), target skor Lighthouse mobile tinggi.
- **Aksesibilitas:** kontras cukup, ukuran huruf nyaman, teks alternatif gambar.
- Struktur konten dipisah (mis. file data/Markdown) agar mudah dipindah ke CMS nanti.

## 8. Pertimbangan Hukum & Etika
- Patuhi ketentuan **KPU/Bawaslu**: sebelum masa kampanye resmi, konten berupa sosialisasi dan program, **bukan ajakan mencoblos**.
- **Data pribadi (UU PDP):** form wajib punya persetujuan eksplisit dan kebijakan privasi; jelaskan data dipakai untuk apa dan siapa yang menyimpannya.
- Hanya gunakan foto, logo, dan materi yang ada izin/hak pakainya.
- Klaim dan data dalam konten harus bisa dipertanggungjawabkan.

## 9. Struktur Halaman (usulan)
```
/                 Beranda
/tentang          Tentang Cak Ali
/program          Visi & Program
/kegiatan         Kegiatan / Berita
/galeri           Galeri
/relawan          Pendaftaran Relawan
/aspirasi         Kanal Aspirasi
/pengusaha        (opsional) Untuk Pengusaha & UMKM
/privasi          Kebijakan Privasi
```

## 10. Input yang Dibutuhkan dari Klien
- Ketegasan pencalonan 2029: tingkat, dapil, partai, nomor urut (bila sudah ada).
- Biografi, riwayat pendidikan, organisasi, dan pengalaman usaha.
- Daftar program/isu prioritas dan visi-misi.
- Foto resolusi tinggi dan video; izin penggunaan logo partai/KADIN.
- Nomor WhatsApp resmi dan email penerima aspirasi/relawan.
- Siapa admin yang menerima dan menindaklanjuti aspirasi dan data relawan.

## 11. Asumsi & Risiko
- Partai/dapil bisa berubah, sehingga konten khusus partai dan dapil dibuat modular.
- Form pihak ketiga punya batas kuota di paket gratis.
- Tanpa CMS, setiap perubahan konten butuh developer sampai fase CMS selesai.
- Tanpa pengelola konten rutin, website cepat terlihat usang.

## 12. Tahapan Kerja (usulan)
1. Finalisasi brief dan kumpulkan aset/konten dari klien
2. Desain: palet, tipografi, wireframe, lalu mockup beranda
3. Pengembangan halaman statis dan form
4. Uji (HP, kecepatan, form) dan revisi
5. Beli domain `cakali.id`, deploy, dan serah terima
6. Rencana fase 2: CMS dan fitur tambahan

*Catatan: timeline dan budget belum ditentukan; ditambahkan setelah diskusi dengan klien.*

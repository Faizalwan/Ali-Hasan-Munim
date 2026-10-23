# cakali.id

Website statis Cak Ali (Ali Hasan Mun'im, S.E). Lihat [project-brief.md](project-brief.md), [PRD.md](PRD.md), dan [design-system.html](design-system.html).

## Stack
HTML · Tailwind CSS v3 (standalone CLI, tanpa Node.js) · vanilla JS (ES modules) · localStorage

## Struktur
```
index.html            Beranda (halaman lain menyusul sesuai PRD)
design-system.html    Pedoman visual & komponen (pakai CDN, tidak ikut build)
src/input.css         Direktif Tailwind + kelas komponen (.btn, .card, .input, ...)
dist/styles.css       Hasil build, ini yang dipakai halaman
tailwind.config.js    Token warna, font, bayangan
js/config.js          Nama, kontak, WhatsApp, media sosial, fakta, menu
js/main.js            Header, menu mobile, footer, tombol WA (semua halaman)
js/icons.js           Ikon SVG (data-icon="...")
js/utils.js           esc(), waLink(), formatDate()
js/data/*.js          Konten: program, kegiatan
js/pages/*.js         Skrip khusus per halaman
assets/img/           Foto
tools/tailwindcss.exe Tailwind standalone CLI (tidak di-commit)
tools/cutout.ps1      Memotong latar putih polos dari foto (untuk foto hero)
```

## Menjalankan
1. Pastikan `tools/tailwindcss.exe` ada. Jika belum, unduh `tailwindcss-windows-x64.exe` v3.4.17 dari
   https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17 dan simpan sebagai `tools/tailwindcss.exe`.
2. Build CSS: jalankan `build.cmd` (minify) atau `watch.cmd` (otomatis saat mengedit).
3. Buka lewat server lokal, bukan dobel-klik file (ES modules tidak jalan di `file://`):
   ```
   powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1
   ```
   lalu buka http://localhost:5500/

## Foto hero (latar transparan)
Foto studio berlatar putih polos bisa dipotong otomatis:
```
powershell -NoProfile -ExecutionPolicy Bypass -File tools/cutout.ps1 -In foto.webp -Out assets/img/cak-ali-cutout.png -Preview cek.png -Threshold 253 -MaxChroma 2
```
Buka `cek.png` (hasil di atas latar merah) untuk memastikan tidak ada bagian kemeja yang ikut hilang.
Untuk hasil terbaik, minta foto berformat PNG transparan dari fotografer.

## Aturan
- Ikuti `design-system.html`; komponen baru ditambahkan di sana dan di `src/input.css`.
- Teks identitas dan kontak diubah di `js/config.js`; konten di `js/data/`.
- Nilai bertanda `TODO` masih placeholder (nomor WhatsApp, email, angka fakta, kutipan, isi program/kegiatan).
- Jalankan `build.cmd` sebelum deploy.

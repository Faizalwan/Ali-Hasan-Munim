// Program prioritas. TODO: rincian final dari klien.
// image: id foto Unsplash ("photo-...") atau path lokal. href: tautan khusus (bawaan program.html#id).
// Program pertama dan terakhir tampil besar di beranda.

export const programs = [
  {
    id: 'umkm',
    icon: 'store',
    title: 'Ekonomi & UMKM',
    summary: 'Akses modal, pelatihan digital, dan pasar yang lebih luas untuk usaha kecil di desa.',
    image: 'photo-1604973104381-870c92f10343'
  },
  {
    id: 'pemuda',
    icon: 'graduation',
    title: 'Pemuda & Pendidikan',
    summary: 'Beasiswa, ruang kreatif, dan pelatihan kerja untuk anak muda.',
    image: 'photo-1566409031818-9508be68fc74'
  },
  {
    id: 'tani-nelayan',
    icon: 'sprout',
    title: 'Petani & Nelayan',
    summary: 'Pupuk tepat waktu, alat tangkap, dan harga panen yang adil.',
    image: 'photo-1521841313031-a1485f842d34'
  },
  {
    id: 'infrastruktur',
    icon: 'building',
    title: 'Infrastruktur Desa',
    summary: 'Jalan, irigasi, dan air bersih yang layak sampai ke pelosok.',
    image: 'photo-1621526402311-4caf81fe77c6'
  },
  {
    id: 'kesehatan',
    icon: 'heart-pulse',
    title: 'Layanan Kesehatan',
    summary: 'Puskesmas yang mudah dijangkau dan pendampingan BPJS untuk warga.',
    image: 'photo-1599717460927-8101594d1418'
  },
  {
    id: 'aspirasi',
    icon: 'megaphone',
    title: 'Wakil yang Mendengar',
    summary: 'Kanal aspirasi terbuka dan kunjungan rutin ke tiap kecamatan. Masalah di desamu jadi pekerjaan rumah kami.',
    image: 'photo-1611087802810-046bb671e644',
    href: 'aspirasi.html',
    cta: 'Sampaikan aspirasi'
  }
];

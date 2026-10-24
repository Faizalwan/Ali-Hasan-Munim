// Daftar kabar/kegiatan, terbaru tampil paling atas di beranda (2 kartu utama + 4 daftar).
// Judul diambil dari feed Instagram (liputan lensajatim.id). TODO: tanggal pasti, isi lengkap, dan foto asli dari klien.
// image: id foto Unsplash ("photo-...") atau path lokal.

export const kegiatan = [
  {
    id: 'museum-megalitikum-bondowoso',
    date: '2026-10-08', // TODO: tanggal pasti
    category: 'Budaya',
    title: 'Cak Ali dukung gagasan Bupati Bondowoso membangun Museum Megalitikum Nasional',
    summary: 'Situs megalitikum Bondowoso dinilai punya nilai sejarah tinggi dan bisa menjadi penggerak wisata serta ekonomi warga sekitar.',
    region: 'Bondowoso',
    image: 'photo-1621526402311-4caf81fe77c6'
  },
  {
    id: 'hari-tani-2026',
    date: '2026-09-24',
    category: 'Pertanian',
    title: 'Hari Tani Nasional 2026: Cak Ali dorong perluasan akses pasar hasil pertanian',
    summary: 'Panen yang melimpah harus berujung pada kesejahteraan. Petani butuh kepastian pasar dan harga yang adil untuk hasil buminya.',
    region: 'Jawa Timur',
    image: 'photo-1521841313031-a1485f842d34'
  },
  {
    id: 'kapolda-iklim-usaha',
    date: '2026-09-10', // TODO: tanggal pasti
    category: 'Ekonomi',
    title: 'Sambut Kapolda Jatim, Cak Ali dorong keamanan investasi dan iklim usaha yang kondusif',
    summary: 'Rasa aman menjadi syarat utama agar pelaku usaha berani berinvestasi dan membuka lapangan kerja di daerah.',
    region: 'Surabaya',
    image: 'photo-1604973104381-870c92f10343'
  },
  {
    id: 'santri-pengusaha',
    date: '2026-08-18', // TODO: tanggal pasti
    category: 'Pendidikan',
    title: 'Dorong santri jadi pengusaha tangguh, pesantren harus mandiri menuju Indonesia Emas',
    summary: 'Pesantren bukan hanya pusat ilmu agama, tetapi juga bisa menjadi tempat lahirnya wirausahawan muda yang mandiri.',
    region: 'Jawa Timur',
    image: 'photo-1566409031818-9508be68fc74'
  },
  {
    id: 'kemandirian-ekonomi-umat',
    date: '2026-07-30', // TODO: tanggal pasti
    category: 'Ekonomi',
    title: 'KADIN soroti peluang besar membangun kemandirian ekonomi umat',
    summary: 'Kolaborasi organisasi keagamaan dan dunia usaha dinilai bisa memperkuat ekonomi warga dari tingkat desa.',
    region: 'Jawa Timur',
    image: 'photo-1581405784351-6f26c4720c5c'
  },
  {
    id: 'kurban-pesantren-bondowoso',
    date: '2026-05-27',
    category: 'Sosial',
    title: 'Cak Ali salurkan hewan kurban untuk pesantren di Bondowoso',
    summary: 'Momen Iduladha menjadi kesempatan berbagi bersama santri dan warga sekitar pesantren.',
    region: 'Bondowoso',
    image: 'photo-1671080749889-19f8a69deb2b'
  },
  {
    id: 'hari-pers-2026',
    date: '2026-02-09',
    category: 'Opini',
    title: 'Hari Pers Nasional 2026: pers yang sehat adalah fondasi demokrasi dan ekonomi bangsa',
    summary: 'Informasi yang jernih membantu warga mengambil keputusan dan menjaga kepercayaan publik.',
    region: 'Jawa Timur',
    image: 'photo-1541064828014-503911d13103'
  }
];

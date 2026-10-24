// Daftar kabar/kegiatan, terbaru tampil paling atas di beranda (2 kartu utama + 4 daftar).
// Judul diambil dari feed Instagram (liputan lensajatim.id), urutan tanggal mengikuti urutan feed.
// TODO: tanggal pasti dan isi lengkap dari klien. Tanggal tanpa TODO sudah pasti (hari peringatan).
// short: judul singkat untuk kartu galeri. image: path lokal atau id foto Unsplash ("photo-..."). imagePos: titik fokus saat foto dipotong tegak di galeri.

export const kegiatan = [
  {
    id: 'hipka-ketahanan-pangan',
    short: 'Sinergi Ketahanan Pangan',
    date: '2026-10-06', // TODO: tanggal pasti
    category: 'Pertanian',
    title: 'Dukung program ketahanan pangan, HIPKA bangun sinergi dengan Kementan RI',
    summary: 'Pengusaha dan pemerintah perlu bergerak bersama agar pasokan pangan terjaga dan petani ikut sejahtera.',
    region: 'Jakarta',
    image: 'assets/img/kabar/hipka-ketahanan-pangan.webp',
    imagePos: '50% center',
    imageAlt: 'Cak Ali bersama pengurus HIPKA berfoto di Kementerian Pertanian'
  },
  {
    id: 'kapolda-iklim-usaha',
    short: 'Sambut Kapolda Jatim',
    date: '2026-09-30', // TODO: tanggal pasti
    category: 'Ekonomi',
    title: 'Sambut Kapolda Jatim, Cak Ali dorong keamanan investasi dan iklim usaha yang kondusif',
    summary: 'Rasa aman menjadi syarat utama agar pelaku usaha berani berinvestasi dan membuka lapangan kerja di daerah.',
    region: 'Surabaya',
    image: 'assets/img/kabar/kapolda-iklim-usaha.webp',
    imagePos: '48% center',
    imageAlt: 'Cak Ali memberi sambutan di podium'
  },
  {
    id: 'hari-tani-2026',
    short: 'Hari Tani Nasional',
    date: '2026-09-24',
    category: 'Pertanian',
    title: 'Hari Tani Nasional 2026: Cak Ali dorong perluasan akses pasar hasil pertanian',
    summary: 'Panen yang melimpah harus berujung pada kesejahteraan. Petani butuh kepastian pasar dan harga yang adil untuk hasil buminya.',
    region: 'Jawa Timur', // TODO: nama kota
    image: 'assets/img/kabar/hari-tani-2026.webp',
    imagePos: '45% center',
    imageAlt: 'Cak Ali berbicara dalam sebuah forum diskusi'
  },
  {
    id: 'kemandirian-ekonomi-umat',
    short: 'Silaturahmi Ekonomi Umat',
    date: '2026-09-05', // TODO: tanggal pasti
    category: 'Ekonomi',
    title: 'KADIN soroti peluang besar membangun kemandirian ekonomi umat',
    summary: 'Kolaborasi organisasi keagamaan dan dunia usaha dinilai bisa memperkuat ekonomi warga dari tingkat desa.',
    region: 'Jakarta',
    image: 'assets/img/kabar/ekonomi-umat.webp',
    imagePos: '90% center',
    imageAlt: 'Cak Ali bersilaturahmi dengan para kiai'
  },
  {
    id: 'hut-ri-81',
    short: 'Malam HUT ke-81 RI',
    date: '2026-08-22', // TODO: tanggal pasti
    category: 'Kebangsaan',
    title: 'Semarak malam puncak HUT ke-81 RI, Cak Ali ajak warga meneladani perjuangan pahlawan',
    summary: 'Peringatan kemerdekaan menjadi momen merawat semangat gotong royong bersama warga.',
    region: 'Jawa Timur', // TODO: nama kota
    image: 'assets/img/kabar/hut-ri-81.webp',
    imagePos: '72% center',
    imageAlt: 'Cak Ali memberi sambutan di panggung malam puncak HUT RI'
  },
  {
    id: 'kurban-pesantren-bondowoso',
    short: 'Kurban untuk Pesantren',
    date: '2026-05-27',
    category: 'Sosial',
    title: 'Cak Ali salurkan hewan kurban untuk pesantren di Bondowoso',
    summary: 'Momen Iduladha menjadi kesempatan berbagi bersama santri dan warga sekitar pesantren.',
    region: 'Bondowoso',
    image: 'assets/img/kabar/kurban-pesantren.webp',
    imagePos: '58% center',
    imageAlt: 'Cak Ali menyerahkan sapi kurban kepada pengasuh pesantren'
  },
  {
    id: 'hari-pers-2026',
    short: 'Hari Pers Nasional',
    date: '2026-02-09',
    category: 'Opini',
    title: 'Hari Pers Nasional 2026: pers yang sehat adalah fondasi demokrasi dan ekonomi bangsa',
    summary: 'Informasi yang jernih membantu warga mengambil keputusan dan menjaga kepercayaan publik.',
    region: 'Jakarta',
    image: 'assets/img/kabar/hari-pers-2026.webp',
    imagePos: '64% center',
    imageAlt: 'Cak Ali di forum B20 Indonesia dan BKSAP DPR RI'
  },
  {
    id: 'santri-pengusaha',
    short: 'Pesantrenpreneur',
    date: '2026-01-20', // TODO: tanggal pasti
    category: 'Pendidikan',
    title: 'Dorong santri jadi pengusaha tangguh, pesantren harus mandiri menuju Indonesia Emas',
    summary: 'Pesantren bukan hanya pusat ilmu agama, tetapi juga bisa menjadi tempat lahirnya wirausahawan muda yang mandiri.',
    region: 'Depok', // TODO: konfirmasi kota (dari spanduk di foto)
    image: 'assets/img/kabar/santri-pengusaha.webp',
    imagePos: '50% center',
    imageAlt: 'Cak Ali menerima penghargaan di acara Pesantrenpreneur'
  },
  {
    id: 'museum-megalitikum-bondowoso',
    short: 'Museum Megalitikum',
    date: '2025-12-15', // TODO: tanggal pasti dan foto asli
    category: 'Budaya',
    title: 'Cak Ali dukung gagasan Bupati Bondowoso membangun Museum Megalitikum Nasional',
    summary: 'Situs megalitikum Bondowoso dinilai punya nilai sejarah tinggi dan bisa menjadi penggerak wisata serta ekonomi warga sekitar.',
    region: 'Bondowoso',
    image: 'photo-1621526402311-4caf81fe77c6'
  }
];

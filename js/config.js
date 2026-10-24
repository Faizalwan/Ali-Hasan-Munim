// Identitas, kontak, menu, dan teks utama situs. Ganti nilai di sini, bukan di HTML.
// Nilai bertanda TODO masih placeholder dan harus dikonfirmasi ke klien.

import { programs } from './data/program.js';

export const config = {
  site: {
    name: 'Cak Ali',
    url: 'https://cakali.id',
    // Logo tulisan tangan (PNG transparan, dibuat dengan tools/logo.ps1)
    logo: 'assets/img/logo-cak-ali.png',
    logoWhite: 'assets/img/logo-cak-ali-white.png',
    disclaimer: 'Konten situs ini bersifat sosialisasi.'
  },

  person: {
    fullName: "Ali Hasan Mun'im, S.E",
    nickname: 'Cak Ali',
    photo: 'assets/img/cak-ali-portrait.webp',
    // Foto potong (latar transparan) untuk hero, dari klien.
    cutout: 'assets/img/cak-ali-hero.webp'
  },

  // Diasumsikan sama dengan Pemilu 2019 (lihat project-brief.md).
  campaign: {
    party: 'Partai Gerindra',
    level: 'DPRD Provinsi Jawa Timur',
    dapil: 'Dapil Jawa Timur IV',
    regions: ['Bondowoso', 'Situbondo', 'Banyuwangi'],
    tagline: 'Bersama Cak Ali, membangun Jawa Timur dari desa',
    subTagline: 'Berangkat dari dunia usaha, Cak Ali ingin mendengar aspirasi warga, memahami kebutuhan, dan mendorong solusi nyata untuk Jawa Timur yang lebih maju dan sejahtera.',
    ticker: ['Bondowoso', 'Situbondo', 'Banyuwangi', 'Mendengar langsung', 'Bekerja nyata', 'Dari desa untuk Jawa Timur']
  },

  contact: {
    whatsapp: '6280000000000', // TODO: nomor WhatsApp resmi, format 62xxx tanpa + dan spasi
    email: 'halo@cakali.id', // TODO
    address: 'Posko Cak Ali, Bondowoso, Jawa Timur', // TODO: alamat posko
    waGreeting: 'Halo tim Cak Ali, saya ingin bertanya.'
  },

  social: {
    instagram: 'https://www.instagram.com/alihasanmunim/',
    instagramHandle: '@alihasanmunim',
    facebook: '', // TODO
    youtube: '' // TODO
  },

  // Kartu video di hero. Isi salah satu: youtubeId ATAU mp4. Bila keduanya kosong,
  // pemutar menampilkan pesan "Video segera hadir" + tautan Instagram.
  heroVideo: {
    title: 'Kenalan dengan Cak Ali',
    duration: '1:30', // TODO: sesuaikan dengan durasi video
    poster: 'assets/img/cak-ali-portrait.webp',
    youtubeId: '', // TODO: ID video YouTube (bagian setelah "v=" di tautan)
    mp4: '' // TODO: atau file lokal, mis. 'assets/video/kenalan.mp4'
  },

  quote: {
    text: 'Kemajuan daerah berawal dari desa dan dari warganya. Tugas saya adalah mendengar, memperjuangkan, dan menghadirkan solusi bersama.' // TODO: konfirmasi ke klien
  },

  // Menu utama, maksimal 5. Grup dengan "items" tampil sebagai mega menu.
  // item.wa = true → tautan WhatsApp. pages = data-page yang menandai menu aktif.
  nav: [
    {
      id: 'tentang',
      label: 'Tentang',
      title: 'Kenal Cak Ali',
      intro: 'Siapa Cak Ali, dari mana ia berangkat, dan apa yang ia perjuangkan.',
      pages: ['tentang'],
      items: [
        { icon: 'users', label: 'Profil Cak Ali', desc: 'Latar belakang keluarga, pendidikan, dan dunia usaha.', href: 'tentang.html' },
        { icon: 'route', label: 'Perjalanan', desc: 'Jejak langkah dari kampung, KADIN, hingga Pemilu 2019.', href: 'tentang.html#perjalanan' },
        { icon: 'flag', label: 'Visi & Misi', desc: 'Arah perjuangan untuk Dapil Jawa Timur IV.', href: 'program.html#visi' },
        { icon: 'shield-check', label: 'Nilai yang Dipegang', desc: 'Turun langsung, terbuka, dan amanah.', href: 'tentang.html#nilai' }
      ],
      feature: { image: 'photo-1558005530-a7958896ec60', eyebrow: 'Kenalan', title: 'Pengusaha yang tumbuh dari kampung, kembali untuk kampung', cta: 'Baca Profil', href: 'tentang.html' }
    },
    {
      id: 'program',
      label: 'Program',
      title: 'Program Prioritas',
      intro: 'Disusun dari obrolan langsung dengan warga, petani, nelayan, dan pelaku usaha di dapil.',
      pages: ['program', 'pengusaha'],
      items: [
        ...programs.map(p => ({ icon: p.icon, label: p.title, desc: p.summary, href: p.href || `program.html#${p.id}` })),
        { icon: 'briefcase', label: 'Untuk Pengusaha & UMKM', desc: 'Gagasan ekonomi dan ajakan kolaborasi untuk pelaku usaha.', href: 'pengusaha.html' }
      ]
    },
    {
      id: 'kabar',
      label: 'Kabar',
      title: 'Kabar Cak Ali',
      intro: 'Ikuti kegiatan, foto, dan jadwal kunjungan Cak Ali di tiga kabupaten.',
      pages: ['kegiatan', 'galeri'],
      items: [
        { icon: 'newspaper', label: 'Kegiatan', desc: 'Catatan blusukan, diskusi, dan reses terbaru.', href: 'kegiatan.html' },
        { icon: 'camera', label: 'Galeri', desc: 'Foto dan video dari lapangan.', href: 'galeri.html' },
        { icon: 'calendar', label: 'Agenda Kunjungan', desc: 'Jadwal Cak Ali turun ke desa-desa.', href: 'kegiatan.html#agenda' },
        { icon: 'instagram', label: 'Instagram', desc: 'Kabar harian di @alihasanmunim.', href: 'https://www.instagram.com/alihasanmunim/', external: true }
      ],
      feature: { image: 'photo-1603725616907-82eb483d7dea', eyebrow: 'Dari lapangan', title: 'Menyusuri tapal kuda, dari Ijen sampai pesisir', cta: 'Lihat Kegiatan', href: 'kegiatan.html' }
    },
    {
      id: 'terlibat',
      label: 'Terlibat',
      title: 'Ayo Terlibat',
      intro: 'Perubahan tidak bisa sendirian. Pilih cara yang paling pas buatmu.',
      pages: ['relawan', 'aspirasi'],
      items: [
        { icon: 'users', label: 'Jadi Relawan', desc: 'Bantu kabarkan program di desa dan kecamatanmu.', href: 'relawan.html' },
        { icon: 'megaphone', label: 'Sampaikan Aspirasi', desc: 'Ceritakan masalah di desamu, kami catat dan kawal.', href: 'aspirasi.html' },
        { icon: 'whatsapp', label: 'Chat via WhatsApp', desc: 'Ngobrol langsung dengan tim Cak Ali.', wa: true }
      ],
      feature: { image: 'photo-1623210412831-e29c8c5b81cf', eyebrow: 'Relawan', title: 'Bergerak bareng tetangga, mulai dari desamu', cta: 'Daftar Relawan', href: 'relawan.html' }
    },
    { id: 'kontak', label: 'Kontak', href: 'kontak.html', pages: ['kontak'] }
  ]
};

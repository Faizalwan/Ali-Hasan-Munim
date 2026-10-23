/** Token mengikuti design-system.html. Ubah di sini, lalu jalankan build.cmd. */
module.exports = {
  // design-system.html memakai CDN sendiri, jadi tidak ikut dipindai.
  content: ['./*.html', '!./design-system.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FEF2F3', 100: '#FDE3E5', 200: '#FBCBD0', 300: '#F7A1AA', 400: '#F0697A',
          500: '#E43B51', 600: '#C8102E', 700: '#A50D26', 800: '#880F24', 900: '#741124', 950: '#40050F'
        },
        gold: {
          50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D', 400: '#F8C21C',
          500: '#F2B705', 600: '#D69403', 700: '#B16B06', 800: '#90530C', 900: '#76440D'
        },
        cream: '#F7F2EA',
        wa: { DEFAULT: '#15803D', hover: '#166534' }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // tulisan tangan untuk nama di hero
        script: ['Caveat', 'cursive']
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,25,23,.04), 0 2px 8px rgba(28,25,23,.04)',
        'soft-lg': '0 4px 12px rgba(28,25,23,.06), 0 16px 40px rgba(28,25,23,.08)'
      },
      maxWidth: { site: '72rem' },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        'mega-in': { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'none' } }
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        'mega-in': 'mega-in .2s ease-out'
      }
    }
  }
};

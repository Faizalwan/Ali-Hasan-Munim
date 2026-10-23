import { config } from './config.js';

// Escape teks sebelum dimasukkan ke innerHTML (cegah XSS dari data/localStorage).
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

export function waLink(text = config.contact.waGreeting) {
  return `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function formatDate(iso) {
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}

// "photo-..." → URL Unsplash dengan ukuran tertentu; path lain dikembalikan apa adanya.
export function imgSrc(image, width = 800) {
  if (!image) return '';
  return image.startsWith('photo-')
    ? `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=70`
    : image;
}

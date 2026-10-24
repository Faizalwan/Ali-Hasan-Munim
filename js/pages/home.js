// Beranda: video hero, pita berjalan, profil, program (bento), dan kabar terkini dari js/data.

import { config } from '../config.js';
import { programs } from '../data/program.js';
import { kegiatan } from '../data/kegiatan.js';
import { renderIcons } from '../icons.js';
import { esc, formatDate, imgSrc } from '../utils.js';

const pad = n => String(n).padStart(2, '0');
const programHref = p => p.href || `program.html#${p.id}`;
const kegiatanHref = k => `kegiatan-detail.html?id=${encodeURIComponent(k.id)}`;

/* ---------- Hero ---------- */

// Kartu video → buka <dialog id="video-dialog">. Sumber dari config.heroVideo (YouTube atau mp4).
// Isi pemutar dikosongkan saat ditutup supaya video berhenti.
function setupVideo() {
  const dialog = document.getElementById('video-dialog');
  const frame = document.getElementById('video-frame');
  const title = document.getElementById('video-title');
  const v = config.heroVideo;
  if (!dialog || !v) return;

  document.querySelectorAll('[data-video-poster]').forEach(img => { if (v.poster) img.src = v.poster; });

  const player = () => {
    if (v.youtubeId) {
      return `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.youtubeId)}?autoplay=1&rel=0" title="${esc(v.title)}"
        class="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    }
    if (v.mp4) {
      return `<video src="${esc(v.mp4)}" poster="${esc(v.poster)}" class="h-full w-full bg-black" controls autoplay playsinline></video>`;
    }
    return `
      <div class="grid h-full place-items-center p-8 text-center">
        <div>
          <span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white"><svg data-icon="play" class="ml-0.5 h-6 w-6"></svg></span>
          <p class="mt-4 text-lg font-semibold text-white">Video segera hadir</p>
          <p class="mt-1 text-sm text-stone-400">Sementara itu, ikuti kabar harian ${esc(config.person.nickname)} di Instagram.</p>
          <a href="${esc(config.social.instagram)}" target="_blank" rel="noopener" class="btn btn-md mt-6 bg-white text-stone-900 hover:bg-stone-100"><svg data-icon="instagram" class="h-5 w-5"></svg> Buka Instagram</a>
        </div>
      </div>`;
  };

  document.querySelectorAll('[data-video]').forEach(btn => btn.addEventListener('click', () => {
    title.textContent = v.title;
    frame.innerHTML = player();
    renderIcons(frame);
    dialog.showModal();
  }));
  dialog.querySelector('[data-video-close]')?.addEventListener('click', () => dialog.close());
  // klik di area gelap di luar pemutar juga menutup
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { frame.innerHTML = ''; });
}

function renderTicker() {
  const el = document.getElementById('ticker');
  if (!el) return;
  const words = config.campaign.ticker.map(w =>
    `<span class="flex items-center gap-8">${esc(w)}<svg data-icon="sparkle" class="h-5 w-5 text-gold-400"></svg></span>`).join('');
  // Diulang dua kali agar animasi translateX(-50%) menyambung tanpa jeda.
  el.innerHTML = `<div class="flex shrink-0 gap-8 pr-8">${words}</div><div class="flex shrink-0 gap-8 pr-8">${words}</div>`;
  renderIcons(el);
}

/* ---------- Kenalan ---------- */

/* ---------- Program (carousel) ---------- */

// Kartu foto tinggi. Hover/fokus: foto membesar, ikon jadi merah, tautan "Selengkapnya" muncul.
// Di perangkat sentuh (tanpa hover) tautan itu langsung tampil.
function renderPrograms() {
  const el = document.getElementById('program-list');
  if (!el || !programs.length) return;
  el.innerHTML = programs.map((p, i) => `
    <li class="w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-[300px]">
      <a href="${esc(programHref(p))}" class="card-link group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl bg-stone-800 p-5 text-white md:p-6">
        <img src="${imgSrc(p.image, 700)}" alt="" class="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110" loading="lazy" />
        <span class="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/35 to-stone-950/10 transition duration-500 group-hover:from-brand-950/95 group-hover:via-stone-950/50 group-focus-visible:from-brand-950/95" aria-hidden="true"></span>
        <span class="relative flex items-start justify-between">
          <span class="text-sm font-semibold tracking-[0.2em] text-white/80">${pad(i + 1)}</span>
          <span class="grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur transition duration-300 group-hover:bg-brand-600 group-focus-visible:bg-brand-600"><svg data-icon="${esc(p.icon)}" class="h-5 w-5"></svg></span>
        </span>
        <span class="relative">
          <span class="block text-xl font-bold leading-snug md:text-2xl">${esc(p.title)}</span>
          <span class="mt-2 block text-sm leading-relaxed text-white/80">${esc(p.summary)}</span>
          <span class="grid transition-all duration-300 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100">
            <span class="overflow-hidden"><span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">${esc(p.cta || 'Selengkapnya')} <svg data-icon="arrow-right" class="h-4 w-4 transition group-hover:translate-x-1"></svg></span></span>
          </span>
        </span>
      </a>
    </li>`).join('');
  renderIcons(el);
  setupCarousel(el);
}

// Tombol panah menggeser satu kartu; tombol nonaktif di ujung.
function setupCarousel(list) {
  const prev = document.querySelector(`[data-carousel-prev][aria-controls="${list.id}"]`);
  const next = document.querySelector(`[data-carousel-next][aria-controls="${list.id}"]`);
  if (!prev || !next) return;
  const step = () => {
    const card = list.firstElementChild;
    return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap || 0) : list.clientWidth;
  };
  const update = () => {
    prev.disabled = list.scrollLeft <= 2;
    next.disabled = list.scrollLeft + list.clientWidth >= list.scrollWidth - 2;
  };
  prev.addEventListener('click', () => list.scrollBy({ left: -step() }));
  next.addEventListener('click', () => list.scrollBy({ left: step() }));
  list.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ---------- Kabar terkini ---------- */

function renderKabar() {
  const featuredEl = document.getElementById('kabar-featured');
  const listEl = document.getElementById('kabar-list');
  if (!featuredEl || !listEl) return;

  const sorted = [...kegiatan].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted.find(k => k.image) || sorted[0];
  const others = sorted.filter(k => k !== featured);
  const lists = {
    terbaru: others.slice(0, 4),
    populer: sorted.filter(k => k.popular).slice(0, 4)
  };

  featuredEl.innerHTML = `
    <a href="${kegiatanHref(featured)}" class="card-link group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl p-6 md:min-h-[440px] md:p-8">
      <img src="${imgSrc(featured.image, 1000)}" alt="${esc(featured.imageAlt || featured.title)}" class="absolute inset-0 h-full w-full bg-stone-800 object-cover object-top transition duration-500 group-hover:scale-105" loading="lazy" />
      <span class="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent"></span>
      <span class="relative">
        <span class="badge bg-brand-600 text-white">${esc(featured.category)}</span>
        <span class="mt-4 block text-2xl font-bold leading-tight text-white md:text-3xl">${esc(featured.title)}</span>
        <span class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-300">
          <span class="inline-flex items-center gap-1.5"><svg data-icon="calendar" class="h-4 w-4"></svg>${formatDate(featured.date)}</span>
          <span class="inline-flex items-center gap-1.5"><svg data-icon="map-pin" class="h-4 w-4"></svg>${esc(featured.region)}</span>
        </span>
        <span class="btn btn-sm mt-6 bg-white text-stone-900 group-hover:bg-stone-100">Baca selengkapnya</span>
      </span>
    </a>`;

  const renderList = key => {
    listEl.innerHTML = lists[key].map(k => `
      <li>
        <a href="${kegiatanHref(k)}" class="group flex gap-4 rounded-lg py-4">
          <img src="${imgSrc(k.image, 240)}" alt="" class="h-16 w-20 shrink-0 rounded-lg bg-stone-100 object-cover" loading="lazy" />
          <span class="min-w-0">
            <span class="text-xs font-bold uppercase tracking-wider text-brand-600">${esc(k.category)}</span>
            <span class="mt-0.5 line-clamp-2 block font-semibold leading-snug text-stone-900 transition group-hover:text-brand-700">${esc(k.title)}</span>
            <span class="caption mt-1 block">${formatDate(k.date)} · ${esc(k.region)}</span>
          </span>
        </a>
      </li>`).join('');
  };

  // Tab: klik, atau panah kiri/kanan saat fokus di tab (pola tablist WAI-ARIA)
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const select = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    listEl.setAttribute('aria-labelledby', tab.id);
    renderList(tab.dataset.tab);
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });
  });

  select(tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0]);
  renderIcons(featuredEl);
}

setupVideo();
renderTicker();
renderPrograms();
renderKabar();

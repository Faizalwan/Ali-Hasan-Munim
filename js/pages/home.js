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

function renderStats() {
  const el = document.getElementById('stats');
  if (!el) return;
  if (!config.stats.length) { el.remove(); return; }
  el.innerHTML = config.stats.map(s => `
    <div class="flex flex-col-reverse justify-end">
      <dt class="mt-2 text-sm leading-snug text-stone-500">${esc(s.label)}</dt>
      <dd class="text-4xl font-light tracking-tight text-stone-900 md:text-5xl">${esc(s.value)}</dd>
    </div>`).join('');
}

/* ---------- Program (bento) ---------- */

function renderPrograms() {
  const el = document.getElementById('program-list');
  if (!el || programs.length < 3) return;
  const [first, ...rest] = programs;
  const last = rest.pop();

  // sm: kartu besar & lebar mengisi 2 kolom · lg: kartu besar 2 baris di kiri, kartu lebar 3 kolom di bawah
  const big = `
    <a href="${esc(programHref(first))}" class="card-link group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl p-6 text-white sm:col-span-2 md:p-8 lg:col-span-1 lg:row-span-2 lg:min-h-[440px]">
      <img src="${imgSrc(first.image, 900)}" alt="" class="absolute inset-0 h-full w-full bg-stone-800 object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      <span class="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/10"></span>
      <span class="absolute left-6 top-6 text-5xl font-light tracking-tight text-white/90 md:left-8 md:top-8">01</span>
      <span class="relative">
        <span class="grid h-12 w-12 place-items-center rounded-xl bg-white/15 backdrop-blur"><svg data-icon="${esc(first.icon)}" class="h-6 w-6"></svg></span>
        <span class="mt-5 block text-2xl font-bold leading-tight md:text-3xl">${esc(first.title)}</span>
        <span class="mt-2 block max-w-md text-stone-200">${esc(first.summary)}</span>
        <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">Selengkapnya <svg data-icon="arrow-right" class="h-4 w-4 transition group-hover:translate-x-1"></svg></span>
      </span>
    </a>`;

  const small = rest.map((p, i) => `
    <a href="${esc(programHref(p))}" class="card card-hover group flex flex-col p-6">
      <span class="flex items-start justify-between">
        <span class="text-4xl font-light tracking-tight text-brand-600">${pad(i + 2)}</span>
        <span class="icon-tile"><svg data-icon="${esc(p.icon)}" class="h-6 w-6"></svg></span>
      </span>
      <span class="h4 mt-6 block">${esc(p.title)}</span>
      <span class="mt-2 block flex-1 text-stone-600">${esc(p.summary)}</span>
      <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">Selengkapnya <svg data-icon="arrow-right" class="h-4 w-4 transition group-hover:translate-x-1"></svg></span>
    </a>`).join('');

  const wide = `
    <a href="${esc(programHref(last))}" class="card-link group grid overflow-hidden rounded-3xl bg-stone-950 text-white sm:col-span-2 md:grid-cols-[1.2fr_1fr] lg:col-span-3">
      <span class="flex flex-col justify-center p-8 md:p-10">
        <span class="text-4xl font-light tracking-tight text-gold-400">${pad(programs.length)}</span>
        <span class="mt-4 block text-2xl font-bold leading-tight md:text-3xl">${esc(last.title)}</span>
        <span class="mt-3 block max-w-lg text-stone-400">${esc(last.summary)}</span>
        <span class="btn btn-md mt-8 self-start bg-white text-stone-900 group-hover:bg-stone-100">${esc(last.cta || 'Selengkapnya')} <svg data-icon="arrow-right" class="h-4 w-4"></svg></span>
      </span>
      <span class="relative min-h-[240px] overflow-hidden bg-stone-800">
        <img src="${imgSrc(last.image, 900)}" alt="" class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      </span>
    </a>`;

  el.innerHTML = big + small + wide;
  renderIcons(el);
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
renderStats();
renderPrograms();
renderKabar();

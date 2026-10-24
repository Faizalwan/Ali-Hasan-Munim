// Dipakai semua halaman: header + mega menu, menu mobile, tombol samping, footer,
// dan pengisian teks dari config.js.
//   <body data-page="...">            menandai menu aktif
//   <body data-header="overlay">      header menimpa hero (tanpa spacer); selain itu ditambah spacer setinggi header

import { config } from './config.js';
import { renderIcons } from './icons.js';
import { esc, waLink, imgSrc } from './utils.js';

const page = document.body.dataset.page;
const groups = config.nav;

const isActive = g => (g.pages || []).includes(page);
const hrefOf = it => (it.wa ? waLink() : it.href);
const extAttr = it => (it.wa || it.external ? ' target="_blank" rel="noopener"' : '');

/* ---------- Header & mega menu ---------- */

function megaPanel(g) {
  const items = g.items.map(it => `
    <li>
      <a href="${esc(hrefOf(it))}"${extAttr(it)} class="group -m-3 flex gap-4 rounded-2xl p-3 transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none">
        <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-soft transition group-hover:scale-105"><svg data-icon="${esc(it.icon)}" class="h-6 w-6"></svg></span>
        <span>
          <span class="block font-bold text-white">${esc(it.label)}</span>
          <span class="mt-1 block text-sm leading-relaxed text-brand-100">${esc(it.desc)}</span>
        </span>
      </a>
    </li>`).join('');

  const f = g.feature;
  const feature = f ? `
    <a href="${esc(f.href)}" class="group relative hidden min-h-[260px] overflow-hidden rounded-2xl lg:block">
      <img src="${imgSrc(f.image, 700)}" alt="" class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      <span class="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent"></span>
      <span class="absolute inset-x-0 bottom-0 p-6">
        <span class="text-xs font-bold uppercase tracking-[0.14em] text-gold-400">${esc(f.eyebrow)}</span>
        <span class="mt-2 block text-xl font-bold leading-snug text-white">${esc(f.title)}</span>
        <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">${esc(f.cta)} <svg data-icon="arrow-right" class="h-4 w-4 transition group-hover:translate-x-1"></svg></span>
      </span>
    </a>` : '';

  return `
  <div id="mega-${g.id}" class="mega-panel hidden lg:block" role="region" aria-label="${esc(g.title)}" hidden>
    <div class="container-site relative pb-12 pt-8">
      <svg class="pointer-events-none absolute -bottom-px right-0 h-56 w-56 text-white/10" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="12" aria-hidden="true">
        <circle cx="200" cy="200" r="50"/><circle cx="200" cy="200" r="100"/><circle cx="200" cy="200" r="150"/>
      </svg>
      <div class="relative flex items-start justify-between gap-6">
        <div>
          <p class="text-3xl font-bold tracking-tight">${esc(g.title)}</p>
          <p class="mt-2 max-w-xl text-brand-100">${esc(g.intro)}</p>
        </div>
        <button type="button" class="btn btn-md btn-icon text-white hover:bg-white/10 focus-visible:ring-white/30" data-mega-close aria-label="Tutup menu ${esc(g.label)}"><svg data-icon="x" class="h-6 w-6"></svg></button>
      </div>
      <div class="relative mt-10 grid gap-10 ${f ? 'lg:grid-cols-[1fr_340px]' : ''}">
        <ul class="grid content-start gap-x-10 gap-y-8 sm:grid-cols-2 ${f ? '' : 'lg:grid-cols-3'}">${items}</ul>
        ${feature}
      </div>
    </div>
  </div>`;
}

function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;

  const desktopNav = groups.map(g => {
    const active = isActive(g) ? ' is-active' : '';
    return g.items
      ? `<li><button type="button" class="nav-link${active}" data-mega="${g.id}" aria-expanded="false" aria-controls="mega-${g.id}">${esc(g.label)}<svg data-icon="chevron-down" class="h-4 w-4"></svg></button></li>`
      : `<li><a href="${esc(g.href)}" class="nav-link${active}"${active ? ' aria-current="page"' : ''}>${esc(g.label)}</a></li>`;
  }).join('');

  const mobileNav = groups.map(g => g.items ? `
    <details class="group" ${isActive(g) ? 'open' : ''}>
      <summary class="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-semibold text-stone-900 [&::-webkit-details-marker]:hidden">
        ${esc(g.label)}<svg data-icon="chevron-down" class="h-5 w-5 text-stone-400 transition group-open:rotate-180"></svg>
      </summary>
      <ul class="space-y-1 pb-4">
        ${g.items.map(it => `
          <li><a href="${esc(hrefOf(it))}"${extAttr(it)} class="flex items-center gap-3 rounded-xl p-2 transition hover:bg-stone-50">
            <span class="icon-tile h-10 w-10 rounded-lg"><svg data-icon="${esc(it.icon)}" class="h-5 w-5"></svg></span>
            <span class="text-[15px] font-medium text-stone-700">${esc(it.label)}</span>
          </a></li>`).join('')}
      </ul>
    </details>` : `
    <a href="${esc(g.href)}" class="flex py-4 text-lg font-semibold ${isActive(g) ? 'text-brand-600' : 'text-stone-900'}">${esc(g.label)}</a>`).join('');

  const overlay = document.body.dataset.header === 'overlay';

  el.outerHTML = `
  <header id="header" class="site-header">
    <div class="container-site flex h-16 items-center justify-between gap-6 lg:h-[72px]">
      <a href="index.html" class="rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200" aria-label="${esc(config.person.nickname)}, ke beranda">
        <img src="${esc(config.site.logo)}" alt="" width="600" height="273" class="logo-color h-10 w-auto lg:h-11" />
        <img src="${esc(config.site.logoWhite)}" alt="" width="600" height="273" class="logo-white h-10 w-auto lg:h-11" />
      </a>
      <nav class="hidden lg:block" aria-label="Menu utama"><ul class="flex items-center gap-1">${desktopNav}</ul></nav>
      <div class="flex items-center gap-2">
        <a href="relawan.html" class="header-cta btn btn-md btn-primary group hidden sm:inline-flex">Jadi Relawan <svg data-icon="arrow-right" class="h-4 w-4 transition group-hover:translate-x-0.5"></svg></a>
        <button id="menu-toggle" class="btn btn-md btn-ghost btn-icon lg:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Buka menu">
          <svg data-icon="menu" class="h-6 w-6"></svg>
        </button>
      </div>
    </div>
  </header>
  ${overlay ? '' : '<div class="h-16 lg:h-[72px]" aria-hidden="true"></div>'}
  <div id="mega-backdrop" class="fixed inset-0 z-30 bg-stone-950/40" hidden></div>
  ${groups.filter(g => g.items).map(megaPanel).join('')}
  <div id="mobile-menu" class="fixed inset-x-0 bottom-0 top-16 z-40 flex-col overflow-y-auto bg-white px-4 pb-6 sm:px-6 lg:hidden" hidden>
    <nav class="divide-y divide-stone-100" aria-label="Menu utama">${mobileNav}</nav>
    <div class="mt-auto grid gap-2 pt-6">
      <a href="relawan.html" class="btn btn-lg btn-primary">Jadi Relawan</a>
      <a href="${waLink()}" target="_blank" rel="noopener" class="btn btn-lg btn-wa"><svg data-icon="whatsapp" class="h-5 w-5"></svg> Chat Tim ${esc(config.person.nickname)}</a>
    </div>
  </div>`;
}

function setupMega() {
  const header = document.getElementById('header');
  const backdrop = document.getElementById('mega-backdrop');
  const triggers = [...document.querySelectorAll('[data-mega]')];
  let current = null;

  const show = id => {
    current = id;
    triggers.forEach(t => t.setAttribute('aria-expanded', String(t.dataset.mega === id)));
    document.querySelectorAll('.mega-panel').forEach(p => { p.hidden = p.id !== `mega-${id}`; });
    header.classList.toggle('is-mega', !!id);
    backdrop.hidden = !id;
  };
  const closeAndFocus = () => {
    const trigger = triggers.find(t => t.dataset.mega === current);
    show(null);
    trigger?.focus();
  };

  triggers.forEach(t => t.addEventListener('click', e => {
    show(current === t.dataset.mega ? null : t.dataset.mega);
    // Dibuka lewat keyboard (Enter/Spasi → detail 0): pindahkan fokus ke tautan pertama di panel
    if (current && e.detail === 0) document.querySelector(`#mega-${current} a`)?.focus();
  }));
  document.querySelectorAll('[data-mega-close]').forEach(b => b.addEventListener('click', closeAndFocus));
  backdrop.addEventListener('click', () => show(null));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && current) closeAndFocus(); });
  matchMedia('(max-width: 1023px)').addEventListener('change', e => e.matches && show(null));
}

function setupMobileMenu() {
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const header = document.getElementById('header');
  if (!btn || !menu) return;

  const setOpen = open => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    btn.querySelector('svg').dataset.icon = open ? 'x' : 'menu';
    renderIcons(btn);
    menu.hidden = !open;
    menu.classList.toggle('flex', open);
    header.classList.toggle('is-menu', open);
    document.body.classList.toggle('overflow-hidden', open);
  };

  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) { setOpen(false); btn.focus(); }
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', e => e.matches && setOpen(false));
}

function setupScrollState() {
  const header = document.getElementById('header');
  if (!header) return;
  const update = () => {
    header.classList.toggle('is-scrolled', scrollY > 8);
  };
  addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- Footer (ala Portal Jabar) ---------- */

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  const { contact, social } = config;

  const socials = [
    ['instagram', 'Instagram', social.instagram],
    ['youtube', 'YouTube', social.youtube],
    ['facebook', 'Facebook', social.facebook]
  ].filter(([, , href]) => href).map(([icon, label, href]) =>
    `<a href="${esc(href)}" target="_blank" rel="noopener" class="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-brand-700" aria-label="${label}"><svg data-icon="${icon}" class="h-5 w-5"></svg></a>`
  ).join('');

  const info = (icon, title, body) => `
    <div class="flex gap-3">
      <svg data-icon="${icon}" class="mt-0.5 h-5 w-5 shrink-0 text-gold-400"></svg>
      <div><p class="font-bold text-white">${title}</p><div class="mt-1.5 text-sm leading-relaxed">${body}</div></div>
    </div>`;

  const sitemap = groups.map(g => `
    <div>
      <p class="font-bold text-white">${esc(g.label)}</p>
      <ul class="mt-3 space-y-2 text-sm">
        ${(g.items || [{ label: g.label, href: g.href }]).map(it =>
          `<li><a href="${esc(hrefOf(it))}"${extAttr(it)} class="transition hover:text-white">${esc(it.label)}</a></li>`).join('')}
      </ul>
    </div>`).join('');

  el.outerHTML = `
  <footer class="bg-brand-700 text-brand-100">
    <div class="container-site py-14">
      <a href="index.html" class="inline-block rounded-xl" aria-label="${esc(config.person.nickname)}, ke beranda">
        <img src="${esc(config.site.logoWhite)}" alt="" width="600" height="273" class="h-14 w-auto" loading="lazy" />
      </a>
      <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        ${info('map-pin', 'Posko', esc(contact.address))}
        ${info('mail', 'Surel', `<a href="mailto:${esc(contact.email)}" class="transition hover:text-white">${esc(contact.email)}</a>`)}
        ${info('whatsapp', 'WhatsApp', `<a href="${waLink()}" target="_blank" rel="noopener" class="transition hover:text-white">Chat Tim ${esc(config.person.nickname)}</a>`)}
        ${info('share', 'Media Sosial', `<div class="flex gap-2">${socials}</div>`)}
      </div>
      <div class="mt-12 border-t border-white/15 pt-10">
        <p class="flex items-center gap-2 font-bold text-white"><svg data-icon="link" class="h-5 w-5 text-gold-400"></svg> Peta Situs</p>
        <div class="mt-6 grid grid-cols-2 gap-8 md:grid-cols-5">${sitemap}</div>
      </div>
    </div>
    <div class="border-t border-white/15">
      <div class="container-site flex flex-col gap-2 py-5 text-xs sm:flex-row sm:justify-between">
        <p>© ${new Date().getFullYear()} ${esc(config.site.name)} · ${esc(config.person.fullName)}. ${esc(config.site.disclaimer)}</p>
        <a href="privasi.html" class="transition hover:text-white">Kebijakan Privasi</a>
      </div>
    </div>
  </footer>`;
}

/* ---------- Animasi masuk ---------- */
// Elemen ber-[data-reveal] muncul halus saat masuk layar (gaya di src/input.css).
// Tidak aktif bila pengguna memilih "kurangi gerakan" atau browser tanpa IntersectionObserver.
function setupReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('is-visible');
    io.unobserve(en.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));
  document.documentElement.classList.add('reveal-ready');
}

/* ---------- Teks dari config ---------- */
// Isi teks dan tautan dari config. HTML tetap punya teks bawaan sebagai cadangan tanpa JS.
//   data-cfg="campaign.dapil"   → textContent
//   data-wa="pesan"             → href ke wa.me dengan pesan tersebut ("" = sapaan bawaan)
function bindConfig() {
  document.querySelectorAll('[data-cfg]').forEach(el => {
    const value = el.dataset.cfg.split('.').reduce((obj, key) => obj?.[key], config);
    if (value != null) el.textContent = Array.isArray(value) ? value.join(' · ') : value;
  });
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.href = waLink(el.dataset.wa || undefined);
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

renderHeader();
renderFooter();
bindConfig();
setupMega();
setupMobileMenu();
setupScrollState();
setupReveal();
renderIcons();

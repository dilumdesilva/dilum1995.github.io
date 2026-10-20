const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = typeof gsap !== 'undefined' && !reduceMotion;
if (hasGsap) gsap.registerPlugin(ScrollTrigger);
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = n => n.split(' ').map(w => w[0]).slice(0, 2).join('');
const avatarColors = ['#4285f4', '#ea4335', '#e0a800', '#34a853', '#a142f4', '#ff6d01', '#12b5cb'];

// ---------- Reveal on scroll (shared by every section) ----------
const revealer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    revealer.unobserve(e.target);
  });
}, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
const observe = els => els.forEach(el => revealer.observe(el));

// ---------- Theme ----------
$('#themeToggle').addEventListener('click', () => {
  const light = document.documentElement.dataset.theme !== 'light';
  if (light) document.documentElement.dataset.theme = 'light';
  else delete document.documentElement.dataset.theme;
  try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
});

// ---------- Auckland clock ----------
const clock = $('#clock');
const tick = () => {
  clock.textContent = 'Auckland ' + new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland', hour: '2-digit', minute: '2-digit', hour12: false
  }).format(new Date());
};
tick(); setInterval(tick, 30000);
$('#year').textContent = new Date().getFullYear();

// ---------- Nav state, progress bar, timeline fill ----------
const nav = $('.nav');
const navLinks = $$('.nav-links a');
const sections = navLinks.map(a => $(a.getAttribute('href')));
let lastY = 0;
function onScroll() {
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  nav.classList.toggle('scrolled', y > 20);
  // Tuck the nav away while reading down, bring it back on any upward scroll
  nav.classList.toggle('away', y > lastY && y > innerHeight * 0.6);
  lastY = y;
  document.documentElement.style.setProperty('--p', max > 0 ? y / max : 0);

  let current = -1;
  sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
  navLinks.forEach((a, i) => a.classList.toggle('active', i === current));

  const tl = $('.timeline');
  const r = tl.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
  $('#timelineFill').style.setProperty('--tp', p);
}
addEventListener('scroll', onScroll, { passive: true });

// ---------- Smooth anchor scrolling (in JS, since CSS smooth scrolling breaks GSAP's measurements) ----------
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  const target = a && $(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  history.replaceState(null, '', a.getAttribute('href'));
});

// ---------- Photo band: frame opens to full-bleed as you scroll ----------
if (hasGsap) {
  gsap.fromTo('.band', { '--clip': '12%', '--zoom': 1.25 }, {
    '--clip': '0%', '--zoom': 1, ease: 'none',
    scrollTrigger: { trigger: '.band', start: 'top bottom', end: 'center center', scrub: true }
  });
  gsap.from('.band-caption > *', {
    y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.band', start: 'center 70%' }
  });
}

// ---------- Hero intro ----------
$$('.split').forEach(el => {
  el.innerHTML = [...el.textContent].map(c => `<span class="ch">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join('');
});
if (hasGsap) {
  gsap.from('.hero-title .ch', { yPercent: 105, duration: 1.6, ease: 'expo.out', stagger: 0.03, delay: 0.15 });
  // Stage photo drifts in from the far right, then colour sweeps across it left to right
  gsap.from('.hero-photo', { xPercent: 18, opacity: 0, duration: 2.2, ease: 'expo.out', delay: 0.2 });
  gsap.fromTo('.hp-color', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 2, ease: 'power2.inOut', delay: 1.1 });
  gsap.to('.hero-photo img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.from('.stats .stat', { y: 16, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: 0.08, delay: 0.6 });
  gsap.to('.hero-title .line-2', {
    xPercent: 6, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
}
setTimeout(() => observe($$('.hero .reveal-up')), hasGsap ? 500 : 0);

// Headings rise word by word behind a mask
$$('.section-head h2, .talks-head h2').forEach(h => {
  h.innerHTML = h.textContent.split(' ').map((w, i) => `<span class="wm"><span class="w" style="--i:${i}">${esc(w)}</span></span>`).join(' ');
});
// Grid cells open one after another
$$('.spec .cell').forEach((c, i) => c.style.setProperty('--d', (i % 4) * 0.08 + 's'));

// Rotating role word
const roles = ['Speaker', 'Founder', 'Mentor', 'GDE', 'Organiser', 'Lecturer'];
let roleIdx = 0;
const rot = $('#rotator');
if (!reduceMotion) setInterval(() => {
  roleIdx = (roleIdx + 1) % roles.length;
  if (hasGsap) {
    gsap.to(rot, { yPercent: -100, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: () => {
      rot.textContent = roles[roleIdx];
      gsap.fromTo(rot, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out' });
    } });
  } else rot.textContent = roles[roleIdx];
}, 2400);

// ---------- Count-up stats ----------
function countUp(el, to, suffix = '') {
  if (reduceMotion || !hasGsap) { el.textContent = to + suffix; return; }
  const from = to > 1000 ? to - 30 : 0;
  const obj = { v: from };
  gsap.to(obj, { v: to, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; } });
}

// ---------- Data-driven sections ----------
async function init() {
  const data = await (await fetch('data.json')).json();

  const statsIO = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    $$('[data-count], [data-count-key]').forEach(el => {
      const n = el.dataset.count ? +el.dataset.count : data[el.dataset.countKey].length;
      countUp(el, n, el.dataset.suffix || '');
    });
    statsIO.disconnect();
  }, { threshold: 0.4 });
  statsIO.observe($('#stats'));

  renderTimeline(data.timeline);
  renderTalks(data.talks);
  renderQuotes(data.recommendations);
  renderArticles(data.articles);
  observe($$('.reveal-up:not(.hero .reveal-up)'));
  onScroll();
  if (hasGsap) {
    ScrollTrigger.refresh();
    // Filtering the journey or searching articles changes page height; keep the talks pin in sync
    let raf;
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => ScrollTrigger.refresh()); });
    ro.observe($('#journey'));
    ro.observe($('#writing'));
  }
  // Pinning adds scroll space after the browser's initial anchor jump, so redo it
  if (location.hash) $(location.hash)?.scrollIntoView({ behavior: 'instant' });
}

// ---------- Journey ----------
function renderTimeline(items) {
  const list = $('#timeline');
  list.innerHTML = items.map(t => `
    <li class="t-item" data-kind="${esc(t.kind)}">
      <div class="t-card">
        <div class="t-meta label"><span>${esc(t.period)}</span><span class="t-kind">${esc(t.kind)}</span></div>
        <h3>${esc(t.title)}</h3>
        <div class="t-org">${esc(t.org)}</div>
        <p>${esc(t.note)}</p>
        ${t.place ? `<div class="t-place label">${esc(t.place)}</div>` : ''}
      </div>
    </li>`).join('');
  observe($$('.t-item', list));

  // Alternate sides among *visible* items only, so filtering keeps the zig-zag intact
  const layout = () => {
    $$('.t-item:not(.hide)', list).forEach((li, i) => {
      li.classList.toggle('right', i % 2 === 1);
      li.classList.toggle('first', i === 0);
    });
  };
  layout();

  $$('#journeyFilters .filter').forEach(chip => chip.addEventListener('click', () => {
    $$('#journeyFilters .filter').forEach(c => c.classList.toggle('active', c === chip));
    const k = chip.dataset.kind;
    $$('.t-item', list).forEach(li => {
      li.classList.toggle('hide', k !== 'all' && li.dataset.kind !== k);
      li.classList.add('in');
    });
    layout();
    onScroll();
  }));
}

// ---------- Talks: horizontal pinned timeline ----------
function renderTalks(talks) {
  const track = $('#talksTrack');
  let lastYear = null;
  const html = talks.map((t, i) => {
    const year = t.year || 'Earlier';
    const divider = year !== lastYear ? `<div class="talk-divider"><span>${esc(year)}</span></div>` : '';
    lastYear = year;
    return `${divider}
      <article class="talk" data-year="${esc(year)}">
        <div class="talk-top label"><span>${String(i + 1).padStart(2, '0')}</span><span class="talk-year">${esc(year)}</span></div>
        <h3>${esc(t.title)}</h3>
        <p class="talk-event">${esc(t.event)}</p>
        <div class="talk-links">
          ${t.pdf ? `<a href="${esc(t.pdf)}" target="_blank" rel="noopener">Slides ↗</a>` : ''}
          ${t.repo ? `<a href="${esc(t.repo)}" target="_blank" rel="noopener">Code ↗</a>` : ''}
        </div>
      </article>`;
  }).join('');
  track.insertAdjacentHTML('beforeend', html);

  const yearEl = $('#talksYear');
  const cards = $$('.talk', track);
  yearEl.textContent = cards[0]?.dataset.year || '';
  const updateYear = () => {
    const mid = innerWidth / 2;
    let best = cards[0], bestD = Infinity;
    cards.forEach(c => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) { bestD = d; best = c; }
    });
    if (best && yearEl.textContent !== best.dataset.year) yearEl.textContent = best.dataset.year;
  };

  if (!hasGsap) { track.addEventListener('scroll', updateYear, { passive: true }); return; }
  const mm = gsap.matchMedia();
  mm.add('(min-width: 769px)', () => {
    const distance = () => track.scrollWidth - innerWidth;
    gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: '#talks', pin: '.talks-pin', start: 'top top', end: () => '+=' + distance(),
        scrub: 0.8, invalidateOnRefresh: true, onUpdate: updateYear
      }
    });
    gsap.from(cards, {
      opacity: 0, y: 60, stagger: 0.06, duration: 0.8, ease: 'expo.out',
      scrollTrigger: { trigger: '#talks', start: 'top 70%' }
    });
  });
  mm.add('(max-width: 768px)', () => {
    track.addEventListener('scroll', updateYear, { passive: true });
  });
}

// ---------- Recommendations ----------
function renderQuotes(recs) {
  const stage = $('#quoteStage'), big = $('#quoteBig'), by = $('#quoteBy'), navEl = $('#quoteNav');
  let idx = 0, timer;
  const color = i => avatarColors[i % avatarColors.length];

  navEl.innerHTML = recs.map((r, i) => `<button role="tab" aria-label="Quote from ${esc(r.name)}"></button>`).join('');
  const dots = $$('button', navEl);

  function show(i) {
    idx = i;
    const r = recs[i];
    big.innerHTML = r.highlight.split(' ').map(w => `<span class="w">${esc(w)}</span>`).join(' ');
    by.innerHTML = `<span class="avatar" style="--av:${color(i)}">${esc(initials(r.name))}</span>
      <div><b>${esc(r.name)}</b><small>${esc(r.role)}</small></div>`;
    dots.forEach((d, j) => {
      d.classList.toggle('active', j === i);
      d.setAttribute('aria-selected', j === i);
    });
    // restart the progress-bar animation
    const a = dots[i]; a.classList.remove('active'); void a.offsetWidth; a.classList.add('active');
    if (hasGsap) {
      gsap.from($$('.w', big), { yPercent: 100, clipPath: 'inset(0 0 100% 0)', duration: 0.45, stagger: 0.01, ease: 'expo.out' });
      gsap.from(by, { clipPath: 'inset(0 100% 0 0)', duration: 0.6, delay: 0.25, ease: 'expo.out' });
    }
  }
  const next = () => show((idx + 1) % recs.length);
  const start = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(next, 3200); };

  dots.forEach((d, i) => d.addEventListener('click', () => { show(i); start(); }));
  stage.addEventListener('pointerenter', () => { clearInterval(timer); stage.classList.add('paused'); });
  stage.addEventListener('pointerleave', () => { stage.classList.remove('paused'); start(); });
  // Only rotate while the section is on screen, starting from the first quote
  let seen = false;
  new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) { clearInterval(timer); return; }
    if (!seen) { seen = true; show(0); }
    start();
  }, { threshold: 0.3 }).observe(stage);
  show(0);
}

// ---------- Articles ----------
function renderArticles(articles) {
  const list = $('#articles'), empty = $('#empty');
  const draw = q => {
    const items = articles.filter(a => (a.title + ' ' + a.year).toLowerCase().includes(q));
    list.innerHTML = items.map(a => `
      <li><a href="${esc(a.link)}" target="_blank" rel="noopener">
        <span class="a-year label">${esc(a.year)}</span>
        <span class="a-title">${esc(a.title)}</span>
        <span class="a-arrow" aria-hidden="true">→</span>
      </a></li>`).join('');
    empty.hidden = items.length > 0;
    $$('li', list).forEach((li, i) => { li.classList.add('reveal-up'); li.style.setProperty('--d', Math.min(i, 8) * 0.04 + 's'); });
    observe($$('li', list));
  };
  draw('');
  $('#search').addEventListener('input', e => { draw(e.target.value.trim().toLowerCase()); });
}

init();

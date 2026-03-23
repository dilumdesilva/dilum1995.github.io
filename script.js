// ============================================
// Data & State
// ============================================
const DATA = {
  talks: [
    { title: "Flutter without Gravity", year: "2026", event: "Build with AI Auckland", repo: "https://github.com/dilumdesilva/flutter-without-gravity", pdf: "https://dilumdesilva.dev/docs/flutter_without_gravity.pdf" },
    { title: "Mastering UI Consistency: From Widgets to Catalogs", year: "2025", event: "DevFest Melbourne", pdf: "docs/mastering_ui_consistency_from_widgets_to_catalogs.pdf" },
    { title: "Prototype, build and deploy apps with AI", year: "2025", event: "GDG Ahlen Germany, Build with AI Auckland, University of Westminster UK", pdf: "docs/prototype_build_and_deploy_apps_with_ai.pdf" },
    { title: "Interact with AI", year: "2025", event: "Brown bag talk at AMP", pdf: "docs/interact_with_ai.pdf" },
    { title: "A Guide to Version Management", year: "2025", event: "Brown bag talk at AMP", pdf: "docs/a_guide_to_version_management.pdf" },
    { title: "What's new in Flutter from Google IO 24", year: "2024", event: "Google I/O Extended Auckland 2024", pdf: "docs/whats_new_in_flutter_from_google_io_24.pdf" },
    { title: "CLEAN Architecture for Flutter", year: "2023", event: "Flutter meetup Auckland", pdf: "docs/clean_architecture_for_flutter.pdf" },
    { title: "Flutter meets CLEAN architecture", year: "2023", event: "DevFest Sri Lanka", pdf: "docs/flutter_meets_clean_architecture.pdf" },
    { title: "Google I/O 23 Mobile Updates", year: "2023", event: "Google I/O Extended Auckland 2023", pdf: "docs/google_io_23_mobile_updates.pdf" },
    { title: "Git for Professionals", year: "2023", event: "Tech talk at Hectre", pdf: "docs/git_for_professionals.pdf" },
    { title: "Zero to Hero with GitHub", year: "2021", event: "NSBM University, Colombo Sri Lanka", pdf: "docs/zero_to_hero_with_github.pdf" },
    { title: "Redefine your tech profile with open source", year: "", event: "Software Freedom Day Sri Lanka", pdf: "docs/redefine_your_tech_profile_with_open_source.pdf" }
  ],
  articles: [
    { title: "You Have Until May 31, 2026. Here\u2019s How to Fix 16KB Page Size Issue on Flutter Apps", year: "2026", link: "https://medium.com/top-rail/you-have-until-may-31-2026-heres-how-to-fix-16kb-page-size-issue-on-flutter-apps-f2dbf6c2a6a3" },
    { title: "Flutter 3.38 Broke My iOS App \u2014 Here\u2019s How I Fixed It (And What Apple Didn\u2019t Tell You)", year: "2025", link: "https://medium.com/top-rail/flutter-3-38-broke-my-ios-app-heres-how-i-fixed-it-and-what-apple-didn-t-tell-you-e79c777201c7" },
    { title: "Forget the Subscriptions, Firebase Studio with Gemini is All You Need!", year: "2025", link: "https://medium.com/@dilumdesilva/forget-the-subscriptions-firebase-studio-with-gemini-is-all-you-need-cc88f35e92d6" },
    { title: "Firebase Dynamic Links are going away, What now for Flutter Devs?", year: "2025", link: "https://medium.com/@dilumdesilva/firebase-dynamic-links-are-going-away-what-now-for-flutter-devs-00c5d6e7e5b9" },
    { title: "Flutter Soars at Google I/O Shoreline: A Developer\u2019s Perspective to the Latest Announcements", year: "2024", link: "https://medium.com/@dilumdesilva/flutter-soars-at-google-i-o-shoreline-a-developers-perspective-to-the-latest-announcements-14b72a8d580b" },
    { title: "Manage many with MultiProvider", year: "2024", link: "https://medium.com/@dilumdesilva/manage-many-with-multiprovider-8af5999a2c7a" },
    { title: "Harnessing the Power of LayoutBuilder to Build Responsive UIs in Flutter", year: "2023", link: "https://medium.com/@dilumdesilva/harnessing-the-power-of-layoutbuilder-to-build-responsive-uis-in-flutter-450f0a0b52d2" },
    { title: "Building Flutter Layouts Based on Orientation", year: "2023", link: "https://medium.com/@dilumdesilva/building-flutter-layouts-based-on-orientation-57842bc39f7a" },
    { title: "So, Xcode doesn\u2019t support your iPhone\u2019s OS version. Here\u2019s how to fix it.", year: "2021", link: "https://medium.com/@dilumdesilva/so-xcode-doesnt-support-your-iphone-s-os-version-here-s-how-to-fix-it-c2db7fd58468" },
    { title: "Make your project documentation with Jekyll", year: "2020", link: "https://medium.com/scorelab/make-your-project-documentation-with-jekyll-573bfc130fb9" },
    { title: "GSoC Community Bonding Period with ImageLab and SCoReLab", year: "2020", link: "https://medium.com/scorelab/gsoc-community-bonding-period-with-imagelab-and-scorelab-190ccaa3f3d3" },
    { title: "Run your Flutter app on the web.", year: "2019", link: "https://medium.com/@dilumdesilva/run-your-flutter-app-on-the-web-a49f54ef174d" },
    { title: "Google Chrome dark mood in any android device (no root).", year: "2019", link: "https://medium.com/@dilumdesilva/google-chrome-dark-mood-in-any-android-device-no-root-5915d2aaf9bb" },
    { title: "Being a Speaker at Asia\u2019s Premeir Developer Event, FOSSASIA Summit 2019", year: "2019", link: "https://medium.com/@dilumdesilva/being-a-speaker-at-asias-premeir-developer-event-fossasia-summit-2019-18448b7298ac" },
    { title: "Code quality of your iOS project? why don\u2019t you fix some lint issues?", year: "2019", link: "https://medium.com/@dilumdesilva/writing-beautiful-code-in-swift-1-c183a6929feb" },
    { title: "iMessage apps: what is it and is it useful?", year: "2019", link: "https://medium.com/@dilumdesilva/imessage-apps-what-is-it-and-is-it-useful-ea4ab6d128b" },
    { title: "What is Arduino ?", year: "2018", link: "https://medium.com/@dilumdesilva/what-is-arduino-de8786e910b8" }
  ]
};

let allItems = [];
let currentType = 'talk';
let currentYear = 'all';
let currentSearch = '';

// ============================================
// Init
// ============================================
function init() {
  allItems = [
    ...DATA.talks.map(t => ({ ...t, type: 'talk' })),
    ...DATA.articles.map(a => ({ ...a, type: 'article' }))
  ];
  populateYears();
  initScrollObserver();
  render();
  initHeroSlideshow();
  initDarkMode();
  initFilters();
  initHeroButtons();
}

// ============================================
// Populate year dropdown
// ============================================
function populateYears() {
  const years = [...new Set(allItems.map(i => i.year).filter(Boolean))].sort((a, b) => b - a);
  const select = document.getElementById('yearFilter');
  years.forEach(y => {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    select.appendChild(opt);
  });
}

// ============================================
// Render cards
// ============================================
function render() {
  const grid = document.getElementById('cards');
  const empty = document.getElementById('empty');
  const search = currentSearch.toLowerCase();

  const filtered = allItems.filter(item => {
    if (currentType !== 'all' && item.type !== currentType) return false;
    if (currentYear !== 'all' && item.year !== currentYear) return false;
    if (search) {
      const haystack = [item.title, item.event || '', item.year || ''].join(' ').toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';

  grid.innerHTML = filtered.map((item, i) => {
    const isArticle = item.type === 'article';
    const isTalk = item.type === 'talk';
    const href = isArticle ? item.link : (item.pdf || '#');
    const target = href && href !== '#' ? ' target="_blank" rel="noopener"' : '';
    const label = isArticle ? 'Article' : 'Talk';
    const meta = item.event ? `<div class="card-event">${item.event}</div>` : '';
    const yearText = item.year ? `<span class="card-year">${item.year}</span>` : '';

    const imageHtml = item.image
      ? `<div class="card-image-wrap"><img class="card-image" src="${item.image}" alt="${item.title}" loading="lazy"></div>`
      : `<div class="card-image-wrap"><div class="card-gradient" style="background: linear-gradient(135deg, ${stringToColor(item.title)}, ${stringToColor(item.title + 'salt')})">${item.title.charAt(0)}</div></div>`;

    let linksHtml = '';
    if (isTalk && item.pdf) {
      linksHtml = `<div class="card-links">
        ${item.repo ? `<a href="${item.repo}" target="_blank" rel="noopener" class="card-link-icon" aria-label="Code repository" title="Code" onclick="event.stopPropagation()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        </a>` : ''}
        <a href="${item.pdf}" target="_blank" rel="noopener" class="card-link-icon" aria-label="Slides" title="Slides" onclick="event.stopPropagation()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v13H3V3zm2 2v9h14V5H5zm3 14h8v2H8v-2zm-1-6h2v3H7V13zm3-3h2v6h-2V10zm3 1h2v5h-2V11z"/></svg>
        </a>
      </div>`;
    }

    if (isTalk && item.pdf) {
      return `
        <div class="card" style="--i: ${i}" data-href="${item.pdf}" onclick="if(!event.target.closest('.card-link-icon'))window.open(this.dataset.href,'_blank')">
          ${imageHtml}
          <div class="card-body">
            <div class="card-type-badge">${label}</div>
            <h3 class="card-title">${item.title}</h3>
            <div class="card-meta">
              ${yearText}
              ${meta}
            </div>
            ${linksHtml}
          </div>
        </div>
      `;
    }

    return `
      <a class="card" href="${href}"${target} style="--i: ${i}">
        ${imageHtml}
        <div class="card-body">
          <div class="card-type-badge">${label}</div>
          <h3 class="card-title">${item.title}</h3>
          <div class="card-meta">
            ${yearText}
            ${meta}
          </div>
        </div>
      </a>
    `;
  }).join('');

  // Re-observe new cards for scroll animation
  observeCards();
}

// ============================================
// Scroll-triggered card reveal
// ============================================
let cardObserver;

function initScrollObserver() {
  cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = parseInt(card.style.getPropertyValue('--i')) || 0;
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 60);
        cardObserver.unobserve(card);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });
}

function observeCards() {
  if (!cardObserver) return;
  document.querySelectorAll('.card:not(.visible)').forEach(card => {
    cardObserver.observe(card);
  });
}

// ============================================
// Color from string (for gradient placeholders)
// ============================================
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 50%, 40%)`;
}

// ============================================
// Filters
// ============================================
function initFilters() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentType = tab.dataset.type;
      render();
    });
  });

  document.getElementById('search').addEventListener('input', e => {
    currentSearch = e.target.value;
    render();
  });

  document.getElementById('yearFilter').addEventListener('change', e => {
    currentYear = e.target.value;
    render();
  });
}

// ============================================
// Hero buttons -> scroll + filter
// ============================================
function initHeroButtons() {
  document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filterType = btn.dataset.filter;
      if (filterType) {
        currentType = filterType;
        document.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.toggle('active', t.dataset.type === filterType);
        });
        render();
      }
    });
  });
}

// ============================================
// Hero crossfade
// ============================================
function initHeroSlideshow() {
  const images = document.querySelectorAll('.hero-img');
  if (images.length < 2) return;

  let current = 0;
  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 6000);
}

// ============================================
// Dark / Light mode
// ============================================
function initDarkMode() {
  const toggle = document.getElementById('darkToggle');
  const saved = localStorage.getItem('theme');

  // Default is dark (no class). Light mode adds .light
  if (saved === 'light') {
    document.body.classList.add('light');
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

// ============================================
// About read more toggle
// ============================================
function initAboutReadMore() {
  const btn = document.getElementById('aboutReadMore');
  const expandable = document.getElementById('aboutExpandable');
  if (!btn || !expandable) return;

  btn.addEventListener('click', () => {
    const isExpanded = expandable.classList.toggle('expanded');
    btn.textContent = isExpanded ? 'Read less' : 'Read more';
  });
}

// ============================================
// Start
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  init();
  initAboutReadMore();
});

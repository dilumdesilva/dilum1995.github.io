// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// Mobile menu toggle
const menuIcon = document.querySelector('#menu-icon');
const navMenu = document.querySelector('.nav-menu');

menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Dark Mode
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace('bx-moon','bx-sun');
        document.body.classList.remove('active');
        localStorage.setItem('theme', 'dark');
    }else{
        darkmode.classList.replace('bx-sun','bx-moon');
        document.body.classList.add('active');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    darkmode.classList.replace('bx-sun','bx-moon');
    document.body.classList.add('active');
}

// Typing animation
const roles = ['Google Developer Expert', 'Tech Lead', 'Tech Speaker'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeRole() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let timeout = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        timeout = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeRole, timeout);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeRole, 500);
});

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding content
        const tabName = button.getAttribute('data-tab');
        document.getElementById(`${tabName}-content`).classList.add('active');
    });
});

// Tech Talks Data
const techTalks = [
    {
        title: "Mastering UI Consistency: From Widgets to Catalogs",
        event: "DevFest Melbourne",
        year: "2025",
        description: "Consistent UI is the backbone of great user experiences but managing and testing widgets across devices and themes can be challenging. In this talk, you'll learn how to move from building isolated widgets to creating a living catalog of components that scales into a design system. I'll share how tools like Widgetbook streamline this process by letting you preview, test, and share widgets in isolation, much like building with LEGO pieces. This approach not only speeds up development but also improves collaboration between developers, designers, and clients whether you're working solo or in a large team, a Catalog empowers you to build reliable, scalable, and maintainable UI libraries.",
        image: "img/talks/widgets_to_catalog.png",
        slidesUrl: "docs/widgets_to_catalog.pdf",
        codeUrl: "https://github.com/dilumdesilva/widgets_to_catalogs"
    }
];

// Articles Data
const articles = [
    // Add your articles here
];

// Render Tech Talks
function renderTechTalks(talks) {
    const container = document.getElementById('techTalksContainer');

    if (talks.length === 0) {
        container.innerHTML = '<div class="no-results">No tech talks found matching your criteria.</div>';
        return;
    }

    container.innerHTML = talks.map(talk => `
        <div class="tech-talk-card" data-year="${talk.year}" data-event="${talk.event.toLowerCase()}">
            <img src="${talk.image}" alt="${talk.title}" class="talk-image">
            <h3 class="talk-title">${talk.title}</h3>
            <p class="talk-event">${talk.event}</p>
            <p class="talk-year">${talk.year}</p>
            <p class="talk-description">${talk.description}</p>
            <div class="talk-buttons">
                <a href="${talk.slidesUrl}" target="_blank" class="talk-btn slides">
                    <i class='bx bx-slideshow'></i> Slides
                </a>
                <a href="${talk.codeUrl}" target="_blank" class="talk-btn code">
                    <i class='bx bxl-github'></i> Code
                </a>
            </div>
        </div>
    `).join('');
}

// Filter by Year
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const year = btn.getAttribute('data-year');
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        filterTalks(year, searchTerm);
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeYear = document.querySelector('.filter-btn.active').getAttribute('data-year');

    filterTalks(activeYear, searchTerm);
});

// Filter Talks Function
function filterTalks(year, searchTerm) {
    let filteredTalks = techTalks;

    // Filter by year
    if (year !== 'all') {
        filteredTalks = filteredTalks.filter(talk => talk.year === year);
    }

    // Filter by search term
    if (searchTerm) {
        filteredTalks = filteredTalks.filter(talk =>
            talk.event.toLowerCase().includes(searchTerm) ||
            talk.title.toLowerCase().includes(searchTerm) ||
            talk.description.toLowerCase().includes(searchTerm)
        );
    }

    renderTechTalks(filteredTalks);
}

// Render Articles
function renderArticles(articleList) {
    const container = document.getElementById('articlesContainer');

    if (articleList.length === 0) {
        container.innerHTML = '<div class="no-results">No articles found matching your criteria.</div>';
        return;
    }

    container.innerHTML = articleList.map(article => {
        const date = new Date(article.date);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        return `
            <div class="article-card" data-year="${article.year}">
                <h3 class="article-title">${article.title}</h3>
                <div class="article-meta">
                    <span class="article-date">
                        <i class='bx bx-calendar'></i> ${formattedDate}
                    </span>
                    <span class="article-platform">${article.platform}</span>
                </div>
                <p class="article-description">${article.description}</p>
                <a href="${article.url}" target="_blank" class="article-btn">
                    <i class='bx bx-book-reader'></i> Read More
                </a>
            </div>
        `;
    }).join('');
}

// Filter Articles by Year
const articleFilterButtons = document.querySelectorAll('.article-filter-btn');
articleFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        articleFilterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const year = btn.getAttribute('data-year');
        const searchTerm = document.getElementById('articlesSearchInput').value.toLowerCase();

        filterArticles(year, searchTerm);
    });
});

// Search Articles Functionality
const articlesSearchInput = document.getElementById('articlesSearchInput');
articlesSearchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeYear = document.querySelector('.article-filter-btn.active').getAttribute('data-year');

    filterArticles(activeYear, searchTerm);
});

// Filter Articles Function
function filterArticles(year, searchTerm) {
    let filteredArticles = articles;

    // Filter by year
    if (year !== 'all') {
        filteredArticles = filteredArticles.filter(article => article.year === year);
    }

    // Filter by search term
    if (searchTerm) {
        filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(searchTerm) ||
            article.description.toLowerCase().includes(searchTerm) ||
            article.platform.toLowerCase().includes(searchTerm)
        );
    }

    renderArticles(filteredArticles);
}

// Initial render
renderTechTalks(techTalks);
renderArticles(articles);
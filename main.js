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
        title: "Building Mobile Apps with React Native",
        event: "DevConf 2024",
        year: "2024",
        description: "An in-depth exploration of React Native development, covering best practices and performance optimization techniques.",
        image: "img/profile.png", // Replace with actual tech talk image
        slidesUrl: "docs/DilumDeSilva.pdf", // Replace with actual slides
        codeUrl: "https://github.com/dilumdesilva" // Replace with actual code repository
    },
    {
        title: "Modern Mobile Architecture",
        event: "TechSummit 2023",
        year: "2023",
        description: "Exploring architectural patterns and design principles for scalable mobile applications.",
        image: "img/profile.png", // Replace with actual tech talk image
        slidesUrl: "docs/DilumDeSilva.pdf", // Replace with actual slides
        codeUrl: "https://github.com/dilumdesilva" // Replace with actual code repository
    },
    // Add more tech talks here
];

// Articles Data
const articles = [
    {
        title: "Getting Started with React Native: A Comprehensive Guide",
        date: "2024-03-15",
        year: "2024",
        platform: "Medium",
        description: "A complete guide for developers looking to start their journey with React Native, covering setup, core concepts, and best practices.",
        url: "https://medium.com/@dilumdesilva" // Replace with actual article URL
    },
    {
        title: "Building Scalable Mobile Applications",
        date: "2023-11-20",
        year: "2023",
        platform: "Dev.to",
        description: "Learn how to architect mobile applications that scale efficiently as your user base grows.",
        url: "https://dev.to/dilumdesilva" // Replace with actual article URL
    },
    // Add more articles here
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
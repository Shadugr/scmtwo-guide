/**
 * USCM Wiki - Reusable Components
 * Инициализирует общие элементы страницы: header, sidebar, author card
 */

// --- CONFIGURATION ---
const SITE_CONFIG = {
    siteName: 'ККМП',
    siteSubtitle: 'БАЗА ЗНАНИЙ КОРПУСА'
};

// --- NAVIGATION DATA ---
const NAV_SECTIONS = [
    {
        title: 'ИНФОРМАЦИЯ',
        links: [
            { href: '', text: 'Главная' },
            { href: 'lore/', text: 'Лор и структура' },
            { href: 'maps/', text: 'Карты' },
            { href: 'faq/', text: 'F.A.Q.' }
        ]
    },
    {
        title: 'РУКОВОДСТВО НАЧИНАЮЩИХ МОРПЕХОВ',
        links: [
            { href: 'guides/server_enter/', text: 'Как зайти на сервер' },
            { href: 'guides/lobby/', text: 'Создание персонажа' },
            { href: 'guides/interface/', text: 'Интерфейс' },
            { href: 'guides/awakening/', text: 'Первые шаги' },
            { href: 'guides/armoury/', text: 'Арсенал' }
        ]
    },
    {
        title: 'РОЛИ',
        links: [
            { href: 'roles/leaders/', text: 'Лидеры' }
        ]
    }
];

// --- HELPER: Get base path for links ---
function getBasePath() {
    const path = window.location.pathname;
    // Count depth: /guides/lobby/index.html = 2 levels deep from root
    const parts = path.split('/').filter(p => p && p !== 'index.html');
    // Remove empty strings and count directories
    let depth = 0;
    for (const part of parts) {
        if (!part.endsWith('.html')) {
            depth++;
        }
    }
    // Subtract 1 if we are on GitHub Pages (or any subdirectory deployment)
    // Heuristic: if the hostname contains github.io, we assume the first folder is the project name
    const isGitHub = window.location.hostname.includes('github.io');
    if (isGitHub && depth > 0) {
        depth -= 1;
    }

    // Also handle local testing with specific repo folder if mapped
    if (!isGitHub && parts.length > 0 && parts[0] === 'scmtwo-guide') {
        depth -= 1;
    }

    if (depth <= 0) return '';
    return '../'.repeat(depth);
}

// --- HEADER COMPONENT ---
function renderHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const basePath = getBasePath();

    header.className = 'top-bar';
    header.innerHTML = `
        <div class="logo-area">
            <button class="menu-toggle" onclick="toggleSidebar()">☰</button>
            <a href="${basePath}" class="logo-text" style="text-decoration: none;">
                <h1>${SITE_CONFIG.siteName} <small style="font-size: 0.5em; opacity: 0.7;">// ВИКИ</small></h1>
                <span>${SITE_CONFIG.siteSubtitle}</span>
            </a>
        </div>
        <div class="header-search">
            <input type="text" class="search-input" placeholder="ПОИСК ПО БАЗЕ..." id="site-search">
            <div class="search-results" id="search-results"></div>
        </div>
    `;

    // Initialize search
    initSearch();
}

// --- SIDEBAR COMPONENT ---
function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const basePath = getBasePath();
    // Get current path segments for matching
    // Filter empty and index.html
    const rawParts = window.location.pathname.split('/').filter(p => p && p !== 'index.html');

    // Remove repository name if present (GitHub Pages or local repo folder)
    // This ensures /scmtwo-guide/guides/lobby/ matches guides/lobby/
    if (rawParts.length > 0 && rawParts[0] === 'scmtwo-guide') {
        rawParts.shift();
    }

    const currentPath = rawParts.join('/');

    let sectionsHtml = NAV_SECTIONS.map((section, index) => {
        let hasActiveLink = false;

        const linksHtml = section.links.map(link => {
            const href = basePath + link.href;
            // Check if current path matches link href (without trailing slash)
            // Normalize: remove trailing slash from link.href
            const linkPath = link.href.replace(/\/$/, '');

            // Check exact match OR root match
            const isActive = (currentPath === linkPath) ||
                (link.href === '' && (currentPath === '' || rawParts.length === 0));

            if (isActive) {
                hasActiveLink = true;
                return `<a href="${href}" class="active">> ${link.text}</a>`;
            }
            return `<a href="${href}">> ${link.text}</a>`;
        }).join('');

        // Open if it's the first section (Information) or if it contains active link
        const isOpen = index === 0 || hasActiveLink;
        const collapsedClass = isOpen ? '' : 'collapsed';

        return `
            <div class="nav-section ${collapsedClass}">
                <div class="nav-header" onclick="this.parentElement.classList.toggle('collapsed')">
                    ${section.title}
                    <span class="nav-toggle">▼</span>
                </div>
                <div class="nav-links">${linksHtml}</div>
            </div>
        `;
    }).join('');

    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <button class="close-sidebar" onclick="toggleSidebar()" aria-label="Close Menu">×</button>
        <div class="sidebar-content">
            ${sectionsHtml}
        </div>
        <div class="sidebar-footer">
            <div class="footer-status">
                 БАЗА ДАННЫХ: <span class="status-online">ОНЛАЙН</span>
            </div>
            КОРП. ВЕЙЛАНД-ЮТАНИ<br>
            ИДЕНТИФИКАТОР ТЕРМИНАЛА: Т-884
        </div>
    `;

    // Re-bind search functionality
    initSearch();

    // Global function to toggle sidebar and handle body scroll lock
    window.toggleSidebar = function () {
        const sidebar = document.getElementById('sidebar');
        const body = document.body;
        sidebar.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            body.classList.add('sidebar-open');
        } else {
            body.classList.remove('sidebar-open');
        }
    };
    // Close sidebar when clicking outside (on the overlay)
    document.addEventListener('click', function (event) {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.querySelector('.menu-toggle');

        // If sidebar is open, and click is NOT on sidebar and NOT on menu toggle
        if (sidebar.classList.contains('open') &&
            !sidebar.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            toggleSidebar(); // Use the global function to close
        }
    });
    // load order in main: renderHeader -> renderSidebar -> initSearch.
    // So moving element to sidebar is fine.
}

// --- PAGE META COMPONENT ---
// accessColor: 'green' (default), 'yellow', 'red', 'blue', 'purple'
function renderPageMeta(title, section, updateDate, access, accessColor = 'green') {
    const meta = document.getElementById('page-meta');
    if (!meta) return;

    const colorMap = {
        green: 'var(--accent-green-bright)',
        yellow: 'var(--accent-yellow)',
        red: 'var(--accent-red)',
        blue: 'var(--accent-blue)',
        purple: 'var(--accent-purple)'
    };
    const color = colorMap[accessColor] || colorMap.green;

    meta.className = 'page-meta';
    meta.innerHTML = `
        <span>РАЗДЕЛ: ${section.toUpperCase()}</span>
        <span>ОБНОВЛЕНО: ${updateDate}</span>
        <span>ДОСТУП: <span style="color: ${color};">${access}</span></span>
    `;
}

// --- TABLE OF CONTENTS COMPONENT ---
function renderTableOfContents() {
    // Skip TOC on index page
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path.endsWith('/')) return;

    const contentFrame = document.querySelector('.content-frame');
    if (!contentFrame) return;

    // Get all h2-h6 headings
    const headings = contentFrame.querySelectorAll('h2, h3, h4, h5, h6');
    if (headings.length === 0) return;

    // Create TOC container if not exists
    let tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) {
        tocContainer = document.createElement('div');
        tocContainer.id = 'table-of-contents';
        tocContainer.className = 'toc-collapsed'; // Start collapsed
        // Insert after page-meta
        const pageMeta = document.getElementById('page-meta');
        if (pageMeta && pageMeta.nextSibling) {
            pageMeta.parentNode.insertBefore(tocContainer, pageMeta.nextSibling);
        } else {
            contentFrame.insertBefore(tocContainer, contentFrame.firstChild);
        }
    }

    // Build nested tree structure
    let tocListHtml = '<ul class="toc-list">';
    let stack = [];

    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }

        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent;
        const link = `<a href="#${heading.id}">${text}</a>`;

        while (stack.length > 0 && stack[stack.length - 1] >= level) {
            tocListHtml += '</ul></li>';
            stack.pop();
        }

        tocListHtml += `<li class="toc-h${level}">${link}`;
        tocListHtml += '<ul class="toc-sublist">';
        stack.push(level);
    });

    while (stack.length > 0) {
        tocListHtml += '</ul></li>';
        stack.pop();
    }

    tocListHtml += '</ul>';

    // Collapsible structure
    tocContainer.innerHTML = `
        <div class="toc-header" onclick="this.parentElement.classList.toggle('toc-collapsed')">
            <span class="toc-title">СОДЕРЖАНИЕ</span>
            <span class="toc-toggle">▼</span>
        </div>
        <div class="toc-body">
            ${tocListHtml}
        </div>
    `;
}

// --- AUTHOR CARD COMPONENT ---
function renderAuthorCard(instructorName) {
    const card = document.getElementById('author-card');
    if (!card) return;

    // Get initials from instructor name
    const initials = instructorName.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2) || 'IN';

    card.className = 'author-card';
    card.innerHTML = `
        <div class="instructor-icon">
            <svg class="star" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span class="line"></span>
        </div>
        <div class="author-info">
            <div class="author-rank">ИНСТРУКТОР</div>
            <div class="author-name">${instructorName}</div>
            <div style="font-size: 0.75rem; color: #666;">УЧЕБНЫЙ ЦЕНТР ККМП</div>
        </div>
    `;
}

// --- IMAGE ZOOM COMPONENT ---
function initImageZoom() {
    const overlay = document.createElement('div');
    overlay.className = 'image-zoom-overlay';
    overlay.innerHTML = `
        <img class="zoomed-image" src="" alt="">
        <button class="zoom-close">✕</button>
        <div class="zoom-level">100%</div>
    `;
    document.body.appendChild(overlay);

    const zoomedImg = overlay.querySelector('.zoomed-image');
    const closeBtn = overlay.querySelector('.zoom-close');
    const zoomLevel = overlay.querySelector('.zoom-level');

    let currentZoom = 1;
    let panX = 0, panY = 0;
    let isDragging = false;
    let startX, startY;

    function updateTransform() {
        zoomedImg.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
        zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
    }

    function resetZoom() {
        currentZoom = 1;
        panX = 0;
        panY = 0;
        updateTransform();
    }

    // Open image
    document.querySelectorAll('.content-frame img, .content-frame figure img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            zoomedImg.src = img.src;
            resetZoom();
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Scroll wheel zoom
    overlay.addEventListener('wheel', (e) => {
        if (!overlay.classList.contains('active')) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        currentZoom = Math.min(Math.max(1, currentZoom + delta), 2);

        // Reset pan if zoomed out to 100%
        if (currentZoom <= 1) {
            currentZoom = 1;
            panX = 0;
            panY = 0;
        }

        updateTransform();
    });

    // Drag to pan
    zoomedImg.addEventListener('mousedown', (e) => {
        if (currentZoom <= 1) return;
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        zoomedImg.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const overlayRect = overlay.getBoundingClientRect();
        const imgRect = zoomedImg.getBoundingClientRect();

        // Calculate max pan limits based on zoomed size vs viewport
        // The image is centered by default, so we panic relative to that
        const maxX = (imgRect.width - overlayRect.width) / 2;
        const maxY = (imgRect.height - overlayRect.height) / 2;

        // If image is smaller than viewport, keep centered (0)
        // If larger, allow panning up to the overflow amount
        const limitX = maxX > 0 ? maxX : 0;
        const limitY = maxY > 0 ? maxY : 0;

        let newPanX = e.clientX - startX;
        let newPanY = e.clientY - startY;

        // Constrain to limits
        panX = Math.min(Math.max(newPanX, -limitX), limitX);
        panY = Math.min(Math.max(newPanY, -limitY), limitY);

        updateTransform();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        zoomedImg.style.cursor = currentZoom > 1 ? 'grab' : 'default';
    });

    // Close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === closeBtn) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            resetZoom();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            resetZoom();
        }
    });
}

// --- SEARCH COMPONENT ---
function initSearch() {
    const searchInput = document.getElementById('site-search');
    const resultsContainer = document.getElementById('search-results');
    if (!searchInput || !resultsContainer) return;

    const basePath = getBasePath();
    let searchIndex = [];
    let isIndexLoaded = false;

    // Fetch index on first focus
    searchInput.addEventListener('focus', () => {
        if (!isIndexLoaded) {
            fetch(basePath + 'search.json')
                .then(response => response.json())
                .then(data => {
                    searchIndex = data;
                    isIndexLoaded = true;
                    // Trigger search if user already typed
                    if (searchInput.value.length >= 2) {
                        searchInput.dispatchEvent(new Event('input'));
                    }
                })
                .catch(err => console.error('Error loading search index:', err));
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            resultsContainer.classList.remove('active');
            resultsContainer.innerHTML = '';
            return;
        }

        if (!isIndexLoaded) {
            resultsContainer.innerHTML = '<div class="search-no-results">Загрузка индекса...</div>';
            resultsContainer.classList.add('active');
            return;
        }

        // Limit results to 10
        const matches = searchIndex
            .filter(page =>
                page.title.toLowerCase().includes(query) ||
                page.content.toLowerCase().includes(query)
            )
            .slice(0, 10);

        if (matches.length > 0) {
            resultsContainer.innerHTML = matches.map(page => {
                // Generate snippet
                let snippet = '';
                const contentLower = page.content.toLowerCase();
                const queryIndex = contentLower.indexOf(query);

                if (queryIndex > -1) {
                    const start = Math.max(0, queryIndex - 40);
                    const end = Math.min(page.content.length, queryIndex + 60);
                    snippet = '...' + page.content.substring(start, end) + '...';

                    // Highlight match
                    snippet = snippet.replace(new RegExp(`(${query})`, 'gi'), '<strong>$1</strong>');
                } else {
                    snippet = page.content.substring(0, 80) + '...';
                }

                // Translate section names
                const sectionMap = {
                    'Information': 'ИНФОРМАЦИЯ',
                    'Guides': 'РУКОВОДСТВА',
                    'Roles': 'РОЛИ',
                    'Maps': 'КАРТЫ',
                    'FAQ': 'F.A.Q.'
                };
                const displaySection = sectionMap[page.section] || page.section;

                return `
                    <a href="${basePath}${page.url}" class="search-result-item">
                        <span class="search-result-title">${page.title}</span>
                        <span class="search-result-section">${displaySection}</span>
                        <div class="search-result-snippet">${snippet}</div>
                    </a>
                `;
            }).join('');
            resultsContainer.classList.add('active');
        } else {
            resultsContainer.innerHTML = '<div class="search-no-results">Ничего не найдено</div>';
            resultsContainer.classList.add('active');
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-search')) {
            resultsContainer.classList.remove('active');
        }
    });

    // Close on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resultsContainer.classList.remove('active');
            searchInput.blur();
        }
    });
}

// --- INITIALIZE ALL COMPONENTS ---
document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderSidebar();
    renderTableOfContents();
    initImageZoom();
});

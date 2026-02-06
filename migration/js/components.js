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
            { href: 'index.html', text: 'Главная' },
            { href: 'lore.html', text: 'Лор и структура' },
            { href: 'maps.html', text: 'Карты' },
            { href: 'faq.html', text: 'F.A.Q.' }
        ]
    },
    {
        title: 'РУКОВОДСТВО НАЧИНАЮЩИХ МОРПЕХОВ',
        links: [
            { href: 'guides/server_enter.html', text: 'Как зайти на сервер' },
            { href: 'guides/lobby.html', text: 'Создание персонажа' },
            { href: 'guides/interface.html', text: 'Интерфейс' },
            { href: 'guides/awakening.html', text: 'Первые шаги' },
            { href: 'guides/armoury.html', text: 'Арсенал' }
        ]
    },
    {
        title: 'РОЛИ',
        links: [
            { href: 'roles/leaders.html', text: 'Лидеры' }
        ]
    }
];

// --- HELPER: Get base path for links ---
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/guides/') || path.includes('/roles/')) {
        return '../';
    }
    return '';
}

// --- HEADER COMPONENT ---
function renderHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const basePath = getBasePath();

    header.className = 'top-bar';
    header.innerHTML = `
        <div class="logo-area">
            <button class="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
            <a href="${basePath}index.html" class="logo-text" style="text-decoration: none;">
                <h1>${SITE_CONFIG.siteName} <small style="font-size: 0.5em; opacity: 0.7;">// ВИКИ</small></h1>
                <span>${SITE_CONFIG.siteSubtitle}</span>
            </a>
        </div>
        <div class="user-status">
            <span class="status-light"></span>
            БАЗА ДАННЫХ: <strong>ОНЛАЙН</strong>
        </div>
    `;
}

// --- SIDEBAR COMPONENT ---
function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const basePath = getBasePath();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    let sectionsHtml = NAV_SECTIONS.map((section, index) => {
        let hasActiveLink = false;

        const linksHtml = section.links.map(link => {
            const href = basePath + link.href;
            // Check if this link is current page to mark section as active
            if (link.href.endsWith(currentPage)) {
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
        <div class="sidebar-content">
            ${sectionsHtml}
        </div>
        <div class="sidebar-footer">
            КОРП. ВЕЙЛАНД-ЮТАНИ<br>
            ИДЕНТИФИКАТОР ТЕРМИНАЛА: Т-884
        </div>
    `;
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

// --- INITIALIZE ALL COMPONENTS ---
document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderSidebar();
    renderTableOfContents();
    initImageZoom();
});

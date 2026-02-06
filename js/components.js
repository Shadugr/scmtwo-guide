/**
 * USCM Wiki - Reusable Components
 * Инициализирует общие элементы страницы: header, sidebar, author card
 */

// --- CONFIGURATION ---
const SITE_CONFIG = {
    siteName: 'KKMП',
    siteSubtitle: 'БАЗА ЗНАНИЙ КОРПУСА',
    repoName: 'scmtwo-guide'
};

// --- ICON SYSTEM ---
function getIcon(name) {
    const icons = {
        menu: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
        close: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        chevronDown: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
        arrowUp: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`,
        // Admonition / Status Icons
        info: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
        warning: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        danger: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        check: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        star: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        link: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
        clipboard: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
        edit: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
        pin: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        search: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
        settings: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
        bug: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 16v-3a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3"></path><path d="M4.17 10.74l3.12 3.86"></path><path d="M19.83 10.74l-3.12 3.86"></path><path d="M10 2l-2 3"></path><path d="M14 2l2 3"></path><path d="M22 6h-6"></path><path d="M8 6H2"></path></svg>`,
        quote: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path></svg>`,
        list: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`
    };
    return icons[name] || '';
}

// --- HELPER: Replace Text Symbols with SVGs ---
function replaceSymbolsWithIcons() {
    // 1. Context-Aware Admonition Icons
    const admonitions = document.querySelectorAll('.admonition');
    admonitions.forEach(block => {
        let iconName = 'info'; // Default
        let className = 'icon-info';

        if (block.classList.contains('danger') || block.classList.contains('failure') || block.classList.contains('error')) {
            iconName = 'danger';
            className = 'icon-danger';
        } else if (block.classList.contains('warning') || block.classList.contains('alert')) {
            iconName = 'warning';
            className = 'icon-warning';
        } else if (block.classList.contains('success') || block.classList.contains('check')) {
            iconName = 'check';
            className = 'icon-check';
        } else if (block.classList.contains('abstract') || block.classList.contains('summary') || block.classList.contains('note')) {
            iconName = 'clipboard'; // Abstract/Note
            className = 'icon-abstract';
        } else if (block.classList.contains('quote') || block.classList.contains('cite')) {
            iconName = 'quote';
            className = 'icon-quote';
        } else if (block.classList.contains('bug')) {
            iconName = 'bug';
            className = 'icon-danger';
        }

        // Find title
        const title = block.querySelector('.admonition-title');
        if (title) {
            // Remove existing unicode symbols from start of text
            // Regex to remove common emojis and space
            const regex = /^[\s\u2139\u26A0\u2713\u2714\u2605\u2606\uD83D\uDCCB\uD83D\uDCDD\uD83D\uDCCC\uD83D\uDCCD\uD83D\uDD0D\u2699\uFE0F]*\s*/;

            // Check if we already injected an icon (to prevent duplicates)
            if (!title.querySelector('.icon-inline')) {
                // Get text node
                let textNode = Array.from(title.childNodes).find(n => n.nodeType === 3);
                if (textNode) {
                    textNode.nodeValue = textNode.nodeValue.replace(regex, ''); // Strip symbol
                }

                // Inject Icon
                const iconSpan = document.createElement('span');
                iconSpan.className = `icon-inline ${className}`;
                iconSpan.innerHTML = getIcon(iconName);
                title.prepend(iconSpan);
            }
        }
    });

    // 2. Inline Text Replacement (for other symbols outside admonitions)
    const map = {
        'ℹ': 'info',
        '⚠': 'warning',
        '✓': 'check',
        '✔': 'check',
        '★': 'star',
        '☆': 'star',
        '📋': 'clipboard',
        '📝': 'edit',
        '📌': 'pin',
        '📍': 'pin',
        '🔍': 'search',
        '⚙️': 'settings',
        '⚙': 'settings' // Variation without selector
    };

    // Target common containers for symbols
    const targets = document.querySelectorAll('.main-content, .admonition-title, blockquote, p, li, td');

    targets.forEach(el => {
        // Skip if already processed or has children (to avoid breaking DOM, handle text nodes only)
        // Actually, safer to iterate childNodes
        el.childNodes.forEach(node => {
            if (node.nodeType === 3) { // Text node
                let text = node.nodeValue;
                let changed = false;

                for (const [symbol, iconName] of Object.entries(map)) {
                    if (text.includes(symbol)) {
                        // We need to split and insert HTML
                        // Since we can't replace text node with HTML directly easily in this loop without breaking iteration,
                        // we'll replace the text node with a span containing the new HTML
                        const span = document.createElement('span');
                        span.className = 'symbol-replaced';
                        // Replace symbol with icon
                        span.innerHTML = text.replace(new RegExp(symbol, 'g'), `<span class="icon-inline icon-${iconName}">${getIcon(iconName)}</span>`);
                        node.parentNode.replaceChild(span, node);
                        changed = true;
                        break; // Stop processing this node to avoid re-entry issues
                    }
                }
            }
        });
    });
}

// --- NAVIGATION DATA ---
const NAV_SECTIONS = [
    {
        title: 'ГЛАВНОЕ',
        links: [
            { href: '/', text: 'Главная' },
            { href: 'lore/', text: 'Мир и Структура' },
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
    let depth = parts.length;

    // Adjust depth based on site structure assumptions
    if (path.endsWith('.html')) {
        depth--; // file itself doesn't count as a folder level
    } else {
        // If it's a folder path like /guides/lobby/ (which serves index.html implicitly)
        // Check if last part is empty due to trailing slash
        if (path.endsWith('/')) {
            // depth is fine
        } else {
            // /guides/lobby -> load index.html, depth is correct
        }
    }
    // Subtract 1 if we are on GitHub Pages (or any subdirectory deployment)
    // Heuristic: if the hostname contains github.io, we assume the first folder is the project name
    const isGitHub = window.location.hostname.includes('github.io');
    if (isGitHub && depth > 0) {
        depth -= 1;
    }

    // Also handle local testing with specific repo folder if mapped
    // This is now handled by SITE_CONFIG.repoName and the depth calculation
    if (!isGitHub && parts.length > 0 && parts[0] === SITE_CONFIG.repoName) {
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
            <button class="menu-toggle" onclick="toggleSidebar()" aria-label="Toggle Menu">${getIcon('menu')}</button>
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

    // Scroll Handler (Mobile Header & Back-to-Top)
    let lastScrollY = 0;
    const headerElement = document.getElementById('site-header');
    const mainContent = document.querySelector('.main-content'); // Scrollable element on mobile

    // Create Back to Top Button
    const topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.innerHTML = getIcon('arrowUp');
    topBtn.onclick = () => {
        // Scroll both window and container to be safe
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(topBtn);

    // Use the scrollable element instead of window
    const scrollTarget = mainContent || window;

    const handleScroll = () => {
        const currentScrollY = scrollTarget.scrollTop || window.scrollY;

        // --- 1. Header Logic (Mobile Only) ---
        if (window.innerWidth <= 768) {
            // "Appear only on top of page"
            if (currentScrollY > 50) {
                headerElement.classList.add('header-hidden');
            } else {
                headerElement.classList.remove('header-hidden');
            }
        }

        // --- 2. Back to Top Logic ---
        if (currentScrollY > 300) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }

        lastScrollY = currentScrollY;
    };

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true }); // Fallback

    // Run symbol replacement
    replaceSymbolsWithIcons();
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
                    <span class="nav-toggle">${getIcon('chevronDown')}</span>
                </div>
                <div class="nav-links">${linksHtml}</div>
            </div>
        `;
    }).join('');

    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
        <button class="close-sidebar" onclick="toggleSidebar()" aria-label="Close Menu">${getIcon('close')}</button>
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

    // Prevent sidebar closing when clicking category headers
    // The previous logic already handles this because .nav-header is inside #sidebar
    // However, if the user meant that clicking a category toggle closes it, 
    // it implies event bubbling or a specific logic error. 
    // Let's ensure clicks inside sidebar don't propagate to the document listener if that's the issue.
    // Actually, the issue is likely that "sidebar.contains(event.target)" IS true, so it DOESN'T close.
    // Wait, the user said "If I click on closed category... sidebar just close".
    // This means the click IS triggering the close. But why?
    // Ah! If the category expands, maybe the target element moves or is re-rendered? No.
    // Let's verify if the click listener is attached to sidebar itself.
    // NO, it's on document.

    // IF the user clicks on a category header, `sidebar.contains(event.target)` returns true.
    // So the `if` condition `!sidebar.contains(event.target)` should be FALSE.
    // So `toggleSidebar()` is NOT called.

    // UNLESS... `event.target` is the arrow <span> and it somehow isn't considered inside sidebar? No.

    // OR... is there another listener?
    // renderSidebar adds `onclick="this.parentElement.classList.toggle('collapsed')"` to nav-header.

    // Let's try to stop propagation on the sidebar itself to be safe.
    sidebar.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    // load order in main: renderHeader -> renderSidebar -> initSearch.
    // So moving element to sidebar is fine.

    // Enable transition after initial render to prevent flash
    setTimeout(() => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.add('animated');
    }, 100);
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

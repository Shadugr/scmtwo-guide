const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_DIR = __dirname;
const OUTPUT_FILE = path.join(__dirname, 'search.json');
const URL_PREFIX = 'https://shadugr.github.io/scmtwo-guide/'; // Base URL for sitemap, relative for search

// Files to exclude
const EXCLUDE_FILES = [
    '404.html',
    'index.html', // Index page usually has duplicate content or just navigation
    'new.html'
];

// Directories to exclude
const EXCLUDE_DIRS = [
    '.git',
    '.github',
    'css',
    'js',
    'img',
    'node_modules'
];

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(file)) {
                getAllHtmlFiles(filePath, fileList);
            }
        } else {
            if (path.extname(file) === '.html' && !EXCLUDE_FILES.includes(file)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function extractContent(html) {
    // Very basic HTML text extraction
    // 1. Remove scripts and styles
    let text = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");
    text = text.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "");

    // 2. Extract title
    const titleMatch = text.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace('ККМП: ', '') : 'Untitled';

    // 3. Extract main content (assuming it's in .content-frame or main)
    const contentMatch = text.match(/<div class="content-frame">([\s\S]*?)<div id="author-card">/);
    let mainContent = contentMatch ? contentMatch[1] : text;

    // 4. Remove tags
    mainContent = mainContent.replace(/<[^>]+>/g, ' ');

    // 5. Decode entities (basic)
    mainContent = mainContent.replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');

    // 6. Clean whitespace
    mainContent = mainContent.replace(/\s+/g, ' ').trim();

    return { title, content: mainContent };
}

function getRelativePath(filePath) {
    // Convert absolute path to web path
    // e.g. e:\work\...\lore\index.html -> lore/
    let relPath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/');

    // Handle index.html for clean URLs
    if (relPath.endsWith('index.html')) {
        return relPath.replace('index.html', '');
    }
    return relPath;
}

function generateIndex() {
    const files = getAllHtmlFiles(CONTENT_DIR);
    const index = [];

    console.log(`Scanning ${files.length} files...`);

    files.forEach(filePath => {
        const html = fs.readFileSync(filePath, 'utf8');
        const { title, content } = extractContent(html);
        const url = getRelativePath(filePath);

        // Determine section based on folder
        let section = 'Информация';
        if (url.startsWith('guides/')) section = 'Руководство';
        if (url.startsWith('roles/')) section = 'Роли';
        if (url.startsWith('maps/')) section = 'Карты';
        if (url.startsWith('faq/')) section = 'FAQ';

        index.push({
            title,
            section,
            url,
            content
        });

        console.log(`Indexed: ${title} (${url})`);
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
    console.log(`\nSearch index written to ${OUTPUT_FILE}`);
}

generateIndex();

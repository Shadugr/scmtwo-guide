const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_DIR = __dirname;
const OUTPUT_FILE = path.join(__dirname, 'sitemap.xml');
const URL_PREFIX = 'https://shadugr.github.io/scmtwo-guide/';

// Files to exclude
const EXCLUDE_FILES = [
    '404.html',
    'new.html',
    'google.html' // If exists
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

function getUrl(filePath) {
    let relPath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/');

    // Convert index.html to directory URL
    if (relPath.endsWith('index.html')) {
        relPath = relPath.replace('index.html', '');
    }

    return URL_PREFIX + relPath;
}

function getLastMod(filePath) {
    const stat = fs.statSync(filePath);
    return stat.mtime.toISOString().split('T')[0];
}

function getPriority(relPath) {
    if (relPath === '' || relPath === 'index.html') return '1.0';
    if (relPath.startsWith('guides/')) return '0.9';
    if (relPath.startsWith('mechanics/')) return '0.8';
    if (relPath.startsWith('roles/')) return '0.8';
    return '0.7';
}

function generateSitemap() {
    const files = getAllHtmlFiles(CONTENT_DIR);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    console.log(`Scanning ${files.length} files...`);

    files.forEach(filePath => {
        const url = getUrl(filePath);
        const lastmod = getLastMod(filePath);
        const relPath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, '/');
        const priority = getPriority(relPath);

        xml += '    <url>\n';
        xml += `        <loc>${url}</loc>\n`;
        xml += `        <lastmod>${lastmod}</lastmod>\n`;
        xml += `        <priority>${priority}</priority>\n`;
        xml += '    </url>\n';

        console.log(`Added: ${url}`);
    });

    xml += '</urlset>';

    fs.writeFileSync(OUTPUT_FILE, xml);
    console.log(`\nSitemap written to ${OUTPUT_FILE}`);
}

generateSitemap();

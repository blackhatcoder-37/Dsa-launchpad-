const fs = require('fs');
const path = require('path');

// Read the manifest to get the main entry point
const manifestPath = path.join(__dirname, '../dist/server/.vite/manifest.json');

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  
  // Find the main CSS file
  const cssFile = Object.values(manifest).find(entry => entry.file && entry.file.endsWith('.css'))?.file;
  
  // Find the main JS entry (usually client-*)
  const jsFiles = Object.values(manifest)
    .filter(entry => entry.file && entry.file.endsWith('.js') && entry.file.includes('client'))
    .map(entry => entry.file);
  
  const mainJs = jsFiles[0] || 'assets/index.js';
  
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DSA Launchpad — 25 cozy days of Python algorithms</title>
    <meta name="description" content="A 25-day roadmap to master Data Structures and Algorithms with Python." />
    ${cssFile ? `<link rel="stylesheet" href="/assets/${path.basename(cssFile)}" />` : ''}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${path.basename(mainJs)}"></script>
  </body>
</html>`;

  // Write to dist/client/
  const outputPath = path.join(__dirname, '../dist/client/index.html');
  fs.writeFileSync(outputPath, indexHtml);
  console.log('✓ Created dist/client/index.html');
} catch (error) {
  console.error('Error creating index.html:', error.message);
  
  // Fallback: create a basic index.html
  const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DSA Launchpad — 25 cozy days of Python algorithms</title>
    <meta name="description" content="A 25-day roadmap to master Data Structures and Algorithms with Python." />
    <link rel="stylesheet" href="/assets/styles-cnECMKT0.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-sdKDWycR.js"></script>
  </body>
</html>`;

  const outputPath = path.join(__dirname, '../dist/client/index.html');
  fs.writeFileSync(outputPath, fallbackHtml);
  console.log('✓ Created fallback dist/client/index.html');
}

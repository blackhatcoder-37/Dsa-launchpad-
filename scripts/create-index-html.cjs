const fs = require("fs");
const path = require("path");

try {
  const assetsDir = path.join(__dirname, "../dist/client/assets");

  // Read all files in assets directory
  const files = fs.readdirSync(assetsDir) || [];

  // Find CSS file (styles-*.css)
  const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));

  // Find the main JS entry point - look for index-*.js (the main bundle)
  const jsFiles = files.filter(
    (f) => f.endsWith(".js") && (f.startsWith("index-") || f.startsWith("client-")),
  );

  // Get the largest JS file as main entry (the main bundle)
  let mainJs = jsFiles[0];
  if (jsFiles.length > 1) {
    mainJs = jsFiles.sort((a, b) => {
      const aSize = fs.statSync(path.join(assetsDir, a)).size;
      const bSize = fs.statSync(path.join(assetsDir, b)).size;
      return bSize - aSize; // Largest first
    })[0];
  }

  if (!mainJs) {
    throw new Error("Could not find main JS file");
  }

  const indexHtml = `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <title>DSA Launchpad — 25 cozy days of Python algorithms</title>
    <meta name="description" content="A 25-day roadmap to master Data Structures and Algorithms with Python." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJs}"></script>
  </body>
</html>`;

  const outputPath = path.join(__dirname, "../dist/client/index.html");
  fs.writeFileSync(outputPath, indexHtml);
  console.log(`✓ Created dist/client/index.html with ${cssFile} and ${mainJs}`);
} catch (error) {
  console.error("Error creating index.html:", error.message);

  // Fallback: try to read existing HTML or create minimal one
  const fallbackHtml = `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <title>DSA Launchpad — 25 cozy days of Python algorithms</title>
    <meta name="description" content="A 25-day roadmap to master Data Structures and Algorithms with Python." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  const outputPath = path.join(__dirname, "../dist/client/index.html");
  fs.writeFileSync(outputPath, fallbackHtml);
  console.log("✓ Created fallback dist/client/index.html");
}

const fs = require("fs");
const path = require("path");

const root = __dirname;

function read(file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing file: ${file}`);
  }
  return fs.readFileSync(fullPath, "utf8");
}

function assertIncludes(content, expected, label) {
  if (!content.includes(expected)) {
    throw new Error(`Missing ${label}: ${expected}`);
  }
}

function assertExcludes(content, unexpected, label) {
  if (content.includes(unexpected)) {
    throw new Error(`Unexpected ${label}: ${unexpected}`);
  }
}

function assertFile(file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing asset: ${file}`);
  }
}

const html = read("index.html");
const css = read("assets/css/styles.css");
const js = read("assets/js/script.js");
const manifest = read("assets/favicon/site.webmanifest");
const dockerfile = read("Dockerfile");
const compose = read("compose.yaml");
const nginxConf = read("docker/nginx/default.conf");
const dockerignore = read(".dockerignore");
const readme = read("README.md");

[
  "assets/images/profile.png",
  "assets/images/ornament-band.png",
  "assets/images/ornament-border.png",
  "assets/audio/kebo-giro.mp3",
  "assets/favicon/favicon.ico",
  "assets/favicon/favicon-16x16.png",
  "assets/favicon/favicon-32x32.png",
  "assets/favicon/apple-touch-icon.png",
  "assets/favicon/android-chrome-192x192.png",
  "assets/favicon/android-chrome-512x512.png",
  "docker/nginx/default.conf",
].forEach(assertFile);

[
  "UNDANGAN SEMINAR KERJA PRAKTEK",
  "Raditya Indra Putranto",
  "Implementasi Chatbot Virtual Assistant",
  "Selasa, 9 Juni 2026",
  "10.00 WIB",
  "Ruang Sidang Jurusan Informatika",
].forEach((text) => assertIncludes(html, text, "invitation text"));

[
  "assets/images/profile.png",
  "assets/images/ornament-band.png",
  "assets/images/ornament-border.png",
  "assets/audio/kebo-giro.mp3",
  "assets/css/styles.css",
  "assets/js/script.js",
  "assets/favicon/favicon.ico",
  "assets/favicon/apple-touch-icon.png",
  "assets/favicon/site.webmanifest",
  "gsap",
  "ScrollTrigger",
  "Buka Undangan",
].forEach((text) => assertIncludes(html, text, "HTML reference"));

[
  "@media",
  "prefers-reduced-motion",
  "../images/ornament-border.png",
  "../images/ornament-band.png",
  "--button-bg",
  "--button-bg-hover",
  ".side-ornament::before",
  ".side-ornament::after",
  "scaleX(-1)",
  "min-height: 100vh",
].forEach((text) => assertIncludes(css, text, "CSS behavior"));

[
  "Batas_Atas&Bawah.jpg",
  "Border_Kiri&Kanan.jpg",
  'href="styles.css"',
  'src="script.js"',
  'src="SeminarSir.png"',
  'src="Gending Manten Adat Jawa Kebo Giro.mp3"',
  "Batas_Atas_Bawah-removebg-preview.png",
  "Border_Kiri_Kanan-removebg-preview.png",
  'url("Batas_Atas_Bawah-removebg-preview.png")',
  'url("Border_Kiri_Kanan-removebg-preview.png")',
  "linear-gradient(135deg, #8c541f, #2f5a46)",
].forEach((text) => {
  assertExcludes(html, text, "old HTML asset reference");
  assertExcludes(css, text, "old CSS asset reference");
});

[
  "gsap.registerPlugin",
  "ScrollTrigger",
  "audio.play",
  "toggleMusic",
  "prefers-reduced-motion",
].forEach((text) => assertIncludes(js, text, "JS behavior"));

[
  "Undangan Seminar KP",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "#2b1a10",
].forEach((text) => assertIncludes(manifest, text, "manifest behavior"));

[
  "FROM nginx:1.27-alpine",
  "COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf",
  "COPY index.html /usr/share/nginx/html/index.html",
  "COPY assets/ /usr/share/nginx/html/assets/",
  "COPY robots.txt /usr/share/nginx/html/robots.txt",
].forEach((text) => assertIncludes(dockerfile, text, "Dockerfile behavior"));

[
  "services:",
  "undangan-seminar:",
  "build:",
  "ports:",
  "8080:80",
  "restart: unless-stopped",
].forEach((text) => assertIncludes(compose, text, "Compose behavior"));

[
  "listen 80;",
  "root /usr/share/nginx/html;",
  "try_files $uri $uri/ =404;",
  "location ~* \\.(?:css|js|png|jpg|jpeg|gif|ico|webmanifest|mp3)$",
  "Cache-Control",
].forEach((text) => assertIncludes(nginxConf, text, "Nginx behavior"));

[
  ".git",
  "node_modules",
  "verify-site.js",
].forEach((text) => assertIncludes(dockerignore, text, "Docker ignore behavior"));

[
  "docker compose up -d --build",
  "http://localhost:8080",
  "proxy_pass http://127.0.0.1:8080;",
].forEach((text) => assertIncludes(readme, text, "README Docker instructions"));

console.log("Static invitation verification passed.");

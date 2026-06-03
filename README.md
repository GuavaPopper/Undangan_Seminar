# Undangan Seminar KP

Static website undangan seminar yang siap di-hosting di VPS.

## Struktur

```text
.
├── index.html
├── assets/
│   ├── audio/
│   ├── css/
│   ├── favicon/
│   ├── images/
│   └── js/
├── docker/
│   └── nginx/
├── README.md
├── Dockerfile
├── compose.yaml
├── robots.txt
└── verify-site.js
```

## Jalankan Dengan Docker

Build dan jalankan container:

```bash
docker compose up -d --build
```

Buka:

```text
http://localhost:8080
```

Matikan container:

```bash
docker compose down
```

## Deploy Ke VPS Dengan Docker

Upload folder ini ke VPS, misalnya:

```text
/var/www/undangan-seminar
```

Lalu jalankan:

```bash
cd /var/www/undangan-seminar
docker compose up -d --build
```

Website akan tersedia di port `8080` server:

```text
http://IP-VPS:8080
```

Jika ingin memakai domain, arahkan reverse proxy Nginx host ke container:

```nginx
server {
    listen 80;
    server_name domain-anda.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Untuk HTTPS, pasang SSL di Nginx host atau gunakan Certbot di VPS.

## Deploy Ke Netlify

Netlify tidak memakai Dockerfile atau `compose.yaml` untuk static site ini. Untuk Netlify, cukup deploy file HTML dan folder `assets`.

### Opsi Cepat: Drag and Drop

1. Buka Netlify Dashboard.
2. Pilih **Add new site** lalu **Deploy manually**.
3. Upload folder berisi:
   - `index.html`
   - `assets/`
   - `robots.txt`

### Opsi Rapi: Git Deploy

1. Push project ini ke GitHub/GitLab/Bitbucket.
2. Di Netlify, pilih **Add new site** lalu **Import from Git**.
3. Pilih repository project ini.
4. Build settings otomatis dibaca dari `netlify.toml`:
   - Build command: `mkdir -p dist && cp -r index.html assets robots.txt dist/`
   - Publish directory: `dist`
5. Deploy.

Konfigurasi `netlify.toml` dibuat supaya file Docker, README, dan script verifikasi tidak ikut dipublish sebagai file publik.

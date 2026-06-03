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

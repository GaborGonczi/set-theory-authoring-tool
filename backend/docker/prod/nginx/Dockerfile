FROM nginx:1.31-alpine

WORKDIR /app

# Nginxnek a publikus fájlokat kell kiszolgálnia.
COPY public/ /app/public/
COPY docker/prod/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
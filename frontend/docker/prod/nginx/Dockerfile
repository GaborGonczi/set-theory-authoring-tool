FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build \
    && output_dir="$(dirname "$(find dist -type f -name index.html | head -n 1)")" \
    && test -n "$output_dir" \
    && mkdir -p /frontend-dist \
    && cp -a "$output_dir"/. /frontend-dist/

FROM nginx:1.31-alpine

COPY docker/prod/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend-dist/ /usr/share/nginx/html/

EXPOSE 80
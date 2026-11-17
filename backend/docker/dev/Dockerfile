FROM php:8.4.27-cli

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN apt-get update && \
    apt-get install -y unzip zip libpng-dev libfreetype6-dev supervisor && \
    docker-php-ext-configure gd --with-freetype && \
    docker-php-ext-install gd pcntl && \
    rm -rf /var/lib/apt/lists/*

COPY docker/dev/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /app
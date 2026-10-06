FROM php:8.4-cli

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN apt-get update && \
    apt-get install -y unzip zip libpng-dev libfreetype6-dev && \
    docker-php-ext-configure gd --with-freetype && \
    docker-php-ext-install gd && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
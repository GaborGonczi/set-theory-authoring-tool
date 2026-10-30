FROM php:8.4.27-fpm-bookworm AS build

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    $PHPIZE_DEPS \
    git \
    unzip \
    zip \
    libcurl4-openssl-dev \
    libicu-dev \
    libxml2-dev \
    libonig-dev \
    libzip-dev \
    libpng-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libwebp-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j"$(nproc)" \
        gd \
        bcmath \
        curl \
        dom \
        exif \
        intl \
        mbstring \
        opcache \
        pcntl \
        pdo_mysql \
        soap \
        simplexml \
        xml \
        xmlreader \
        xmlwriter \
        zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && php -m | grep -qx 'gd' \
    && php -r 'exit(function_exists("imagepng") ? 0 : 1);' \
    && rm -rf /var/lib/apt/lists/* /tmp/pear

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

# Copy manifests first so dependency installation can be cached.
COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --no-progress \
    --no-scripts \
    --optimize-autoloader

COPY . .

# Optimize autoloading and run Laravel's package discovery hook.
RUN composer dump-autoload \
    --no-dev \
    --optimize \
    --no-interaction \
    && composer run-script post-autoload-dump --no-interaction


FROM php:8.4.27-fpm-bookworm AS production

# Runtime libraries required by compiled PHP extensions.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libcurl4 \
    libicu72 \
    libxml2 \
    libonig5 \
    libzip4 \
    libpng16-16 \
    libfreetype6 \
    libjpeg62-turbo \
    libwebp7 \
    && rm -rf /var/lib/apt/lists/*

# Copy compiled PHP extensions and their enablement configuration.
COPY --from=build /usr/local/lib/php/extensions/ /usr/local/lib/php/extensions/
COPY --from=build /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/

# Activate the PHP image's built-in production php.ini template.
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Fail the image build if GD or PNG generation support is missing.
RUN php -m | grep -qx 'gd' \
    && php -r 'exit(function_exists("imagepng") ? 0 : 1);'

WORKDIR /var/www/html

COPY --from=build --chown=www-data:www-data /var/www/html /var/www/html

RUN mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R ug+rwX storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
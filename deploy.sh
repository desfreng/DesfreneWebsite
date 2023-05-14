#!/usr/bin/env bash
BUILD_DIR="./build/"
DATE=$(date +"%Y-%m-%d.%H-%M-%S")

source "$HOME/.bashrc"

ssh root@desfrene.fr "mv /var/www/html /var/www/html-$DATE"
rsync --recursive --verbose "$BUILD_DIR" root@desfrene.fr:/var/www/html
ssh root@desfrene.fr "chown www-data:www-data -R /var/www/html"

#!/usr/bin/env bash
sudo cp setup/istheparkingopen.com /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/istheparkingopen.com /etc/nginx/sites-enabled/istheparkingopen.comrables.com

sudo service nginx restart
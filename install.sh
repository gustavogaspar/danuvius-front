#!/bin/bash

echo "*****THIS SCRIPT WAS MADE TO CENTOS DISTRIBUTIONS*****"
sudo yum update -y
sudo yum install nginx nodejs -y
sudo systemctl enable --now nginx.service
sudo firewall-cmd --add-port=5000/tcp --permanent
sudo firewall-cmd --reload
sudo npm install -g serve
npm run build
serve -s build



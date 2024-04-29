#!/bin/sh

# Exit in case of error
set -e

systemctl stop monitory-agent
systemctl disable monitory-agent
rm -rf monitory-agent/
rm /etc/systemd/system/monitory-agent.service
rm /usr/local/bin/monitory_install
rm /usr/local/bin/monitory_update
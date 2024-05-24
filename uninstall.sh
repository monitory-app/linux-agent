#!/bin/bash

# Exit in case of error
set -e

systemctl stop monitory-agent
systemctl disable monitory-agent
rm -rf /var/opt/monitory-agent/
rm /etc/systemd/system/monitory-agent.service
rm /usr/bin/monitory_install
rm /usr/bin/monitory_update
rm /usr/bin/monitory_reconfigure
rm /usr/bin/monitory_uninstall
#!/bin/sh

# Exit in case of error
set -e

echo "Alle Parameter: $@"
token=$(echo "$@" | awk -F "=" '{print $2}')
echo "Extrahierter Token: $token"

if [ -z "$token" ]; then
   echo "Missing token parameter"
   exit 1
fi

OS_TYPE=$(cat /etc/os-release | grep -w "ID" | cut -d "=" -f 2 | tr -d '"')

if [ $OS_TYPE != "ubuntu" ] && [ $OS_TYPE != "debian" ]; then
    echo "This script only supports Ubuntu and Debian for now."
    exit
fi

echo -e "--------------------------------------------------------------------------------"
echo -e "Welcome to @monitory-app/agent installer!"
echo -e "This script will install everything for you."
echo -e "--------------------------------------------------------------------------------"

echo -e "--------------------------------------------------------------------------------"
echo "Installing required packages..."

apt update -y >/dev/null 2>&1
apt install -y curl wget git >/dev/null 2>&1

curl -fsSL https://bun.sh/install | bash

echo -e "--------------------------------------------------------------------------------"
echo "Download agent..."

mkdir -p /var/opt/monitory-agent
cd /var/opt/monitory-agent
git clone https://github.com/monitory-app/linux-agent.git .
bun install

chmod +x install.sh
chmod +x update.sh
chmod +x uninstall.sh

cp .env.example .env
sed -i "s/REPLACE_WITH_YOUR_TOKEN/$token/g" .env
sed -i "s/development/production/g" .env

echo -e "--------------------------------------------------------------------------------"
echo "Install service..."

cp /var/opt/monitory-agent/monitory-agent.service /etc/systemd/system/monitory-agent.service
systemctl daemon-reload
systemctl enable monitory-agent
systemctl start monitory-agent

echo -e "--------------------------------------------------------------------------------"
echo "Create commands..."
ln -s /var/opt/monitory-agent/install.sh /usr/bin/monitory_install
ln -s /var/opt/monitory-agent/update.sh /usr/bin/monitory_update
ln -s /var/opt/monitory-agent/uninstall.sh /usr/bin/monitory_uninstall

echo "Run monitory_update to get the latest version of the agent."
echo "Run monitory_uninstall to uninstall the agent."
echo -e "--------------------------------------------------------------------------------"
echo "Agent installed successfully!"
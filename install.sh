#!/bin/sh

# Exit in case of error
set -e

if [ -z "$1" ]; then
   echo "Missing token parameter" # token
   exit 1
fi

TOKEN=$1
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

echo -e "--------------------------------------------------------------------------------"
echo "Download agent..."

mkdir -p /var/opt/monitory-agent
cd /var/opt/monitory-agent
git clone git@github.com:monitory-app/linux-agent.git .
cp .env.example .env
sed -i "s/REPLACE_WITH_YOUR_TOKEN/$TOKEN/g" .env
sed -i "s/development/production/g" .env

echo -e "--------------------------------------------------------------------------------"
echo "Install service..."

cp /var/opt/monitory-agent/monitory-agent.service /etc/systemd/system/monitory-agent.service
systemctl daemon-reload
systemctl enable monitory-agent
systemctl start monitory-agent

echo -e "--------------------------------------------------------------------------------"
echo "Agent installed successfully!"
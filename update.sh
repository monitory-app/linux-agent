#!/bin/sh

# Exit in case of error
set -e

echo -e "--------------------------------------------------------------------------------"
echo "Pull new agent version..."
cd /var/opt/monitory-agent
git reset --hard
git pull
bun install
chmod +x install.sh
chmod +x update.sh
chmod +x reconfigure.sh
chmod +x uninstall.sh

echo -e "--------------------------------------------------------------------------------"
echo "Restart agent..."
systemctl restart monitory-agent

echo -e "--------------------------------------------------------------------------------"
echo "Agent updated successfully!"

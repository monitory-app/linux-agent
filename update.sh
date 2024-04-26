#!/bin/sh

# Exit in case of error
set -e

echo -e "--------------------------------------------------------------------------------"
echo "Pull new agent version..."
cd /var/opt/monitory-agent
git pull

echo -e "--------------------------------------------------------------------------------"
echo "Restart agent..."
systemctl restart monitory-agent

echo -e "--------------------------------------------------------------------------------"
echo "Agent updated successfully!"

#!/bin/bash

# Exit in case of error
set -e

echo -e "--------------------------------------------------------------------------------"
echo "Restart agent..."
systemctl restart monitory-agent

echo -e "--------------------------------------------------------------------------------"
echo "Agent reconfigured successfully!"

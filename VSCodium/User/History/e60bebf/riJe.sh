#!/usr/bin/env bash

SERVICE_FILE="elvis-simple-battery.service"
TIMER_FILE="elvis-simple-battery.timer"
SYSTEMD_DIR="/etc/systemd/system"

echo "Copying files..."

sudo cp "./$SERVICE_FILE" "$SYSTEMD_DIR/$SERVICE_FILE"
sudo cp "./$TIMER_FILE" "$SYSTEMD_DIR/$TIMER_FILE"

echo "Setting up permissions..."

sudo chmod 644 "$SYSTEMD_DIR/$SERVICE_FILE" "$SYSTEMD_DIR/$TIMER_FILE"

echo "Registering background service..."

sudo systemctl daemon-reload
sudo systemctl enable "$TIMER_FILE"

echo "Done!"
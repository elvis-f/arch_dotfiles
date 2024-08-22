#!/usr/bin/env bash

SERVICE_FILE="elvis-simple-battery.service"
TIMER_FILE="elvis-simple-battery.timer"
SYSTEMD_DIR="/etc/systemd/system"

sudo cp "./$SERVICE_FILE" "$SYSTEMD_DIR/$SERVICE_FILE"
sudo cp "./$TIMER_FILE" "$SYSTEMD_DIR/$TIMER_FILE"

sudo chmod 644 "$SYSTEMD_DIR/$SERVICE_FILE" "$SYSTEMD_DIR/$TIMER_FILE"

sudo systemctl daemon-reload
sudo systemctl enable battery-check.timer
sudo systemctl start battery-check.timer
#!/usr/bin/env bash

SERVICE_FILE="/etc/systemd/system/elvis-simple-battery.service"
TIMER_FILE="/etc/systemd/system/elvis-simple-battery.timer"

cp ./

systemctl daemon-reload
systemctl enable battery-check.timer
systemctl start battery-check.timer
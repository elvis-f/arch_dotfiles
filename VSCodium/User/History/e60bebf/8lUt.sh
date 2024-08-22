#!/usr/bin/env bash

SERVICE_FILE="elvis-simple-battery.service"
TIMER_FILE="elvis-simple-battery.timer"

cp "./$SERVICE_FILE" 

systemctl daemon-reload
systemctl enable battery-check.timer
systemctl start battery-check.timer
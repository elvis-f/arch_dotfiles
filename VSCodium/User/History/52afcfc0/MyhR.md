Clone this repo:



Give permissions:
`chmod +x install.sh`
Run the install script
`./install.sh`
or manually copy the files and register it as a `systemd` timer service with:
```
systemctl daemon-reload
systemctl enable battery-check.timer
systemctl start battery-check.timer
```
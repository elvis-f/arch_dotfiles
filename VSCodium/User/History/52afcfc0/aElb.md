Clone this repo:

Change directory:
`cd ESBS`
Give run permissions:
`chmod +x install.sh`
Run the install script
`./install.sh`
...or manually copy the files and register it as a `systemd` timer service with:
```
systemctl daemon-reload
systemctl enable elvis-simple-battery.timer
```
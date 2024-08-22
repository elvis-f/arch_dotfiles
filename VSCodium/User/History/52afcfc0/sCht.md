# Elvis' Simple Battery Service

This is going to be my personal battery service, my current vision is to turn this into a small systemd timer utility that would hold logs of battery stats, like capacity and power draw over time, to make pretty graphs for my riced AGS widgets!

## Installation:

Clone this repo:
```
git clone https://github.com/elvis-f/ESBS
```
Change directory:
```
cd ESBS
```
Give run permissions:
```
chmod +x install.sh
```
Run the install script
```
./install.sh
```
...or manually copy the files and register it as a `systemd` timer service with:
```
systemctl daemon-reload
systemctl enable elvis-simple-battery.timer
```

## Usage

Battery stats will be kept in `/var/log/battery-levels.log`

### Format

Format of the stats current is just a battery level on each line :D
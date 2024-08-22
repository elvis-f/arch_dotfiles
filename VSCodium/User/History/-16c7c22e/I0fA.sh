OUTPUT=$(pactl get-sink-volume @DEFAULT_SINK@) | grep -o '[0-9]'

echo ${OUTPUT}
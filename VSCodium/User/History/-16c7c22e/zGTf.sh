OUTPUT=$(pactl get-sink-volume @DEFAULT_SINK@) | grep -o '[0-9]*%' | head -n1

echo ${OUTPUT}
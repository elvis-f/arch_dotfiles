min_brightness=20
max_brightness=$(xbacklight -get)

if [ $# -eq 0 ]; then
    echo ${max_brightness}
else
    input=$1

    inc_arg="inc"
    dec_arg="dec"

    if [ "$input" == "$inc_arg"]; then
        $()
fi


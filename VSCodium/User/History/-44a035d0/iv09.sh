input=$1
inc_arg="inc"

max_brightness=$(xbacklight -get)

if [ $# -eq 0 ]; then
    echo ${max_brightness}
fi


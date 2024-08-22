input=$1
inc_arg="inc"


max_brightness=$(xbacklight -get)

if [ $# -ne 0 ]; then
    echo ${max_brightness}
fi

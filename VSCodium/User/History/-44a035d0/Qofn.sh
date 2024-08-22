min_brightness=90
cur_brightness=$(xbacklight -get)

stepsize=1

# if [ $# -eq 0 ]; then
#     echo ${cur_brightness}
# else
#     input=$1

#     inc_arg="inc"
#     dec_arg="dec"

#     if [ "$input" == "$inc_arg" ]; then
#         xbacklight -inc $stepsize
#     fi

#     if [ "$input" == "$dec_arg" ]; then
#         if [ $min_brightness -le $cur_brightness ]; then
#             xbacklight -dec $stepsize
#         fi
#     fi
# fi

input=$1

inc_arg="inc"
dec_arg="dec"

if [ "$input" == "$inc_arg" ]; then
    xbacklight -inc $stepsize
fi

if [ "$input" == "$dec_arg" ]; then
    if [ $min_brightness -le $cur_brightness ]; then
        xbacklight -dec $stepsize
    fi
fi

echo ${cur_brightness}


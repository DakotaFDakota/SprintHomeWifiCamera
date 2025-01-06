#!/bin/sh
recorder -t H264 -r 1920 1080 -f 30 -b 14000 -minqp 10 -maxqp 36 -gop 30 -ar 16000 -ab 48 -ac 2 -ai mic_s16le_16k_2ch -c 1 -d 300 -o /mnt/sdcard/$1.mts &

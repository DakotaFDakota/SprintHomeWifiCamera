#!/bin/sh
ffmpeg -f alsa -ar 16000 -ac 2 -i mic_s16le_16k_2ch -r 30 -s 1280x720 -input_format h264 -osd 0 -flicker 60 -vbrate 1000000 -gop 30 -f v4l2 -i /dev/video0 -c:v copy -copyinkf -b:v 1000K -c:a aac -b:a 48k -ar 16000 -ac 2 -flags +global_header -aac_2nd_cpu 1 -strict -2 -async 1 -vsync 1 -f mpegts udp://$1:8428 0</dev/null &

#!/bin/sh

killall ffserver
killall ffmpeg_rtsp
killall ffmpeg_udp
killall ffmpeg_rtsp
rm /tmp/feed1.ffm
sync

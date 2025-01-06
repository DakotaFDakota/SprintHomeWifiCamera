#!/bin/sh
#
# Start the video driver....
#
echo "Enter AIT00VideoDrv shell script ..."

insmod /usr/modules/ait-cam-codec.ko clockbase=1 resv_dram_size=0x1A00000

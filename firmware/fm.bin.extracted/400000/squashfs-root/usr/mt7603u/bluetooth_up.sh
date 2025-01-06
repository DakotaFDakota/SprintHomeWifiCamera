#!/bin/sh
rtk_hciattach -n -s 115200 /dev/ttyS1 rtk_h5&
sleep 5
hciconfig hci0 up


#!/bin/sh

echo "Remove wireless interface------------------------------------"
ifconfig wlan0 down
rmmod /usr/modules/mt7603u_sta.ko
rmmod /usr/modules/mtprealloc.ko

echo "Start ethernet-----------------------------------------------"
insmod /usr/modules/asix.ko
ifconfig eth0 up
killall udhcpc
udhcpc -ieth0 -b -n &
change_ip.sh &

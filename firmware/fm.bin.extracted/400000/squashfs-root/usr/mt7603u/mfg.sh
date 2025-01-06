#!/bin/sh
echo "Launch Broadcom MFG Mode in mfg.sh..."

case "$1" in
  start)
insmod  /usr/modules/bcmdhd.ko
sleep 1
wifi_device_id=`cat /sys/bus/sdio/devices/mmc2:0001:2/device`
if [ "$wifi_device_id" = "0xa962" ]; then
	echo "Detected AP6210 wireless module."
	echo -n "/etc/firmware/fw_bcm40181a2_mfg.bin">/sys/module/bcmdhd/parameters/firmware_path
elif [ "$wifi_device_id" = "0xa9a6" ]; then
	echo "Detected AP6212A wireless module."
	echo -n "/etc/firmware/fw_bcm43438a1_mfg.bin">/sys/module/bcmdhd/parameters/firmware_path
elif [ "$wifi_device_id" = "0x4334" ]; then
	echo "Detected AP6233F wireless module."
	echo -n "/etc/firmware/fw_bcm4334b1_ag_mfg.bin">/sys/module/bcmdhd/parameters/firmware_path
elif [ "$wifi_device_id" = "0x4330" ]; then
	echo "Detected AP6330 wireless module."
	echo -n "/etc/firmware/fw_bcm40183b2_ag_mfg.bin">/sys/module/bcmdhd/parameters/firmware_path
else
	echo "ERROR: Unknown wireless module. (need Manually)"
	exit 1
fi
sync

IPADDR="`nvconf get wireless.ap.ipaddr`"
SUBNETMASK="`nvconf get wireless.ap.subnetmask`"
sleep 1
ifconfig wlan0 $IPADDR netmask $SUBNETMASK

;;
  stop)
	echo " Kill all process of AP Mode"
	#rmmod  bcmdhd
	ifconfig wlan0 down
;;
  *)
	echo "Usage: $0 {start|stop|restart}"
	exit 1
esac

exit $?


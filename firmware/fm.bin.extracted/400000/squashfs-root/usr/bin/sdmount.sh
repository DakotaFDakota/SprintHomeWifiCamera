#!/bin/sh
if [ -e /dev/mmcblk0 ]
then
/usr/local/bin/mmcsd_plug attach
/bin/echo "sd mount" > /mnt/ramdisk/tmp/sdmount.log
else
/bin/echo "mmcblk0 not exist" > /mnt/ramdisk/tmp/sdmount.log
fi

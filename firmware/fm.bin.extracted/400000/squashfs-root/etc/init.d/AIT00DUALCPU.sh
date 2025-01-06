#!/bin/sh
#
# Start cpub....
#
echo "Enter AIT00DUALCPU shell script .."

if [ -e /usr/modules/cpub_mgr_drv.ko ] && [ -e /etc/firmware/ALL_DRAM_UCOS2 ] && [ -e /etc/firmware/ITCM_EXE_UCOS2 ]; then
	echo "Insert dual cpu manager"
	insmod /usr/modules/cpub_mgr_drv.ko

	#if [ -e /usr/modules/ait_md_drv.ko ]; then
	#	echo "Insert dual cpu md driver"
	#	insmod /usr/modules/ait_md_drv.ko
	#fi

	if [ -e /usr/modules/ait_aac_drv.ko ]; then
		echo "Insert dual cpu aac driver"
		insmod /usr/modules/ait_aac_drv.ko
	fi
fi

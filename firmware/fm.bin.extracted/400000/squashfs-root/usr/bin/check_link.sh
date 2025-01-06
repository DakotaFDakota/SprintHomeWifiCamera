#!/bin/sh
ip=`grep "ip_addr=" /mnt/ramdisk/env/system.conf | awk '{print $1}'|cut -d '=' -f 2`
echo $ip
/usr/local/bin/do_leds all off -c all 
if [ "${ip}" == "" ];then
	echo "No network link"
	/usr/local/bin/do_leds wireless on -c red
else
	echo "Network is linked"
	/usr/local/bin/do_leds power on -c green
fi
  

#!/bin/sh
count=0;
echo "start DHCP to get the address"
udhcpc -iapcli0 -b
while [ true ];
do
FILE_IFCONFIG=/tmp/ifconfig.txt
ifconfig > $FILE_IFCONFIG
ip_addr=`grep "Bcast" $FILE_IFCONFIG | awk '{print $2}' | cut -d ':' -f 2`
if [ "${ip_addr}" == "" ]; then
sleep 1
count=$(($count+1))
if [ "${count}" == "120" ]; then
killall led_blink.sh
/usr/bin/led_blink.sh red
break 1
fi  
else
killall led_blink.sh
/usr/local/bin/do_leds all off -c all
/usr/bin/change_ip.sh
/usr/bin/check_link.sh
break 1
fi
done
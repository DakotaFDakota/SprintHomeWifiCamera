#!/bin/sh
echo "--------------------------------------------------------"
echo "remove ethernet driver.................................."
ifconfig eth0 down
rmmod /usr/modules/asix.ko
echo "done"
echo "--------------------------------------------------------"
CONFIG_FILE=/mnt/ramdisk/env/system.conf
CONF_SSID=`grep "wlan_essid" $CONFIG_FILE | awk '{print $1}'|cut -d '=' -f 2`
CONF_SECURITY=`grep "wlan_security" $CONFIG_FILE | awk '{print $1}'|cut -d '=' -f 2`
CONF_WEP_KEY1=`grep "wep_kep1" $CONFIG_FILE | awk '{print $1}'|cut -d '=' -f 2`
CONF_KEY=`grep "wpa_ascii" $CONFIG_FILE | awk '{print $1}'|cut -d '=' -f 2`
if [ "${SECURITY}" == "1" ]; then
	PSK=$CONF_WEP_KEY1
else
	PSK=$CONF_KEY
fi
SSID=$CONF_SSID
echo "Launch MTK STA Mode in" ${PWD} "/sta.sh..."
. /usr/bin/DEFINE.sh
SCAN_FILE=/tmp/scanlist.txt

#if [ "$1" = "" ];then
if [ -e /usr/modules/mt7603u_ap.ko ];then
	insmod /usr/modules/prealloc.ko
	insmod /usr/modules/mt7603u_ap.ko
	sleep 1
fi 
#fi

#if [ "$2" = "" ];then
ifconfig ra0 up
sleep 1
ifconfig apcli0 up
sleep 1

#Scan
iwpriv apcli0 set SiteSurvey=1
iwpriv apcli0 get_site_survey > $SCAN_FILE

#SSID=RC8510A_test #`$NV_GET wireless.sta.ssid`
#PSK=1234567890 #`$NV_GET wireless.wpa.psk`
#AUTH = #OPEN/WPA2PSK/WPAPSK
#ENCRYTYPE = #NONE/AES/TKIP

#Parse SSID for Auth, EncryType & number of channel
SECURITY=`grep "$SSID" $SCAN_FILE | awk 'NR==1 {print $4}'`
AUTH=`echo $SECURITY | cut -d'/' -f 1`
ENCRYTYPE=`echo $SECURITY | cut -d'/' -f 2`
CHANNEL=`grep "$SSID" $SCAN_FILE | awk 'NR==1 {print $1}'`

#Setup channel
iwpriv apcli0 set Channel=$CHANNEL

#Open mode AP setup
if [ "${ENCRYTYPE}" == "WEP" ]; then
	echo "connect to WEP mode AP"
	iwpriv apcli0 set ApCliEnable=0
	iwpriv apcli0 set ApCliAuthMode=OPEN
	iwpriv apcli0 set ApCliEncrypType=$ENCRYTYPE
	iwpriv apcli0 set ApCliDefaultKeyID=1
	iwpriv apcli0 set ApCliKey1=$PSK
	iwpriv apcli0 set ApCliSsid=$SSID
	iwpriv apcli0 set ApCliEnable=1
else
	iwpriv apcli0 set ApCliEnable=0
	iwpriv apcli0 set ApCliAuthMode=$AUTH
	iwpriv apcli0 set ApCliEncrypType=$ENCRYTYPE
	iwpriv apcli0 set ApCliSsid=$SSID
	iwpriv apcli0 set ApCliWPAPSK=$PSK
	iwpriv apcli0 set ApCliEnable=1
fi
#wpa_supplicant -Dwext -ira0 -c/etc/wpa_supplicant.conf -B
killall udhcpc
udhcpc -iapcli0 -b
#else
#echo "Quick link $2 to $1"
#ifconfig wlan0 $2
#wl band b
#wl join $1
#fi

change_ip.sh
check_link.sh

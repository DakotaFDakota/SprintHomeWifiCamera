#!/bin/sh
. /usr/bin/DEFINE.sh

echo "ctrl_interface=/var/run/wpa_supplicant" > $PATH
echo "eapol_version=1" >> $PATH
echo "ap_scan=1" >> $PATH
echo "fast_reauth=1" >> $PATH
NUM="00"
set_wl_conf()
{
	SSID=`$NV_GET wireless.ssid`
	if [ "$SSID" = "" ] ;then
		SSID=""
	fi
	
	if [ "$SSID" != "" ] ;then
		echo "" >> $PATH
		echo "network={" >> $PATH
		echo "    ssid=\"$SSID\"" >> $PATH
		PROTO="`$NV_GET wireless.proto`"
		echo "    proto=$PROTO" >> $PATH
		KEY_MGMT="`$NV_GET wireless.key_mgmt`"
		echo "    key_mgmt=$KEY_MGMT" >> $PATH
		PAIRWISE="`$NV_GET wireless.pairwise`"
		echo "    pairwise=$PAIRWISE" >> $PATH
		GROUP="`$NV_GET wireless.group`"
		echo "    group=$GROUP" >> $PATH
		PSK="`$NV_GET wireless.wpa.psk`"
		echo "    psk=\"$PSK\"" >> $PATH
		echo "}" >> $PATH
	fi
}


set_wl_conf

#COUNT=`/usr/bin/nvconf get wl_cnt`
#i=0
#while [ $i != $COUNT ]
#do
#	s=$(($s+$i))
#	NUM="0$i"
	
#	i=$(($i+1))
	#echo $NUM
#	set_wl_conf
#done

#cp -av $PATH $PATH_ETC

#network={
#    ssid="ait_airlink"
#    proto=WPA2
#    key_mgmt=WPA-PSK
#    pairwise=CCMP
#    group=CCMP
#    psk="12345678901234567890"
#}


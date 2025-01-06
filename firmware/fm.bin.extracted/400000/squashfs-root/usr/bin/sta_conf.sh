#!/bin/sh
. /usr/bin/DEFINE.sh

echo "ctrl_interface=/var/run/wpa_supplicant" > $STACONF_PATH
echo "eapol_version=1" >> $STACONF_PATH
echo "ap_scan=1" >> $STACONF_PATH
echo "fast_reauth=1" >> $STACONF_PATH
NUM="00"
set_sta_conf()
{
	SSID=`$NV_GET wireless.ssid`
	if [ "$SSID" = "" ] ;then
		SSID=""
	fi
	
	if [ "$SSID" != "" ] ;then
		echo "" >> $STACONF_PATH
		echo "network={" >> $STACONF_PATH
		echo "    ssid=\"$SSID\"" >> $STACONF_PATH
		PROTO="`$NV_GET wireless.proto`"
		echo "    proto=$PROTO" >> $STACONF_PATH
		KEY_MGMT="`$NV_GET wireless.key_mgmt`"
		echo "    key_mgmt=$KEY_MGMT" >> $STACONF_PATH
		PAIRWISE="`$NV_GET wireless.pairwise`"
		echo "    pairwise=$PAIRWISE" >> $STACONF_PATH
		GROUP="`$NV_GET wireless.group`"
		echo "    group=$GROUP" >> $STACONF_PATH
		PSK="`$NV_GET wireless.wpa.psk`"
		echo "    psk=\"$PSK\"" >> $STACONF_PATH
		echo "}" >> $STACONF_PATH
	fi
}


set_sta_conf

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


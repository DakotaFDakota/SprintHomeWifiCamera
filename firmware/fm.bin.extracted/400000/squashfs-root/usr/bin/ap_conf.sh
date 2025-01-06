#!/bin/sh
. /usr/bin/DEFINE.sh

echo "interface=wlan0" > $APCONF_PATH
echo "driver=nl80211" >> $APCONF_PATH
echo "ctrl_interface_group=0" >> $APCONF_PATH
echo "hw_mode=g" >> $APCONF_PATH

NUM="00"
set_ap_conf()
{
	SSID=`$NV_GET wireless.ssid`
	echo "ignore_broadcast_ssid=0" >> $APCONF_PATH
	echo "ssid=$SSID" >> $APCONF_PATH
	echo "auth_algs=3" >> $APCONF_PATH #2
	CHANNEL=`$NV_GET wireless.ap.channel`
	echo "channel=$CHANNEL" >> $APCONF_PATH
	echo "preamble=1" >> $APCONF_PATH
	echo "fragm_threshold=2346" >> $APCONF_PATH
echo "supported_rates=10 20 55 110 60 90 120 180 240 360 480 540" >> $APCONF_PATH
echo "max_num_sta=255" >> $APCONF_PATH
#echo "acs_num_scans=5" >> $APCONF_PATH
	
	CERT=`$NV_GET wireless.ap.cert`
	if [ "$CERT" = "NONE" ] ;then
		CERT="0"
	elif  [ "$CERT" = "WPA" ] ;then
		CERT="1"
	elif  [ "$CERT" = "WPA2" ] ;then
		CERT="2"
	fi
	#CERT="3"

	if [ "$CERT" != "0" ] ;then


		if [ "$CERT" = "1" ] ;then
			echo "wpa=$CERT" >> $APCONF_PATH
			echo "wpa_key_mgmt=WPA-PSK" >> $APCONF_PATH
			PSK=`$NV_GET wireless.ap.wpa.psk`
			echo "wpa_passphrase=$PSK" >> $APCONF_PATH
			echo "wpa_pairwise=TKIP" >> $APCONF_PATH 
			echo "rsn_pairwise=TKIP" >> $APCONF_PATH
		elif [ "$CERT" = "2" ] ;then
			echo "wpa=$CERT" >> $APCONF_PATH
			echo "wpa_key_mgmt=WPA-PSK" >> $APCONF_PATH
			PSK=`$NV_GET wireless.ap.wpa.psk`
			echo "wpa_passphrase=$PSK" >> $APCONF_PATH
			echo "wpa_pairwise=CCMP" >> $APCONF_PATH 
			echo "rsn_pairwise=CCMP" >> $APCONF_PATH
		fi
		
		#if [ "$CERT" = "3" ]; then
		#	echo "wpa_key_mgmt=WPA-PSK" >> $APCONF_PATH
		#	PSK=`$NV_GET wireless.ap.wpa.psk`
		#	echo "wpa_passphrase=KeePGuessinG" >> $APCONF_PATH
		#	echo "wpa_pairwise=TKIP" >> $APCONF_PATH 
		#	echo "rsn_pairwise=CCMP" >> $APCONF_PATH
		#else
		#	echo "wpa_key_mgmt=WPA-PSK" >> $APCONF_PATH
		#	PSK=`$NV_GET wireless.ap.wpa.psk`
		#	echo "wpa_passphrase=$PSK" >> $APCONF_PATH
		#	echo "wpa_pairwise=CCMP" >> $APCONF_PATH 
		#	echo "rsn_pairwise=CCMP" >> $APCONF_PATH
		#fi

	fi
}

set_udhcpd_conf()
{
	

	echo "interface wlan0" > $UDHCPDCONF_PATH
	START_IP=`$NV_GET wireless.ap.dhcp.start`
	echo "start   $START_IP" >> $UDHCPDCONF_PATH
	END_IP=`$NV_GET wireless.ap.dhcp.end`
	echo "end     $END_IP" >> $UDHCPDCONF_PATH 

echo "max_leases     254" >> $UDHCPDCONF_PATH

echo "auto_time      7200" >> $UDHCPDCONF_PATH

echo "conflict_time  3600" >> $UDHCPDCONF_PATH
echo "offer_time  60" >> $UDHCPDCONF_PATH

echo "min_lease 60" >> $UDHCPDCONF_PATH

echo "notify_file    dumpleases" >> $UDHCPDCONF_PATH

echo "opt     dns     192.168.1.1 192.168.1.10" >> $UDHCPDCONF_PATH
echo "option  subnet  255.255.255.0" >> $UDHCPDCONF_PATH
echo "opt     router  192.168.1.1" >> $UDHCPDCONF_PATH
echo "opt     wins    192.168.1.10" >> $UDHCPDCONF_PATH


echo "option  dns     192.168.1.1" >> $UDHCPDCONF_PATH
echo "option  domain  local" >> $UDHCPDCONF_PATH
	LEASE=`$NV_GET wireless.ap.dhcp.lease`
	echo "option  lease $LEASE" >> $UDHCPDCONF_PATH 
}


set_udhcpd_conf
set_ap_conf





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


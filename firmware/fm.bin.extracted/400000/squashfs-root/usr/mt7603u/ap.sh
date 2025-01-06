#!/bin/sh
echo "Launch MTK MT7603U AP Mode ..."
. /usr/bin/DEFINE.sh

case "$1" in
  start)
	insmod /usr/modules/prealloc.ko
	insmod /usr/modules/mt7603u_ap.ko
	sleep 1
	ap_conf_mt.sh
	touch  /var/lib/misc/udhcpd.leases
	#/usr/sbin/hostapd /mnt/mtd3/hostapd.conf -dd &
	ifconfig ra0 up	
	sleep 1

	APSSID=`$NV_GET wireless.ssid`
	CERT=`$NV_GET wireless.ap.cert`
	PSK=`$NV_GET wireless.ap.wpa.psk`
	if [ "$CERT" == "NONE" ]; then
		iwpriv ra0 set SSID=$APSSID
	elif [ "$CERT" == "WPA" ] || [ "$CERT" == "WPA2" ]; then
		iwpriv ra0 set AuthMode=WPAPSKWPA2PSK
		iwpriv ra0 set EncrypType=TKIPAES
		iwpriv ra0 set SSID=$APSSID
		iwpriv ra0 set WpaMixPairCipher=WPA_TKIP_WPA2_AES
		iwpriv ra0 set WPAPSK=$PSK
	else
		echo "Please setup AP information ..."
	fi

	IPADDR=`$NV_GET wireless.ap.ipaddr`
	SUBNETMASK=`$NV_GET wireless.ap.subnetmask`
	sleep 1
	ifconfig ra0 $IPADDR netmask $SUBNETMASK
	sleep 1
	udhcpd -S /mnt/mtd3/udhcpd-ap.conf &
;;
  stop)
	echo " Kill all process of AP Mode"
	#killall udhcpd
	#killall hostapd
	rmmod mt7603u_ap
	rmmod prealloc
;;
  *)
	echo "Usage: $0 {start|stop|restart}"
	exit 1
esac

exit $?


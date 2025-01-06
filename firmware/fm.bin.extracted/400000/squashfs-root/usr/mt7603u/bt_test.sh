#!/bin/sh
mkdir /var/run/dbus
BDADDR=`hciconfig -a | grep Address | cut -d' ' -f3`
mkdir /tmp/$BDADDR
touch /tmp/$BDADDR/pincodes
chmod 777 /tmp/$BDADDR/pincodes
echo "$1 $2" > /tmp/$BDADDR/pincodes
hcitool scan
dbus-daemon --config-file=/etc/dbus-1/system.conf
/usr/libexec/bluetooth/bluetoothd &


#!/bin/sh
cp /etc/bluetooth/main_de.conf /tmp/main.conf
cp /etc/bluetooth/rfcomm_de.conf /tmp/rfcomm.conf
sync
mkdir /var/run/dbus
touch /var/lib/dbus/machine-id
chmod 755 /var/lib/dbus/machine-id
dbus-uuidgen > /var/lib/dbus/machine-id
dbus-daemon --config-file=/etc/dbus-1/system.conf

echo 1 > /sys/class/rfkill/rfkill0/state
/usr/libexec/bluetooth/bluetoothd -nEd &
#/usr/libexec/bluetooth/bluetoothd &
hciconfig hci0 reset
hcitool cmd 0x03 0x001A 0x03
#hciconfig hci0 up
#hciconfig hci0 leadv 0

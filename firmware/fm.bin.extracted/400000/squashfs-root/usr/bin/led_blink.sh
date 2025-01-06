#!/bin/sh
color=$1
echo "close all of the led"
/usr/local/bin/do_leds all off -c all
if [ "${color}" == "green" ]; then
while [ true ];
do
/usr/local/bin/do_leds power off -c green
usleep 200000
/usr/local/bin/do_leds power on -c green
usleep 200000
done
else
while [ true ]; 
do
/usr/local/bin/do_leds wireless off -c red
usleep 200000
/usr/local/bin/do_leds wireless on -c red
usleep 200000
done
fi
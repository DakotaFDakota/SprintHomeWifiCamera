#!/bin/sh
while [ true ]; do
FreeMem=`free -m|awk 'NR==3 {print $NF}'`
#CHARS="Current memory is $FreeMem."
#echo $CHARS
#if [ -e /dev/mmcblk0 ]; then
if [ $FreeMem -lt 20 ]; then
#echo "need clean cache"
/bin/sync
/bin/echo 3 > /proc/sys/vm/drop_caches
fi
#fi
sleep 10
done

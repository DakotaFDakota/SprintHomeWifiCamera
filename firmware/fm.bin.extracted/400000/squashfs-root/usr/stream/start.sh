#!/bin/sh
#usleep 15000000
sleep 15
sysctl -w vm.overcommit_memory=1 > /dev/null
cd /usr/stream
#./reader.sh &
cp /usr/stream/stream /tmp/

while :
do
  rm /tmp/*.jpg 2>/dev/null
  rm /tmp/*.mp4 2>/dev/null
  echo "** starting Stream **"
  if [ -e /mnt/mmc/stream.out ]; then
     cp /mnt/mmc/stream.out /mnt/mmc/stream.bak
     nice -n -18 /tmp/stream > /mnt/mmc/stream.out 2>&1
  else
     if [ -e /tmp/stream.out ]; then
       cp /tmp/stream.out /tmp/stream.bak
     fi
     nice -n -18 /tmp/stream > /tmp/stream.out 2>&1
  fi
  if [ $? -eq 5 ];then
    echo "Wating on OTA to reboot";
    sleep 300
  fi
  sleep 2
done

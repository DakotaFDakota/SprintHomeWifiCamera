#!/bin/sh 
count=0                  
CONFIG_FILE=/tmp/temp.txt
while [ true ];
do                     
ifconfig > $CONFIG_FILE                                               
IP_ADDR=`grep "Bcast" $CONFIG_FILE | awk '{print $2}'|cut -d ':' -f 2`
if [ "${IP_ADDR}" == "" ]; then
sleep 1            
count=$(($count+1))            
if [ "${count}" == "20" ]; then
echo "20 times"           
ifconfig eth0 192.168.0.99
break 1                                                             
fi                                                                  
else                                                                
sed '/ip_addr=/s/=.*$/='$IP_ADDR'/g' -i /mnt/ramdisk/env/system.conf
break 1
fi  
done

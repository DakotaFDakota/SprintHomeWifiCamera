#!/bin/sh
FFSRV_CONF_PATH=/tmp/ffsrv.conf
echo "Port 8090" > $FFSRV_CONF_PATH
echo "RTSPPort 554" >> $FFSRV_CONF_PATH
echo "BindAddress localhost" >> $FFSRV_CONF_PATH
echo "MaxHTTPConnections 20" >> $FFSRV_CONF_PATH
echo "MaxClients 10" >> $FFSRV_CONF_PATH
echo "MaxBandwidth 204800" >> $FFSRV_CONF_PATH
echo "CustomLog /var/log/ffserver.log" >> $FFSRV_CONF_PATH
echo "<Feed feed1.ffm>" >> $FFSRV_CONF_PATH
echo "	File /tmp/feed1.ffm" >> $FFSRV_CONF_PATH
echo "	FileMaxSize 512K" >> $FFSRV_CONF_PATH
#echo "	Launch ffmpeg -override_ffserver -v error -f alsa -ar 48000 -ac 2 -i hw:0,0 -r "$1" -s 1920x1080 -input_format h264 -osd 0 -flicker 60 -vbrate "$2"000 -gop "$1" -f v4l2 -i /dev/video0 -c:v copy -copyinkf -b:v "$2"K -c:a "$3" -flags +global_header -ar 48000 -ac 2 -strict -2  -async 1 -vsync 1" >> $FFSRV_CONF_PATH
if [ "$4" == "info" ]
then
	echo "show ffmpeg info"
else
	if [ "$3" == "na" ]
	then
		echo " Launch ffmpeg -override_ffserver -v error -r "$1" -s 1920x1080 -input_format h264 -osd 0 -flicker 60 -vbrate "$2"000 -gop "$1" -f v4l2 -i /dev/video0 -c:v copy -copyinkf -b:v "$2"K -flags +global_header -strict -2 -vsync 1" >> $FFSRV_CONF_PATH
	else
		echo " Launch ffmpeg -override_ffserver -v error -ss $5 -f alsa -ar 48000 -ac 2 -i hw:0,0 -vthread 0 -r "$1" -s 1920x1080 -input_format h264 -osd 0 -flicker 60 -vbrate "$2"000 -gop "$1" -f v4l2 -i /dev/video0 -c:v copy -copyinkf -b:v "$2"K -c:a "$3" -flags +global_header -ar 48000 -ac 2 -strict -2  -async 2 -vsync 1" >> $FFSRV_CONF_PATH
	fi
fi
echo "	ACL allow localhost" >> $FFSRV_CONF_PATH
echo "</Feed>" >> $FFSRV_CONF_PATH

echo "<Stream channel1>" >> $FFSRV_CONF_PATH
echo "	Feed feed1.ffm" >> $FFSRV_CONF_PATH
echo "	Format rtp" >> $FFSRV_CONF_PATH
echo "	RTPSkiprtcp 1" >> $FFSRV_CONF_PATH
echo "  StartSendOnKey" >> $FFSRV_CONF_PATH
echo "	Title "AIT H.264 Streaming Server"" >> $FFSRV_CONF_PATH
if  [ "$3" == "na" ]
then
echo "  NoAudio"  >> $FFSRV_CONF_PATH
fi
#	NoVideo
echo "</Stream>" >> $FFSRV_CONF_PATH

# Special stream server status
echo "<Stream teststat.html>" >> $FFSRV_CONF_PATH
echo "	Format status" >> $FFSRV_CONF_PATH
echo "</Stream>" >> $FFSRV_CONF_PATH


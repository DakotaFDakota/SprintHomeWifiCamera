#!/bin/sh

ifconfig | grep -v mon.wlan0 | grep $1 |cut -d' ' -f10

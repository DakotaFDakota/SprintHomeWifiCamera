#!/bin/sh
# iqctrl parameter example:
# Set Brightness
./iqctrl setispctrl ISP_BRIGHTNESS 50 
# Get Brightness
./iqctrl getispctrl ISP_BRIGHTNESS 
# Set Contrast
./iqctrl setispctrl ISP_CONTRAST 60
# Get Contrast
./iqctrl getispctrl ISP_CONTRAST
# Set Hue
./iqctrl setispctrl ISP_HUE -120
# Get Hue
./iqctrl getispctrl ISP_HUE
# Set Saturation
./iqctrl setispctrl ISP_SATURATION -50
# Get Saturation
./iqctrl getispctrl ISP_SATURATION
# Set Sharpness
./iqctrl setispctrl ISP_SHARPNESS 80
# Get Sharpness
./iqctrl getispctrl ISP_SHARPNESS
# Set Gamma
./iqctrl setispctrl ISP_GAMMA 20
# Get Gamma
./iqctrl getispctrl ISP_GAMMA
# Set Exposure value
./iqctrl setispctrl ISP_EV -70
# Get Exposure value
./iqctrl getispctrl ISP_EV
# Set WDR
./iqctrl setispctrl ISP_WDR 1
# Get WDR
./iqctrl getispctrl ISP_WDR
# Set Flicker
./iqctrl setispctrl ISP_FLICKER 1
# Get Flicker
./iqctrl getispctrl ISP_FLICKER
# Enable/Disable AE, don't support get AE status command
./iqctrl setispctrl ISP_AE 1
# Enable/Disable AWB, don't support get AWB status command
./iqctrl setispctrl ISP_AWB 0


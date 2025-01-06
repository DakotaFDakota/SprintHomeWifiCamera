// TCS V018, Aug, 2004

var modelName = "Network Camera";

//public message
var msg_blank = "%s can not be blank.\n";
var msg_nospaces = "Blanks (spaces) are not allowed in %s\n";
var msg_invalid = "Invalid character or characters in %s\nValid characters are: \n%s\n";
var msg_notallow = "Invalid character or characters in %s\nThe following characters are not allowed:\n%s\n";
var msg_invalid_number = "%s must be an number.\n";
var msg_outofrange = "Invalid %s. Valid range is %s to %s \n";

var msg_validIP = "Invalid %s. Valid range is 1.0.0.0 to 255.255.255.255\n";
var msg_validMask = "Invalid %s. Valid range is 128.0.0.0 to 255.255.255.254\n";
var msg_validGW = "Invalid %s. Valid range is 1.0.0.0 to 223.255.255.252\n";
var msg_validDNS = "Invalid %s. Valid range is 1.0.0.0 to 223.255.255.255\n";
var msg_validMuticastIP = "Invalid %s. Valid range is 224.0.0.0 to 239.255.255.255\n";
var msg_InvalidIP_para = "Invalid IP Address %s.Valid range is 0.0.0.0 to 255.255.255.255\n";
var msg_start_ip_invalid = "Invalid Start IP in range %s.Valid range is 0.0.0.0 to 255.255.255.255\n";
var msg_end_ip_invalid = "Invalid End IP in range %s.Valid range is 0.0.0.0 to 255.255.255.255\n";
var msg_FilterBlank = "In range %s,Start IP and End IP  must be Blank or non-Blank at the same time.\n";

var msg_changeIP = "Since the " + modelName + "'s IP address has changed,\nthis connection must be terminated.\n\nPlease wait %s seconds for the restart to be completed,\nthen re-connect using the new IP address";
var msg_noradio_selected = "No entry selected. \nClick a radio button to select an entry.\n";
var msg_nomotion_crop = "Motion detection is not available with User-defined video size.\n";
var msg_nocrop_motion = "User-defined video size is not available while Motion Detection is being used.\n";
//var msg_nomotion_all = "Motion detection is not available with MJPEG Video streams, \nor when using a User-defined video size.\n"
var msg_nomotion_all = "Motion detection is not available with MJPEG Video streams.\n";
var msg_warning_nomotion = "Warning!\nMotion detection alerts are unavailable with user-defined video size.\n";
var msg_please_save = "Please save current settings before continuing.\n";
var msg_connect_livevideo =  "Connecting to Live Video stream ..." ;
var msg_ipadd = "Invalid IP address. Valid range is 1.0.0.1 to 254.255.255.254\n";
var msg_web_type_chg = "Web server will restart after updating."

// access
var msg_http_port = "HTTP Secondary Port";
var msg_https_port = "HTTPS Secondary Port";

// admin login
var msg_adminlogin = "Administrator Login Name" ;
var msg_pw_nomatch = "Password entries do not match, please retype.\n" ;

// alerts, E-Mail
var msg_motiondetect = "Warning!\nMotion detection can be triggered by sudden changes in the lighting level,\nas well as by moving objects.";
var msg_noalerts = "\nWarning! \nAlerts are enabled, but neither E-Mail nor SMTP is enabled,\nso the only Alert action will be to log the Alert.\n"; 
var msg_alert_filename = "Video File name";
var msg_mail = "Invalid %s. Please enter a valid E-Mail address.\n";
var msg_emaildest1 = "E-Mail address [1]";
var msg_emaildest2 = "E-Mail address [2]";
var msg_emaildest3 = "E-Mail address [3]";
var msg_email_subject = "E-Mail Subject";
var msg_emailsrc = '"From" E-Mail address';
var msg_nomail = "\nWarning! \nAlerts are enabled, you must provide at least one E-Mail address, and the SMTP server information.\n";
var msg_noalert = "\nWarning! \nAlerts will be enabled, you must provide at least one E-Mail address, and the SMTP server information.\n";
var msg_v_url = "Video Streaming URL Address" ;

// FTP
var msg_ftp_server = "FTP Server";
var msg_ftp_login = "FTP Login name";
var msg_ftp_passwd = "FTP Password";
var msg_ftp_passwd_nomatch = "Password entries do not match, please re-type.\n";
var msg_ftp_folder = "FTP Folder";
var msg_ftp_server_empty = "Warning! The FTP server name can not be empty.\n";
var msg_ftp2_server_empty = "Warning! The Secondary FTP server name can not be empty.\n";

//FTP
var msg_ftp = "Warning!\nWhen FTP Upload is enabled, you must enter details of the FTP Server.\n";
var msg_aftp_name = "FTP Server Name ";
var msg_aftp_login = "FTP Server Login name ";
var msg_aftp_pw = "FTP Server Password ";
var msg_in_inter = "Invaild Ftp Upload Interval.\n"; 
var msg_ftp_port = "FTP Port Number ";
var msg_ftp_path = "FTP File Path Name ";
var msg_ftp_port_valid_range = "FTP Port Number is invalid.Valid range is 1024~65535 and 21.\n"

//Log
var msg_log_server = "Log Server.\n";
// IM
var msg_jab_serv_addr_empty = "Warning! The Jabber server address can not be empty.\n";
var msg_blank_jab_name = "Jabber Server Login name";
var msg_blank_jab_pw = "Jabber Server Password";
var msg_jab_serv_addr_illegal_str = "Jabber Server Address\n";
var msg_send_jab_address = '"Send To" E-Mail address';
var msg_send_jab_addr_empty = 'Warning! The "Send To" E-Mail address can not be empty.\n';
var msg_message_size = "Message can not exceed 128 characters; please shorten it.\n";
var msg_message_url ="The URL must start with 'http://'\n";

//throughput
var delete_throughput_msg = "Delete item? \nThe throughput item will be lost.\n\nClick OK to continue, Cancel to abort.";
var edit_comfirm_msg="You selected more than one item\n you will edit the first selectd,\n\nClick OK to continue,Cancel to abort.";
var copy_confirm_msg="You want to copy the item(s) \n\nClick OK to continue,Cancel to abort.";
var msg_http_url_empty = "Warning! The URL can not be empty.\n";
var msg_http_url_illegal_str = "URL";
var msg_proxy_name_empty = "Warning! The proxy server name can not be empty.\n";
var msg_proxy_name_illegal_str = "Proxy server name";
var msg_proxy_port = "Proxy port number";
var msg_http_username = "HTTP user name";
var msg_http_userpwd = "HTTP user password";
var msg_proxy_username = "Proxy user name";
var msg_proxy_userpwd = "Proxy user password";

// ddns 
var msg_ddns_hostname = "DDNS Hostname";
var msg_ddns_username = "DDNS account name";
var msg_ddns_password = "DDNS password";

//CMS
var msg_cms_address_empty = "CMS address can not be empty.\n";
var msg_cms_port = "CMS port number";
var msg_cms_pw_invalid = "CMS password";

//L2TP
var msg_l2tp_server_empty = "L2TP server address can not be empty.\n";
var msg_l2tp_pw_invalid = "L2TP password";
var msg_l2tp_port = "L2TP Port";
var msg_l2tp_mtu = "L2TP MTU size";

// image, camera
var msg_bright = "Brightness";
var msg_contrast = "Contrast";
var msg_red = "Red";
var msg_green = "Green";
var msg_blue = "Blue";
var msg_typechange = "Warning!\nWhen the image type is changed, all existing connections will be terminated.\nAnyone viewing the video will need to re-connect.";
var msg_quality_change = "Warning!\nWhen the image quality is changed, all existing connections will be terminated.\nAnyone viewing the video will need to re-connect.";
var msg_res_change = "Warning!\nWhen the image size is changed, all existing connections will be terminated.\nAnyone viewing the video will need to re-connect.";
var msg_frate_change = "Warning!\nWhen the frame rate is changed, all existing connections will be terminated.\nAnyone viewing the video will need to re-connect.";
var msg_typechange_full = "Warning!\n1) Audio is not available with this video type.\n2) When the image type is changed, all existing connections will be terminated.\nAnyone viewing the video will need to re-connect.";
var msg_noaudio_mjpeg = "Audio is not available with MJPEG video";
var msg_image_rotation = "When using Image Rotation, the \"Time Stamp\" \nand \"Text Overlay\" options are unavailable.\nClick OK to disable Time Stamp and Text Overlay.\n";
var msg_text_overlay = "Text overlay";
var msg_dis_md = "Warning!\nMotion Detection function will not be available.\n";
var msg_dis_alert = "Warning!\nAlert function will not be available.\n";
var msg_attach = "Warning!\nWhen the image type is changed, the type of event attachement will be changed to the same setting.\n";
var msg_m_att = "Event attachement will be MPEG-4 video only.\n";
var msg_overlay = "Text display";
var msg_mv_pw = "Access Code";
var msg_video_mode_change = "Warning!\nWhen the video mode is changed, all existing connections will be terminated.\nAnyone viewing the video will need to re-connect.";
var msg_uri_same_err = "User Defined URI can not be same.";
var msg_video_format_match_wrong = "Video format is invalid.\n %s streaming number is %s, it MUST be less than %s.\n";
var msg_video_is_too_lack = "Can not disable all streaming, there is one streaming at least\n";
var msg_gov_length = "GOV length";

// fw upgrade
var up_msg = "Upgrade Firmware? \nAll existing connections will be terminated.\n\nClick OK to continue, Cancel to abort.";
var nofile_msg = "No filename provided. Please select the correct file.";
var finish_msg = "\Firmware Upgrade completed. Camera will now restart." + 
"\nPlease wait for restart to be completed before continuing.";
var msg_confirmCfile = "Warning!\nRestoring settings from a configuration file will erase all the current settings.\nClick OK to continue , Cancel to abort.";

// network, tcp/ip
var msg_invalidIP_with_subnet = "Invalid combination of %s and Subnet Mask.\n";
var msg_validIP_range = "Invalid %s,Only use the IP starting with %s~%s.\n";
var msg_validIP_notU = "Invalid %s. Can't use the IP starting with %s.Please specify other IP starting with %s~%s.\n";
var msg_ipaddress = "IP Address";
var msg_ipmask = "Subnet mask";
var msg_gateway = "Gateway";
var msg_pppoe_username = "PPPoE UserName";
var msg_pppoe_password = "PPPoE Password";
var msg_pppoe_idle = "PPPoE IdleTime";
var msg_pppoe_redial = "PPPoE RedialTime";
var msg_mtu = "Mtu size";
var msg_dns1 = "Primary DNS IP address";
var msg_dns2 = "Secondary DNS IP address";
var msg_need_gwdns = "Warning!\nE-Mail notification, DDNS, and Network Time Protocol\ncannot work without a Gateway and DNS.\n\nClick OK to continue, Cancel to abort saving.";
var msg_rtsp_port = "RTSP Port";
var msg_rtp_port = "Invalid RTP Port number. Enter an even value between %s and %s.\n";
var msg_rtp_pkt_len = "Max RTP Data Packet Length";
var msg_video_address = "Video Address";
var msg_audio_address = "Audio Address";
var msg_v_port = "Video Port";
var msg_a_port = "Audio Port";
var msg_rtp_time = "Time";
var msg_http_port_conflict = "The HTTP Secondary Port number can not be equal to the RTSP Port number.\n";
var msg_https_port_conflict = "The HTTPS Secondary Port number can not be equal to the RTSP Port number.\n";
var msg_rtp_port_conflict = "Invalid RTP Port number. The video and audio port cannot be the same.\n";
var msg_second_port_conflict = "The Http Secondary Port number can not be equal to the Https Secondary Port number.\n";
var msg_wmm_qos = "Enable QoS mode will automatically enable WMM (802.11e QoS) when in wireless mode.\n";
var msg_q_dscp = "DSCP";

//ipv6
var msg_ip_v6 = "IPv6 address ";
var msg_mask_v6 = "IPv6 address's prefix length ";
var msg_gw_v6 = "IPv6 default gateway ";
var msg_dns1_v6 = "Primary IPv6 DNS server ";
var msg_dns2_v6 = "Secondary IPv6 DNS server ";
var msg_illegal_addr = "Illegal address in %s.\n";

//Pan/Tilt
var msg_cycle_limit = "Unable to add. Sequence can contain a maximum of %s presets.\n";
var msg_select_preset = "No Preset position selected, please select a preset from the list.\n";
var msg_exclusive_time = "Exclusive control time";
var msg_standby_time = "Standby time";
var msg_position_time = "Time at each position";
var msg_in_presetname = "The preset name has existed.\n";
var msg_in_max = "Maximum added items is 9.\n";
var msg_in_ptname = "The name has existed.\n";
var msg_invalid_resetname = "The preset name can't be NULL.\n";
var msg_invalid_remove = "The preset list has no preset name.\n";
var msg_add_blank_preset = "Can not add blank Preset Position in Sequence.\n";

// schedule
var msg_delperiod = "Delete selected period or periods?\n";
var msg_noperiod_selected = "No period selected. Please select a period from the list.\n";
var msg_finish_after_start = "Invalid period. Finish time must be after start time.\n";
var msg_start_end = "Invalid period!  Start time and end time cannot be the same.\n";

// SMTP
var msg_smtp_server_empty = "Warning! The SMTP server name can not be empty.\n";
var msg_smtp2_server_empty = "Warning! The Secondary SMTP server name can not be empty.\n";
var msg_pop_server_empty = "Warning! The POP server name can not be empty.\n";
var msg_pop2_server_empty = "Warning! The Secondary POP server name can not be empty.\n";
var msg_smtp_server = "Outgoing Mail SMTP Server";
var msg_smtp_login = "Mail Server Account Name" ;
var msg_blank_smtp_name = "SMTP Login name";
var msg_blank_smtp_pw = "SMTP Password";
var msg_blank_pop_name = "POP server name";


// Status
var resetDefault_msg = "Reset to Factory Defaults ?\nCurrent configuration data will be lost.\n\nClick OK to continue, Cancel to abort";
var restart_msg = "Restart ? \nAll existing connections will be terminated.\n\nClick OK to continue, Cancel to abort";


//system 
var msg_name = "Title Bar Name";
var msg_hr = "Time (Hrs)";
var msg_min = "Time (Min)";
var msg_day = "Date (Day)";
var msg_year = "Date (Year)";
var msg_adm = "Admin name";
var msg_ntp_server = "NTP Server Address";
var msg_update_hr = "NTP update schedule (Hr)";
var msg_update_min = "NTP update schedule (Min)";
var msg_cdesc = "Camera Description";
var msg_invalid_year = "Invalid year. Valid range is 2005 to 2037";

// Wireless
var na_var = "n/a";
var msg_infraChannel = "Auto";
var msg_ssid = "SSID";
var msg_sel_region = "Please select the region to match your location.\n";
var msg_no_wsec = "Disabled";
var msg_wep = "WEP";
var msg_wpa = "WPA/WPA2 Personal";
var msg_wpa2 = "WPA2 Personal";
var msg_wpa2_aes = "WPA2 Personal(AES)"; //richard add WPA2-AES only
var msg_wpa_tkip = "WPA Personal(TKIP)";

//  WEP, WPA Personal
var msg_hexkey64 = "Invalid WEP Key. Keys must consist of 10 Hex chars ( 0~9 or A~F )\n";
var msg_hexkey128 = "Invalid WEP Key. Keys must consist of 26 Hex chars ( 0~9 or A~F )\n";
var msg_smallpassphase = "Passphrase must be at least 1 character.\n";
var msg_default_key = "Default key [%s] can not be blank.\n";
// var msg_keysnomatch = "WEP Key %s: Key values do not match, please retype.\n";
var msg_hexkey = "Invalid Key. Hex keys can only include the characters 0~9 and A~F.\n";
var msg_psk_keysize = "Pre-shared key must be an 8 to 63 character passphrase or a string of 64 hexadecimal digits\n";
//var msg_psk_lifetime = "Key Lifetime";
var msg_asciikeysize = "Invalid WEP Key. \nKeys must be %s ASCII characters.\n";
var msg_hexkeysize = "Invalid WEP Key. Keys must be %s Hex chars ( 0~9 or A~F )\n";

// User
var button_label_add = "Add User";
var button_label_update = "Update User";
var button_label_clear =  "Clear Fields";
var button_label_cancel = "Cancel";
var msg_username = "User name";
var msg_userpwd = "User Password";
var msg_nameused ="This name is already used. Please use another name.\n";
var msg_passwd_nomatch = "Password entries do not match, please retype.\n";
var msg_dbfull = "User database is full, no more users can be added.\n";
var msg_select_user = "No user selected, please select a user from the list.\n";
var msg_del_user = "Delete user: ";
var msg_del_allusers = "Delete all users ? \n";

// Event
var msg_eventname = "Event Name";
var msg_event_over = "It is not possible to add any more events. The maximum number of events is 10.\n";
var msg_noevent_selected = "No event selected. Please select a event from the list.\n";
var msg_delevent = "Delete selected event or events?\n";
var msg_photo_filename = "File Path Name";
var msg_no_option = "No option selected. Please select one from the list.\n";
var msg_emaildest = "E-Mail address";
var msg_e_subject = "E-Mail Subject";

// I/O
var msg_Output_time = "Action duration time";

//RS485
var msg_hex485key = 'Invalid Command. Hex keys can only include the characters 0~9, A~F, a~f and ",".\n';
var msg_command_name = "Command name";
var msg_fill = "%s should be blank, or you must key-in the valid command to operate the device you connected.\n";

// FTP Upload
var msg_noupload_selected = "No upload schedule selected. Please select a schedule from the list.\n";
var msg_delupload = "Delete selected schedule or schedules?\n";
var msg_upload_over = "It is not possible to add any more schedules. The maximum number of schedules is 10.\n";

//SMB
var msg_http_smb ="The server path must start with 'http://'\n";
var msg_smb_server_empty = "Warning! The server name can not be empty.\n";
var msg_smb_server_illegal_str = "server name";
var msg_smb_path_empty = "Warning! The file path can not be empty.\n";
var msg_smb_path_illegal_str = "file path";
var msg_smb_name = "User name";
var msg_smb_pwd = "Password";
var msg_smb_max = "Maximum size of each file";
var msg_smb_max_duration = "Maximum duration of each file";
var msg_smb_select_null = "You must select a folder to save you file.";
var msg_smb_survey_error = "Failed to survey servers/folders.";
var msg_smb_auth_null = "Username can not be blank.";
var msg_smb_path_error = "Can't survey the path, the length is more than 128 characters.";
var msg_smb_set_manual = "* Please fill in the shared folder name directly in the setting page if you cannot find your shared folder from this windows.";

//SMB test
var msg_smb_test_succ = "SMB/CIFS Server is available.\n"
var msg_smb_test_fail = "SMB/CIFS Server is unavailable:failed to upload file.\n"
var msg_smb_test_readonly = "SMB/CIFS Server is unavailable:remote path is read only.\n"
var msg_smb_test_writeonly = "SMB/CIFS Server is unavailable::remote path is write only.\n"
var msg_smb_test_no_permission = "SMB/CIFS Server is unavailable:have no access permission to remote path.\n"
var msg_smb_test_no_path = "SMB/CIFS Server is unavailable:remote path is not exist in server.\n"
var msg_smb_test_server_unknow = "SMB/CIFS Server is unavailable:can not find the server.\n"

//SD
var msg_format_sd = "The format operation will destroy all data on the SD card!\n"



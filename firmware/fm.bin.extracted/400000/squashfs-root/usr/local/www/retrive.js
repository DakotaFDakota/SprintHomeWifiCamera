var http_request;
var rp_not_ready = '<center><b><font size="+1">Site Surveying</font></b><p><img src="wait.gif" width="53" height="53" alt="" border="0"></center>';
var rp_broken = '<center><p><p><b><font size="+1">Site surveying is currently unavailable. Please try again.</font></b></center>';
var siteFile;	
var tag_var;
var site_list;
//var site_el;
//var ssid_list;
var ssid_el;
//var signal_list;
var signal_el;	
//var mode_list;
var mode_el;
//var channel_list;
var channel_el;
//var sec_list;
var sec_el;

// Pre defines
var TagSite = "Site";
var TagTagSSID = "SSID";
var TagTagBSSID = "BSSID";
var TagTagMode = "Mode";
var TagTagSecurity = "Security";
var TagTagAUTH = "AUTH";
var TagTagEncryption = "Encryption";
var TagTagChannel = "Channel";
var TagTagSignal = "Signal";
var TagTagWPS = "WPS";

function registerAJX()
{
	if(http_request == null)
	{
		if(window.XMLHttpRequest)
		{ http_request = new XMLHttpRequest(); } 
		else if(window.ActiveXObject)
		{
			try
			{ http_request = new ActiveXObject("Msxml2.XMLHTTP"); } 
			catch(e)
			{
				try
				{ http_request = new ActiveXObject("Microsoft.XMLHTTP"); } 
				catch(e)
				{ http_request = null; }
			}
		}
	}

	if (!http_request)
	{ alert('Giving up :( Cannot create an XMLHTTP instance'); return false; }
	var src_file;
	src_file = '../adm/site_survey.cgi?timestamp='+new Date().getTime();
	
	http_request.onreadystatechange = function() { retriveContents(); };
	Ulist(); 
	http_request.open('GET', src_file, true);
	http_request.send(null);
}

function retriveContents()
{
	if (http_request.readyState == 4 || http_request.readyState == 'complete')
	{
		if ((http_request.status == 501) || (http_request.status == 200))
		{ Slist(); } 
		else if (http_request.status == 401)
		{ Flist(); }
		else
		{ Ulist(); }
		http_request = null;
	}
}

function Slist()
{
	var cf = document.forms[0];
	siteFile = http_request.responseXML;	
	tag_var = siteFile.getElementsByTagName(TagSite);
	var msg = "";
	var msg_head = '<center><b><font size="+1">Device Found</font></b></center><br>';
	msg += '<table border="0" cellspacing="6" cellpadding="0" width="630">'; 
	for(i=0; i<tag_var.length; i++)
	{
		var site_node = tag_var[i];
		ssid_el = site_node.getElementsByTagName(TagTagSSID)[0].firstChild.nodeValue;
		signal_el = site_node.getElementsByTagName(TagTagSignal)[0].firstChild.nodeValue;
		mode_el = site_node.getElementsByTagName(TagTagMode)[0].firstChild.nodeValue;
		channel_el = site_node.getElementsByTagName(TagTagChannel)[0].firstChild.nodeValue;
		sec_el = site_node.getElementsByTagName(TagTagSecurity)[0].firstChild.nodeValue;
		//alert(ssid_el);
			if(i==0)
			{
			   msg +=	
	           '<tr>'+
	       	   '<td nowrap class="subhead" width="230">SSID</td>' +
		       '<td nowrap class="subhead" width="105">Strength</td>' +
			   '<td nowrap class="subhead" width="85">Mode</td>' + 
			   '<td nowrap class="subhead" width="80" align="center">Channel</td>' +
			   '<td>&nbsp;</td>'+
			   '<td nowrap class="subhead" width="80">Security</td>' +
			   '<td nowrap class="subhead" width="40">&nbsp;</td>' +
		       '</tr>';
			}
			if(mode_el == "Ad-hoc")
				continue;
			
			msg += "<tr>";
			msg += "<td nowrap='nowrap' width='230'><b>";
			msg += "<input type=\"text\" name=\"essidlist\" value=\""+ssid_el+"\" size=\"32\" maxlength=\"32\" style=\"width:190px\" disabled>";
			msg += "</b></td>";
			msg += "<td nowrap='nowrap' width='105'>";
			msg += "<img src=\"../buttons/background_down.gif\" height=\"15\" width='";
			msg += signal_el;
			msg += "'>";
			msg += "</td>";
			msg += "<td nowrap='nowrap' width='85'>";
			msg += mode_el;
			msg += "</td>";
			msg += "<td nowrap='nowrap' width='80' align='center'>";
			if(channel_el == 0)
			{ msg += "Auto"; }
			else
			{ msg += channel_el; }
			msg += "</td>";
			msg += "<td>&nbsp;</td>";
			msg += "<td nowrap='nowrap' width='80'>";
			msg += sec_el;
			msg += "</td>";
			msg += "<td nowrap='nowrap' width='40'>";
			msg += "<input type=\"button\" name=\"apply\" value=\"Apply\" class=\"stdbuttton\" onClick=\"appl_cam(\'";
			msg += i;
			msg += "\');\"";
			if("Ad-hoc" == siteFile.getElementsByTagName(TagSite)[i].getElementsByTagName(TagTagMode)[0].firstChild.nodeValue)
			{
				msg += " disabled=\"disabled\"";
			}
			msg += ">";
			msg += "<td nowrap='nowrap' width='40'>"; 
			msg += "<input type=\"button\" name=\"PIN\" value=\"PIN\" class=\"stdbuttton\" onClick=\"pin_registerAJX(\'";
			msg += i;
			msg += "\');\">";
			msg += "</td>";
			msg += "</tr>";
		
	}
	msg += '</table>';
	document.getElementById("Clist").innerHTML = msg;
	document.getElementById("ClistHead").innerHTML = msg_head;
	anim();
	cf.rrefresh.disabled = false;
}

function anim()
{
	document.getElementById("aaaa").style.display = "block";
	document.getElementById("wl_site_DIV").style.display = "block";
	document.getElementById("Clist").style.display = "block";
	document.getElementById("ClistHead").style.display = "block";	
}

function Ulist()
{
	var cf = document.forms[0];
	document.getElementById("aaaa").style.display = "block";
	document.getElementById("ClistHead").innerHTML = "";
	document.getElementById("Clist").innerHTML = rp_not_ready;
	document.getElementById("wl_site_DIV").style.display = "block";
	document.getElementById("Clist").style.display = "block";
	document.getElementById("ClistHead").style.display = "block";
	cf.rrefresh.disabled = true;
}

function Flist()
{
	var cf = document.forms[0];
	document.getElementById("aaaa").style.display = "block";
	document.getElementById("ClistHead").innerHTML = "";
	document.getElementById("Clist").innerHTML = rp_broken;
	document.getElementById("wl_site_DIV").style.display = "block";
	document.getElementById("Clist").style.display = "block";
	document.getElementById("ClistHead").style.display = "block";
	cf.rrefresh.disabled = false;
}

function site()
{
	document.getElementById("aaaa").style.display = "block";
	document.getElementById("wl_site_DIV").style.display = "block";
}

var SPECIAL_SEPERATOR = ":";

var mode_table = new Array("1", "0:Ad-hoc");
var sec_table = new Array("2", "0:None", "1:WEP");
var auth_table = new Array("1", "2:SharedKey");
function translate_values(table, in_value)
{
	//alert("in_value="+in_value+", table.length="+table.length);
	for (var i=1; i < table.length; i ++)
	{
		var tmp = table[i].indexOf(SPECIAL_SEPERATOR);
		
		//alert("i="+i+", tmp="+tmp+", table[i]="+table[i]+", table[i].length="+table[i].length);
		if (-1 == tmp)
		{
			continue;
		}
		var index_value = table[i].substring(0, tmp);
		var content_value = table[i].substring(tmp+1, table[i].length);
		//alert("content_value="+content_value);
		if (content_value == in_value)
		{
			return index_value;
		}
	}
	return table[0];
}

function pin_registerAJX(num)
{
	var pin_http_request;
	if(pin_http_request == null)
	{
		if(window.XMLHttpRequest)
		{ pin_http_request = new XMLHttpRequest(); } 
		else if(window.ActiveXObject)
		{
			try
			{ pin_http_request = new ActiveXObject("Msxml2.XMLHTTP"); } 
			catch(e)
			{
				try
				{ pin_http_request = new ActiveXObject("Microsoft.XMLHTTP"); } 
				catch(e)
				{ pin_http_request = null; }
			}
		}
	}

	if (!pin_http_request)
	{ alert('Giving up :( Cannot create an XMLHTTP instance'); return false; }
	var src_file;
	var ssid = siteFile.getElementsByTagName(TagSite)[num].getElementsByTagName(TagTagSSID)[0].firstChild.nodeValue;
	src_file = '../adm/set_group.cgi?group=WIRELESS&wlan_essid='+ssid;
	
	pin_http_request.onreadystatechange = function() { pin_retriveContents(pin_http_request, ssid); };
	pin_http_request.open('GET', src_file, true);
	pin_http_request.send(null)
}

function pin_retriveContents(pin_http_request, ssid)
{
	if (pin_http_request.readyState == 4 || pin_http_request.readyState == 'complete')
	{
		if ((pin_http_request.status == 501) || (pin_http_request.status == 200))
		{ 
			alert('Set SSID="'+ssid+'" successfully. Please remove the cable and then reboot the device and then push physical button triggering as WPS PIN mode.');
		} 
		else if (pin_http_request.status == 401)
		{ 
			alert('WPS PIN process fail\n'); 
		}
		else
		{  }
		pin_http_request = null;
	}
}

function appl_cam(num)
{
	var cf = window.document.forms[0];
	var temp;
	var temp_name;
	cf.essid.value = siteFile.getElementsByTagName(TagSite)[num].getElementsByTagName(TagTagSSID)[0].firstChild.nodeValue;
	//cf.h_w_mode.value = translate_values(mode_table, siteFile.getElementsByTagName(TagSite)[num].getElementsByTagName(TagTagMode)[0].firstChild.nodeValue);
	cf.h_w_ch.value = siteFile.getElementsByTagName(TagSite)[num].getElementsByTagName(TagTagMode)[0].firstChild.nodeValue;
	cf.h_wire_sec.value = translate_values(sec_table, siteFile.getElementsByTagName(TagSite)[num].getElementsByTagName(TagTagSecurity)[0].firstChild.nodeValue);
	cf.h_w_auth.value = translate_values(auth_table, siteFile.getElementsByTagName(TagSite)[num].getElementsByTagName(TagTagAUTH)[0].firstChild.nodeValue);
	 
	document.getElementById("wl_site_DIV").style.display = "none";
	document.getElementById("aaaa").style.display = "none";
	dataToVisible(cf);
	setChannel();
	setwsec();
	setKeySize();
	//init();
}

function re_scan()
{
	abort_scan();
	registerAJX();
}

function abort_scan()
{	
	if(http_request !=null){
		http_request.abort();	
	}
	document.getElementById("wl_site_DIV").style.display = "none";
	document.getElementById("aaaa").style.display = "none";
}

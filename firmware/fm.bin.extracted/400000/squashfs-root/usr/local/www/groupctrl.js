var ntp_message="Connecting to the NTP server, please wait......";
var ipchg_message="Device's IP address may change.Please use the Windows utility to locate the camera and configure it correctly for your environment.You should now close this Browser window.";
var reset_message="Device's config file has been reset. Camera will restart  and IP address maybe change .Please use the Windows utility to locate the camera and configure it correctly for your environment.Please close this Browser window and wait  for a moment.";
var restart_message="Device will restart.This process maybe need 1~2 minutes, Please wait.....";
var sys_message=[ntp_message,ipchg_message,reset_message,restart_message];
// Constructor
function GroupCtrl() {
    this.callback = null;

 	this.XMLHTTP = null;
	this.XMLHTTP = createAJAX();
	if (this.XMLHTTP == null)
	{
		return null;
	}
	
	this.get = GroupCtrl.get;
	this.set = GroupCtrl.set;
	this.getvalue = GroupCtrl.getValue;
	this.setvalue = GroupCtrl.setValue;
}
 
function createAJAX()
{
	if(window.ActiveXObject)
	{
		try
		{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e)
		{
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e2)
			{
				return null;
			}
		}
	}
	else if(window.XMLHttpRequest)
	{
		return new XMLHttpRequest();
	}
	else
	{
		return null;
	}
}
 
GroupCtrl.set = function(array_set) {
	var url = "/adm/set_group.cgi";
	var content = "";
	var i;
	var current_group="";
	for (i=0; array_set[i]!=null; i++)
	{
		if (current_group != array_set[i][0])
		{
			current_group = array_set[i][0];
			if (i > 0 )
			{
				content += "&";
			}
			content += "group=" + current_group;
		}
		//alert(array_set[i][1] + "=" + getValueByTagname(array_set[i][2])+",tagname="+array_set[i][2]);
		content += "&" + array_set[i][1] + "=" + encodeURIComponent(getValueByTagname(array_set[i][2]));
	}
	var xmlhttp_via = this.XMLHTTP;
	var callback = this.callback;	
	this.XMLHTTP.onreadystatechange = function(){on_set_resp(xmlhttp_via,callback)};
	this.XMLHTTP.open("POST", url, true);
	this.XMLHTTP.setRequestHeader("Content-Length", content.length); 
	this.XMLHTTP.setRequestHeader("Content-Type", "text/plain");
	this.XMLHTTP.send(content);
}
 
GroupCtrl.get = function(array_get) {
	var url = "/adm/get_ui_group.cgi";
	var content = "group=";
	var i;
	var current_group;
	for (i=0; array_get[i]!=null; i++)
	{
		if (current_group != array_get[i][0])
		{
			current_group = array_get[i][0];
			if (i > 0 )
			{
				content += "&";
			}
			content += current_group;
		}
	}
	var xmlhttp_via = this.XMLHTTP;
	var callback = this.callback;
	this.XMLHTTP.onreadystatechange = function(){on_get_resp(xmlhttp_via, array_get, callback)};
	this.XMLHTTP.open("POST", url, true);
	this.XMLHTTP.setRequestHeader("Content-Length", content.length); 
	this.XMLHTTP.setRequestHeader("Content-Type", "text/plain");
	this.XMLHTTP.send(content);
}
 
function on_get_resp(xmlhttp, array_get, callback)
{
	if (xmlhttp.readyState != 4)
  	{	
		return;
	}
	if (xmlhttp.status != 200)
	{
		if(xmlhttp.responseText!="")
		{
			alert(xmlhttp.responseText);
		}
		else
		{
			alert("Get failed. HTTP "+xmlhttp.status);
		}
		return;
	}
	//put value into web objects
	var all_value = xmlhttp.responseText.split("\r\n");
	for (i=0; array_get[i]!=null; i++)
	{
		for (j=0; all_value[j]!=null; j++)
		{
			if (all_value[j] == "["+array_get[i][0]+"]")
			{
				for (n=1; all_value[j+n]!= null && all_value[j+n].charAt(0)!='['; n++)
				{
					if (all_value[j+n].split("=")[0] == array_get[i][1])
					{
						setValueByTagname(array_get[i][2], all_value[j+n].substr(array_get[i][1].length+1));
						break;
					}
				}
				break;
			}
		}
	}	
	if(callback != null)
	{
		callback();
	}
}
 
function on_set_resp(xmlhttp,callback)
{
	if (xmlhttp.readyState != 4)
  	{	
		return;
	}
	if (xmlhttp.status != 200)
	{
		if(xmlhttp.responseText!="")
		{
			alert(xmlhttp.responseText);
		}
		else
		{
			alert("Set failed. HTTP "+xmlhttp.status);
		}

		return;
	}
	else
	{
		alert("Set success!");
		if(callback != null)
		{
			callback();
		}
	}
}

function getValueByTagname(tagname)
{
	var cf = document.getElementsByName(tagname);

	if (cf[0] == null)
	{
		return "";
	}
	else if (cf[0].tagName == "A")
	{
		return cf[0].innerHTML;
	}
	if (cf[0].type == "text")
	{
		return cf[0].value;
	}
	else if(cf[0].type == "password")
	{
		return cf[0].value;
	}
	else if (cf[0].type == "select-one")
	{
		return cf[0].value;
	}
	else if (cf[0].type == "radio")
	{
		for (cnt=0; cnt<cf.length; cnt++)
		{
			if (cf[cnt].checked == 1)
			{
				return cf[cnt].value;
			}
		}
	}
	else if (cf[0].type == "checkbox")
	{
		if (cf.length == 1)
		{
			if (cf[0].checked == 1)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		}
		else
		{	
			var tmp_str = "";
			for (cnt=0; cnt<cf.length; cnt++)
			{
				if (cf[cnt].checked == 1)
				{
					tmp_str += cf[cnt].value + ",";
				}
			}
			return tmp_str;
		}
	}
	else if (cf[0].type == "hidden")
	{
		return cf[0].value;
	}
	return "";
}
 
function setValueByTagname(tagname, tagvalue)
{
	var cf = document.getElementsByName(tagname);
	var index=0;

	if (null == tagvalue)
	{
		return;
	}
	
	do 
	{
		if (cf[index] == null)
		{
			return;
		}
		else if (cf[index].tagName == "A")
		{
			cf[index].innerHTML = tagvalue;
		}
		else if (cf[index].type == "text")
		{
			cf[index].value = tagvalue;
		}
		else if (cf[index].type == "textarea")
		{
			cf[index].value = tagvalue;
		}
		else if (cf[index].type == "select-one")
		{
			cf[index].value = tagvalue;
		}
		else if (cf[index].type == "radio")
		{
			for (cnt=0; cnt<cf.length; cnt++)
			{
				if (cf[cnt].value == tagvalue)
				{
					cf[cnt].checked = 1;
					break;
				}
			}
			return;
		}
		else if (cf[index].type == "checkbox")
		{
			if (cf.length == 1)
			{
				if (tagvalue == 1)
				{
					cf[index].checked = 1;
				}
				else
				{
					cf[index].checked = 0;
				}
			}
			else
			{	
				for (cnt=0; cnt<cf.length; cnt++)
				{
					if (tagvalue.indexOf(cf[cnt].value) != -1)
					{
						cf[cnt].checked = 1;
					}
					else
					{
						cf[cnt].checked = 0;
					}
				}
				return;
			}
		}
		else if (cf[index].type == "hidden")
		{
			cf[index].value = tagvalue;
		}
	} while(index++);
}

GroupCtrl.setValue = function(array_set) {
	var url = "/adm/set_group.cgi";
	var content = "";
	var i;
	var current_group="";
	for (i=0; array_set[i]!=null; i++)
	{
		if (current_group != array_set[i][0])
		{
			current_group = array_set[i][0];
			if (i > 0 )
			{
				content += "&";
			}
			content += "group=" + current_group;
		}
		content += "&" + array_set[i][1] + "=" + encodeURIComponent(eval(array_set[i][2]));
	}
	var xmlhttp_via = this.XMLHTTP;
	var callback = this.callback;
	this.XMLHTTP.onreadystatechange = function(){on_set_resp(xmlhttp_via,callback)};
	this.XMLHTTP.open("POST", url, true);
	this.XMLHTTP.setRequestHeader("Content-Length", content.length); 
	this.XMLHTTP.setRequestHeader("Content-Type", "text/plain");
	this.XMLHTTP.send(content);
}

GroupCtrl.getValue = function(array_get_value) {
	var url = "/adm/get_ui_group.cgi";
	var content = "group=";
	var i;
	var current_group;
	for (i=0; array_get_value[i]!=null; i++)
	{
		if (current_group != array_get_value[i][0])
		{
			current_group = array_get_value[i][0];
			if (i > 0 )
			{
				content += "&";
			}
			content += current_group;
		}
	}
	var xmlhttp_via = this.XMLHTTP;
	var callback = this.callback;
	this.XMLHTTP.onreadystatechange = function(){on_get_value(xmlhttp_via, array_get_value,callback)};
	this.XMLHTTP.open("POST", url, true);
	this.XMLHTTP.setRequestHeader("Content-Length", content.length); 
	this.XMLHTTP.setRequestHeader("Content-Type", "text/plain");
	this.XMLHTTP.send(content);
}
 
function on_get_value(xmlhttp, array_get,callback)
{
	if (xmlhttp.readyState != 4)
  	{	
		return;
	}
	if (xmlhttp.status != 200)
	{
		if(xmlhttp.responseText!="")
		{
			alert(xmlhttp.responseText);
		}
		else
		{
			alert("Get failed. HTTP "+xmlhttp.status);
		}
		return;
	}
	//put value into web objects
	var all_value = xmlhttp.responseText.split("\r\n");
	for (i=0; array_get[i]!=null; i++)
	{
		for (j=0; all_value[j]!=null; j++)
		{
			if (all_value[j] == "["+array_get[i][0]+"]")
			{
				for (n=1; all_value[j+n]!= null && all_value[j+n].charAt(0)!='['; n++)
				{
					if (all_value[j+n].split("=")[0] == array_get[i][1])
					{
						//setValueByTagname(array_get[i][2], all_value[j+n].split("=")[1]);
						eval(array_get[i][2] + "= all_value[j+n].substr(array_get[i][1].length+1)");
						break;
					}
				}
				break;
			}
		}
	}	
	if(callback != null)
	{
		callback();
	}
}

function httpcgi_response(http_request,parser_content)
{
	if (http_request.readyState == 4 || http_request.readyState == 'complete')
	{
		content = http_request.responseText;
		//alert("http_content="+content);
		if(parser_content != null)
		{
			parser_content();
		}
		http_request.abort();
		http_request = null;
	}
}

function call_http_cgi(src_file,parser_content)
{
	var http_request;
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

	http_request.onreadystatechange = function() { httpcgi_response(http_request,parser_content); };
	http_request.open('GET', src_file, true);
	http_request.send(null);
}



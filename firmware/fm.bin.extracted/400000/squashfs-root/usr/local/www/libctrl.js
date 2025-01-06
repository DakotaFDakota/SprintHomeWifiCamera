// XML Control JavaScript Library


var xmlhttp;
var xmlDoc;

var INTERVAL_MSG_FD;

var SPECIFIED = 1;
var REQUEST = 0;
var RESPONSE = 1;

function hideMSG()
{
	cf = document.getElementById("statuspane");
	cf.style.display = "none";
	clearInterval(INTERVAL_MSG_FD);
}

function changeMSGpos()
{
	cf = document.getElementById("statuspane");
	cf.style.top = document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop+10;
}


function showMSG(message, hide)
{
	return;  //not use this feature
	cf = document.getElementById("msgspan");
	cf.innerHTML = message;
	document.getElementById("statuspane").style.display = "block";
	INTERVAL_MSG_FD = setInterval('changeMSGpos()', 100);
	if (hide == 1)
	{
		window.setTimeout('hideMSG();',3000);
	}
}





function getValueByTagname(tagname)
{
	var cf = document.getElementsByName(tagname);
	
	if (cf == null)
	{
		return null;
	}
	if (cf[0].type == "text")
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
	return null;
}

function setValueByTagname(tagname, tagvalue)
{
	var cf = document.getElementsByName(tagname);

	if (cf[0] == null)
	{
		return;
	}
	else if (cf[0].type == "text")
	{
		cf[0].value = tagvalue;
	}
	else if (cf[0].type == "select-one")
	{
		cf[0].value = tagvalue;
	}
	else if (cf[0].type == "radio")
	{
		for (cnt=0; cnt<cf.length; cnt++)
		{
			if (cf[cnt].value == tagvalue)
			{
				cf[cnt].checked = 1;
				break;
			}
		}
	}
	else if (cf[0].type == "checkbox")
	{
		if (cf.length == 1)
		{
			if (tagvalue == 1)
			{
				cf[0].checked = 1;
			}
			else
			{
				cf[0].checked = 0;
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
		}
	}
	else if (cf[0].type == "hidden")
	{
		cf[0].value = tagvalue;
	}
}

function getValueInString(keyname, vals)
{
	var key_idx = vals.indexOf(keyname);
	if (key_idx != -1 && ( 0 == key_idx || ';' == vals.charAt(key_idx-1)))
	{
		retval = vals.slice(vals.indexOf(keyname)+keyname.length+1, vals.indexOf(';', vals.indexOf(keyname)));
	}
	else
	{
		retval = null;
	}
	return retval;
}

function setValueInString(keyname, vals, val)
{
	if (vals.value.indexOf(keyname) != -1)
	{
		str1 = vals.value.slice(0, vals.value.indexOf(keyname)+keyname.length+1);
		str2 = vals.value.slice(vals.value.indexOf(';',vals.value.indexOf(keyname)));
		vals.value = str1+val+str2;
	}
	else
	{
		vals.value += keyname + "=" + val +";";
	}
	
}
 
 
function findSiblingChild(nodes, nodename)
{
	for (cnt=0; cnt<nodes.length; cnt++)
	{
		if (nodes[cnt].nodeName == nodename)
		{
			return nodes[cnt];
		}
	}
	return null;
}

var err_flag;
var err_line;
function recursion_nodes_find_error(the_node)
{
	var current_node;
	for(current_node = the_node; current_node != null; current_node = current_node.nextSibling)
	{
		if (current_node.nodeType == 1 || current_node.nodeType == 9)
		{
			if (current_node.getAttribute("errno") != null)
			{
				err_line += current_node.getAttribute("errstr")+"\r\n";
				err_flag = 1;
			}
			else if (current_node.firstChild != null)
			{
				recursion_nodes_find_error(current_node.firstChild);
			}
		}
	}
}


function on_get(on_api_name)
{
	if (xmlhttp.readyState != 4)
	{
		return;
	}
	if (xmlhttp.status != 200)
	{
		return;
	}
		
	var respXML = xmlhttp.responseXML;
	err_flag = 0;
	node = respXML.documentElement.childNodes[0];
	err_line = "";
	recursion_nodes_find_error(node);
	if (err_flag == 1)
	{
		//alert("Request Failed. HTTP "+xmlhttp.status);
		alert(err_line);
	}
	else
	{
		showMSG("Get Success.", 1);
		parseXMLResponse(respXML);
		//show_select();
	}
	if (on_api_name != null)
	{
		eval(on_api_name+"()");
	}
}

function on_set()
{
	if (xmlhttp.readyState != 4)
  	{	
		return;
	}
	
	if (xmlhttp.status != 200)
	{
		if(xmlhttp.status != 0)
		{
			alert("Request Failed. HTTP "+xmlhttp.status);
		}
		return;
	}

	var respXML = xmlhttp.responseXML;	
	err_flag = 0;
	node = respXML.documentElement.childNodes[0];
	err_line = "";
	recursion_nodes_find_error(node);
	if (err_flag == 1)
		alert(err_line);
	else
//		showMSG("Set Success.", 1);
		alert("Set success!");
}

function on_other(action, on_api_name)
{
	if (xmlhttp.readyState != 4)
  	{	
		return;
	}
	
	if (xmlhttp.status != 200)
	{
		alert("Request Failed. HTTP "+xmlhttp.status);
		return;
	}

	var respXML = xmlhttp.responseXML;	
	err_flag = 0;
	node = respXML.documentElement.childNodes[0];
	err_line = "";
	recursion_nodes_find_error(node);
	
	var root = respXML.documentElement.childNodes[0].childNodes[0];
	if (err_flag == 1)
	{
		alert(err_line);
	}
	else
	{
		showMSG(action+" Success.", 1);
	}
	
	if (root != null && on_api_name != null)
	{
		eval(on_api_name+"(root, RESPONSE)");
	}
}

function formSoapFrame(action)
{	
	text  = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
	text += "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">";
	text += "<s:Body>";
	text += "<u:"+action+" xmlns:u=\"urn:control\">";
	text += "</u:"+action+">";
	text += "</s:Body>";
	text += "</s:Envelope>";
	
	
	try //Internet Explorer
  	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(text);
  	}  
	catch(e)
	{
		try // Firefox, Mozilla, Opera, etc.
		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(text,"text/xml");
		}
		catch(e)
		{
			alert(e.message);
			return -1;
		}
	}
	return 0;
}

function sendRequest(action, on_api_name)
{
	url="control.cgi";
	xmlhttp=null;
	if (window.XMLHttpRequest)
	{// code for IE7, Firefox, Opera, etc.
	  xmlhttp=new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{// code for IE6, IE5
			var ieArr=["Msxml2.XMLHTTP.8.0","Msxml2.XMLHTTP.7.0","Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP","Microsoft.XMLHTTP"];                
      for(var i=0;i<ieArr.length;i++)
      {
      	try
      	{
      		xmlhttp= new ActiveXObject(ieArr[i]);
       	}
       	catch(e){}
     	}
  }
	
	if (xmlhttp!=null)
	{
		xmlhttp.open("POST",url,true);	
		if(action == "get")
			xmlhttp.onreadystatechange = function(){on_get(on_api_name)};
		else if(action == "set")
			xmlhttp.onreadystatechange = on_set;
		else 
			xmlhttp.onreadystatechange = function(){on_other(action, on_api_name)};
			
		xmlhttp.setRequestHeader("Content-Type", "application/soap+xml");
	  	xmlhttp.setRequestHeader("SOAPAction", "urn:control#"+action); 
	  	xmlhttp.send(xmlDoc);
	}
	else
	{
		alert("Your browser does not support XMLHTTP.");
	}
}

 
function parseXMLResponse(respXML)
{
	var root = respXML.documentElement.childNodes[0].childNodes[0];
	var currentNode = root;
	var depth = 0;
	
	for (i=0; (i<para_array.length && currentNode != null); i++)
	{
		for(j=depth; j>=0 && currentNode != null; j--)
		{	
			if(j == para_array[i][0]-1)
			{
				depth = j;
				tmpNode = findSiblingChild(currentNode.childNodes, para_array[i][1]);
				if (tmpNode != null)
				{						
					currentNode = tmpNode;
					depth++;					
										
					if (para_array[i][2]!=null)
					{
						if (para_array[i][3] == SPECIFIED)
						{
							eval(para_array[i][2]+"(currentNode, RESPONSE)");
						}
						else
						{
							try
							{
								tmp_value = tmpNode.firstChild.nodeValue;
							}
							catch (ex)
							{
								tmp_value = null;
							}	
							
							if (tmp_value != null)
							{
								setValueByTagname(para_array[i][2], tmp_value);
							}	
						}
					}
				}			
				break;
			}
			else
			{
				currentNode = currentNode.parentNode;
			}
		}
	}
}

function createXMLRequest(action, on_api_name)
{	
	if (formSoapFrame(action) != 0)
	{
		return;
	}
	
	var root = xmlDoc.documentElement.childNodes[0].childNodes[0];
	var currentNode = root;
	var depth = 0;
	
	if (action == "get")
	{
		for(i=0; (i<para_array.length && currentNode != null); i++)
		{
			if(para_array[i][0]==1)
			{
				tmpNode = xmlDoc.createElement(para_array[i][1]);
				root.appendChild(tmpNode);
			}
		}
	}
	else if (action == "set")
	{
		for (i=0; (i<para_array.length && currentNode != null); i++)
		{
			for(j=depth; j>=0 && currentNode != null; j--)
			{	
				if(j == para_array[i][0]-1)
				{
					depth = j;
					tmpNode = xmlDoc.createElement(para_array[i][1]);
					currentNode.appendChild(tmpNode);
					currentNode = currentNode.childNodes[currentNode.childNodes.length-1];
					depth++;
					
					if (para_array[i][2]!=null)
					{
						if (para_array[i][3] == SPECIFIED)
						{
							eval(para_array[i][2]+"(currentNode, REQUEST)");
						}
						else
						{
							tmp_value = getValueByTagname(para_array[i][2]);
							if (tmp_value != null)
							{
								currentNode.appendChild(xmlDoc.createTextNode(tmp_value));
							}		
						}
					}
					break;
				}
				else
				{
					currentNode = currentNode.parentNode;
				}
			}
		}
	}
	else
	{
		if (on_api_name != null)
		{
			eval(on_api_name+"(currentNode, REQUEST)");
		}
	}
	sendRequest(action, on_api_name);
}



function parseXML(node, vals, array, index)
{
	var currentNode = node;
	var depth = 0;
		
	for (i=0; (i<array.length && currentNode != null); i++)
	{
		for(j=depth; j>=0 && currentNode != null; j--)
		{	
			if(j == array[i][0]-1)
			{
				depth = j;
				if (i==0)
				{
					tmpNode = currentNode.childNodes[index];
				}
				else
				{
					tmpNode = findSiblingChild(currentNode.childNodes, array[i][1]);
				}
				
				if (tmpNode != null)
				{						
					currentNode = tmpNode;
					depth++;					
										
					if (array[i][2]!=null)
					{
						eval(array[i][2]+"(currentNode, RESPONSE, index)");
					}
					else
					{
						try
						{
							tmp_value = tmpNode.firstChild.nodeValue;
						}
						catch (ex)
						{
							if (tmpNode.firstChild == null)
							{
								tmp_value = "";
							}
							else 
							{
								tmp_value = null;
							}
						}	
						if (tmp_value != null)
						{
							setValueInString(array[i][1], vals, tmp_value);
						}	
					}
					
				}			
				break;
			}
			else
			{
				if(j > array[i][0]-1)
				{
					currentNode = currentNode.parentNode;
				}
			}
		}
	}
}



function structureXML(node, vals, array, index)
{
	var currentNode = node;
	var depth = 0;
	for (var i=0; (i<array.length && currentNode != null); i++)
	{
		for(j=depth; j>=0 && currentNode != null; j--)
		{	
			if(j == array[i][0]-1)
			{
				depth = j;
				tmpNode = xmlDoc.createElement(array[i][1]);
				currentNode.appendChild(tmpNode);
				currentNode = currentNode.childNodes[currentNode.childNodes.length-1];
				depth++;
				
				if (array[i][2]!=null)
				{
					eval(array[i][2]+"(currentNode, REQUEST, index)");
				}
				else
				{
					tmp_value = getValueInString(array[i][1], vals);
					if (tmp_value != null)
					{
						currentNode.appendChild(xmlDoc.createTextNode(tmp_value));
					}		
				}
				break;
			}
			else
			{
				if(j > array[i][0]-1)
				{
					currentNode = currentNode.parentNode;
				}
			}
		}
	}
}

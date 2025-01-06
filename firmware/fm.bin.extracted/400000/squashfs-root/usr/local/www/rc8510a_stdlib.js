// PCS 3021  May 14, 2003

var NIGHT_VISION = false;
var PAN_TILT = false;
var PER_SEND = false;

var CGIRequestRandomKey="RandomRedundancy";

var areasub = "width=680,height=560,scrollbars,resizable,status,dependent=yes";
var HelpOptionsVar = "width=480,height=420,scrollbars,toolbar,resizable,dependent=yes";
var settingWinoptions = "width=780,height=570,scrollbars,resizable,status";
var viewingWinoptions = "width=830,height=560,scrollbars=no,resizable,status";
var schedulesub = "width=460,height=440,scrollbars,status,resizable";

var sambasurveysub = "dialogHeight=360px; dialogWidth=500px; scroll=off; status=no; location=no";
var sambaauthsub1 = "dialogHeight=250px; dialogWidth=320px; status=no; location=no";
var sambaauthsub2 = "dialogHeight=195px; dialogWidth=320px; status=no; location=no";
var sambasurveyauthsub1 = "dialogHeight=250px; dialogWidth=320px; status=no; location=no";
var sambasurveyauthsub2 = "dialogHeight=195px; dialogWidth=320px; status=no; location=no";

var motionsub = "width=840,height=560,scrollbars=no,resizable,status,dependent=yes";
var smtpsub = "width=460,height=420,scrollbars,status,resizable";
var timesub = "width=460,height=250,scrollbars,status,resizable";
var presetsub = "width=460,height=380,scrollbars,status,resizable";
var mcardviewsub = "width=680,height=560,scrollbars,status,resizable";

var setWindowVar = null;
var viewWinowVar = null;
var helpWinVar = null;
var glossWinVar = null;
var datSubWinVar = null;
var ValidStr = 'abcdefghijklmnopqrstuvwxyz-';
var hex_str = "ABCDEFabcdef0123456789";
var hex485_str = "ABCDEFabcdef0123456789,";

var Valid_Str = 'abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var Valid_Stri = 'abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-';
var vali_str = '0123456789.';

var Valid_st = 'abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var Valid_ch = "~!#@$%^&*()_+|}{:?><,./;'[]\"`=-\\";
var Valid_Strd = Valid_st + Valid_ch;
var Valid_domain= 'abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-';
var restart_time = 15000; // msecs

//  display
var showit = "block";
var hideit = "none";


// visibility
// Value: inherit | visible | hidden
var Vshowit = "visible";
var Vhideit = "hidden";

var viewinName = "view" + Math.ceil((Math.random() * 1000000));

function openViewWin()
{
	viewWindowVar = window.open("/img/main.cgi?next_file=main.htm", viewinName, viewingWinoptions);
//	viewWindowVar = window.open("/img/main.htm", "viewWin", viewingWinoptions);
}

var activeEle= null;
var oldValue = "";

document.onkeydown = function()
{
    if (window.event.keyCode == 27)//deal with the ESC button 
    {
        if (activeEle == document.activeElement && activeEle.value != oldValue)
        {
            activeEle.value = oldValue;
        }
	    window.event.returnValue = false;
    }
}

document.onclick = function()
{
    if(document.activeElement.type == "text")
    {
        //a textInput has got the current focus
        activeEle = document.activeElement;
        oldValue = document.activeElement.value;
    }
    else
    {
        activeEle= null;
        oldValue = "";
    }
}

function setVisible(el,shownow)  // IE & NS6; shownow = true, false
{
  if (document.all)
    document.all(el).style.visibility = (shownow) ? Vshowit : Vhideit ;
  else if (document.getElementById)
   document.getElementById(el).style.visibility = (shownow) ? Vshowit : Vhideit ;
}


function setDisplay(el,shownow)  // IE & NS6; shownow = true, false
{
	if (document.all)
		document.all(el).style.display = (shownow) ? showit : hideit ;
	else if (document.getElementById)
		document.getElementById(el).style.display = (shownow) ? showit : hideit ;
}


function showMsg()
{
	//var msgVar=document.forms[0].message.value;
	
	if (msgVar == "restart")
	{
		alert(addstr(msg_restart, restart_time/1000));
	}
	else if (msgVar == "changeIP")
	{
		alert(addstr(msg_changeIP, restart_time/1000));
		top.close();
	}
	else if(msgVar == "@" + "m" + "essage#")
		;
	else if (msgVar.length > 1) 
		alert(msgVar);
}

function closeWin(win_var)
{
	if   ((win_var != null) && (win_var.closed == false)) 
			win_var.close();
}

function openHelpWin(file_name)
{
   helpWinVar = window.open(file_name,'help_win',HelpOptionsVar);
   if (helpWinVar.focus)
		setTimeout('helpWinVar.focus()',200);
}

function openGlossWin()
{
	glossWinVar = window.open('','gloss_win',GlossOptionsVar);
	if (glossWinVar.focus)
		setTimeout('glossWinVar.focus()',200);
}

function openDataSubWin(filename,win_type)
{
	closeWin(datSubWinVar);
	datSubWinVar = window.open(filename,'datasub_win',win_type);
	if (datSubWinVar.focus)
		setTimeout('datSubWinVar.focus()',200); 
}

function closeSubWins()
{
	closeWin(helpWinVar);
	closeWin(glossWinVar);
	closeWin(datSubWinVar);
}

function checkBlank(fieldObj, fmsg)
{
	if (fieldObj.value.length < 1)
	  return addstr(msg_blank, fmsg);
	else return "";
}

function checkFill(fieldObj, fmsg)
{
	if (fieldObj.value.length != "")
	  return addstr(msg_fill, fmsg);
	else return "";
}

function checkNoBlanks(fObj, fname)
{
	var space = " ";
 	if (fObj.value.indexOf(space) >= 0 )
			return addstr(msg_nospaces, fname);
	else return "";
}
function checkHostName(str)
{
		var at="@";
		var dot=".";
		var dash="-";
		var unline="_";
		var lat=str.indexOf(at);
		var lstr=str.length;
		var ldot=str.indexOf(dot);
		var i;
		var aa;	
		//host name must include "." and "." can't be the first/last char.
		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 ||str.charAt(lstr-1)==".")
		{
			return false; 
		} 
		//"-" can't be the first/last char
		if(str.indexOf(dash)==0 ||str.charAt(lstr-1)=="-")
		{
			return false; 
		} 
		//"_" can't be the first/last char
		if(str.indexOf(unline)==0 ||str.charAt(lstr-1)=="_")
		{
			return false; 
		} 
		// can't include space
		if (str.indexOf(" ")!=-1)
		{		   
		    return false;
		}
		// xx-.com is invalid 	
		if(str.indexOf("-.")!=-1)
		{					
			return false;
		}
		
		// xx.-com is invalid    
		if(str.indexOf(".-")!=-1 )
		{
			return false;
		}
		// xx..com is invalid
		if(str.indexOf("..")!=-1)
		{
			 return false;
		}
		for (i=0;i<=lstr-1;i++)
		{ 
			aa=str.charAt(i) 
			if (!((aa=='.') || (aa=='-') ||(aa=='_') || (aa=='[') ||(aa==']') ||(aa==':') || (aa>='0' && aa<='9') || (aa>='a' && aa<='z') || (aa>='A' && aa<='Z')))
			{ 
				return false; 
			} 
		}
		return true;	
}
function checkDomainName(input_field, field_name,valid_char)
{
	if (checkHostName(input_field.value)==false)
		return addstr(msg_invalid,field_name,valid_char);
	return "";
}
function CheckEmail(str)
{
		var at="@";
		var dot=".";
		var dash="-";
		var lat=str.indexOf(at);
		var lstr=str.length;
		var ldot=str.indexOf(dot);
		var i;
		var aa;		
		// it must include "@", and "@" can't be the first/last chars
		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.charAt(lstr-1)=="@")
		{ 
			return false; 
		} 
		// "-" can't be the last chars
		if(str.charAt(lstr-1)=="-")
		{ 
			return false; 
		} 
		// it must include ".", and "." can't be the first/last chars
		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 ||str.charAt(lstr-1)==".")
		{
			return false; 
		} 

		// only one "@"
		 if (str.indexOf(at,(lat+1))!=-1)
		 {
		    return false;
		 }

		// it can't be "." or "-" to the heel of "@", it can't be "@" to the heal of "."
		// xx.@xx.com, xx@-xx.com, xx@.com, are invalid		
		 if (str.substring(lat-1,lat)==dot 
		 || str.substring(lat+1,lat+2)==dot 
		 || str.substring(lat+1,lat+2)==dash)
		 {
		    return false;
		 }

		// after "@", it must include ".", between the "@" and ".", it msut be the other chars
		 if (str.indexOf(dot,(lat+2))==-1)
		 {
		    return false;
		 }
		
		// can't include space
		 if (str.indexOf(" ")!=-1)
		 {		   
		    return false;
		 }
		 /*
		 // after "@", "_" is invalid
		// xx@xx_xx.com is invalid	
			if(str.indexOf("_",lat+1)!=-1)
			{					
			 		return false;
			}
			*/
		// after "@", the "." can't be to the heel of "-"
		// xx@xx-.com is invalid	
			if(str.indexOf("-.",lat+1)!=-1)
			{					
			 		return false;
			}
		// after "@", the "-" can't be to the heel of "."
		// xx@xx.-com is invalid
			if(str.indexOf(".-",lat+1)!=-1)
			{
			 		return false;
			}		
			// after "@", the "." can't be to the heel of "."
		// xx@xx..com is invalid
			if(str.indexOf("..",lat+1)!=-1)
			{
			 		return false;
			}
	for (i=0;i<=lstr-1;i++)
	{ 
		aa=str.charAt(i) 
		if (!((aa=='.') || (aa=='@') || (aa=='-') ||(aa=='_') || (aa>='0' && aa<='9') || (aa>='a' && aa<='z') || (aa>='A' && aa<='Z')))
		{ 
				return false; 
		} 
	} 	 		
 		 return true;					
}

function checkMailAddress(input_field, field_name)
{
	//if (!(input_field.value.indexOf("@") >= 0 ))
	//	return addstr(msg_mail, field_name);
	//if (!(input_field.value.indexOf(".") >= 0 ))
	//	return addstr(msg_mail, field_name);
	if (CheckEmail(input_field.value)==false)
		return addstr(msg_mail, field_name);
	return "";
}

function checkValid(text_input_field, field_name, Valid_Str, max_size, mustFill)
{
	var error_msg= "";
	var size = text_input_field.value.length;
	var str = text_input_field.value;

	if ((mustFill) && (size != max_size) )
		return (addstr(msg_nospaces,field_name));
 	for (var i=0; i < size; i++)
  	{
    	if (!(Valid_Str.indexOf(str.charAt(i)) >= 0))
    	{
			error_msg = addstr(msg_invalid,field_name,Valid_Str);
			break;
    	}
  	}
  	return error_msg;
}

function checkInvalid(text_input_field, field_name, InvalidStr)
// check that no chars in "InvalidStr" appear in input
{
  var str = text_input_field.value;
  var error_msg= "";

  for (var i=0; i < InvalidStr.length; i++)
  {
    if (str.indexOf(InvalidStr.charAt(i)) >= 0)
    {
		 error_msg = addstr(msg_notallow,field_name,InvalidStr);
		 break;
    }
  }
  return error_msg;
}

function checkRTPPort(rtp_port, min_port, max_port)
{
	var error_msg = "";
    
	if (rtp_port < min_port || rtp_port > max_port || rtp_port%2 != 0)
	{
		 error_msg = addstr(msg_rtp_port, min_port, max_port);
	}
    
    return error_msg;
}

function checkInt(text_input_field, field_name, min_value, max_value, required)
// NOTE: Doesn't allow negative numbers, required is true/false
{
	var str = text_input_field.value;
	var error_msg= "";
	

	if (text_input_field.value.length==0) // blank
	{
		if (required)
			error_msg = addstr(msg_blank,field_name);
	}
	else // not blank, check contents
	{
		for (var i=0; i < str.length; i++)
		{
			if ((str.charAt(i) < '0') || (str.charAt(i) > '9'))
				error_msg = addstr(msg_invalid_number, field_name);
		}
		if (error_msg.length < 2) // don't parse if invalid
		{

			var int_value = parseInt(str,10);
			if (int_value < min_value)
				error_msg = addstr(msg_outofrange,field_name,min_value,max_value);
			if (int_value > max_value)
				error_msg = addstr(msg_outofrange,field_name,min_value,max_value);
		}
	}
	return(error_msg);
}

function blankIP(fn) // true if 0 or blank
{
	return ( (fn.value == "") || (fn.value == "0") )
}

function blankip(fn) // true if 0 or blank
{
	if ( (fn.value == "") || (fn.value == "0") )
	return true;
}

//ip_addr - ip address string
//rq_flag - true,Can't empty; false, Can empty
function ipstr_valid_check(ip_addr,msg,rq_flag)
{
    var addr=ip_addr.value;
    var ip_arry=addr.split(".");
    var ret;
    var errmsg="";
    var size=addr.length;

    if (size == 0)
    {
        if (rq_flag)
        {
	        errmsg = addstr(msg_InvalidIP_para,msg);
        }
        return (errmsg);
    }
    if ((ip_arry.length == 4)&& (size <= 15) && (size >=7))
    {
        for(var i=0;i<ip_arry.length;i++)
        {
     	    ret = isInteger(ip_arry[i], 0,255);
    	    if (!ret)
    	    {   
    	        errmsg = addstr(msg_InvalidIP_para,msg);
        	    return (errmsg);
    	    }
	    }
	    return (errmsg);
    }
    errmsg = addstr(msg_InvalidIP_para,msg);
    return (errmsg);
}


function checkIPAdd(input_field)
{
	var error_msg= "";
	var size = input_field.value.length;
	var str = input_field.value;

	for (var i=0; i < size; i++)
	{
		if (!(vali_str.indexOf(str.charAt(i)) >= 0))
		{
			error_msg = addstr(msg_ipadd);
			break;
		}
	}
  	return error_msg;
}

function checkIp(ip1,ip2,ip3,ip4,msg,null_flag)
{
	if( (null_flag == false) && blankIP(ip1) && blankIP(ip2) && blankIP(ip3) && blankIP(ip4) )
		return "";
	var errmsg =  checkInt(ip1,msg,1,255,true);
    
	errmsg =  (errmsg.length > 1) ? errmsg : checkInt(ip2,msg,0,255,true);
	errmsg =  (errmsg.length > 1) ? errmsg : checkInt(ip3,msg,0,255,true);
	errmsg =  (errmsg.length > 1) ? errmsg : checkInt(ip4,msg,0,255,true);
	errmsg =  (errmsg.length > 1) ? addstr(msg_validIP,msg) : "";
	return errmsg;
}

function checkMac(macfld, removeSeparators) // macfld is form field, removeSeparators true/false
{
	var myRE = /[0-9a-fA-F]{12}/;
	var MAC = macfld.value;	
	
	MAC = MAC.replace(/:/g,"");
	MAC = MAC.replace(/-/g,"");
	if (removeSeparators)
		macfld.value = MAC;	
	if((MAC.length != 12) || (MAC == "000000000000")||(myRE.test(MAC)!=true))
		return true;
	else
	 	return false;
}

function isInteger(str, min_value, max_value)
// return true if positive Integer, false otherwise
{
	if(str.length == 0)
		return false;
	for (var i=0; i < str.length; i++)
	{
		if ((str.charAt(i) < '0') || (str.charAt(i) > '9'))
				return false;
	}
	var int_value = parseInt(str,10);
	if ((int_value < min_value) || (int_value > max_value))
		return false;
	return true;
}


function isHex(str) {
    var i;
    for(i = 0; i<str.length; i++) {
        var c = str.substring(i, i+1);
        if(("0" <= c && c <= "9") || ("a" <= c && c <= "f") || ("A" <= c && c <= "F")) {
            continue;
        }
        return false;
    }
    return true;
}

function is485Hex(str) {
   var i;
   for(i = 0; i<str.length; i++)
   {
	   var c = str.substring(i, i+1);
	   if(("0" <= c && c <= "9") || ("a" <= c && c <= "f") || ("A" <= c && c <= "F") || ("," == c)) // &cedil;
	   { continue; }
       return (msg_hex485key);
   }
   return "";
}


function search_string(s_string, sub_string)
{
	var i=0, j;
	var first_char = sub_string.charAt(0);
	var sub_length = sub_string.length;
	
	while (i < s_string.length)
	{
		if (s_string.charAt(i) == first_char)
		{
			j = 0;
			while ((j < sub_length) && (s_string.charAt(i+j) == sub_string.charAt(j)))
					j++;
			if (j == sub_length) // all chars match
				return(i); // match starts at i
		}
		i++;
	}
	return -1; // not found
}

function getRadioCheckedValue(radio_object)
{
	var size = radio_object.length;
	for (var i = 0; i < size; i++)
	{
		if (radio_object[i].checked == true)
			return(radio_object[i].value)
	}
	return (radio_object[0].value); // first value if nothing checked
}

function getRadioIndex(radio_object, checked_value)  
{
	var size = radio_object.length;
	for (var i = 0; i < size; i++)
	{
		if (radio_object[i].value == checked_value)
			return  i;
	}

	return  0;   // if no match
}


// Start Select List functions ===========================================================


function chkSelected(selObj, err_msg)  // check if item selected
{
    if(!(selObj.selectedIndex >= 0 ))
	{
	    alert(err_msg);
	    return false;
	}
	return true;
}


function getSelIndex(sel_object, sel_text,caseSensitive)  // position for sel_text
// caseSensitive: true = exact match, false = ignore case
{
	if (sel_text.length == 0)
		return 0;  
	var size = sel_object.options.length;
	var match;
	for (var i = 0; i < size; i++)
	{
		if (caseSensitive)
		  match = ( (sel_object.options[i].text == sel_text) || (sel_object.options[i].value == sel_text) )
		else
		  match =  ( (sel_object.options[i].text.toLowerCase() == sel_text.toLowerCase()) || (sel_object.options[i].value.toLowerCase() == sel_text.toLowerCase()) );
		if (match)
			return(i);
	}
	return 0;  // if no match
}

function inSelectList(sel_object,newvalue,caseSensitive)
// check if newvalue (text) already in list
// caseSensitive: true = exact match, false = ignore case
{
	var counter = 0;
	var match;
	var size = sel_object.options.length;
	var index = sel_object.selectedIndex;

	for (var i = 0; i < size; i++)
	{
		if (caseSensitive)
		  match = (sel_object.options[i].text == newvalue) ;
		else
		  match =  (sel_object.options[i].text.toLowerCase() == newvalue.toLowerCase() );
		if (match)
			return true;
	}
	return false;
}

function selAll(selObj, set_to)  // Select list, true/false
{
	for (var i = 0; i < selObj.options.length; i++)
		selObj.options[i].selected = set_to;
}

function addOption(selObj, textStr, valueStr)  // value optional
{
	if (addOption.arguments.length == 3)
		selObj.options[selObj.options.length] = new Option(textStr, valueStr);
	else
		selObj.options[selObj.options.length] = new Option(textStr, ""); // value blank
}

function delOption(sel_obj, position)
{
	for (var i = position; i < sel_obj.options.length - 1; i++)
	{
		sel_obj.options[i].text = sel_obj.options[i + 1].text;
		sel_obj.options[i].value = sel_obj.options[i + 1].value;
	}
	sel_obj.options.length = sel_obj.options.length - 1;
}

function getOptionList(sel_obj, strType)  
// return string. strType  = "text", "value" 
{
	var size = sel_obj.options.length; 
	var i; 
	var str = "";
	for(i = 0; i < sel_obj.options.length;  i++)
		str+= (strType=="value")? sel_obj.options[i].value + separator : sel_obj.options[i].text + separator; 
	return str;
}



// End Select List functions ===========================================================

var plus = "+";
var minus = "-";
var bID;
var cID;
var hID;
function change_text_num(text_input_field, operator, min_value, max_value)
// change up 1, or down 1, within limits  operator "+" or "-"
{
	var size = text_input_field.value.length;
	var str = text_input_field.value;
	
	if (size==0)
	{
		text_input_field.value = min_value;
		text_input_field.focus();
		return;
	}
	if (isNaN(parseInt(text_input_field.value)))
		return;
	var int_value = parseInt(text_input_field.value);
	if (operator == "+")
		text_input_field.value = ++int_value;
	else if (operator == "-")
		text_input_field.value = --int_value;
	if (int_value < min_value )
			text_input_field.value = min_value;
	else if (int_value > max_value )
			text_input_field.value = max_value;
	text_input_field.focus();
//	return;
}


function makeStr(strchar, strSize)
{
	var newStr = "";
	for (var i = 0; i < strSize; i++)
		newStr+= strchar;
	return newStr;
}

function ignoreSpaces(string)
{
       var temp = "";
       var first=1;
       
       string = '' + string;
       splitstring = string.split(" ");
       for(i = 0; i < splitstring.length; i++)
            if(splitstring[i]!=""){
                if(first==1){
                      if(splitstring[i]!=" "){
                          temp=splitstring[i];
                          first=0;
                      }
                }          
               else
                      temp = temp +  " " + splitstring[i];
            }          
       return temp;
}

function addstr(input_msg)
{
	var last_msg = "";
	var str_location;
	var temp_str_1 = "";
	var temp_str_2 = "";
	var str_num = 0;
	temp_str_1 = addstr.arguments[0];
	while(1)
	{
		str_location = temp_str_1.indexOf("%s");
		if(str_location >= 0)
		{
			str_num++;
			temp_str_2 = temp_str_1.substring(0,str_location);
			last_msg += temp_str_2 + addstr.arguments[str_num];
			temp_str_1 = temp_str_1.substring(str_location+2,temp_str_1.length);
			continue;
		}
		if(str_location < 0)
		{
			last_msg += temp_str_1;
			break;
		}
	}
	return last_msg;
}

function submitDemo(form_obj)
{
	show_data(form_obj);
}

function show_data(form_obj)   
// shows form information - used only for debugging
{
	var headvar = "<" + "h" + "e" + "a" + "d" + ">";
	var headend = "<" + "/" + "h" + "e" + "a" + "d" + ">";
	var bodyvar = "<" + "b" + "o" + "d" + "y" + ">";
	var form_size = form_obj.elements.length;
	var debug_win = window.open("","debug","width=540,height=360,menubar=yes,scrollbars=yes,resizable=yes");
	with(debug_win.document)
	{
		open();
		writeln('<html>' + headvar + '<title>Debugging Window</title>' + headend);
		writeln(bodyvar + '<h2>Form being submitted</h2>');
		writeln('<p>Form Name: ' + form_obj.name);
		writeln('<br>Form Action: ' + form_obj.action);
		writeln('<br>Form Target: ' + form_obj.target);
		writeln('</p><h3>Form Data</h3><p>Following table shows ALL fields, even if not submitted.</p>');
		writeln('<p><table border=1><tr bgcolor="#cccccc"><th nowrap>Field Name</th><th>Type</th><th>Value</th></tr>');
		for (var i = 0; i < form_size; i++)
		{
			writeln('<tr><td nowrap>' + form_obj.elements[i].name + '</td>');
			writeln('<td nowrap>' + form_obj.elements[i].type + '</td>');
			writeln('<td nowrap>');
			if ((form_obj.elements[i].type=="select-one") || (form_obj.elements[i].type=="select-multiple"))
				writeln('Selected item: ' + form_obj.elements[i].options[form_obj.elements[i].selectedIndex].text);			
			else 
				writeln(form_obj.elements[i].value);
			if ((form_obj.elements[i].type == "radio") && (form_obj.elements[i].checked))
						write(' (Selected)');
			if ((form_obj.elements[i].type == "checkbox") && (form_obj.elements[i].checked))
					writeln(' (Checked)');
			writeln('</td></tr>');
		}
		writeln('</table></body></html>');
		close();
	}
}

// Auto Logout
function adminlogout_auto()
{
	var n = window.event.screenX - window.screenLeft;
	var b = n > document.documentElement.scrollWidth-20;

	if (b && window.event.clientY < 0 || window.event.altKey)
	{
		document.forms["logout"].submit();
		for (var i=0; i<600000; i++);
	}
}	

/* BUTTON FUNCTIONS */
      function rolloverImg(img) {
        src = img.src;
        if(src.indexOf('_up') != -1){
          img.src = src.replace('_up', '_over');
        }else if(src.indexOf('_over') != -1){
          img.src = src.replace('_over', '_up');
      	}
				}
			
	  function overImg(img) {
        src = img.src;
        if(src.indexOf('_over') != -1)
		{ img.src = src.replace('_over', '_up'); }
		else if(src.indexOf('_down') != -1)
		{ img.src = src.replace('_down', '_up'); }
				}

      function pressImg(img) {
        src = img.src;
        if(src.indexOf('_over') != -1){
          img.src = src.replace('_over', '_down');
        }else if(src.indexOf('_down') != -1){
          img.src = src.replace('_down', '_over');
      	}
				}
			

      function preloadImg(img) {
        src = img.src;
        document.onImg = new Image();
        document.onImg.src = src.replace('_off', '_on');
      }
			
function openPopUp(url, width, height, scrolling, name) { //v2.0
	if (!width) width = 320;
	if (!height) height = 240;
	if (!scrolling) scrolling = "no"; 
	features = "width="+width+","
		+ "height="+height+","
		+ "name="+name+","
		+ "toolbar=no,"
		+ "location=no,"
		+ "status=no,"
		+ "menubar=no,"
		+ "scrollbars="+scrolling+","
		+ "top="+(window.screen.height-height)/2+","
		+ "left="+(window.screen.width-width)/2;
	window.open(url,"win"+Math.round(Math.random()*1000),features);
}


function setHTML(windowObj, el, htmlStr)
{
    if (document.all)
	{
	  if (windowObj.document.all(el) )
        windowObj.document.all(el).innerHTML = htmlStr;
	}
	else if (document.getElementById)
	{
	  if (windowObj.document.getElementById(el) )
	    windowObj.document.getElementById(el).innerHTML = htmlStr;
	}
}

var showit = "block";
var hideit = "none";

function show_hide(el,shownow)  // IE & NS6; shownow = true, false
{
//	alert("el = " + el);
	if (document.all)
		document.all(el).style.display = (shownow) ? showit : hideit ;
	else if (document.getElementById(el))
		document.getElementById(el).style.display = (shownow) ? showit : hideit ;
}



// Browser Issue
function isNS()
{
	if(!isIE()){ // for IE11
		if(navigator.appName.indexOf("Netscape") != -1){
			return true;
		}
	}
	else {
		return false;
	}
}

function isOpera()   //only good for Opera 8.54
{
  if(navigator.userAgent.indexOf("Opera") >= 0)
  {
	  return true;
  }
  else {
	  return false;
  }
}

function isChrome()
{
    if(navigator.userAgent.indexOf("Chrome") >= 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isSafari()
{
    if (navigator.userAgent.indexOf("Safari") >= 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isMac()
{
 if(navigator.appVersion.indexOf("Mac") != -1)
 return true;
 else return false;
}

function isWin()
{
 if(navigator.appVersion.indexOf("Win") != -1)
 return true;
 else return false;
}

function IEVersion()  
{  
   var b_version = navigator.appVersion;  
   var version = b_version.split(";");  
   var trim_Version = version[1].replace(/[ ]/g,"");  
 
   //alert("appVersion="+b_version+", trim_Version="+trim_Version);  
   if (navigator.appName.indexOf("Microsoft Internet Explorer") == -1)  
   {  
       return 0  
   }  
 
   if (trim_Version == "MSIE8.0")  
   {  
       return 8;   // IE8  
   }  
   else if (trim_Version == "MSIE7.0")  
   {  
       return 7;   // IE7  
   }  
   else if (trim_Version == "MSIE6.0")  
   {  
       return 6;   // IE6  
   }  
     
   return 0;  
}  

function isIE()
{
	var userAgent = navigator.userAgent,   
	rMsie = /(msie\s|trident.*rv:)([\w.]+)/; 
	var ua = userAgent.toLowerCase();  
	var match = rMsie.exec(ua);  
	if (match != null) {  
		return true;
	} else {
		return false;
   	}
}

function isOld()
{
  if(!document.getElementById)
  {
     document.getElementById = function(element)
     { return eval("document.all." + element); }
  }
}

function isNetscapeBrowser()
{
	if (navigator.userAgent.indexOf("Navigator") >= 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}
function SupportModalDialog()
{
	if (true == isOpera())
	{
		return false;
	}
	
	if (true == isNetscapeBrowser())
	{
		return false;
	}
	
	return true;
}


// IP Fields
var fieldIndex = 0;
var currentField = null;
var ipfield = false;
var lastf = false;
var fstf = false;

function setfIPfield(formObj,fieldObj)
{
	ipfield = true;
	fstf = true;
	lastf = false;
	currentField = fieldObj;
	fieldObj.select();
	for (var i = 0; i < formObj.elements.length; i++)
		if (formObj.elements[i].name == fieldObj.name)
			fieldIndex = i;
}

function setIPfield(formObj,fieldObj)
{
	ipfield = true;
	fstf = false;
	lastf = false;
	currentField = fieldObj;
	fieldObj.select();
	for (var i = 0; i < formObj.elements.length; i++)
		if (formObj.elements[i].name == fieldObj.name)
			fieldIndex = i;
}

function setlIPfield(formObj,fieldObj)
{
	ipfield = true;
	fstf = false;
	lastf = true;
	currentField = fieldObj;
	fieldObj.select();
	for (var i = 0; i < formObj.elements.length; i++)
		if (formObj.elements[i].name == fieldObj.name)
			fieldIndex = i;
}

function isInteger(str, min_value, max_value)
{
	if(str.length == 0)
		return false;
	for (var i=0; i < str.length; i++)
	{
		if ((str.charAt(i) < '0') || (str.charAt(i) > '9'))
				return false;
	}
	var int_value = parseInt(str,10);
	if ((int_value < min_value) || (int_value > max_value))
		return false;
	return true;
}

function valid_ipv4(addr)
{
    var ip_arry=addr.split(".");
		var size = addr.length;
    if (size == 0)
    {
        return false;
    }
    if ((ip_arry.length == 4)&& (size <= 15) && (size >=7))
    {
        for(var i=0;i<ip_arry.length;i++)
        {
    	    if (!isInteger(ip_arry[i], 0, 255))
    	    {   
        	    return false;
    	    }
	    	}
	    	return true;
    }
    return false;
}

var V6_INADDRSZ = 16;
function valid_ipv6(input_str, prelen_flag)
{
	var digits = "0123456789abcdef";
	var saw_digit = false;
	var val = 0;
	var colonp = -1;
	var i = 0;
	var j = 0;
	var len;
	var letter1;
	var curtok;
	var ch;

	if ((letter1 = input_str.charAt(i)) == ':')
	{
		if ((letter1 = input_str.charAt(i++)) != ':')
		{
			return false;
		}
	}

	curtok = i;

	while (i < input_str.length)
	{
		ch = input_str.charAt(i).toLowerCase();
		i++;
		if ((len = digits.indexOf(ch)) != -1)
		{
			val <<= 4;
			val |= len;
			if (val > 0xffff)
			{
				return false;
			}
			saw_digit = true;
			continue;
		}

		if (ch == '/')
		{
			if(!prelen_flag)
			{
				return false;
			}
			else
			{
				if(input_str.indexOf('/', i))
				{
					return false;
				}
				if(!isInteger(input_str.substring(i), 0, 128))
				{
					return false;
				}
				break;
			}
		}

		if (ch == ':')
		{
			curtok = i;
			if (!saw_digit) 
			{
				if (colonp != -1)
				{ 
					return false;
				}
				colonp = j;
				continue;
			} 
			else if (i == input_str.length) 
			{
				return false;
			}

			if ((j + 2) > V6_INADDRSZ)
			{
				return false;      
			}
			j += 2;
			val = 0;
			saw_digit = false;
			continue;
		}

		if (ch == '.'  && ((j + 4) <= V6_INADDRSZ))
		{
			//TODO: IPv4 mapped IPv6 address is not supported
			if (!valid_ipv4(input_str.substring(curtok)))
			{
				return false;
			}
			j += 4;
			saw_digit = false;
			break;
		}
		return false;
	}

	if (saw_digit) 
	{
		if ((j + 2) > V6_INADDRSZ)
		{
			return false;
		}
		j += 2;
	}

	if (colonp != -1) 
	{
		if (j == V6_INADDRSZ)
		{
			return false;
		}
		j = V6_INADDRSZ;
	}

	if (j != V6_INADDRSZ)
	{
		return false;
	}

	return true;
}

function checkValidipv6(fieldObj, fmsg, prelen_flag)
{
	if(!valid_ipv6(fieldObj.value, prelen_flag))
		return addstr(msg_illegal_addr, fmsg);
	return "";
}

function ip6str_valid_check(ip_addr,msg,rq_flag)
{
    var addr=ip_addr.value;
    var ip_arry=addr.split(".");
    var ret;
    var errmsg="";
    var size=addr.length;

    if (size == 0)
    {
        if (rq_flag)
        {
	        errmsg = addstr(msg_InvalidIP_para,msg);
        }
        return (errmsg);
    }

	return checkValidipv6(ip_addr, msg, false);
}

function dw(message) { document.write(message); }

function randomString(len, string)
{
    var str = "";

    for (var i=0; i<len; i++)
    {
        str += string.charAt(Math.ceil(Math.random()*100000000)%string.length);
    }

    return str;
}

/* Date Format */
var year = '<SELECT size=1 name="yr" id="yr" onChange="setDays(this.form.mth,this.form.day,this)"><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option><option value="2029">2029</option><option value="2030">2030</option><option value="2031">2031</option><option value="2032">2032</option><option value="2033">2033</option><option value="2034">2034</option><option value="2035">2035</option><option value="2036">2036</option><option value="2037">2037</option></select>';

var month = '<select name="mth" id="mth" size="1" onChange="setDays(this,this.form.day,this.form.yr)"><option value="01">1</option><option value="02">2</option><option value="03">3</option><option value="04">4</option><option value="05">5</option><option value="06">6</option><option value="07">7</option><option value="08">8</option><option value="09">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>';

var date = '<SELECT size="1" name="day"id="day"><option value="01">1</option><option value="02">2</OPTION><option value="03">3</OPTION><option value="04">4</OPTION><option value="05">5</OPTION><option value="06">6</OPTION><option value="07">7</OPTION><option value="08">8</OPTION><option value="09">9</OPTION><option value="10">10</OPTION><option value="11">11</OPTION><option value="12">12</OPTION><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select>';



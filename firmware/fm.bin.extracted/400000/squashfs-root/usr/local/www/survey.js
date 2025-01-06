
//SMB/CIFS
smb001="Enable";
smb002="Samba Server:";
smb003="Upload Path:";
smb004="Maximum Size of Each File:";
smb005="MB";
smb006="Enable adding timestamp to files";
smb007="File Name Prefix:";
smb008="Maximum Duration:";
smb009="Define Recording Schedule";
smb010="Minutes";
smb011="Start at:";
smb012="Stop at:";
smb013="(yy:mm:dd:hh:mm.avi)";
smb014="Searching Samba Server";
smb015="Select where you want to save your recordings";
smb016="Start Recording now";
smb017="Input Username/Password";
smb018="Username:";
smb019="Password:";
smb0201="Invalid Username/Password (No Access)";
smb0202="Invalid Username/Password (No Enough Rights)";
smb021="Browse";

//   Servers survey
var TagWorkGroup = "WorkGroup";
var TagWorkGroupListServer = "Server";

//   Folder survey
var TagStatus = "Status";
var TagListFolder = "Folder";
var TagListFolderName = "Name";

// Global variable
var glb_workgroup = -1;;
var glb_samba_server = -1;
var glb_samba_path = -1;
var glb_samba_depth = -1;
//var glb_samba_username = -1;
//var glb_samba_password = -1;
var glb_survey_server = -1;
var glb_survey_depth = -1;
var glb_select_span_id = -1;

var http_request;
var cancel_flag = 0;
var xml_status = "";
var survey_window = window;
var folder_index_array = "";
var folder_name_array = "";
var folder_flag_array = "";
var folder_num_array = "";
var server_num_array = "";

// Rerurn: 8-IE8, 7-IE7, 6-IE6, 0-other browser or version
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

function isNetscape()
{
    if (navigator.appName.indexOf("Netscape") != -1)
    {
        return true;
    }
    return false;
}

/*
** flag - 0, 1, 2, 3
** 0 - survey samba server
** 1 - survey samba path and update page
** 2 - survey samba path but don't need update page
** 3 - reserved
*/
function registerAJX(src_file_in, flag)
{
    if (http_request == null)
    {
        if(window.XMLHttpRequest)
        { http_request = new XMLHttpRequest(); } 
        else if (window.ActiveXObject)
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

    //alert("src_file_in="+src_file_in+", flag="+flag);
    if (0 == flag)  // survey the samba server
    {
        http_request.onreadystatechange = function() { RetrieveServers(); };
        http_request.open('GET', src_file_in, true);
        http_request.send(null);
    }
    else if (2 == flag)    // only need return the survey result
    {
        http_request.open('GET', src_file_in, false);
        http_request.send(null);
        var result = http_request.status;
        if (result == 200)   
        {
            xmlFile = http_request.responseXML;
            xml_status = xmlFile.getElementsByTagName(TagStatus)[0].firstChild.nodeValue;
            http_request = null;
            return true;
        }
        else
        {
            alert(msg_smb_survey_error);
            http_request = null;
            return false;
        }
    }
    else
    {
        if (false == isNetscape())
        {
            http_request.onreadystatechange = function() { RetrieveFolders(); };
            http_request.open('GET', src_file_in, false);
            http_request.send(null);
        }
        else
        {
            //alert("Browser is Netscape!");
            http_request.open('GET', src_file_in, false);
            http_request.send(null);
            var result = http_request.status;
            if (result == 200)   
            {
                FolderList();
            }
            else
            {
                alert(msg_smb_survey_error);
                http_request = null;
            }
        }
    }
}

function RetrieveServers()
{
	//alert("RetrieveServers(): readyState="+http_request.readyState+"status="+http_request.status);
	if (http_request.readyState == 4 || http_request.readyState == 'complete')
	{
		if ((http_request.status == 501) || (http_request.status == 200))
		{ Serverlist(); }
		else
		{ if (0 == cancel_flag) { alert(msg_smb_survey_error); } }
		http_request = null;
	}
}

function RetrieveFolders()
{
	//alert("RetrieveFolders(): readyState="+http_request.readyState+"; status="+http_request.status);
	if (http_request.readyState == 4 || http_request.readyState == 'complete')
	{
		if ((http_request.status == 501) || (http_request.status == 200))
		{ FolderList(); }
		else
		{ alert(msg_smb_survey_error); http_request = null; }
	}
}

function handle_folder_DIV(depth, current_depth)
{
    //alert("handle_folder_DIV("+depth+", "+current_depth+")");

    if (depth > current_depth)
    {
        return ;
    }

    for (var i=0; i<survey_window.folder_num_array[depth]; i++)
    {
        var folder_div = "folder";
        var image_name = "folder";
        var image_name_2 = "folder";
        for (var j=0; j<depth; j++)
        {
            folder_div += "_";
            folder_div += survey_window.folder_index_array[j];

            image_name += "_";
            image_name_2 += "_";
            image_name += survey_window.folder_index_array[j];
            image_name_2 += survey_window.folder_index_array[j];
        }
        folder_div += "_";
        folder_div += i;
        folder_div += "_DIV";

        image_name += "_";
        image_name_2 += "_";
        image_name += i;
        image_name_2 += i;
        image_name += "_IMG";
        image_name_2 += "_IMG_2";

        if (i == survey_window.folder_index_array[depth])
        {
            if (depth < current_depth)
            {
                survey_window.folder_flag_array[depth] = 0;
                survey_window.document.getElementById(image_name).src = "./foldertree_nolines_minus.gif";
                survey_window.document.getElementById(image_name_2).src = "./folder_open.gif";
                survey_window.document.getElementById(folder_div).style.display = "block";
                handle_folder_DIV(depth+1, current_depth);
            }
            continue;
        }

        //alert("Hidden folder_div="+folder_div+", image_name="+image_name);
        survey_window.document.getElementById(image_name).src = "./foldertree_nolines_plus.gif";
        survey_window.document.getElementById(image_name_2).src = "./folder.gif";
        survey_window.document.getElementById(folder_div).style.display = "none";
    }
}

function handle_DIV(survey_depth)
{
    //alert("handle_DIV("+survey_depth+")");
    
    for (var i=0; i<survey_window.folder_num_array[0]; i++)
    {
        for (var j=0; j<survey_window.server_num_array[i]; j++)
        {
            var server_div = "server_"+i+"_"+j+"_DIV";
            //alert("server_div="+server_div);
            
            if (i == survey_window.folder_index_array[0] && j == survey_window.folder_index_array[1])
            {
                survey_window.document.getElementById(server_div).style.display = "block";
                survey_window.folder_num_array[1] = survey_window.server_num_array[i];
                if (survey_depth >= 2)
                {
                    handle_folder_DIV(2, survey_depth);
                }
                continue;
            }

            //alert("Hidden server_div="+server_div);
            survey_window.document.getElementById(server_div).style.display = "none";
        }
    }
}

function alphabetic_seq(a, b) 
{
    var a_lowcase = a.toLowerCase();
    var b_lowcase = b.toLowerCase();
    
    if (a_lowcase == b_lowcase)
    {
        return a.localeCompare(b);
    }
    else
    {
        return a_lowcase.localeCompare(b_lowcase);
    }
}

/*
** Status(all are in lower case):
**      ok          Create the folder successfully.
**      invalid     Invalid input parameters
**      unauth      Need username/password
**      denied      Denied , resoource occupied
**      file-exist  There is the file, reject the operation.
**      readonly    only have the read rights
**      error       Error happened
*/
function FolderList()
{
    var xmlFile = http_request.responseXML;
    xml_status = xmlFile.getElementsByTagName(TagStatus)[0].firstChild.nodeValue;
    //alert("xml_status="+xml_status);
    if (xml_status == "unauth" || xml_status == "readonly")
    {
        handle_DIV(survey_window.glb_survey_depth-1);
        http_request = null;
        return ;
    }
    else if (xml_status != "ok")
    {
        handle_DIV(survey_window.glb_survey_depth-1);
        alert(msg_smb_survey_error);
        http_request = null;
        return ;
    }

    var div_prefix = "";
    var parent_div_name = "";
    var parent_img_name = "";
    var workgroup = survey_window.glb_workgroup;
    var survey_depth = survey_window.glb_survey_depth;

    var tag_var = xmlFile.getElementsByTagName(TagListFolder);
    if (0 == tag_var.length)
    {
        http_request = null;
        return ;
    }
    var folder_list = tag_var[0].getElementsByTagName(TagListFolderName);
    survey_window.folder_num_array[survey_depth] = folder_list.length;
    var folder_array = new Array(folder_list.length);
    for(var i=0; i<folder_list.length; i++)
    {
        folder_array[i] = folder_list[i].firstChild.nodeValue;
    }
    folder_array.sort(alphabetic_seq);
    
    for (var i=0; i<survey_depth; i++)
    {
        div_prefix += "_";
        div_prefix += survey_window.folder_index_array[i];
    }
    //alert("workgroup="+workgroup+", div_prefix="+div_prefix+", survey_depth="+survey_depth);

    var msg = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
    for(var i=0; i<folder_list.length; i++)
    {
        msg += "<tr>";
        msg += "<td nowrap='nowrap' valign='middle' style=\"padding-left:";
        msg += 20;
        msg += "px\">";

        // set folder plau/minus ICON
        //msg += "<img id='folder_0_0_0_IMG' "
        msg += "<img ";
        msg += "ID='folder";
        msg += div_prefix;
        msg += "_";
        msg += i;
        msg += "_IMG' ";
        msg += "src='./foldertree_nolines_plus.gif' style='cursor:pointer'";
        msg += " onClick = survey_folder(";
        msg += workgroup;
        msg += ",";
        msg += survey_depth;
        msg += ",";
        msg += i;
        msg += ",\'";
        msg += escape(folder_array[i]);
        msg += "\')";
        msg += ">";

        // set folder ICON
        //msg += "<img src='./folder.gif'/>"
        msg += "<img ";
        msg += "ID='folder";
        msg += div_prefix;
        msg += "_";
        msg += i;
        msg += "_IMG_2' ";
        msg += "src='./folder.gif' style='cursor:pointer'";
        msg += " onClick = survey_folder(";
        msg += workgroup;
        msg += ",";
        msg += survey_depth;
        msg += ",";
        msg += i;
        msg += ",\'";
        msg += escape(folder_array[i]);
        msg += "\')";
        msg += ">";

        // set folder name
        msg += "<span style=\"height=18px\" ID=\"folder";
        msg += div_prefix;
        msg += "_";
        msg += i;
        msg += "_SPAN\" ";        
        msg += "onMouseDown='clear_span("
        msg += survey_depth;
        msg += ",";
        msg += i;
        msg += ");";
        msg += "select_folder(";
        msg += workgroup;
        msg += ",";		
        msg += survey_depth;
        msg += ",";
        msg += i;
        msg += ",\"";
        msg += escape(folder_array[i]);
        msg += "\"";
        msg += "); this.style.backgroundColor=\"#00F\"; this.style.color=\"fff\"'>";
        msg += folder_array[i].replace(/ /g, "&nbsp;"); // replace blank by "&nbsp;"
        msg +="</span>";

        // add folder_i_j_... div
        msg += "<div ID=\"folder";
        msg += div_prefix;
        msg += "_";
        msg += i;
        msg += "_DIV\">";
        msg += "</div>";

        msg += "</td>";
        msg += "</tr>";
    }
    msg += "</table>";

    if (2 == survey_depth)
    {
        survey_window.glb_samba_server = survey_window.glb_survey_server;
        parent_div_name = "server" + div_prefix + "_DIV";
    }
    else
    {
        parent_div_name = "folder" + div_prefix + "_DIV";
        parent_img_name = "folder" + div_prefix + "_IMG";
        //alert("parent_img_name="+parent_img_name);
        survey_window.document.getElementById(parent_img_name).src = "./foldertree_nolines_minus.gif";
    }

    //alert("parent_div_name="+parent_div_name);
    survey_window.document.getElementById(parent_div_name).innerHTML = msg;
    handle_DIV(survey_depth);
    http_request = null;
}

function Serverlist()
{
    var xmlFile = http_request.responseXML;	
    var tag_workgroup = xmlFile.getElementsByTagName(TagWorkGroup);
    survey_window.folder_num_array[0] = tag_workgroup.length;
    var workgroup_array = new Array(tag_workgroup.length);
    for(var i=0; i<tag_workgroup.length; i++)
    {
        workgroup_array[i] = tag_workgroup[i].getElementsByTagName(TagListFolderName)[0].firstChild.nodeValue;
    }
    workgroup_array.sort(alphabetic_seq);

    var msg = "<table border=\"0\" cellspacing=\"6\" cellpadding=\"0\">";
    msg += "<tr><td style=\"color:#FF0000\"><b>";
    msg += msg_smb_set_manual;
    msg += "</b></td></tr>";
    
    for (var i=0; i<tag_workgroup.length; i++)
    {
        var workgroup_name = "";
        
        // findout the correct workgroup first
        for (var idx=0; idx<tag_workgroup.length; idx++)
        {
            workgroup_name = tag_workgroup[idx].getElementsByTagName(TagListFolderName)[0].firstChild.nodeValue;
            if (workgroup_name == workgroup_array[i])
            {
                break;
            }
        }
        
        var tag_server = tag_workgroup[idx].getElementsByTagName(TagWorkGroupListServer);
        survey_window.server_num_array[i] = tag_server.length;

        // if the workgroup is NULL, we won't show the work group
        if (0 == tag_server.length)
        {
            continue;
        }
        
        var server_array = new Array(tag_server.length);
        for(var idx=0; idx<tag_server.length; idx++)
        {
            server_array[idx] = tag_server[idx].getElementsByTagName(TagListFolderName)[0].firstChild.nodeValue
        }
        server_array.sort(alphabetic_seq);

        // set group name
        msg += "<tr>";
        msg += "<td nowrap='nowrap' style=\"padding-left:";
        msg += 120;
        msg += "px\">";
        msg += workgroup_name;
        msg += "</td>";
        msg += "</tr>";

        for (var j=0; j<tag_server.length; j++)
        {
            // set server name
            msg += "<tr>";
            msg += "<td nowrap='nowrap' style=\"padding-left:";
            msg += 100;
            msg += "px\">";
            msg += "<ul><img src='base.gif'/><nobr><font color='#0000FF'><u><span style='cursor:pointer' onClick=\"javascript: survey_folder(";
            msg += i;
            msg += ",1,";
            msg += j;
            msg += ",\'";
            msg += escape(server_array[j]);
            msg += "\')\">";
            msg += server_array[j];
            msg += "</span></u>";

            // define server_i_j div
            msg += "<div ID=\"server_";
            msg += i;
            msg += "_";
            msg += j;
            msg += "_DIV\">";
            msg += "</div>";

            msg += "</td>";
            msg += "</tr>";
        }
    }
    msg += "</table>";

    var buttons_msg = "";
    buttons_msg += "<input type=\"button\" class=\"btstd80\" ID=\"apply\" name=\"apply\" value=\"Apply\" onClick=\"apply()\">";
    buttons_msg += "&nbsp; &nbsp;";
    buttons_msg += "<input type=\"button\" class=\"btstd80\" ID=\"refresh\" name=\"refresh\" value=\"Refresh\" onClick=\"smb_refresh()\">";
    buttons_msg += "&nbsp; &nbsp;";
    buttons_msg += "<input type=\"button\" class=\"btstd80\" ID=\"cancel\" name=\"cancel\" value=\"Cancel\" onClick=\"smb_cancel()\">";

    survey_window.document.getElementById("SmbBody_DIV").align = "left";
    survey_window.document.getElementById("SmbBody_DIV").innerHTML = msg;
    survey_window.document.getElementById("Buttons_DIV").innerHTML = buttons_msg;
    survey_window.document.getElementById("apply").disabled = true;
    if (isNetscape())
    {
        survey_window.document.getElementById("apply").style.color = "#808080";
    }
}

function smb_abort()
{
    if (http_request != null)
    {
        cancel_flag = 1;
        http_request.abort();
    }
    top.close();
}


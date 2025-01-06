var id_count=0;
var id_flag=0;
var item_index=0;
var time=0;
var xmlhttp;
var query_str="";
var THROUGHPUT_NUMBER=100;
var maxchars = 89; 
var charnum=88; 
var charcount = 0;  
var del_count=0; 
var pchar = "|";  
var delay_time=0;
var clock;
var lab_num=0;
var label_num=0;
var startData=[];
var channData=[];
var strData=[];
var rssiData=[];
var noiseData=[];
var rateData=[];
var x_range=0;
var session_delay=0;
var max_speed=0;
var tdata = new Array();
var wdata1 = [];
var wdata2 = [];
var wdata3 = [];
var wdata4 = [];
var wdata5 = [];

function copy_item()
{
	var i=0;
	var select_item=new Array();
	var select_id= new Array();
	var id_num;
	if(item_index==0)
		{
			alert("No item now!");
			return;
		}
	for(i=0;i<item_index;i++)
	{
		if(document.getElementById("throughput_item_chkbox_"+i))
		{
			if(document.getElementById("throughput_item_chkbox_"+i).checked)
			{
				select_item.push(i);
				select_id.push(document.getElementById("id_"+i).innerHTML);
			}
		}
	}
	for(i=item_index;i>=0;i--)
	{
		if(document.getElementById("throughput_item_chkbox_"+i))
		{
			id_num=parseInt(document.getElementById("id_"+i).innerHTML);
			break;
		}
	}
	if(id_num==0)
	{
		alert("No item now!");
		return;
	}
	if (!confirm(copy_confirm_msg))
	{
		return;
	}
	var len=select_item.length;
	for(i=0;i<len;i++)
	{
		copy_html='<TR >' + 
		'<TD ><input type="checkbox" name="checkboxName" id=throughput_item_chkbox_' + item_index + ' value='+item_index+' checked="checked" onclick="check_checked();" ' +  ' /></TD>' +
		'<TD style="background-color:#CDC5BF" align="center" id="id_' + item_index + '" name="idName">' +(id_num+i+1) + '</TD>' +
		'<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" align="center" id = server_ip_' + item_index + '>' +document.getElementById("server_ip_"+select_item[i]).innerHTML + '</TD>' +
		'<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" align="center" id = server_username_' + item_index + '>' +document.getElementById("server_username_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" align="center" id = server_password_' + item_index + '>' +document.getElementById("server_password_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" align="center" id = client_ip_' + item_index + '>' +document.getElementById("client_ip_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" align="center" id = client_username_' + item_index + '>' +document.getElementById("client_username_"+select_item[i]).innerHTML +'</TD>'+
		'<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" align="center" id = client_password_' + item_index + '>' +document.getElementById("client_password_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF" align="center" id = direction_' + item_index + '>' + document.getElementById("direction_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF" align="center" id = duration_' + item_index + '>' +document.getElementById("duration_"+select_item[i]).innerHTML + '</TD>' +
		'<TD style="background-color:#CDC5BF" align="center" id = session_' + item_index + '>' +document.getElementById("session_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF" align="center" id = protocol_' + item_index + '>' +document.getElementById("protocol_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF" align="center" id = nodelay_' + item_index + '>' + document.getElementById("nodelay_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" align="center" id = data_rate_' + item_index + '>' +document.getElementById("data_rate_"+select_item[i]).innerHTML + '</TD>'+
		'<TD style="background-color:#CDC5BF" align="center" id = payload_length_' + item_index + '>' +document.getElementById("payload_length_"+select_item[i]).innerHTML + '</TD>' +
		'<TD style="background-color:#CDC5BF" align="center" id = record_interval_' + item_index + '>' +document.getElementById("record_interval_"+select_item[i]).innerHTML + '</TD></TR>';
		mytable_add_item($("#ThroughputTable"), item_index, copy_html);
		item_index++;
	}
	add_record();
}
function del_item()
{
	var i=0;
	var select_count=0;
	var item_id=0;
	//var id_num;
	for(i=0;i<item_index;i++)
	{
		if(document.getElementById("throughput_item_chkbox_"+i))
		{
			if(document.getElementById("throughput_item_chkbox_"+i).checked)
			{
				//id_num=parseInt(document.getElementById("id_"+i).innerHTML);
				select_count++;
				item_id=i;
			}
		}
	}
	
	if(select_count>1||select_count==0)
	{
		alert("Please select one item.");
		return;
	}

	if (!confirm(delete_throughput_msg))
	{
		return;
	}
	
	mytable_delete_item($("#ThroughputTable"), item_id);
	for(i=item_id;i<item_index;i++)
	{
		
		if(document.getElementById("id_"+i))
		document.getElementById("id_"+i).innerHTML=parseInt(document.getElementById("id_"+i).innerHTML)-1;
	}
	add_record();
}


function throughput_click_check_all(){
	var checkArray = document.getElementsByName("checkboxName");
	if(checkArray.length <= 0)                       
	{                                                   
		checkArray = new Array();                      
		var e=document.getElementsByTagName("td");        
		for(var i=0;i<e.length;i++)                       
		{                                                 
			if(e[i].getAttribute("name") =="checkboxName")  
			{                                               
				checkArray[checkArray.length]=e[i];     
			}                                               
		}                                                 
	}              
	for(var id = 0; id < checkArray.length; id++){
		checkArray[id].checked = document.getElementById("throughput_check_box_all").checked;
	}
	add_record();
}
function result_click_check_all(){
	var checkArray = document.getElementsByName("result_check_box");
	if(checkArray.length <= 0)                       
	{                                                   
		checkArray = new Array();                      
		var e=document.getElementsByTagName("th");        
		for(var i=0;i<e.length;i++)                       
		{                                                 
			if(e[i].getAttribute("name") =="result_check_box")  
			{                                               
				checkArray[checkArray.length]=e[i];     
			}                                               
		}                                                 
	}                                                   
	
	for(var id = 0; id < checkArray.length; id++)
	{
		checkArray[id].checked = document.getElementById("result_check_box_all").checked;
	}
	show_flot();
}


function check_checked()
{
	var i=0;
	var check_flag=0;
	for(i=0;i<item_index;i++)
	{
		if(document.getElementById("throughput_item_chkbox_"+i))
		{
			if(document.getElementById("throughput_item_chkbox_"+i).checked==false)
			{
				check_flag=1;
				break;
			}
		}
		
	}
	if(check_flag==1)
	{
		document.getElementById("throughput_check_box_all").checked=false;
	}
	else
		document.getElementById("throughput_check_box_all").checked=true;
		
	add_record();
}
	
function init()
{
	var url="/adm/record.cgi";
	//var param="query";
	xmlhttp=null;
	try
		{
			xmlhttp=new XMLHttpRequest();
		}
	catch(e)
		{
			try
			{
				xmlhttp=new ActiveXObject("Msxm12.XMLHTTP");
			}
			catch(e)
			{
				try
				{
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e)
				{
					alert("browser not support ajax");
					return false;
				}
			}
		}
		xmlhttp.onreadystatechange=query_read;
		xmlhttp.open("GET",url,true);
		//xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(null);
		
}
function query_read()
{
	var tmp;
	var i=0;
	var j=0;
	var record="";
	var recordxml;
	if(xmlhttp.readyState==4)
		{
			
			if(xmlhttp.status==200||xmlhttp.status==0)
			{
				tmp=xmlhttp.responseXML;
				if(!tmp)
					return;
				if(tmp.getElementsByTagName("record"))
				{
				recordxml=tmp.getElementsByTagName("record");
				for(i=0;i<recordxml.length;i++)
				{
					
						index=item_index;
						
					var output_html="";
					output_html= '<TR >' ;
					if(recordxml[i].getElementsByTagName("check")[0].firstChild.data=="checked")
					output_html+='<TD ><input type="checkbox" name="checkboxName" id=throughput_item_chkbox_' + index + ' value='+index+' checked="checked" onclick="check_checked();" ' +  ' /></TD>' ;
					else
						output_html+='<TD ><input type="checkbox" name="checkboxName" id=throughput_item_chkbox_' + index + ' value='+index+'  onclick="check_checked();" ' +  ' /></TD>' ;
						output_html+='<TD style="background-color:#CDC5BF" align="center" id="id_' + index + '" name="idName">' +recordxml[i].getElementsByTagName("id")[0].firstChild.data+ '</TD>' +
					'<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" align="center" id = server_ip_' + index + '>' +recordxml[i].getElementsByTagName("server_ip")[0].firstChild.data+ '</TD>' ;
					if(recordxml[i].getElementsByTagName("server_user")[0].firstChild)
					output_html +='<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" align="center" title="" onmouseover="changeTitle(this);" id = server_username_' + index + '>' +recordxml[i].getElementsByTagName("server_user")[0].firstChild.data + '</TD>';
					else output_html +='<TD style="background-color:#CDC5BF" align="center" id = server_username_' + index + '>'+ '</TD>';
					if(recordxml[i].getElementsByTagName("server_password")[0].firstChild)
					output_html +='<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" align="center" onmouseover="changeTitle(this);" id = server_password_' + index + '>' +recordxml[i].getElementsByTagName("server_password")[0].firstChild.data+ '</TD>';
					else output_html+='<TD style="background-color:#CDC5BF" align="center" id = server_password_' + index + '>' + '</TD>';
					
					output_html+='<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" align="center" onmouseover="changeTitle(this);" id = client_ip_' + index + '>' +recordxml[i].getElementsByTagName("client_ip")[0].firstChild.data+ '</TD>';
					if(recordxml[i].getElementsByTagName("client_user")[0].firstChild)
					output_html+='<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" align="center" onmouseover="changeTitle(this);" id = client_username_' + index + '>' +recordxml[i].getElementsByTagName("client_user")[0].firstChild.data+ '</TD>';
					else output_html+='<TD style="background-color:#CDC5BF" align="center" id = client_username_' + index + '>' + '</TD>';
					if(recordxml[i].getElementsByTagName("client_password")[0].firstChild)
					output_html+='<TD style="background-color:#CDC5BF;overflow:hidden;text-overflow:ellipsis;" align="center" onmouseover="changeTitle(this);" id = client_password_' + index + '>' +recordxml[i].getElementsByTagName("client_password")[0].firstChild.data+ '</TD>';
					else output_html+='<TD style="background-color:#CDC5BF" align="center" id = client_password_' + index + '>' + '</TD>';
		if(recordxml[i].getElementsByTagName("direction")[0].firstChild.data=="TX")
			output_html +='<TD style="background-color:#CDC5BF" align="center" title="client sends data to server" id = direction_' + index + '>' + 'TX' + '</TD>';
		else if(recordxml[i].getElementsByTagName("direction")[0].firstChild.data=="RX")
			output_html +='<TD style="background-color:#CDC5BF" align="center" title="server sends data to client" id = direction_' + index + '>' + 'RX' + '</TD>';
		else if(recordxml[i].getElementsByTagName("direction")[0].firstChild.data=="Bidirection")
			output_html +='<TD style="background-color:#CDC5BF" align="center" title="client and server sends to each other" id = direction_' + index + '>' + 'Bidirection' + '</TD>';
		else
			output_html +='<TD style="background-color:#CDC5BF" align="center" title="client and server sends data by turn" id = direction_' + index + '>' + 'Trade_off' + '</TD>';
			
		output_html +=	'<TD style="background-color:#CDC5BF" align="center" id = duration_' + index + '>' +recordxml[i].getElementsByTagName("duration")[0].firstChild.data + '</TD>' +
					'<TD style="background-color:#CDC5BF" align="center" id = session_' + index + '>' +recordxml[i].getElementsByTagName("session")[0].firstChild.data+ '</TD>';
					
		
			output_html +='<TD style="background-color:#CDC5BF" align="center" id = protocol_' + index + '>' + recordxml[i].getElementsByTagName("protocol")[0].firstChild.data + '</TD>';
			
				output_html +='<TD style="background-color:#CDC5BF" align="center" id = nodelay_' + index + '>' + recordxml[i].getElementsByTagName("nodelay")[0].firstChild.data + '</TD>';
		
			if(recordxml[i].getElementsByTagName("data_rate")[0].firstChild.data=="NoLimit")
			output_html +='<TD style="background-color:#CDC5BF" align="center" id = data_rate_' + index + '>' +"No Limit" + '</TD>';
			else
		output_html +=	'<TD style="background-color:#CDC5BF" align="center" id = data_rate_' + index + '>' +recordxml[i].getElementsByTagName("data_rate")[0].firstChild.data + '</TD>';
			output_html +='<TD style="background-color:#CDC5BF" align="center" id = payload_length_' + index + '>' +recordxml[i].getElementsByTagName("payload")[0].firstChild.data + '</TD>' +
					'<TD style="background-color:#CDC5BF" align="center" id = record_interval_' + index + '>' +recordxml[i].getElementsByTagName("record_interval")[0].firstChild.data + '</TD></TR>';
						mytable_add_item($("#ThroughputTable"), item_index, output_html);
						item_index++;
					
				}
				
					check_checked();
				
			}
		}
		}
}
function add_item()
{
//	var item= new Object();
//	item.value=item_index;
	//var item=document.getElementById("ThroughputTable");
	var id_num;
	var i=0;
	if(item_index==0)
	id_num=1;
	else
		for(i=item_index;i>=0;i--)
		{
			if(document.getElementById("id_"+i))
			{
				id_num=parseInt(document.getElementById("id_"+i).innerHTML)+1;
				break;
			}
		}
	if(i<0)
	id_num=1;
//	var item= new Array();
//	item.push(item_index);
//	item.push(id_num);
	var item=item_index+","+id_num;
	var output = window.showModalDialog("config.htm",item,"dialogWidth=450px;dialogHeight=550px;");

	if(output != null)
	{
		mytable_add_item($("#ThroughputTable"), item_index, output);
		item_index++;	
		add_record();
	}
	
}
function changeTitle(obj){
	//alert("obj.offsetWidth:"+obj.offsetWidth);
	//alert("obj.parentNode.offsetWidth:"+obj.parentNode.offsetWidth);
	//alert("obj.innerText:"+obj.innerText);
	//alert("obj.innerHTML:"+obj.innerHTML);
         if(obj.offsetWidth>1)
            obj.title=obj.innerHTML;
         else
            obj.title="";
        }
function add_record()
{
	var i=0;
	var output="";
	var url="/adm/record.cgi";
	for(i=0;i<item_index;i++)
	{
		if(document.getElementById("throughput_item_chkbox_"+i))
		{
			output += document.getElementById("id_"+i).innerHTML+"&";
			if(document.getElementById("throughput_item_chkbox_"+i).checked)
			{
				output +="checked&";
			}
			else output +="nochecked&";
			output +=document.getElementById("server_ip_"+i).innerHTML+"&";
			output +=document.getElementById("server_username_"+i).innerHTML+"&";
			output +=document.getElementById("server_password_"+i).innerHTML+"&";
			output +=document.getElementById("client_ip_"+i).innerHTML+"&";
			output +=document.getElementById("client_username_"+i).innerHTML+"&";
			output +=document.getElementById("client_password_"+i).innerHTML+"&";
			output +=document.getElementById("direction_"+i).innerHTML+"&";
			output +=document.getElementById("duration_"+i).innerHTML+"&";
			output +=document.getElementById("session_"+i).innerHTML+"&";
			output +=document.getElementById("protocol_"+i).innerHTML+"&";
			output +=document.getElementById("nodelay_"+i).innerHTML+"&";
			if(document.getElementById("data_rate_"+i).innerHTML=="No Limit")
				output +="NoLimit&";
			else
			output +=document.getElementById("data_rate_"+i).innerHTML+"&";
			output +=document.getElementById("payload_length_"+i).innerHTML+"&";
			output +=document.getElementById("record_interval_"+i).innerHTML+"&";
		}
	}
	xmlhttp=null;
	try
		{
			xmlhttp=new XMLHttpRequest();
		}
	catch(e)
		{
			try
			{
				xmlhttp=new ActiveXObject("Msxm12.XMLHTTP");
			}
			catch(e)
			{
				try
				{
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e)
				{
					alert("browser not support ajax");
					return false;
				}
			}
		}
		//alert("output="+output);
		if(output=="")
		{
			output="delete";
		}
		xmlhttp.open("POST",url,true);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(output);
}
function edit_item()
{
	var edit_item="";
	var output;
	var first_flag=0;
	var first=0;
	var edit_count=0;
	var i=0;
	for(i=0;i<item_index;i++)
	{
		if(document.getElementById("throughput_item_chkbox_"+i))
		{
			if(document.getElementById("throughput_item_chkbox_"+i).checked)
			{
				if(first_flag==0)
				{
					first=i;
					first_flag=1;
				}
				edit_count++;
			}
		}
	}
	if(edit_count==0)
	{
		alert("You select no item");
		return;
	}
	if(edit_count>1)
	{
		if(!confirm(edit_comfirm_msg))
			return;
	}
	edit_item=first+","+document.getElementById("id_"+first).innerHTML+","+document.getElementById("server_ip_"+first).innerHTML+","+
							document.getElementById("server_username_"+first).innerHTML+","+document.getElementById("server_password_"+first).innerHTML+","+
							document.getElementById("client_ip_"+first).innerHTML+","+document.getElementById("client_username_"+first).innerHTML+","+
							document.getElementById("client_password_"+first).innerHTML+","+document.getElementById("direction_"+first).innerHTML+","+
							document.getElementById("duration_"+first).innerHTML+","+document.getElementById("session_"+first).innerHTML+","+
							document.getElementById("protocol_"+first).innerHTML+","+document.getElementById("nodelay_"+first).innerHTML+","+
							document.getElementById("data_rate_"+first).innerHTML+","+document.getElementById("payload_length_"+first).innerHTML+","+
							document.getElementById("record_interval_"+first).innerHTML;
	
	output = window.showModalDialog("config.htm",edit_item,"dialogWidth=450px;dialogHeight=520px;");
	if(output != null)
	{
		mytable_edit_item($("#ThroughputTable"), first, output);
		add_record();
	}
	
}



function check_all_check()
{
	var i=0;
	var check_box;
	check_box=document.getElementsByName("checkboxName");
	if(check_box.length <= 0)                       
	{                                                   
		check_box = new Array();                      
		var e=document.getElementsByTagName("td");        
		for(var i=0;i<e.length;i++)                       
		{                                                 
			if(e[i].getAttribute("name") =="checkboxName")  
			{                                               
				check_box[check_box.length]=e[i];     
			}                                               
		}                                                 
	} 
	for(i=0;i<check_box.length;i++)
	{
		if(!check_box[i].checked)
		{
			document.getElementById("throughput_check_box_all").checked=false;
			break;
		}
	}  
	if(check_box.length==i)
	{
		document.getElementById("throughput_check_box_all").checked=true;
	}
	
}

function start_test()
{
	var tmp=null;
	var i;
	startData=[];
	strData=[];
	rssiData=[];
	noiseData=[];
	var client;
	var server;
	var tid;
	var proto;
	var session;
	var interval;
	var duration;
	var direction;
	var data_rate;
	var payload_len;
	var no_delay;
	var client_name;
	var server_name;
	var client_password;
	var server_password;
	clock_count=0;
	var i=0;
	tid="id_"+i;
	tmp ="id=";
	tmp1="/adm/throughput_console.cgi";
	var delay1=0;
	delay_time=0;

	var count=0; 
	
	 
	for(i=0;i<item_index;i++)
	{
		if(document.getElementById("throughput_item_chkbox_"+i))
		{
		
		if(document.getElementById("throughput_item_chkbox_"+i).checked)
		{
				var num=i;
			tid="id_"+num;
			
			if(document.getElementById(tid))
				{
			server="server_ip_"+num;
			client="client_ip_"+num;
			direction="direction_"+num;
			duration="duration_"+num;
			proto="protocol_"+num;
			interval="record_interval_"+num;
			data_rate="data_rate_"+num;
			no_delay="nodelay_"+num;
			payload_len="payload_length_"+num;
			session="session_"+num;
			client_name="client_username_"+num;
			server_name="server_username_"+num;
			client_password="client_password_"+num;
			server_password="server_password_"+num;
			if(count>0)
			tmp +="&id=";
			tmp +=document.getElementById(tid).innerHTML
			+"&server="+document.getElementById(server).innerHTML
			+"&client="+document.getElementById(client).innerHTML
			+"&direction="+document.getElementById(direction).innerHTML
			+"&protocol="+document.getElementById(proto).innerHTML;
			if(document.getElementById(duration).innerHTML!="")
				tmp +="&duration="+document.getElementById(duration).innerHTML;	
			if(document.getElementById(data_rate).innerHTML!="" &&document.getElementById(data_rate).innerHTML!="No Limit")
				tmp +="&data_rate="+document.getElementById(data_rate).innerHTML;
			if(document.getElementById(interval).innerHTML!="")
				tmp +="&record_interval="+document.getElementById(interval).innerHTML;
			if(document.getElementById(payload_len).innerHTML!="")
				tmp +="&payload_len="+document.getElementById(payload_len).innerHTML;
			if(document.getElementById(session).innerHTML!="")
			{
				tmp +="&session_num="+document.getElementById(session).innerHTML;
				session_delay=5;
			}
			if(document.getElementById(no_delay).innerHTML!="")
			{
				if(document.getElementById(no_delay).innerHTML=="No")
				tmp +="&no_delay="+"no";
				else tmp +="&no_delay="+"yes";
			}
			if(document.getElementById(server_name).innerHTML!="")
			tmp +="&server_name="+document.getElementById(server_name).innerHTML;
			if(document.getElementById(server_password).innerHTML!="")
			tmp +="&server_password="+document.getElementById(server_password).innerHTML;
				if(document.getElementById(client_name).innerHTML!="")
			tmp +="&client_name="+document.getElementById(client_name).innerHTML;	
			if(document.getElementById(client_password).innerHTML!="")
			tmp +="&client_password="+document.getElementById(client_password).innerHTML;
			if((delay_time*charnum/1000)<document.getElementById(duration).innerHTML)
			{
			delay_time=document.getElementById(duration).innerHTML*1000/charnum;
			}
			count++;
		}
		}
		
	}
	}
	
	//alert("dealy"+delay_time);
	x_range=delay_time*charnum/1000+1;
//	delay_time=delay_time+25000/charnum+session_delay*1000/charnum;
	
	if(tmp.length>20)
	{
		document.getElementById("testing").innerHTML="Test is preparing, please wait...";
		document.getElementById("runbotton").disabled = true;
		document.getElementById("ThroughputTable").disabled=true;
		document.getElementById("buttons").disabled=true;
		PostXml(tmp1,tmp);
	}
	else alert("No session is testing!")

}
function query()
{
	var url="/adm/console_query.cgi";
	var xmlhttp=null;
	try
		{
			xmlhttp=new XMLHttpRequest();
		}
	catch(e)
		{
			try
			{
				xmlhttp=new ActiveXObject("Msxm12.XMLHTTP");
			}
			catch(e)
			{
				try
				{
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e)
				{
					alert("browser not support ajax");
					return false;
				}
			}
		}
		xmlhttp.onreadystatechange=function()
		{
				if(xmlhttp.readyState==4)
			{
				
				if(xmlhttp.status==200||xmlhttp.status==0)
				{
						query_str="";
						var i=0;
						var count=0;
						var duration=0;
						var response=xmlhttp.responseXML;
							var status=response.getElementsByTagName("status");
							for(i=0;i<status.length;i++)
							{
								
								if(status[i].firstChild.data=="testing")
								{
									
									document.getElementById("testing").innerHTML="Test is running, please wait...";
								
									clearInterval(clock);
									
									return;
								}
							}
							var tag_id=response.getElementsByTagName("id");
							for(i=0;i<item_index;i++)
						{
							if(document.getElementById("throughput_item_chkbox_"+i))
							{
								if(document.getElementById("throughput_item_chkbox_"+i).checked)
								{
									if(parseInt(document.getElementById("duration_"+i).innerHTML)>duration)
										duration=parseInt(document.getElementById("duration_"+i).innerHTML);
									var check_id=document.getElementById("id_"+i).innerHTML;
									for(j=0;j<tag_id.length;j++)
									{
										if(check_id==tag_id[j].firstChild.data)
										{
											if(status[j].firstChild.data!="testing")
											count++;
										}
									}
								}
							}
						}
						if(count==tag_id.length)
						{
							document.getElementById("testing").innerHTML="Test is running, please wait...";
								clearInterval(clock);
						}
						time++;
						if(time==duration)
						{
							document.getElementById("testing").innerHTML="Test is running, please wait...";
							clearInterval(clock);
						}
									return;

						
				}
			}
		};
		xmlhttp.open("GET",url,true);
		xmlhttp.send(null);
}
function start_test1()
{
		document.getElementById("testing").style.display = "block";	
		document.getElementById("image").style.display="block";	
		document.getElementById("progress").style.display = "none";																																	
		document.getElementById("test_info").style.display = "none";																																	
		document.getElementById("test_info_table").style.display = "none";																																	
		document.getElementById("result").style.display = "none";																																	
		document.getElementById("placeholder").style.display = "none";																																	
		document.getElementById("Legend").style.display = "none";	
		document.getElementById("record_info").style.display = "none";
		document.getElementById("record").style.display="none";
		document.getElementById("record").innerHTML="";
		document.getElementById("show").value="Show Detail";
		document.getElementById("clickdata").style.display="none";
		time=0;
		if(clock_count==0)
		{
			clock=setInterval("query()",1000);
			
			clock_count++;
			//alert("clock="+clock);
		}
	if(xmlhttp.readyState==4)
		{
			
			if(xmlhttp.status==200||xmlhttp.status==0)
			{
				document.getElementById("testing").style.display = "none";
			document.getElementById("image").style.display="none";	
			document.getElementById("progress").style.display = "none";
			document.getElementById("test_info").style.display = "block";
			document.getElementById("test_info_table").style.display = "block";
			document.getElementById("result").style.display = "block";
			document.getElementById("placeholder").style.display = "block";
			document.getElementById("Legend").style.display = "block";
			read_id();
			document.getElementById("runbotton").disabled = false;																																
			document.getElementById("ThroughputTable").disabled=false;																																
			document.getElementById("buttons").disabled=false;																				
			}
	}

}
function read_id()
{
	var url;
	var tmp;
	var i=0;
	var tid="id_"+i;
	

	url="/adm/console_query.cgi";
	ReadXml(url);
}

function PostXml(url,param)
{
	xmlhttp=null;
	try
		{
			xmlhttp=new XMLHttpRequest();
		}
	catch(e)
		{
			try
			{
				xmlhttp=new ActiveXObject("Msxm12.XMLHTTP");
			}
			catch(e)
			{
				try
				{
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e)
				{
					alert("browser not support ajax");
					return false;
				}
			}
		}
	
		xmlhttp.onreadystatechange=start_test1;
		xmlhttp.open("POST",url,true);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send(param);
}
function getNodeValue(node)
{
    if (node && node.hasChildNodes()) {
        //return node.firstChild.nodeValue;
        var s = ""
        //Mozilla has many textnodes with a size of 4096
        //chars each instead of one large one.
        //They all need to be concatenated.
        for (var j = 0; j < node.childNodes.length; j++) {
            s += new String(node.childNodes.item(j).nodeValue);
        }
        return s;
    } else {
        return "";
    }
}
function ReadXml(url)
{
	
		xmlhttp=null;
	try
		{
			xmlhttp=new XMLHttpRequest();
		}
	catch(e)
		{
			try
			{
				xmlhttp=new ActiveXObject("Msxm12.XMLHTTP");
			}
			catch(e)
			{
				try
				{
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e)
				{
					alert("browser not support ajax");
					return false;
				}
			}
		}
		xmlhttp.onreadystatechange=get_xml_info;
		xmlhttp.open("GET",url,true);


		xmlhttp.send(null);
	
}
function get_xml_info()
{
	var result;
	var xindex=0;
	if(xmlhttp.readyState==4)
		{
			
			if(xmlhttp.status==200||xmlhttp.status==0)
			{
				
				var i=0;
				var j=0;
				var k=0;
				var flot_count=0;
				var check_id;

			
			var tmp;
			var error_id;
			var error_tip;
			var error_flag=0;
			var fit_flag=0;
			var select_count=0;
			$("#test_info_table").children('tbody').html("");
			for(i=item_index;i>=0;i--)
			{
				if(document.getElementById("id_"+i))
				{
					select_count=parseInt(document.getElementById("id_"+i).innerHTML);
					break;
				}
			}
			for(j=0;j<=select_count;j++)
			{
				fit_flag=0;
				var error=xmlhttp.responseXML.getElementsByTagName("error");
				
				for(i=0;i<error.length;i++)
				{
					tmp=error[i].firstChild.data.split(":")[1];
					error_id=parseInt(tmp.split(",")[0]);
					error_msg=tmp.split(",")[1];
					error_msg=error_msg.replace(" ","&nbsp;");
					error_msg=error_msg.replace(" ","&nbsp;");
					error_msg=error_msg.replace(" ","&nbsp;");
					
					if(error_id==j)
					{
						xindex=j;
						output_html='<TR>'+
					'<TH style="width:11px" class="notext" ><input id="result_check_box_'+xindex+'" name="result_check_box" type="checkbox" value="'+xindex+'" checked="checked" /></TH>'+
					'<TD align="center" id =rid_'+xindex+'>'+error_id+'</TD>'+
					'<TD align="center" id=status_'+xindex+' title='+error_msg+'>'+"Fail"+'</TD>'+
					'<TD align="center" id=server_name_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=server_mac_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=server_cpu_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=client_name_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=client_mac_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=client_cpu_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=tx_rtt_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=rx_rtt_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=tx_speed_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=rx_speed_'+xindex+'>'+'</TD>'+
					'<TD align="center" id=wireless_'+xindex+'>'+""+'</TD>'+
					'</TR>';
					mytable_add_item($("#test_info_table"), j, output_html);
					fit_flag=1;
					break;
					}
				}
				if(fit_flag==1)
				continue;
				var throughput=xmlhttp.responseXML.getElementsByTagName("throughput");	
				
				for(i=0;i<throughput.length;i++)
				{
				if(throughput[i].getElementsByTagName("id"))
					{
						if(parseInt(throughput[i].getElementsByTagName("id")[0].firstChild.data)!=j)
						continue;
					}
					
				var res_name=throughput[i].getElementsByTagName("name");
				var res_mac=throughput[i].getElementsByTagName("mac");
				var res_ip=throughput[i].getElementsByTagName("ip");
				
				var res_usr=throughput[i].getElementsByTagName("usr");
				var res_sys=throughput[i].getElementsByTagName("sys");
				var res_cpu=throughput[i].getElementsByTagName("cpu_time");
				error_flag=0;
				error_tip="";
				var strength1=null;
				var strength2=null;
				var sflag=0;
				var cflag=0;
				var wireless_info=null;
				if(throughput[i].getElementsByTagName("server_wireless_info")[0])
				{
					sflag=1;
					if(throughput[i].getElementsByTagName("client_wireless_info")[0])
					{
						cflag=1;
						strength2=getNodeValue(throughput[i].getElementsByTagName("client_wireless_info")[0]);
					} 
						strength1=getNodeValue(throughput[i].getElementsByTagName("server_wireless_info")[0]);
						//alert(strength1);
				}
				else 
					{
						if(throughput[i].getElementsByTagName("client_wireless_info")[0])
						{
								cflag=1;
								strength2=getNodeValue(throughput[i].getElementsByTagName("client_wireless_info")[0]);
						}
					}
				var str0=null;
				var tx_str=null;
				var rx_str=null;
				var str1=null;
				var tx_speed="";
				var rx_speed="";
				var tmp;
				if(throughput[i].getElementsByTagName("data")[0])
				{
					if(throughput[i].getElementsByTagName("data")[1])
					{
						str0=getNodeValue(throughput[i].getElementsByTagName("data")[0]);
						tx_speed = data_split(str0);
						tx_str=str0;
						str1=getNodeValue(throughput[i].getElementsByTagName("data")[1]);
						rx_speed = data_split(str1);
						rx_str=str1;
						tx_speed = tx_speed.toFixed(4);
						rx_speed = rx_speed.toFixed(4);
					}
					else 
						{
							if(throughput[i].getElementsByTagName("direction")[0])
							{
								tmp=throughput[i].getElementsByTagName("direction")[0].firstChild.data;
								if(tmp=="tx")
								{
									str0=getNodeValue(throughput[i].getElementsByTagName("data")[0]);
									tx_speed = data_split(str0);
									tx_str=str0;
									tx_speed = tx_speed.toFixed(4);
								}
								else if(tmp=="rx")
								{
									str1=getNodeValue(throughput[i].getElementsByTagName("data")[0]);
									rx_speed = data_split(str1);
									rx_str=str1;
									rx_speed = rx_speed.toFixed(4);
								}
								else {
									error_flag=1;
									error_tip="Not&nbsp;get&nbsp;entir&nbsp;data";
									//alert(error_tip);
								}
							}
							else {
									error_flag=1;
									error_tip="Not&nbsp;get&nbsp;entir&nbsp;data";
									//alert(error_tip);
							}
						}
				}
				else{
					 error_flag=1;
						error_tip="Get&nbsp;no&nbsp;data";
						//alert(error_tip);
				}
			
				
				
				
				
			
				var tx_rtt="";
				var rx_rtt="";
				var direction;
				if (throughput[i].getElementsByTagName("direction")[1])
				{
					direction=throughput[i].getElementsByTagName("direction")[1].firstChild.data;
					if(throughput[i].getElementsByTagName("rtt")[0])
					{
						if(throughput[i].getElementsByTagName("rtt")[0].firstChild!=null)
						{
						if(direction=="tx")
						{
							tx_rtt=throughput[i].getElementsByTagName("rtt")[0].firstChild.data;					
						}
						else if(direction=="rx")
							{
								rx_rtt=throughput[i].getElementsByTagName("rtt")[0].firstChild.data;
							}
						}	
					}
				}
				if(throughput[i].getElementsByTagName("rtt")[1])
					{
						if(throughput[i].getElementsByTagName("rtt")[1].firstChild!=null)
						rx_rtt=throughput[i].getElementsByTagName("rtt")[1].firstChild.data;
					}
					if(error_flag)
					{
						wireless_info="-";
					}
					else{
							if(sflag==1)
								{
									if(cflag==1)
									{
										wireless_info="both";
									}
									else wireless_info="server";
								}
							else if(cflag==1)
									wireless_info="client";
							else wireless_info="-";
				}	
				if(res_mac[0].firstChild&&!res_mac[1].firstChild)
				{
					error_flag=1;
									error_tip="Not&nbsp;get&nbsp;Server&nbsp;info";
				}
				else	if(!res_mac[0].firstChild&&res_mac[1].firstChild)
					{
						error_flag=1;
									error_tip="Not&nbsp;get&nbsp;Client&nbsp;info";
					}	
					else if(!res_mac[0].firstChild&&!res_mac[1].firstChild)
						{
							error_flag=1;
									error_tip="Not&nbsp;get&nbsp;Server&nbsp;and&nbsp;Client&nbsp;info";
						}
						
				var output_html = "";
					xindex=j;
					output_html ='<TR>'+
					'<TH style="width:20px" class="notext" ><input id="result_check_box_'+xindex+'" name="result_check_box" type="checkbox" value="'+xindex+'" checked="checked" onclick="show_flot();" /></TH>'+
					'<TD align="center" id =rid_'+xindex+'>'+throughput[i].getElementsByTagName("id")[0].firstChild.data+'</TD>';
					
					if(error_flag==0)
					output_html+='<TD align="center" id=status_'+xindex+'>'+throughput[i].getElementsByTagName("status")[0].firstChild.data+'</TD>';
					else if(error_flag==1)
						{
							output_html+='<TD align="center" id=status_'+xindex+' title='+error_tip+'>'+'Fail'+'</TD>';
						}
					if(res_name[0].firstChild)
					output_html +='<TD align="center" style="overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" id=server_name_'+xindex+'>'+res_name[0].firstChild.data+'</TD>';
					else 
					output_html +='<TD align="center" id=server_name_'+xindex+'>'+'</TD>';
					if(res_mac[0].firstChild)
					output_html +='<TD align="center" style="overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" id=server_mac_'+xindex+'>'+res_mac[0].firstChild.data+'</TD>';
					else output_html +='<TD align="center" id=server_mac_'+xindex+'>'+'</TD>';
						if(res_cpu[0].firstChild &&error_flag==0)
						output_html +='<TD align="center" id=server_cpu_'+xindex+'>'+res_cpu[0].firstChild.data+"%"+'</TD>';
					else output_html +='<TD align="center" id=server_cpu_'+xindex+'>'+'</TD>';
						if(res_name[1].firstChild)
						output_html +='<TD align="center" style="overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" id=client_name_'+xindex+'>'+res_name[1].firstChild.data+'</TD>';
					else output_html +='<TD align="center" id=client_name_'+xindex+'>'+'</TD>';
						if(res_mac[1].firstChild)
						output_html +='<TD align="center" style="overflow:hidden;text-overflow:ellipsis;" onmouseover="changeTitle(this);" id=client_mac_'+xindex+'>'+res_mac[1].firstChild.data+'</TD>';
					else output_html +='<TD align="center" id=client_mac_'+xindex+'>'+'</TD>'; 
						if(res_cpu[1].firstChild &&error_flag==0)
						output_html +='<TD align="center" id=client_cpu_'+xindex+'>'+res_cpu[1].firstChild.data+"%"+'</TD>';
					else output_html +='<TD align="center" id=client_cpu_'+xindex+'>'+'</TD>';
						output_html +=
					'<TD align="center" id=tx_speed_'+xindex+'>'+tx_speed+'</TD>'+
					'<TD align="center" id=rx_speed_'+xindex+'>'+rx_speed+'</TD>'+
					'<TD align="center" id=tx_rtt_'+xindex+'>'+tx_rtt+'</TD>'+
					'<TD align="center" id=rx_rtt_'+xindex+'>'+rx_rtt+'</TD>'+
					'<TD align="center" id=wireless_'+xindex+'>'+wireless_info+'</TD>'+
					'</TR>';
					
					
				if(tx_str!=null||rx_str!=null)
				get_flot(tx_str,rx_str,throughput[i].getElementsByTagName("id")[0].firstChild.data);
				if(strength1!=null ||strength2!=null)
				get_wireless(strength1,strength2,throughput[i].getElementsByTagName("id")[0].firstChild.data);
				mytable_add_item($("#test_info_table"), j, output_html);
//				alert("error_flag="+error_flag);
				if(error_flag==0)
					flot_count++;
				break;
				}
		}
//		alert(flot_count);
		if(flot_count>0)
			show_flot();
			else 
				{
						document.getElementById("result").style.display = "none";																																	
					document.getElementById("placeholder").style.display = "none";																																	
					document.getElementById("Legend").style.display = "none";
					document.getElementById("record_info").style.display = "none";
					document.getElementById("record").style.display="none";
					document.getElementById("record").innerHTML="";
				}
			
		}
			
			
	}
}
function data_split(string)
{
	var i=0;
	var interval;
	var speed=0.0;
	var data2;
	var data1=string.split(";");
	for(i=0;i<data1.length-1;i++)
	{
		data2=data1[i].split(",");
		interval=data2[0];
		speed+=parseFloat(data2[1]);
		if(parseFloat(data2[1])>max_speed)
		{
			max_speed=parseFloat(data2[1]);
		}
	}
	
	speed=speed/(data1.length-1);
	return speed;
}

function get_flot(str0,str1,id)
{
	var data1;
	
	var data2;
	var data3;
	var data4;
	var d=[];
	var d1=[];
	var i;
	var interval;
	var record;
	var num1,num2;
	if(str0)
	{
		d.push([0,0]);
	}
	if(str1)
	{
		d1.push([0,0]);
	}
	if(str1)
	{
		data2=str1;
		data4=data2.split(";");
		for(i=0;i<data4.length-1;i++)
		{
			data5=data4[i].split(",");
			interval=data5[0];
			record=parseFloat(data5[1]);
			d1.push([interval,record]);
		
		}
	}
	if(str0)
	{
		data1=str0;
		data3=data1.split(";");
	
		for(i=0;i<data3.length-1;i++)
		{
			data5=data3[i].split(",");
			interval=data5[0];
			record=parseFloat(data5[1]);
			
			
			d.push([interval,record]);
		}
	}
	if(str1!=null && str0 !=null )
	{
	startData.push({ label: "ID:"+id+"(TX)", data: d });

	startData.push({ label: "ID:"+id+"(RX)", data: d1 });	
	
	}
	else if(str0==null && str1!=null) {
		startData.push({label:"ID:"+id+"(RX)",data :d1});
	}
	else if(str0!=null && str1==null)
		{
			startData.push({label:"ID:"+id+"(TX)",data :d});
		}
}
function get_wireless(strength1,strength2,id)
{
	var data1=strength1;
	var data2=strength2;
	var data3;
	var data4;
	var data5;
	var data6;
	var i=0;
	var d1 =[];
	var d2 =[];
	var d3 =[];
	var d4 =[];
	var d5 =[];
	var d6 =[];
	var d7 =[];
	var d8 =[];
	var d9 =[];
	var d10 =[];
	var interval;
	
	if(data1)
	{
		d1.push([0,0]);
		d2.push([0,0]);
		d3.push([0,0]);
		d7.push([0,0]);
		d8.push([0,0]);
		data3=data1.split(";");
		for(i=0;i<data3.length-1;i++)
		{
			data5=data3[i].split(",");
			interval= data5[0];
			str=data5[1];
			
			d1.push([interval,str]);
			str=data5[2];
			d2.push([interval,str]);
			str=data5[3];
			d3.push([interval,str]);			
			str=data5[4];
			d7.push([interval,str]);
			str=data5[5];	
			d8.push([interval,str]);
		}
	}
	if(data2)
	{
		d4.push([0,0]);
		d5.push([0,0]);
		d6.push([0,0]);
		d9.push([0,0]);
		d10.push([0,0]);
		data4=data2.split(";");
		for(i=0;i<data4.length-1;i++)
		{
			data6=data4[i].split(",");
			interval=data6[0];
			str=data6[1];
			d4.push([interval,str]);
			str=data6[2];
			d5.push([interval,str]);
			str=data6[3];
			d6.push([interval,str]);
			str=data6[4];
			d9.push([interval,str]);
			str=data6[5];
			d10.push([interval,str]);
		}
	}
	if(data1 && data2)
	{
		
		channData.push({data:d1,label:"ID:"+id+"(Server)"});
		strData.push({data:d2,label:"ID:"+id+"(Server)"});
		rssiData.push({data:d3,label:"ID:"+id+"(Server)"});
		noiseData.push({data:d7,label:"ID:"+id+"(Server)"});
		rateData.push({data:d8,label:"ID:"+id+"(Server)"});
		
		channData.push({data:d4,label:"ID:"+id+"(Client)"});
		strData.push({data:d5,label:"ID:"+id+"(Client)"});
		rssiData.push({data:d6,label:"ID:"+id+"(Client)"});
		noiseData.push({data:d9,label:"ID:"+id+"(Client)"});
		rateData.push({data:d10,label:"ID:"+id+"(Client)"});
	}
	else if(data1 && !data2)
		{
			channData.push({data:d1,label:"ID:"+id+"(Server)"});
			strData.push({data:d2,label:"ID:"+id+"(Server)"});
			rssiData.push({data:d3,label:"ID:"+id+"(Server)"});
			noiseData.push({data:d7,label:"ID:"+id+"(Server)"});
			rateData.push({data:d8,label:"ID:"+id+"(Server)"});
		}
	else if(data2 && !data1)
		{
			channData.push({data:d4,label:"ID:"+id+"(Client)"});
			strData.push({data:d5,label:"ID:"+id+"(Client)"});
			rssiData.push({data:d6,label:"ID:"+id+"(Client)"});
			noiseData.push({data:d9,label:"ID:"+id+"(Client)"});
			rateData.push({data:d10,label:"ID:"+id+"(Client)"});
			
		}
}
function get_plot_info(sdata,item,sstr,sunit)
{
	var j=0;
	var i=0;
	var ssss="";
	var sname=["Strength","RSSI","Noise","Channel","Data Rate"];
	var dir= item.series.label.split('(')[1].split(')')[0];
  var label1=item.series.label.split('(')[0].split(':')[1];
  
  	for(i=0;i<sdata[0].length;i++)
  	{
  		if(sdata[0][i].label.split('(')[0].split(':')[1]==label1)
  		{
  			if((dir=="TX"&&sdata[0][i].label.split('(')[1]=="Server)")||(dir=="RX"&&sdata[0][i].label.split('(')[1]=="Client)"))
  			{
  				ssss +=sstr[0]+sdata[0][i].label.split('(')[1].split(')')[0]+" "+sname[0]+":"+sstr[1]+(sdata[0][i].data[item.dataIndex][1])+sunit[0]+sstr[2];
  				ssss +=sstr[0]+" "+sname[1]+":"+sstr[1]+(sdata[1][i].data[item.dataIndex][1])+sunit[1]+sstr[2];
  				ssss +=sstr[0]+" "+sname[2]+":"+sstr[1]+(sdata[2][i].data[item.dataIndex][1])+sunit[2]+sstr[2];
  				ssss +=sstr[0]+" "+sname[3]+":"+sstr[1]+(sdata[3][i].data[item.dataIndex][1])+sunit[3]+sstr[2];
  				ssss +=sstr[0]+" "+sname[4]+":"+sstr[1]+(sdata[4][i].data[item.dataIndex][1])+sunit[4]+sstr[2];	
  				break;	
  			}
  		}
  	}
        			return ssss;
}
function show_flot(){
		var ci=0;
	var check_box;
	var flag=0;
	var flag1=0;
	var ok_count=0;
	var status;
	check_box=document.getElementsByName("result_check_box");
	if(check_box.length <= 0)                       
	{                                                   
		check_box = new Array();                      
		var e=document.getElementsByTagName("th");        
		for(var ci=0;ci<e.length;ci++)                       
		{                                                 
			if(e[ci].getAttribute("name") =="result_check_box")  
			{                                               
				check_box[check_box.length]=e[ci];     
			}                                               
		}                                                 
	} 
	for(ci=0;ci<check_box.length;ci++)
	{
		if(!check_box[ci].checked)
		{
			document.getElementById("result_check_box_all").checked=false;
			break;
		}
	}  
	if(check_box.length==ci)
	{
		document.getElementById("result_check_box_all").checked=true;
	}
	
	
	
		var placeholder = $("#placeholder");
	 	var choiceContainer=$("#test_info_table");

    //choiceContainer.find("input").click(plotAccordingToChoices);
		
    tdata = new Array();
    wdata1 = new Array();
    wdata2 = new Array();
    wdata3 = new Array();
    wdata4 = new Array();
    wdata5 = new Array();
    function plotAccordingToChoices() {
        var i;
        var j = 0;
        var val = 0;
        var tx="";
        var rx="";
        
				var check = document.getElementsByName("result_check_box");
				if(check.length<=0)
				{
					check = new Array();
					var e=document.getElementsByTagName("th");
					for(var i=0;i<e.length;i++)
					{
						if(e[i].getAttribute("name") =="result_check_box")
						{
							check[check.length]=e[i];
						}
					}
				}
				
				for(i=0;i<check.length;i++)
				{
			
					var box_value=check[i].value;
					if(check[i].checked)
					{
						
						status=document.getElementById("status_"+box_value).innerHTML;
						
						if(status=="ok")
						{
							
							tx=document.getElementById("tx_speed_"+box_value).innerHTML;
							rx=document.getElementById("rx_speed_"+box_value).innerHTML;
							if((tx=="" && rx!="")||(tx!="" && rx==""))
							{
								flag1=1;
								tdata.push(startData[j]);
								
								j++;
							}
							else if(tx!=""&& rx!="")
								{
									flag1=1;
									tdata.push(startData[j]);
									j++;
									tdata.push(startData[j]);
									j++;
								}
						}
					}

				}
				
				
        var sw=0;
        var cw=0;;
       	var wireless;
				j=0;
				var box_value1;
				//alert(check.length);
				for(i=0;i<check.length;i++)
				{
			
					box_value1=check[i].value;
					if(check[i].checked)
					{
						status=document.getElementById("status_"+box_value1).innerHTML;
						
						if(status=="ok")
						{
							wireless=document.getElementById("wireless_"+box_value1).innerHTML;
							if(wireless=="server" ||wireless =="client")
							{
								wdata1.push(strData[j]);
								wdata2.push(rssiData[j]);
								wdata3.push(noiseData[j]);
								wdata4.push(channData[j]);
								wdata5.push(rateData[j]);
								j++;
							}
							else if(wireless=="both")
							{
								
									wdata1.push(strData[j]);
									wdata1.push(strData[j+1]);
									wdata2.push(rssiData[j]);
									wdata2.push(rssiData[j+1]);
									wdata3.push(noiseData[j]);
									wdata3.push(noiseData[j+1]);
									wdata4.push(channData[j]);
									wdata4.push(channData[j+1]);
									wdata5.push(rateData[j]);
									wdata5.push(rateData[j+1]);
									//alert(i,strData[j])
								
								j+=2;
							}	
						}	
					}				
    		}
				
				if(flag1==0)
				{
					document.getElementById("result").style.display = "none";																																	
					document.getElementById("placeholder").style.display = "none";																																	
					document.getElementById("Legend").style.display = "none";
					document.getElementById("record_info").style.display = "none";
					document.getElementById("record").style.display="none";
					document.getElementById("record").innerHTML="";
				}
				else 
					{
						document.getElementById("result").style.display = "block";																																	
						document.getElementById("placeholder").style.display = "block";																																	
						document.getElementById("Legend").style.display = "block";
						document.getElementById("show").value = "Show Detail";
						document.getElementById("record_info").style.display = "block";
						document.getElementById("record").style.display="block";
						document.getElementById("record").innerHTML="";
					}
				
    }
        plotAccordingToChoices();
        
         var options = {

        series: { lines: { show: true }, shadowSize: 0 },
        xaxis: { tickFormatter: function (v) { return Math.round(v*100)/100+" second"; },zoomRange: [1, x_range], panRange: [0, x_range],autoscaleMargin:0.01},
        yaxis: { tickDecimals: 2,tickFormatter: function (v) { return Math.round(v*100)/100+" Mbps"; }, zoomRange: [1, 200], panRange: [0, (max_speed+10)]  },
        zoom: {
            interactive: true
        },
        pan: {
            interactive: true
        },
        grid: { hoverable: true, clickable: false, autoHighlight: true },
        series: {
                   lines: { show: true },
                   points: { show: false }
               },
	legend: { show: true, position:'top-right',container: $("#Legend") }

    };
    
    var plot = $.plot(placeholder, tdata, options);

    // show pan/zoom messages to illustrate events 
    placeholder.bind('plotpan', function (event, plot) {
        var axes = plot.getAxes();
        $(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
                           + " &ndash; " + axes.xaxis.max.toFixed(2)
                           + " and y: " + axes.yaxis.min.toFixed(2)
                           + " &ndash; " + axes.yaxis.max.toFixed(2));
    });

    placeholder.bind('plotzoom', function (event, plot) {
        var axes = plot.getAxes();
        $(".message").html("Zooming to x: "  + axes.xaxis.min.toFixed(2)
                           + " &ndash; " + axes.xaxis.max.toFixed(2)
                           + " and y: " + axes.yaxis.min.toFixed(2)
                           + " &ndash; " + axes.yaxis.max.toFixed(2));
    });

    // add zoom out button 
    $('<div class="button" style="right:20px;top:20px">zoom out</div>').appendTo(placeholder).click(function (e) {
        e.preventDefault();
        plot.zoomOut();
    });
    
    // add zoom in button 
    $('<div class="button" style="right:20px;top:100px">&nbsp zoom in&nbsp</div>').appendTo(placeholder).click(function (e) {
        e.preventDefault();
        plot.zoom();
    });

    // and add panning buttons
    
    // little helper for taking the repetitive work out of placing
    // panning arrows
    function addArrow(dir, right, top, offset) {
        $('<img class="button" src="../throughput/arrow-' + dir + '.gif" style="right:' + right + 'px;top:' + top + 'px">').appendTo(placeholder).click(function (e) {
            e.preventDefault();
            plot.pan(offset);
        });
    }

    addArrow('left', 55, 60, { left: -100 });
    addArrow('right', 25, 60, { left: 100 });
    addArrow('up', 40, 45, { top: -100 });
    addArrow('down', 40, 75, { top: 100 });
    
    
/* ================  tooltip ========================*/    
    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '1px solid #fdd',
            padding: '2px',
            'background-color': '#fee',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }
    var previousPoint = null;
    $("#placeholder").bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));

            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;
                   
                    var sdata=[wdata1,wdata2,wdata3,wdata4,wdata5];
                    
                    var sunit=["%","dBm","dBm","","Mbps"];
                    var sstr=["<tr><td style='width:100px'>","</td><td>","</td></tr>"];
                    var info1=get_plot_info(sdata,item,sstr,sunit);
                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    showTooltip(item.pageX, item.pageY,
                                "<table><tr><td>Throughput</td><td align='right'>"+y+"Mbps</td></tr>"+info1+"</table>");
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;            
            }
});

//    $("#placeholder").bind("plotclick", function (event, pos, item) {
//        if (item) {
//        	document.getElementById("clickdata").style.display="block";	
//        						var sdata=[wdata1,wdata2,wdata3,wdata4,wdata5];
//                    var sname=["Strength","RSSI","Noise","Channel","Data Rate"];
//                    var sunit=["%","dBm","dBm","","Mbps"];
//                    var sstr=[","," ",""];
//                    var info=get_plot_info(sdata,item,sstr,sname,sunit);
//            $("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label + "."
//           	+"data rate:"+item.datapoint[1].toFixed(2)+"Mbps"+info+".");
//          // plot.highlight(item.series, item.datapoint); 
//        }
//    });
//    if(flag==1)
//    {
//    	get_wireless_folt();
//			//document.getElementById("result3").style.display = "block";
//			//document.getElementById("placeholder3").style.display = "block";
//			//document.getElementById("Legend3").style.display = "block";
//			//document.getElementById("result4").style.display = "block";
//			//document.getElementById("placeholder4").style.display = "block";
//			//document.getElementById("Legend4").style.display = "block";
//  	}
//  	else 
//  		{
//				document.getElementById("result3").style.display = "none";																																	
//				document.getElementById("placeholder3").style.display = "none";																																	
//				document.getElementById("Legend3").style.display = "none";																																				
//				document.getElementById("result4").style.display = "none";																																	
//				document.getElementById("placeholder4").style.display = "none";																																	
//				//document.getElementById("Legend4").style.display = "none";	
//  		}
}
//function get_wireless_folt()
//{
//	
//	 	var choiceContainer=$("#test_info_table");
//	
//		
//    choiceContainer.find("input").click(plotAccordingToChoices);
//
//    wdata1=[];
//    wdata2=[];
//    wdata3=[];
//    wdata4=[];
//    wdata5=[];
//	 function plotAccordingToChoices() {
//        var i;
//        var j = 0;
//        var val = 0;
//        var sw=0;
//        var cw=0;;
//       	var wireless;
//				var check = document.getElementsByName("result_check_box");
//				if(check.length<=0)
//				{
//					check = new Array();
//					var e=document.getElementsByTagName("th");
//					for(var i=0;i<e.length;i++)
//					{
//						if(e[i].getAttribute("name") =="result_check_box")
//						{
//							check[check.length]=e[i];
//						}
//					}
//				}
//				//alert(check.length);
//				for(i=0;i<check.length;i++)
//				{
//			
//					var box_value=check[i].value;
//				
//						wireless=document.getElementById("wireless_"+box_value).innerHTML;
//						if(wireless=="server" ||wireless =="client")
//						{
//							if(check[i].checked)
//							{
//							wdata1.push(strData[j]);
//							wdata2.push(rssiData[j]);
//							wdata3.push(noiseData[j]);
//							wdata4.push(channData[j]);
//							wdata5.push(rateData[j]);
//							}
//							j++;
//						}
//						else if(wireless=="both")
//							{
//								if(check[i].checked)
//								{
//									wdata1.push(strData[j]);
//									wdata1.push(strData[j+1]);
//									wdata2.push(rssiData[j]);
//									wdata2.push(rssiData[j+1]);
//									wdata3.push(noiseData[j]);
//									wdata3.push(noiseData[j+1]);
//									wdata4.push(channData[j]);
//									wdata4.push(channData[j+1]);
//									wdata5.push(rateData[j]);
//									wdata5.push(rateData[j+1]);
//									//alert(i,strData[j])
//								}
//								j+=2;
//							}
//						
//    		}
//    		
//    	}
//        plotAccordingToChoices();
//        
//  
//    var options0={
//    	series: { lines: { show: true }, shadowSize: 0 },
//        xaxis: { zoomRange: [1, 10], panRange: [0, x_range]},
//        yaxis: { tickDecimals: 2,tickFormatter: function (v) { return v + " dBm"; },  panRange: [-150,10],zoomRange: [1, 100],autoscaleMargin: null },
//        zoom: {
//            interactive: true
//        },
//        pan: {
//            interactive: true
//        },
//        grid: { hoverable: true, clickable: true },
//        series: {
//                   lines: { show: true },
//                   points: { show: false }
//               },
//			legend: { show: true, container: $("#Legend3") }
//
//    };
//    var options1={
//    	
//        xaxis: { zoomRange: [1, 10], panRange: [0, x_range]},
//        yaxis: { tickDecimals: 2,tickFormatter: function (v) { return v + " dBm"; }, panRange: [-150,10], zoomRange: [1, 200] ,autoscaleMargin: null },
//        zoom: {
//            interactive: true
//        },
//        pan: {
//            interactive: true
//        },
//        grid: { hoverable: true, clickable: true},
//        series: {
//                   lines: { show: true },
//                   shadowSize: 0,
//                   points: { show: false }
//               },
//			legend: { show: false }
//
//    };
//    var placeholder = new Array();
//		placeholder.push($("#placeholder3"));
//		placeholder.push($("#placeholder4"));
//
//    var xoptions=new Array();
//		xoptions.push(options0);
//		xoptions.push(options1);
//	
//		var data=new Array();
//		data.push(wdata2);
//		data.push(wdata3);
//	
//		
//    	
//    	
//    var plot1 = $.plot(placeholder[0], data[0], xoptions[0]);
//    var plot2 = $.plot(placeholder[1], data[1], xoptions[1]);	
//
//    // show pan/zoom messages to illustrate events 
//    placeholder[0].bind('plotpan', function (event, plot1) {
//        var axes = plot1.getAxes();
//        $(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
//                           + " &ndash; " + axes.xaxis.max.toFixed(2)
//                           + " and y: " + axes.yaxis.min.toFixed(2)
//                           + " &ndash; " + axes.yaxis.max.toFixed(2));
//    });
//	placeholder[1].bind('plotpan', function (event, plot2) {
//        var axes = plot2.getAxes();
//        $(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
//                           + " &ndash; " + axes.xaxis.max.toFixed(2)
//                           + " and y: " + axes.yaxis.min.toFixed(2)
//                           + " &ndash; " + axes.yaxis.max.toFixed(2));
//    });
//   
//    placeholder[0].bind('plotzoom', function (event, plot1) {
//        var axes = plot1.getAxes();
//        $(".message").html("Zooming to x: "  + axes.xaxis.min.toFixed(2)
//                           + " &ndash; " + axes.xaxis.max.toFixed(2)
//                           + " and y: " + axes.yaxis.min.toFixed(2)
//                           + " &ndash; " + axes.yaxis.max.toFixed(2));
//    });
// placeholder[1].bind('plotzoom', function (event, plot2) {
//        var axes = plot2.getAxes();
//        $(".message").html("Zooming to x: "  + axes.xaxis.min.toFixed(2)
//                           + " &ndash; " + axes.xaxis.max.toFixed(2)
//                           + " and y: " + axes.yaxis.min.toFixed(2)
//                           + " &ndash; " + axes.yaxis.max.toFixed(2));
//    });
//     
//    // add zoom out button 
//    $('<div class="button" style="right:20px;top:20px">zoom out</div>').appendTo(placeholder[0]).click(function (e) {
//        e.preventDefault();
//        plot1.zoomOut();
//    });
//    $('<div class="button" style="right:20px;top:20px">zoom out</div>').appendTo(placeholder[1]).click(function (e) {
//        e.preventDefault();
//        plot2.zoomOut();
//    });
//   
//    // add zoom in button 
//    $('<div class="button" style="right:20px;top:100px">&nbsp zoom in&nbsp</div>').appendTo(placeholder[0]).click(function (e) {
//        e.preventDefault();
//        plot1.zoom();
//    });
//    $('<div class="button" style="right:20px;top:100px">&nbsp zoom in&nbsp</div>').appendTo(placeholder[1]).click(function (e) {
//        e.preventDefault();
//        plot2.zoom();
//    });
//
//    
//    // little helper for taking the repetitive work out of placing
//    // panning arrows
//    function addArrow(dir, right, top, offset) {
//        $('<img class="button" src="../flot/examples/arrow-' + dir + '.gif" style="right:' + right + 'px;top:' + top + 'px">').appendTo(placeholder[0]).click(function (e) {
//            e.preventDefault();
//            plot1.pan(offset);
//        });
//        $('<img class="button" src="../flot/examples/arrow-' + dir + '.gif" style="right:' + right + 'px;top:' + top + 'px">').appendTo(placeholder[1]).click(function (e) {
//            e.preventDefault();
//            plot2.pan(offset);
//        });
////        $('<img class="button" src="../flot/examples/arrow-' + dir + '.gif" style="right:' + right + 'px;top:' + top + 'px">').appendTo(placeholder[2]).click(function (e) {
////            e.preventDefault();
////            plot3.pan(offset);
////        });
//    }
//
//    addArrow('left', 55, 60, { left: -100 });
//    addArrow('right', 25, 60, { left: 100 });
//    addArrow('up', 40, 45, { top: -100 });
//    addArrow('down', 40, 75, { top: 100 });
//    
//    
///* ================  tooltip ========================*/    
////    function showTooltip(x, y, contents) {
////        $('<div id="tooltip">' + contents + '</div>').css( {
////            position: 'absolute',
////            display: 'none',
////            top: y + 5,
////            left: x + 5,
////            border: '1px solid #fdd',
////            padding: '2px',
////            'background-color': '#fee',
////            opacity: 0.80
////        }).appendTo("body").fadeIn(200);
////    }
//    var previousPoint = null;
////    placeholder[0].bind("plothover", function (event, pos, item) {
////        $("#x").text(pos.x.toFixed(0));
////        $("#y").text(pos.y.toFixed(0));
////
////            if (item) {
////                if (previousPoint != item.dataIndex) {
////                    previousPoint = item.dataIndex;
////                    
////                    $("#tooltip").remove();
////                    var info1=get_plot_info(tdata,wdata1,wdata3,item,"<br>","Speed","Strength","Noise","Mbps","%","dBm");
////                    var x = item.datapoint[0].toFixed(0),
////                        y = item.datapoint[1].toFixed(0);
////                    showTooltip(item.pageX, item.pageY,
////                                y+"dBm");
////                               
////                }
////            }
////            else {
////                $("#tooltip").remove();
////                previousPoint = null;            
////            }
////           
////});
//// placeholder[1].bind("plothover", function (event, pos, item) {
////        $("#x").text(pos.x.toFixed(0));
////        $("#y").text(pos.y.toFixed(0));
////
////            if (item) {
////                if (previousPoint != item.dataIndex) {
////                    previousPoint = item.dataIndex;
////                    
////                    $("#tooltip").remove();
////                    var info1;
////                    info1=get_plot_info(tdata,wdata1,wdata2,item,"<br>","Speed","Strength","Rssi","Mbps","%","dBm");
////                    var x = item.datapoint[0].toFixed(0),
////                        y = item.datapoint[1].toFixed(0);
////                    showTooltip(item.pageX, item.pageY,
////                                y+"dBm"+info1);
////                               
////                }
////            }
////            else {
////                $("#tooltip").remove();
////                previousPoint = null;            
////            }
////           
////});
////
////    placeholder[0].bind("plotclick", function (event, pos, item) {
////        if (item) {
////        	var info2=get_plot_info(tdata,wdata1,wdata3,item,",","Speed","Strength","Noise","Mbps","%","dBm");
////           $("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label
////           	+"Rssi:"+item.datapoint[1].toFixed(0)+info2);
////            plot1.highlight(item.series, item.datapoint);
////        }
////    });
////    placeholder[1].bind("plotclick", function (event, pos, item) {
////        if (item) {
////        	var info2=get_plot_info(tdata,wdata1,wdata2,item,",","Speed","Strength","Rssi","Mbps","%","dBm");
////           $("#clickdata").text("You clicked point " + item.dataIndex + " in " + item.series.label +"Noise:"
////           +item.datapoint[1].toFixed(0)+info2);
////            plot2.highlight(item.series, item.datapoint);
////        }
////    });
//  
//}


function show_records()
	{
			var i=0;
			var direction="";
			var idnum="";
			var rethtml="";
			var j=0;
			var k=0;
			var num=0;
			var len;
			var index=0;
			
			var server="";
			var client="";
			var wdata=new Array();
			wdata.push(wdata1);
			wdata.push(wdata2);
			wdata.push(wdata3);
			wdata.push(wdata4);
			wdata.push(wdata5);
			if(document.getElementById("show").value=="Show Detail")
			{
				document.getElementById("record").style.display="block";
				
				
			while(tdata[i])
			{
				index=0;
				num=0;
				server="";
				client="";
				direction = tdata[i].label.split('(')[1].split(')')[0];
				//alert("directon="+direction);
				idnum = tdata[i].label.split('(')[0].split(':')[1];
				//alert("idnum="+idnum);
				len = tdata[i].data.length;
				//alert("len="+len);
				while(idnum)
				{
					
					if(document.getElementById("id_"+index).innerHTML==idnum)
						{
							server=document.getElementById("server_ip_"+index).innerHTML;
							client=document.getElementById("client_ip_"+index).innerHTML;
							break;
						}
						index++;
				}
				rethtml += '<b valign="bottom">The throughput test ID ='+idnum+', direction ='+direction;
				rethtml += ', send data from Server('+server+") to Client("+client+")."+'</b><br>';
				rethtml += '<table border="1px" bordercolor="#cccccc"  style="border-collapse:collapse;" cellspacing="0" cellpadding="0">';
				rethtml += '<tr><th>Interval</th><th>Throughput(Mbps)</th>';
				rethtml += '<th>Strength(%)</th><th>RSSI(dBm)</th><th>Noise(dBm)</th><th>Channel</th><th>Data Rate(Mbps)</th></tr>';
				for(num=0;num<len;num++)
				{
					
					
					rethtml +='<tr><td align="center">'+tdata[i].data[num][0]+'</td><td align="center">'+tdata[i].data[num][1]+'</td>';
//					for(k=0;k<5;k++)
//					{
						
						for(j=0;j<wdata[0].length;j++)
						{
							if(wdata[0][j].label.split('(')[0].split(':')[1]==idnum)
							{
								if((wdata[0][j].label.split('(')[1]=="Server)" && direction=="TX")||(wdata[0][j].label.split('(')[1]=="Client)" && direction=="RX"))
								{	
										rethtml +='<td align="center">'+wdata[0][j].data[num][1]+'</td><td align="center">'+wdata[1][j].data[num][1]+'</td><td align="center">'+wdata[2][j].data[num][1]+'</td><td align="center">'+wdata[3][j].data[num][1]+'</td><td align="center">'+wdata[4][j].data[num][1]+'</td><td align="center">';	
										break;					
								}
							}
							
						}
						if(j==wdata[0].length)
						{
							//alert("id="+wdata[k][j].label.split('(')[0].split(':')[1]);
							//alert("k="+k+'label:'+wdata[k][0].label.split('(')[1]);
							//alert("k="+k+'label:'+wdata[k][1].label.split('(')[1]);
							rethtml +='<td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td>';
						}
				//	}	
					
					rethtml +='</tr>';
				}
				rethtml +='</table><hr>';	
				//alert(rethtml);	
				i++;
			}
			//alert(rethtml);
			//alert("rethtml="+rethtml);
			document.getElementById("record").innerHTML=rethtml;
			document.getElementById("show").value="Hide Detail";
		}
		else 
			{
			
				document.getElementById("record").style.display="none";
				document.getElementById("show").value="Show Detail";
				
				
			}
	}

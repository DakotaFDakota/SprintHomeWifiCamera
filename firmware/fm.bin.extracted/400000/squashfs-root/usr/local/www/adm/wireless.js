//Version 1.02
var xmlhttp;
var Strength=[];
var Rssi=[];
var	Noise=[];
var	Data_rate=[];
var Channel=[];
var data=[];			
var data1=[];
var data2=[];
var data3=[];
var data4=[];
var data5=[];
var flot_flag=0;
var repeater_flag=0;
var options;
var realtime;
var d_back=[];
d_back.push(null);
function init()				
{
	var tmp;
		var timestamp;
		var chief_info;
		var client_list;
		var len;
		var i=0;
		var html="";
		var chief_html="";
	var flag=0;
		if(g_content==null)
		{
			alert("No wireless information !");
		}
		if(g_content.split("<root>")[1])
		{
			tmp=g_content.split("<root>")[1].split("</root>")[0];
			if(tmp.split("<timestamp>")[1])
			{
				if(tmp.split("<timestamp>")[1].split("</timestamp>")[0]!=null &&tmp.split("<timestamp>")[1].split("</timestamp>")[0]!="")
					{
						timestamp=tmp.split("<timestamp>")[1].split("</timestamp>")[0];
						timestamp=timestamp.replace(/ /g,'-');
						document.getElementById("time").innerHTML=timestamp.split('-')[3]+' '+timestamp.split('-')[1]+' '+timestamp.split('-')[0]+','+timestamp.split('-')[2];
						realtime=timestamp.split('-')[3];
					}
			}
			if(tmp.split("<info>")[1])
			{
				chief_info=tmp.split("<info>")[1].split("</info>")[0];
				if(chief_info!="" &&chief_info!=null)
				{
				
					info_split(chief_info,"Camera");
					flag=1;
				
					repeater_flag=1;
				}
				else{
						
						}
			}
			else {
						
					}
		}
			
			
					if(flag==1)
					{
						
						document.getElementById("record_info").style.display="block";
						show_flot();
					}
					else {
						document.getElementById("record_info").style.display="none";
						}
}

//function check_all()
//{
//	var i=0;
//	var Client_list=document.getElementsByName("checkbox");
//				if(Client_list.length<=0)
//				{
//					Client_list = new Array();
//					var e=document.getElementsByTagName("td");
//					for(var i=0;i<e.length;i++)
//					{
//						if(e[i].getAttribute("name") =="checkbox")
//						{
//							Client_list[Client_list.length]=e[i];
//						}
//					}
//				}
//	if(document.getElementById("checkall").checked)
//	{
//		
//				for(i=1;i<Client_list.length;i++)
//				{
//					Client_list[i].checked=true;
//				}
//	}
//	else{
//			for(i=1;i<Client_list.length;i++)
//				{
//					Client_list[i].checked=false;
//				}
//		}
//		show_flot();
//		
//}
function tips(item)
{
	var len1=data.length;
	var ret="";
	for(i=0;i<len1;i++)
	{
		if(data[i].label==item.series.label)
		{
			//alert(item.dataIndex);
			if((item.dataIndex==0&&data1[i].data[item.dataIndex][1]=="0"&&data2[i].data[item.dataIndex][1]=="-100")||(item.dataIndex==2&&data1[i].data[item.dataIndex][1]=="100"&&data2[i].data[item.dataIndex][1]=="0"))
			{
			//	alert("ssss");
			//	alert("data1="+data1[i].data[item.dataIndex][1]);
			//	alert()
				return;
			}
			ret='<tr style="width:80px;font: 9pt Arial, Helvetica, sans-serif;">'+item.series.label+'</tr>';
			ret+='<tr><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">Strength:</td><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">'+data1[i].data[item.dataIndex][1]+'%</td></tr>';
			ret+='<tr><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">RSSI:</td><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">'+data2[i].data[item.dataIndex][1]+'dBm</td></tr>';
			if(data3[i].data[item.dataIndex])
			ret+='<tr><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">Noise:</td><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">'+data3[i].data[item.dataIndex][1]+'dBm</td></tr>';
			ret+='<tr><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">Speed:</td><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">'+data4[i].data[item.dataIndex][1]+'Mbps</td></tr>';
			ret+='<tr><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">Channel:</td><td style="width:100px;font: 9pt Arial, Helvetica, sans-serif;">'+data5[i].data[item.dataIndex][1]+'</td></tr>';
		}
	}
	return ret;
}


function show_flot()
{		
			data=[];
			data1=[];
			data2=[];
			data3=[];
			data4=[];
			data5=[];
			var used_data=[];
			var data_flag=0;
			var i=0;
			var count=0;
		    		data1.push(Strength[i]);
    		data2.push(Rssi[i]);
    		data3.push(Noise[i]);
    		data4.push(Data_rate[i]);
    		data5.push(Channel[i]);
    		data_flag=1;
    		
//    		if(i>0)
//    		count++;
   
//    if(count==Client_list.length-1)
//    		{
//    			document.getElementById("checkall").checked=true;
//    		}
//    	else if(count==0)
//    		{
//    			document.getElementById("checkall").checked=false;
//    		}
//    	
   	used_data.push(data1);
			used_data.push(data2);
			used_data.push(data3);
			used_data.push(data4);
			used_data.push(data5);
			data=used_data[flot_flag];
			//alert(flot_flag);
   function tick()
   {
   	var tickcontain=[];
   	var a="00";
   	var b="00";
   	var i=0;
   	var time;
   	var tmp;
   	var tmp1;
   	for(i=0;i<61;i++)
   	{			
   		tickcontain.push([i*60,i]);
   	}
   	return tickcontain;
  } 
   	
    
     		
     		document.getElementById("Strength").style.display="block";
     		document.getElementById("record_info").style.display="block";
//     		document.getElementById("Rssi").style.display="block";
//     		document.getElementById("Data_rate").style.display="block";
     //document.getElementById("placeholder2").display="block";
   
    var placeholder = $("#placeholder");
  	var options;
    var options1 = {
        series: { lines: { show: true }, shadowSize: 0 },
        xaxis: { ticks: function (v){return tick();} ,reserveSpace:true,min:2400,max:3600,ticksize:30,panRange:[0,3600]},//tickFormatter: function (v) { return Math.round(v*100)/100+" second"; },zoomRange: [1,10], panRange: [0,6] },
        yaxis: { ticks:[[10,"10%"],[20,"20%"],[30,"30%"],[40,"40%"],[50,"50%"],[60,"60%"],[70,"70%"],[80,"80%"],[90,"90%"],[100,"100%"]],min:0,max:105,ticksize:10, panRange: [0,105]},
        zoom: {
            interactive: false
        },
        pan: {
            interactive: true
        },
         grid: { hoverable: true, clickable: false,  autoHighlight: true },
        
			legend: { show: false, noColumns: 6,position:'top-right',container: $("#Legend") }
			//selection: { mode: "xy" }
    };
    var options2 = {
        series: { lines: { show: true }, shadowSize: 0 },
        xaxis: { ticks: function (v){return tick();} ,reserveSpace:true,min:2400,max:3600,ticksize:30,panRange:[0,3600]},
        yaxis: { ticks:[[-10,"-10dBm"],[-20,"-20dBm"],[-30,"-30dBm"],[-40,"-40dBm"],[-50,"-50dBm"],[-60,"-60dBm"],[-70,"-70dBm"],[-80,"-80dBm"],[-90,"-90dBm"],[-100,"-100dBm"]],min:-100,max:0,ticksize:10, panRange: [-100,0]},
        zoom: {
            interactive: false
        },
        pan: {
            interactive: true
        },
         grid: { hoverable: true, clickable: false,  autoHighlight: true },
        
			legend: { show: false, noColumns: 6,position:'top-right',container: $("#Legend") }
			//selection: { mode: "xy" }
    };
    
    var options3 = {
        series: { lines: { show: true }, shadowSize: 0 },
        xaxis: { ticks: function (v){return tick();} ,reserveSpace:true,min:2400,max:3600,ticksize:30,panRange:[0,3600]},
        yaxis: { ticks:[[-10,"-10dBm"],[-20,"-20dBm"],[-30,"-30dBm"],[-40,"-40dBm"],[-50,"-50dBm"],[-60,"-60dBm"],[-70,"-70dBm"],[-80,"-80dBm"],[-90,"-90dBm"],[-100,"-100dBm"]],min:-100,max:0,ticksize:10, panRange: [-100,0]},
        zoom: {
            interactive: false
        },
        pan: {
            interactive: true
        },
         grid: { hoverable: true, clickable: false,  autoHighlight: true },
        
			legend: { show: false, noColumns: 6,position:'top-right',container: $("#Legend") }
			//selection: { mode: "xy" }
    };
    var options4 = {
        series: { lines: { show: true }, shadowSize: 0 },
        xaxis: { ticks: function (v){return tick();} ,reserveSpace:true,min:2400,max:3600,ticksize:30,panRange:[0,3600]},
        yaxis: { ticks:[[30,"30Mbps"],[60,"60Mbps"],[90,"90Mbps"],[120,"120Mbps"],[150,"150Mbps"],[180,"180Mbps"],[210,"210Mbps"],[240,"240Mbps"],[270,"270Mbps"],[300,"300Mbps"]],min:0,max:300,ticksize:30, panRange: [0,300]},
        zoom: {
            interactive: false
        },
        pan: {
            interactive: true
        },
         grid: { hoverable: true, clickable: false,  autoHighlight: true },
        
			legend: { show: false, noColumns: 6,position:'top-right',container: $("#Legend") }
			//selection: { mode: "xy" }
    };

		if(flot_flag==0)
		{
			options=options1;
			
		}
		else if(flot_flag ==1)
			{
				options=options2;
			}
		else if(flot_flag ==2)
			{
				options=options3;
			}
			else if (flot_flag ==3)
				{
					options=options4;
				}
				
    var plot = $.plot(placeholder, data, options);
 


//    alert("sssssssssss");
   // add_label(plot);
//    alert("ddddddddddd");
    
    //***********************预览窗口****************************
//      var overview = $.plot($("#overview"), data, {
//        legend: { show: false },
//        series: {
//            lines: { show: true, lineWidth: 1 },
//            shadowSize: 0
//        },
//        xaxis: { mode:"time",ticks: 4 },
//        yaxis: { ticks: 3, min: 1, max: 102 },
//        grid: { color: "#999" ,clickable: false },
//        selection: { mode: "xy" }
//    });

    // now connect the two
//    
//    $("#placeholder").bind("plotselected", function (event, ranges) {
//        // clamp the zooming to prevent eternal zoom
//        if (ranges.xaxis.to - ranges.xaxis.from < 0.00001)
//            ranges.xaxis.to = ranges.xaxis.from + 0.00001;
//        if (ranges.yaxis.to - ranges.yaxis.from < 0.00001)
//            ranges.yaxis.to = ranges.yaxis.from + 0.00001;
//        
//        // do the zooming
//        plot = $.plot($("#placeholder"), data,
//                      $.extend(true, {}, options, {
//                          xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
//                          yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
//                      }));
//        
//        // don't fire event on the overview to prevent eternal loop
//        overview.setSelection(ranges, true);
//    });
//    $("#overview").bind("plotselected", function (event, ranges) {
//        plot.setSelection(ranges);
//    });
//    
    
    
   // ********************************************************
   
    
    
    
    
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
//    $('<div class="button" style="right:20px;top:20px">zoom out</div>').appendTo(placeholder).click(function (e) {
//        e.preventDefault();
//        plot.zoomOut();
//    });
   
    // and add panning buttons
    
    // little helper for taking the repetitive work out of placing
    // panning arrows
//    function addArrow(dir, right, top, offset) {
//        $('<img class="button" src="../throughput/arrow-' + dir + '.gif" style="right:' + right + 'px;top:' + top + 'px">').appendTo(placeholder).click(function (e) {
//            e.preventDefault();
//            plot.pan(offset);
//        });
//       
//    }
//		
//    addArrow('left', 55, 60, { left: -100 });
//    addArrow('right', 25, 60, { left: 100 });
//    addArrow('up', 40, 45, { top: -100 });
//    addArrow('down', 40, 75, { top: 100 });
    
    function showTooltip(x, y, contents) {
			if(x+150>window.screen.width)
				x=x-150;
        $('<div id="tooltip" >' + contents + '</div>').css( {
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
                   
//                    var sdata=[wdata1,wdata2,wdata3,wdata4,wdata5];
//                    var sname=["Strength","RSSI","Noise","Channel","Data Rate"];
//                    var sunit=["%","dBm","dBm","","Mbps"];
//                    var sstr=["<tr><td style='width:100px'>","</td><td>","</td></tr>"];
//                    var info1=get_plot_info(sdata,item,sstr,sname,sunit);
                    $("#tooltip").remove();
                    info=tips(item);
                    if(info==null)
                    {
                    	
                    	plot.unhighlight(item.series, item.datapoint);
                    	 $("#tooltip").remove();
                				previousPoint = null; 
                				
             					   return;
                    }
                    	
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    showTooltip(item.pageX, item.pageY,
                               '<table style="width:150px;">'+info+'</table>');
                }
            }
            else {
                $("#tooltip").remove();
                previousPoint = null;            
            }
});
    

       
	
}
function info_split(info,mac)
{
	var tmp;
	var i=0;
	var count=0;
	var d1=[];
	var d2=[];
	var d3=[];
	var d4=[];
	var d5=[];
//	var str = '2008-10-09 21:36:01';//PHP中对应的UNIX时间戳为1223559361
//	var new_str = str.replace(/:/g,'-');
//	new_str = new_str.replace(/ /g,'-');
//	var arr = new_str.split("-");
//	var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
//	var time_data=datum.getTime();
	
	tmp=info.split(';');
			
	if(tmp.length >=3601)
	{
		count=1;
		for(i=tmp.length-3601;i<tmp.length-1;i++)
		{
			
			if(parseInt(tmp[i].split(',')[0])==0)
			{
				d1.push(null);
				d2.push(null);
				d3.push(null);
				d4.push(null);
				d5.push(null);
				
			}
					else{	
						
				d1.push([count,tmp[i].split(',')[0]]);
				d2.push([count,tmp[i].split(',')[1]]);
				d3.push([count,tmp[i].split(',')[2]]);
				d4.push([count,tmp[i].split(',')[3]]);
				d5.push([count,tmp[i].split(',')[4]]);
			}
			count++;
		}
	}
	else if(tmp.length<3601)
		{
			
			for(i=0;i<tmp.length-1;i++)
			{			
			if(parseInt(tmp[i].split(',')[0])==0)
			{
				d1.push(null);
				d2.push(null);
				d3.push(null);
				d4.push(null);
				d5.push(null);
			}
			else{		
		d1.push([3602-tmp.length+i,tmp[i].split(',')[0]]);
		d2.push([3602-tmp.length+i,tmp[i].split(',')[1]]);
		d3.push([3602-tmp.length+i,tmp[i].split(',')[2]]);
		d4.push([3602-tmp.length+i,tmp[i].split(',')[3]]);
		if(tmp[i].split(',')[4])
		d5.push([3602-tmp.length+i,tmp[i].split(',')[4]]);
			}
		}
	}
	Strength.push({data:d1,label:mac});
	Rssi.push({data:d2,label:mac});
	Data_rate.push({data:d3,label:mac});
	Channel.push({data:d4,label:mac});
	Noise.push({data:d5,label:mac});
}



function changeflot(value)
{
	switch(value)
	{
		case '1':	
							flot_flag=0;
							show_flot();
							break;
		case '2': 
							flot_flag=1;
							show_flot();
							break;
		case '3': 
							flot_flag=2;
							show_flot();
							break;
		case '4': 
							flot_flag=3;
							show_flot();
	}
}
function get_realtime(data,realtime)
{
	var ret_time;
	var minute;
	var second;
	var hour;
	minute=parseInt(data/60);
	second=data%60;
	hour=realtime.split(':')[0]-1;
	if(hour==-1)
		hour=23;
	second=second+parseInt(realtime.split(':')[2]);
	if(second>60)
	{
		second=second%60;
			minute++;
	}
		if(second<10)
			second="0"+second;

	minute=minute+parseInt(realtime.split(':')[1]);
	if(minute>60)
	{
		minute=minute%60;
			hour++;
	}
		if(minute<10)
			minute="0"+minute;

	if(hour>=24)
		hour=hour%24;
		if(hour<10)
		hour="0"+hour;
		return ret_time=hour+":"+minute+":"+second;
}




function show_recordlist()
{
	var rethtml="";
	var i=0;
	var j=0;
	if(document.getElementById("show").value=="Show Details")
	{
			document.getElementById("record").style.display="block";
							rethtml+='<b style="font:12pt Arial,Helvetica, sans-serif;">The wireless information of Camera</b>';
								rethtml+='<table border="1px" bordercolor="#cccccc"  style="font: 10pt Arial, Helvetica, sans-serif;border-collapse:collapse;width:875px" cellspacing="0" cellpadding="0">';
								rethtml+='<tr><th>Time</th><th>Num</th><th>Signal Strength (%)</th><th>Signal Strength (dBm)</th><th>Noise Level (dBm)</th><th>Channel</th><th>Speed (Mbps)</th></tr>';
								var len=data1[0].data.length;
								for(j=0;j<len;j++)
								{
									if(data1[0].data[j]!=null){
									if(data1[0].data[j][0]>=0)
									rethtml+='<tr align="center"><td>'+get_realtime(parseInt(data1[0].data[j][0]),realtime)+'</td><td>'+data1[0].data[j][0]+'</td><td>'+data1[0].data[j][1]+'</td><td>'+data2[0].data[j][1]+'</td><td>'+data3[0].data[j][1]+'</td><td>'+data5[0].data[j][1]+'</td><td>'+data4[0].data[j][1]+'</td></tr>';
									}
								}
								rethtml+='</table>'
								document.getElementById("record").innerHTML=rethtml;
								document.getElementById("show").value="Hide Details";
	}
	else
		{
			document.getElementById("show").value="Show Details";
			document.getElementById("record").innerHTML="";
			document.getElementById("record").style.display="none";
		}
							
}

/*tableFormat
 * Version 1.0.0 -29/03/2010
 * @author Shell Chu
 * 
*/

(function($) {

$.fn.tableFormat = function(settings) 
{
	var config = {
		addButton:true,
		editButton:true,
		deleteButton:true,
		deleteAllButton:true,
		popupDIV:true,//set popupwindows popupwindow id is" $('#'+$(this).attr('id') +'_popup') "	
		DIV_height:false,
		width:200,
		tdminWidth: 30
	};
   
   if(settings){$.extend(config, settings);}
    
	var changeTbStyle = function($tb)
	{
		if($tb.hasClass('tableformat'))
		{
			$tb.children('tbody').children("tr").removeClass("odd even");
		}
		$tb.addClass("tableformat");
		$tb.find("td").addClass("tdformat");		
		$tb.find("th").addClass("tableHeader");
		$tb.find("tr:odd").addClass("odd");
		$tb.find("tr:even").addClass("even");
	}
	/* Make table columns resizable*/ 
	var cloumsResize = function($tb)
	{
		var resize = false;
		var mouseDownField,mouseDownFieldWidth,mouseDowntbWidth;
		var tbLeft = $tb.offset().left;
		var startDrag;
		//var divWidth=$tb.parent().width();
		var divWidth=config.width;
		var divHeight=config.DIV_height;
		$tb.width(divWidth).wrap("<div id='"+ $tb.attr('id')+"Div' style='overflow:auto;'></div>");
		$('#'+ $tb.attr('id') +'Div').width(divWidth);
		if(divHeight != false)
		{
			$('#'+ $tb.attr('id') +'Div').height(divHeight);
		}
		endResize = function()
		{
			if (resize == true && mouseDownField != null)
			{
				document.onselectstart = new Function("return true");
				resize = false;
				$tb.css("cursor","");
			}
			
		};//end of endResize
		
		//滑鼠移到table上的動作
		$tb.mousemove(function(e){
			
			var mouseLeft = e.clientX-tbLeft;
			//滑鼠尚未按下時，指標移到欄位邊緣會變為col-resize
			if(!resize)
			{
				var targetField = $(e.target);//抓取滑鼠點擊到的目標物件
				//var around = (mouseLeft-(targetField.offset().left - tbLeft)> targetField.width()-4);
				//滑鼠是否在欄位邊緣附近
				//$(this).css("cursor", around?"col-resize":"");
			}
			//滑鼠按下之後(resize=true)，欄寬會跟著滑鼠指標移動
			else
			{
				var disWidth = e.pageX - startDrag;
				if(mouseDownFieldWidth+disWidth > config.tdminWidth)
				{
					var index = mouseDownField.index();
					$tb.children().children('tr').each(function(){
						$(this).children().eq(index).width(mouseDownFieldWidth+disWidth);
																});
					$tb.width(mouseDowntbWidth+disWidth);
				}
				/*if(disWidth>1)
				{
				var currentWidth = mouseDownField.width();
				if(disWidth > currentWidth)//擴展欄位
				{
					var frameWidth = $tb.parent().width();//外側框架寬度
					//var total =$tb.width() - currentWidth + disWidth;
					var total =$tb.width() - mouseDownField.width() + e.clientX-tbLeft-(mouseDownField.offset().left- tbLeft) -parseInt(mouseDownField.css("padding-left")) - parseInt(mouseDownField.css("padding-right"));
						$tb.width(total);
						mouseDownField.width(disWidth);
				}
				else if(disWidth< currentWidth)//縮小欄位
				{
						mouseDownField.width(disWidth);
						var totalWidth = $tb.width()-currentWidth+disWidth;
						if (totalWidth < divWidth)//table最小寬度不能小於divWidth
						{
							$tb.width(divWidth);
						}
						else
						{
							$tb.width(totalWidth);
						}
					}
				}
				else{}*/
			}
							  }
					 );
		//end of mousemove
		
		//滑鼠按下的動作
		$tb.mousedown(function(e){
			if($(this).css("cursor")== "col-resize")
			{				
				mouseDownField = $(e.target);
				mouseDownFieldWidth = mouseDownField.width();
				startDrag = e.pageX;
				mouseDowntbWidth = $tb.width();
				resize = true;
				
				document.onselectstart= new Function ("return false");
			}
			return false;
							  });
		//end of mousedown
		
		//滑鼠離開的動作
		$tb.mouseleave(function(e){
			endResize();
			return false;
							   });
		
		//end of mouseleave
		
		//滑鼠放開的動作
		$tb.mouseup(function(e){
							 
			endResize();
			
			return false;
							});
		//end of mouseup
		
	};
	var $targetTr;
	/*Add button after table*/
	var buttonadder = function($tb)
	{
		var tbId = $tb.attr('id');
		//add button
		if(config.addButton)
		{
			$('#'+ tbId+'_buttonDiv').append('<input type="button" id="'+ tbId+'_add" class="tbFormatBtn" value="Add" >');
			//set 'add' button action
			$('#'+tbId+'_add').click(function(){
							$.blockUI({message: $('#'+tbId+'_popup'),
										css: {
												padding:	0,
												margin:		0,
												width:		'30%',
												top:		'35%',
												left:		'30%',
												textAlign:	'left',
												color:		'#000',
												'-webkit-border-radius': '4px', 
            									'-moz-border-radius': '4px',
												border:		'none',
												cursor:		'auto'
	}}
	);//end blockui
			$targetTr	= $tb.find('tr').find('td:first:empty').eq(0).parent();
															 })
		}
		//edit button
		if(config.editButton)
		{
			$('#'+ tbId+'_buttonDiv').append('<input type="button" id="'+ tbId+'_edit" class="tbFormatBtn"  value="Edit" >');
			$('#'+tbId+'_edit').click(function(){
				if(	$tb.children('tbody').children('tr').hasClass('highLight'))
				{
					var comArray=new Array();
					comArray = comparisonTitle($tb);
					//read data from table
					readData($tb,comArray);
					$.blockUI({message: $('#'+tbId+'_popup'),
										css: {
												padding:	0,
												margin:		0,
												//width:		'30%',
												top:		'35%',
												left:		'30%',
												textAlign:	'left',
												color:		'#000',
												'-webkit-border-radius': '4px', 
            									'-moz-border-radius': '4px',
												border:		'none',
												cursor:		'auto'
	}}
	);
				}
				else
				{
					alert('Please select item in the table');
				}	
															 });
		}
		//delete button
		if(config.deleteButton)
		{
			$('#'+ tbId+'_buttonDiv').append('<input type="button" id="'+ tbId+'_delete" class="tbFormatBtn" value="Delete" >');
			$('#'+tbId+'_delete').click(function(){
				if(	$tb.children('tbody').children('tr').hasClass('highLight'))
				{
					//copy tr to trclone
					var $tr = $tb.children('tbody').children('tr[class*=highLight]');
					var $trclone = $tr.clone();
					$tr.remove();
					$trclone.removeClass('highLight').children('td').html("").end()
							.appendTo($tb.children('tbody'));
					changeTbStyle($tb);
				}
				else
				{
					alert('Please select item in the table');
				}	
															 });			
		}
		//delete all button
		if(config.deleteAllButton)
		{
			$('#'+ tbId+'_buttonDiv').append('<input type="button" id="'+ tbId+'_deleteAll" class="tbFormatBtn"  value="Delete All" >');
			$('#'+tbId+'_deleteAll').click(function(){
				if(confirm('Do you sure to Dlete all?'))
				{
					$tb.children('tbody').children('tr').children('td').html("");
				}		   
															 });			
			
		}
		
	};
	
	//for Edit button , read data from highLight tr
	var readData = function($tb,comArray)
	{
		for(var comIndex = 0; comIndex < comArray.length; comIndex++)
		{
			var $tarTd = $targetTr.children('td:eq('+ comArray[comIndex] +')');
			
			//transform text to slect field
			for(var selectNum=0 ; selectNum < $tarTd.children('.s').size(); selectNum++)
			{
				//select text
				var selectText = $tarTd.children('.s:eq('+ selectNum +')').text();
				//get the compare DIV object value
				var divObjectValue = $('#'+$tb.attr('id')+'_popup').find('tr:eq('+ comIndex +')').children('td').children('select:eq('+ selectNum +')').children('option[text='+ selectText +']').val();
				//set select value
				$('#'+$tb.attr('id')+'_popup').find('tr:eq('+ comIndex +')').children('td').children('select:eq('+ selectNum +')').val(divObjectValue);
			}
			//end of select
			
			//transfrom text to text field
			for(var textNum = 0; textNum < $tarTd.children('.t').size() ; textNum++)
			{
				//select text
				var textFieldValue = $tarTd.children('.t:eq('+ textNum +')').text();	
				//set select value
				$('#'+$tb.attr('id')+'_popup').find('tr:eq('+ comIndex +')').children('td').children('input:text:eq('+ textNum +')').val(textFieldValue);				
			}
			
			//end of text
			
			//transfrom text .r to radio button
			for(var radioNum = 0; radioNum <  $tarTd.children('.r').size(); radioNum++)
			{
				//radio button checked label text
				var radioCheckText = $tarTd.children('.r:eq('+ textNum +')').text();				
				//set radio button checked
				var a = $('#'+$tb.attr('id')+'_popup').find('tr:eq('+ comIndex +')').children('td').children('label:contains('+radioCheckText+')').prev().attr("checked",true);
			}
			//end of radio button
			
			
			//hide object
			for(var hideNum = 0; hideNum < $tarTd.children().size() ; hideNum++)
			{
				var divTarget = $('#'+$tb.attr('id')+'_popup').find('tr:eq('+ comIndex +')').children('td').children().eq(hideNum);
				if($tarTd.children().eq(hideNum).css('display') == 'none' )
				{
					divTarget.hide();
				}
				else
				{
					divTarget.show();
				}
			}
			//end hide object
		}
	}
	
	var highLighttr = function($tb)
	{
		$tb.children('tbody').children('tr').click(function(){
				$(this).siblings().removeClass('highLight').end().addClass('highLight');
															});
	};
	//get the comparison title index between tb and DIV
	var comparisonTitle = function($tb)
	{
		//get total count of data
		var totalData = $('#'+$tb.attr('id') +'_popup').find('tr').size();
		//alert($thtr);
		var comArray = new Array();
		//read from DIV and write to $tb
		for(var count=0 ;count < totalData; count++)
		{			
			//get title of DIV
			var title =$('#'+$tb.attr('id') +'_popup').find('tr').eq(count).children('th').text();
			//get target object of $tb
			var $tbObject=$tb.find('tr > th:contains('+title+')');
			//get the index of tbobject
			comArray[count]=$tbObject.index();
		}
		return comArray;
	}
	
	//remove hide object of $tr
	var processHideObject = function($tr)
	{
		$tr.contents().each(function(){
			if($(this).css('display') =='none')
			{
				$(this).remove();
			}
		});
	}
	//reansform type from select to text
	var processselectObject = function($tr){
		$tr.find('select').replaceWith($(this).val());
	}
	
	//transfrom $tr to text mode 
	var transfrom = function($td)
	{		
		//get object number of $td  
		var objectNum = $td.children().size();
		var returnHtml='';
		var $returnObject = $('<td></td>');
		for(var objectIndex = 0; objectIndex < objectNum ; objectIndex++)
		{
			var $targetObject = $td.children().eq(objectIndex);
			//select option
			if( $targetObject.is('select') )
			{
				var context = $targetObject.children('option:selected').text();
				$returnObject.append('<span class="s">' + context +'</span>');
			}
			//end select option
			
			//text field
			else if( $targetObject.is(':text') )
			{
				var context = $targetObject.val();
				$returnObject.append('<span class="t">' + context +'</span>');				
				//returnHtml+='<span class="t">' + context +'</span>';
			}
			//end text field
			
			//radio button
			else if( $targetObject.is(':radio:checked') )
			{
				var context = $targetObject.next('label').text();
				$returnObject.append('<span class="r">' + context +'</span>');	
			}
			//end radio button
			
			//html text(witch MUST contain in <span>)
			else if($targetObject.is('span'))
			{
				var context = $targetObject.text();
				$returnObject.append('<span class="h">' + context +'</span>');	
			}
			//end html
			
			//hidden object
			if($targetObject.css('display') == 'none')
			{
				$returnObject.children(':last').hide();	
			}
			//end hidden object
		}
		returnHtml = $returnObject.html();
		return returnHtml;
	}
	
	//read data from DIV and copy to $tb
	var readandcopy = function($tb,comArray)
	{
		for(var count = 0 ; count< comArray.length ;count++)
		{
			if(comArray[count] != -1)
			{
				//get td in the DIV
			var $target = $('#'+$tb.attr('id') +'_popup').find('tr:eq('+ count +')').children('td');
			var trs_html = transfrom($target);
			$targetTr.children('td:eq('+ comArray[count] +')').html(trs_html);
			}		
		}
	}
	
	/*action of popup window's button(add/clear/close)*/
	var popup_button = function($tb)
	{
		/*addbuttonname: $('#'+$tb.attr('id') +'_popup_add')
			  clearbuttonname: $('#'+$tb.attr('id') +'_popup_clear')
			  closebuttonname: $('#'+$tb.attr('id') +'_popup_close')
			*/
			var comArray=new Array();
			comArray = comparisonTitle($tb);
			
			//add button
			$('#'+$tb.attr('id') +'_popup_add').click(function(){
				//find the empty <tr>
				readandcopy($tb,comArray);
				//reset the DIV
				$.unblockUI();				
				});
			//end of add button
			$('#'+$tb.attr('id') +'_popup_close').click(function(){
				$.unblockUI();				
				});
			//close button
			
			//end of close button
	}
	
    return this.each(function() 
    {
		changeTbStyle($(this));
		//set cloums resizeable
		cloumsResize($(this));
		//set table Resizeable
		//$(this).resizeable();
		if(config.addButton ||config.editButton || config.deleteButton || config.deleteAllButton)
		{	
			$(this).parent().after('<div id='+ $(this).attr('id')+'_buttonDiv></div>');
			$('#' + $(this).attr('id') +'_buttonDiv').css("padding-left", "15px");//add padding left
			buttonadder($(this));
		}
		//highlight
		highLighttr($(this));
		
		if(config.popupDIV == true)
		{
			//hide popup div
			$('#'+$(this).attr('id') +'_popup').hide();
			//popup button(add/clear/close) button
			popup_button($(this));
		}
		
		
    });
};

})(jQuery);
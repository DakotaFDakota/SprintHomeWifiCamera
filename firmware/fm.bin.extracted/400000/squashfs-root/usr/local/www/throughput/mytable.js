
function mytable_add_item(table, item_id, content)
{
	var temp = "";
	
	temp += '<tbody id=' + item_id + '>';
	temp += content;
	temp += '</tbody>';
	
	table.append(temp);
}

function mytable_edit_item(table, item_id, content)
{
	table.children('tbody[id=' + item_id + ']').html("");
	table.children('tbody[id=' + item_id + ']').append(content);
}

function mytable_delete_item(table, item_id)
{
	table.children('tbody[id=' + item_id + ']').remove();
}

function mytable_item_exist(table, item_id)
{
	if (document.getElementById(item_id))
	{
		return true;
	}
	return false;
}

function mytable_fresh(table, mywidth)
{
	table.tableFormat({  
					 addButton:false,
					 editButton:false,
					 deleteButton:false,
					 deleteAllButton:false, 
					 //ascroll:false, 
					 //vscroll:false,
					 width:mywidth
					 }); 
}

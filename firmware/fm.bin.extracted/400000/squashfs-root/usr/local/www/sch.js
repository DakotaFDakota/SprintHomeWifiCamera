// schedule java-script library

var msg_duplicated_period	= "The schedule is exists in schedule list.";
var msg_too_many_periods	= "No more space for save the period.";

var sch_separator			= ";";
var sch_separator_item		= ",";
var modal_separator		= "$$-$$";
var schedule_use_action		= 0;

function select_chk_dupl(obj, value)
{
	var i;

	for (i=0; i<obj.options.length; i++) {
		if (obj.options[i].value == value) {
			alert(msg_duplicated_period);
			return true;
		}
	}
	return false;
}

function select_add_item(obj, text, value)
{
	var i;

	i = select_chk_dupl(obj, value);
	if (i) {
		return false;
	}

	if (obj.options.length >= max_schedule_item) {
		alert(msg_too_many_periods);
		return false;
	}

	obj.options[obj.options.length] = new Option(text, value);
	return true;
}

function select_del_item(obj)
{
	if (chkSelected(obj, msg_noperiod_selected)) {
		if (confirm(msg_delperiod)) {
			var length = obj.options.length -1;
			while(length >=0){
				if(obj[length].selected == true){
					obj.options[length] = null;
				}
				length--;
			}
			return true;
		}
	}
	return false;
}

function select_show_items(obj, list)
{
	var i;
	var str;

	do {
		if ((null == list) || (list.length <= 0)) {
			break;
		}

		i = list.indexOf(sch_separator);
		if (i < 0) {
			val = list;
			list = null;
		} else {
			val = list.substr(0, i);
			list = list.substr(i+1, list.length-i-1);
		}

		select_add_item(obj, "", val);
	} while(true);

	return;
}

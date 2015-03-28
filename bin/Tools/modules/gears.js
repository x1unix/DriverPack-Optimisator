// { REGION [Syntax-sugar] }
function isset(variable)
{
	if (typeof(variable) === 'undefined' || variable === null)
	{
	    return false;
	}
	else
	{
		return true;
	}
}

function str_replace ( search, replace, subject ) {	// Replace all occurrences of the search string with the replacement string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: Gabriel Paderni

	if(!(replace instanceof Array)){
		replace=new Array(replace);
		if(search instanceof Array){//If search	is an array and replace	is a string, then this replacement string is used for every value of search
			while(search.length>replace.length){
				replace[replace.length]=replace[0];
			}
		}
	}

	if(!(search instanceof Array))search=new Array(search);
	while(search.length>replace.length){//If replace	has fewer values than search , then an empty string is used for the rest of replacement values
		replace[replace.length]='';
	}

	if(subject instanceof Array){//If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
		for(k in subject){
			subject[k]=str_replace(search,replace,subject[k]);
		}
		return subject;
	}

	for(var k=0; k<search.length; k++){
		var i = subject.indexOf(search[k]);
		while(i>-1){
			subject = subject.replace(search[k], replace[k]);
			i = subject.indexOf(search[k],i);
		}
	}

	return subject;

}
function array_push ( array ) {	// Push one or more elements onto the end of array
	var i, argv = arguments, argc = argv.length;

	for (i=1; i < argc; i++){
		array[array.length++] = argv[i];
	}

	return array.length;
}

// { END [Syntax-sugar] }


// Common constants
var IMGRES			= "tools/ico";
var NF_INFORMATION 	= IMGRES+"/info.png";
var NF_PERFORMANCE 	= IMGRES+"/perf.png";
var NF_ERROR 		= IMGRES+"/error.png";
var NF_SUCCESS 		= IMGRES+"/success.png";
var NF_ALERT 		= IMGRES+"/alert.png";
var OPT_VERSION 	= "0.1.16";
var APP_FULL_VER	= "0.1.16-snapshot (28.03.2015)";

var TWEAKS_LIST;
var ERROR_LEVEL 	= 0;
//$() Analog
function id(item){return document.getElementById(item);}


var UI = function(){}

UI.clearItem = function(itm)
{
	id(itm).innerHTML = "";
}

//Generate random ID
UI.genID = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//Remove element by id
UI.removeID = function(val)
{
	return (elem=document.getElementById(val)).parentNode.removeChild(elem);
}

UI.bigWindow = function()
{
	window.resizeTo(800,600);
}
UI.appContent = function()
{
	return id("app-content");
}



UI.TwInstaller = function(){}
UI.TwInstaller.list = new Array();
UI.TwInstaller.tweaks = new Array();
UI.TwInstaller.getInformation = function(tw_id)
{
	id("tweak-title").innerHTML = tw_id.tw_name;
	id("tweak-desc").innerHTML  = tw_id.tw_desc;
}
UI.TwInstaller.draw = function()
{
	id("ui-content").innerHTML = '<table class="t2"><tr><td class="in-table"><table class="ui-table-header"><tr><td class="td_checkbox"><input type="checkbox" id="mark_all" onclick="UI.TwInstaller.MarkAll();"/></td><td class="td_name"><span>Имя</span></td><td class="td_author"><span>Автор</span></td><td class="td_last"></td></tr></table><div class="ui-table-container" id="ui-table-container"></div></td><td class="in-value"><p id="tweak-title"><b></b></p><p id="tweak-desc"></p><p><img src="tools/ico/info.png" height="48" width="48" class="left" />Возможно, вам потребуется перезагрузить компьютер после установки этой надстройки.</p></td></tr></table><div class="opt_footer"><div class="right"><span id="tweaks-selected">Твики не выбраны</span><button onclick="UI.TwInstaller.InstallTweaks();">Установить</button><button onclick="UI.appContent.load();">Отмена</button></div></div></div>';

}


UI.TwInstaller.load = function(){
	id("app_version").innerHTML = "";
	UI.appContent.setTitle("Выберите твики, которые вы хотите установить");
	UI.clearItem("top-notification");
	UI.clearItem("top-loader");
	UI.TwInstaller.list = Optimiser.Sort.ByCategory(Optimiser.AvailableTweaks());
	UI.TwInstaller.draw();
	var counter = 0;
	console.log("begining");
	for(var z = 0; z < UI.TwInstaller.list.length; z++)
	{
		console.log("Reading UI.TwInstaller.list["+z+"]");
		var cont = UI.TwInstaller.list[z];
		if(cont.length > 0)
		{
			console.log("Adding Category ["+z+"], "+cont.length+"");
			UI.TwInstaller.addCategory(Optimiser.Categories[z],cont.length);

			var buf = UI.TwInstaller.openList();
			for(var c = 0; c < cont.length; c++)
			{
				array_push(UI.TwInstaller.tweaks,cont[c]);
				//UI.TwInstaller.tweaks.push(cont[c]);
				buf += UI.TwInstaller.addItem(cont[c].tw_name, cont[c].author, counter);
				counter++;
			}
			buf += UI.TwInstaller.closeList();
			id("ui-table-container").innerHTML += buf;
		}
		else
		{
			console.log("No items in ["+z+"], "+cont.length+"");
		}
	}
	var all = id("ui-table-container").getElementsByTagName("input");
	/*for(var c = 0; c < all.length; c ++)
	{
			all[c].addEventListener ("CheckboxStateChange", UI.TwInstaller.checkboxCheckedEvent, false);
	}*/
	UI.TwInstaller.getInformation(UI.TwInstaller.tweaks[0]);



}


UI.TwInstaller.addCategory = function(cat, e_count)
{
	id("ui-table-container").innerHTML += '<div class="table-group"><span>'+cat+' ('+e_count.toString()+')</span><button class="up"></button></div>';
}

UI.TwInstaller.openList = function(){
	return '<table class="table-list">';
}
UI.TwInstaller.closeList = function(){
	return '</table>';
}
UI.TwInstaller.addItem = function(i_name, i_auth, i_id)
{
	return '<tr><td class="td_checkbox"><input type="checkbox" name="'+i_id.toString()+'" onclick="UI.TwInstaller.checkboxCheckedEvent();"/></td><td class="td_name" onclick="UI.TwInstaller.extractInfo('+i_id+');"><span>'+i_name+'</span></td><td class="td_author"><span>'+i_auth+'</span></td><td class="td_last"></td></tr>'
}
UI.TwInstaller.extractInfo = function(id)
{
	UI.TwInstaller.getInformation(UI.TwInstaller.tweaks[id]);
}

UI.TwInstaller.MarkAll = function()
{
	
	var all = id("ui-table-container").getElementsByTagName("input");
	for(var c = 0; c < all.length; c ++){all[c].checked = id("mark_all").checked;}
		UI.TwInstaller.checkboxCheckedEvent();
}
UI.TwInstaller.getCheckboxes = function()
{
	return id("ui-table-container").getElementsByTagName("input");
}
UI.TwInstaller.getCheckedCount = function(all)
{
	var count = 0;
	for(var c = 0; c < all.length; c ++){
		if(all[c].checked == true)
		{
			count++;
		}	
	}
	return count;
}
UI.TwInstaller.checkboxCheckedEvent = function(){
	var count = 0;
	var all = id("ui-table-container").getElementsByTagName("input");
	for(var c = 0; c < all.length; c ++){
		if(all[c].checked == true)
		{
			count++;
		}	
	}

	if(count > 0)
	{
		id("tweaks-selected").innerHTML = "Твиков выбрано: "+count.toString();
	}
	else
	{
		id("tweaks-selected").innerHTML = "Твики не выбраны";
	}
}

UI.TwInstaller.InstallTweaks = function()
{
 var all = UI.TwInstaller.getCheckboxes();
 var buf = "";
 if(UI.TwInstaller.getCheckedCount(all) > 0)
 {
 	UI.appContent.setTitle("Оптимизация системы");
 	UI.appContent.drawWait("Выполняется применение изменений, подождите");
 	for(var c = 0; c < all.length; c++)
	 {
	 	if(all[c].checked == true)
	 	{
	 		//buf += c+": "+UI.TwInstaller.tweaks[c].tw_name+"\n";
	 		console.log("Applying "+UI.TwInstaller.tweaks[c].tw_name+"...");
	 		try{
	 			UI.TwInstaller.tweaks[c].setValue();
	 		}
	 		catch(e)
	 		{
	 			console.log("Error "+e);
	 			ERROR_LEVEL++;
	 		}

	 	}
	 }
	// setTimeout(function()
	// {
	 	UI.clearItem("top-loader");
	 	if(ERROR_LEVEL > 0)
	 	{
	 		var success 	= new UI.notification(NF_ERROR, "fail");
			 success.title 	= "Завершено, но с ошибками";
			 success.body 	= "Произошла ошибка при применении некоторых твиков. Некоторые твики могли быть не применены. Попробуйте повторить позже.";
			 success.draw();
	 	}
	 	else
	 	{
	 		var success 	= new UI.notification(NF_SUCCESS, "success");
			 success.title 	= "Оптимизация завершена";
			 success.body 	= "Выбраные твики были успешно установлены и применены. Для того, чтобы изменения вступили в силу, необходимо перезагрузить Windows.";
			 success.draw();
	 	}
	//},150);

 }
 else
 {
 	alert("Выберите хотя-бы один твик");
 }
 /*for(var c = 0; c < UI.TwInstaller.tweaks.length; c++)
 {
 	buf += c+": "+UI.TwInstaller.tweaks[c].tw_name+"\n";
 }*/

}


//Set content Title
UI.appContent.setTitle = function(str)
{
	id("ui-title").innerHTML = str;
}


// { REGION [NOTIFICATIONS] } 
//Base class for notification
UI.notification = function(nf_icon, nf_type)
{
	if(isset(nf_type) == true)
	{
		this.type  =  nf_type;
	}
	else
	{
		this.type  =  "common";
	}

	if(isset(nf_icon) == true)
	{
		this.icon  =  nf_icon;
	}
	else
	{
		this.icon  =  NS_INFORMATION;
	}
	
	this.title 				=  "";
	this.body 				=  "";
	this.actionBar 			= [];
	
	this.id         		= UI.genID();
}
UI.notification.prototype.closeButton = false;
UI.notification.prototype.setTitle = function(title)
{
	this.title = title;
}
UI.notification.prototype.addButton = function(butn)
{
	array_push(this.actionBar, butn);
}
UI.notification.prototype.close = function()
{
	UI.removeID(this.id);
}
UI.notification.prototype.setText = function(val)
{
	this.body  = "<p>"+val+"</p>";
}
UI.notification.prototype.HTML = function()
{
	//Create an notification handler DIV
	var notify 		  = 	new HotNode("div");
		notify.class("notification n-"+this.type);
		notify.id(this.id);

	//Create notification body
	var n_body = new HotNode("table");
	var n_tr   = new HotNode("tr");

	//If we have icon, create icon on notification
	if(this.icon != "none")
	{
		var n_icon = new HotNode("td");
			n_icon.class("notification-icon");

		var n_img  = new HotNode("img");
			n_img.setAttribute("src", this.icon);
			n_img.class("left");
			n_img.pairTag = false;

			n_icon.insertNode(n_img);
			n_tr.insertNode(n_icon);
	}

	//Create notification text
	var n_text  	 = 	new HotNode("td");
		n_text.class("notification-text");

		if(this.title != "")
		{
			var n_title = new HotNode("h1");
				n_title.setNode(this.title);
				n_text.insertNode(n_title);
		}

		n_text.addNode(this.body);

		var nt_footer = new HotNode("p"); 

		if(this.closeButton == true){
			var xbtn = new HotNode("button");
			xbtn.class("link right");
			xbtn.setNode("Закрыть");
			xbtn.setAttribute("onclick","UI.removeID('"+this.id+"');");
			nt_footer.insertNode(xbtn);
		}
		//Close button

		//Add rest of buttons
		if(this.actionBar.length > 0)
		{
			
			for(var c = 0; c < this.actionBar.length; c++)
			{
				var b = this.actionBar[c];
				b.class("link right");
				nt_footer.insertNode(b);
			}
		}

		n_text.insertNode(nt_footer);
		n_tr.insertNode(n_text);
		n_body.insertNode(n_tr);

		notify.insertNode(n_body);
		return notify.HTML();
}
UI.notification.prototype.draw = function()
{
	var h = id("top-notification");
	h.innerHTML = this.HTML();
}
// { END [NOTIFICATIONS] } 


UI.appContent.drawNotification = function(val)
{
	var h = id("top-notification");
	h.innerHTML = val.HTML();
}

//Draw ajax loader
UI.appContent.drawWait = function(val)
{

	UI.clearItem("top-notification");
	UI.clearItem("ui-content");
	var h = id("top-loader");
	h.innerHTML = "<img src=\"tools/load8.gif\" height=\"16\" width=\"16\"/>"+val;
}

//Easy one-click install
UI.TwInstaller.easyInstall = function(){
	UI.clearItem("top-notification");
	UI.clearItem("ui-content");
	UI.appContent.setTitle("Оптимизация системы");
 	UI.appContent.drawWait("Выполняется применение изменений, подождите");


 	 for(var c = 0; c < TWEAKS_LIST.length; c++)
	 {
	 	var cc = c + 1;
	 	UI.appContent.drawWait("Выполняется применение изменений: "+TWEAKS_LIST[c].tw_name+" ("+cc+" из "+TWEAKS_LIST.length+")");
	 	console.log("Applying "+TWEAKS_LIST[c].tw_name+"...");
	 	try{
	 		TWEAKS_LIST[c].setValue();
	 	}
	 	catch(e)
	 		{
	 			console.log("Error "+e);
	 			ERROR_LEVEL++;
	 		}

	 }

	//setTimeout(function(){
		 UI.clearItem("top-loader");
	 	if(ERROR_LEVEL > 0)
	 	{
	 		var success 	= new UI.notification(NF_ERROR, "fail");
			 success.title 	= "Завершено, но с ошибками";
			 success.body 	= "Произошла ошибка при применении некоторых твиков. Некоторые твики могли быть не применены. Попробуйте повторить позже.";
			 success.draw();
	 	}
	 	else
	 	{
	 		var success 	= new UI.notification(NF_SUCCESS, "success");
			 success.title 	= "Оптимизация завершена";
			 success.body 	= "Выбраные твики были успешно установлены и применены. Для того, чтобы изменения вступили в силу, необходимо перезагрузить Windows.";
			 success.draw();
	 	}
	//},100);


}

UI.feedback = function(){
	UI.appContent.setTitle("Отправить отзыв о продукте");
	UI.clearItem("top-notification");
	UI.clearItem("ui-content");
	UI.clearItem("top-loader");

	var fb = new HotNode("div");
	var text = new HotNode("p");
	text.setNode("Мы благодарим Вас за использование программы Оптимизатор. Данная программа находится на стадии разработки и тестирования, поэтому в ней возможны некоторые недоработки и баги. Вы можете помочь нам в усовершенствовании программы, сообщив нам с помощью формы обратной связи о найденых багах и недочетах.")

	var text2 = new HotNode("p");
	text2.setNode("Пожалуйста заполните форму ниже:<br /><br />");
	fb.insertNode(text);
	fb.insertNode(text2);

	var p3 = new HotNode("p");
	var fbtable = new HotNode("table");
	fbtable.setAttribute("class","fb_table");
	fbtable.setNode("<tr><td class=\"td_first\"><b class=\"red\">* </b>Ваше имя: </td><td><input type=\"text\" id=\"fb_name\" /></td></tr><tr><td class=\"td_first\"><b class=\"red\">* </b>Ваш email: </td><td><input type=\"text\" id=\"fb_email\" /></td></tr><tr><td class=\"td_first\"><b class=\"red\">* </b>Ваша оценка продукта: </td><td><input type=\"text\" id=\"fb_rate\" /></td></tr>");
	p3.insertNode(fbtable);
	var fb_txt = new HotNode("p");
	fb_txt.setNode("<b class=\"red\">* </b><b>Ваше сообщение:</b>");
	
	var fb_message = new HotNode("textarea");
	fb_message.setAttribute("id","fb_message");

	var fb_footer = new HotNode("p");
	fb_footer.setAttribute("id","fb_footer");
	fb_footer.setNode("<button onclick=\"UI.sendFeedback();\">Отправить</button><button onclick=\"UI.appContent.load();\">Отмена</button>");


	fb.insertNode(p3);
	fb.insertNode(fb_txt);
		fb.insertNode(fb_message);
		fb.insertNode(fb_footer);
	id("ui-content").innerHTML = fb.HTML();
}
function is_empty(uid)
{

	var l =id(uid).value;

	var x = l.length;
	if(x==0&&l != "undefined"){
		return true;
	}
	else{
		return false;
	}
}
UI.OSVersion = function(){




}
UI.sendFeedback = function(){
	if(!is_empty("fb_name")&&!is_empty("fb_email")&&!is_empty("fb_rate")&&!is_empty("fb_message")){

				submit_feedback();
	}
	else
	{
		alert("Заполните пожалуйста все поля в форме.");
	}
}
function submit_feedback()
{
	//encodeURI()
	var os_string = navigator.appVersion;
	var params = "name="+encodeURIComponent(id("fb_name").value)+"&rate="+encodeURIComponent(id("fb_rate").value)+"&mail="+encodeURIComponent(id("fb_email").value)+"&message="+encodeURIComponent(id("fb_message").value)+"&appversion="+encodeURIComponent(APP_FULL_VER)+"&os="+encodeURIComponent(os_string);

	var xhr;
	UI.appContent.drawWait("Отправка формы, подождите пожалуйста");
		UI.clearItem("top-notification");
	UI.clearItem("ui-content");

	if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {

	UI.clearItem("top-loader");

        //$("#feedback_body").html("<span class=\"fail\">Your browser doesn't support AJAX :(. Mail me at <u class=\"wait\">ascii@live.ru</u></span>");	
        	var success 	= new UI.notification(NF_ERROR, "fail");
			 success.title 	= "Ошибка при отправке";
			 success.body 	= "Ваша система не поддерживает технологию AJAX. Требуется установленный Internet Explorer 5 и выше.";
			 success.draw();
    }

	xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	        	UI.clearItem("top-loader");
	            if (xhr.status == 200 && xhr.status < 300) {
	                //document.getElementById('div1').innerHTML = xhr.responseText;
	                //$("#feedback_body").html(xhr.responseText);
	               /* var success 	= new UI.notification("tools/ico/feedback.png", "success");
					 success.title 	= "Сообщение отправлено";
					 success.body 	= "Ваша система не поддерживает технологию AJAX. Требуется установленный Internet Explorer 5 и выше.";
					 success.draw();*/
					 id("top-notification").innerHTML = xhr.responseText;
	            }
	            else
	            {
	            	        	var success 	= new UI.notification(NF_ERROR, "fail");
								 success.title 	= "Сообщение не отправлено";
								 success.body 	= "Возникла ошибка при отправке. Проверте ваше соединение с Интернет и попробуйте позже.";
								 success.draw();
	            }
	        }

	    }
	UI.appContent.drawWait("Отправка формы, подождите пожалуйста");	
	xhr.open('POST', 'http://sedchenko.tk/optimisator/feedback.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   // setTimeout(function(){
    	xhr.send(params);
    	//},250);
/*$("#feedback_body").css("background","transparent");
$("#feedback_body").html("<span class=\"wait\">Sending your feedback, one moment...</span>");	
setTimeout(function(){$("#feedback_body").html("<span class=\"success\">Feedback has been send. Thank you!</span>");},1000);*/
}
UI.appContent.load = function()
{
	TWEAKS_LIST = Optimiser.AvailableTweaks();
	id("app_version").innerHTML = APP_FULL_VER;
	UI.clearItem("top-notification");
	UI.clearItem("ui-content");
	UI.appContent.setTitle("Оптимизация производительности компьютера");
	UI.appContent.drawWait("Оценка производительности системы, подождите пожалуйста");

	//setTimeout(function(){
		UI.clearItem("top-loader");
		
		var all = TWEAKS_LIST;
		if(all.length == 0)
		{

		 var success 	= new UI.notification(NF_SUCCESS, "success");
		 success.title 	= "Система полностью оптимизирована";
		 success.body 	= "На данном компьютере применены все доступные твики для повышения производительности.";
		 success.closeButton = false;
		 success.draw();
		}
		else
		{
			var success 	= new UI.notification(NF_PERFORMANCE, "success");
		 	success.title 	= "Ваш компьютер может работать быстрее";
		 	success.body 	= "Для вашего компьютера доступны новые твики. Вы можете выбрать каждый твик по отдельности или установить все сразу нажав на кнопку «Установить все»";
		 	success.closeButton = false;
		 	var installAll = new HotNode("button");
		 	installAll.setNode("Установить все ("+all.length+")");
		 	installAll.setAttribute("onclick","UI.TwInstaller.easyInstall();");

		 	var manInstall = new HotNode("button");
		 	manInstall.setNode("Выбрать твики для установки");
		 	manInstall.setAttribute("onclick","UI.TwInstaller.load();");

		 	success.addButton(installAll);
		 	success.addButton(manInstall);


		 	success.draw();
		}

	//},100);
}




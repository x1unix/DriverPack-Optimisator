// DriverPack Optimiser

//Commit by odin3 : http://github.com/odin3



//WshShell для JavaScript
var WsShell = new ActiveXObject("WScript.Shell");



//Класс определяет параметр для оптимизации
var OptParameter = function(path,val,reg_type,tw_name,tw_desc, tw_cat){
this.path 		= path;this.val = val;
this.tw_name 	= tw_name; this.tw_desc = tw_desc;
this.reg_type 	= reg_type;
this.category   = tw_cat;
/*
 ======= TWEAK CATEGORIES =======

 0. System
 1. Applications
 2. Memory
 3. Hard Drive
 4. Networking


 */
}
OptParameter.prototype.category = 0;
OptParameter.prototype.author = "DriverPack Solution";
//Записать значение
OptParameter.prototype.setValue = function(){
try{WsShell.RegWrite(this.path,this.val,this.reg_type);}
catch(e){alert(e);}
}
//Получить значение
OptParameter.prototype.getValue =function(){
	var vl;
	try{
	vl = WsShell.RegRead(this.path).toString();
	}
	catch(e){
		vl = "null";
	}
	return vl;
}
//Удалить
OptParameter.prototype.remValue =function(){
	return WsShell.RegDelete(this.path);
}


//Класс оптимизатора
var Optimiser = function(){
};
//Коллекция твиков
Optimiser.Tweaks = [];
//Добавить твик к коллекции
Optimiser.AppendTweak = function(optparamener){Optimiser.Tweaks.push(optparamener);}
Optimiser.Categories = new Array("Система", "Процессы и приложения", "Оперативная память", "Жесткий диск", "Сеть и Интернет", "Безопасность");
Optimiser.AvailableTweaks = function(){
	var _return = [];
	for (var i = Optimiser.Tweaks.length - 1; i >= 0; i--) {
		var cur_val = Optimiser.Tweaks[i].getValue();
		if(cur_val != Optimiser.Tweaks[i].val){
			_return.push(Optimiser.Tweaks[i]);
		}
	};
	return _return;

}
Optimiser.Sort = function(){};
Optimiser.Sort.ByCategory = function(arr){
	var cats = new Array();
	var current_category = 0;
	for(var e = 0; e < Optimiser.Categories.length; e++)
	{
		cats[e] = new Array();
	}
	for(var c = 0; c < arr.length; c++)
	{
		cats[arr[c].category].push(arr[c]);
	}
	return cats;

}
Optimiser.InstallTweak = function(wt_id,div_id){
	var av_twk = this.AvailableTweaks();
	var confirm = window.confirm("Активировать выбраный параметр: '"+av_twk[wt_id].tw_name+"'?");
	if(confirm){
		av_twk[wt_id].setValue();
		document.getElementById(div_id).style.display = "none";
	}
}


var HKLM = 0x80000002; 
var HKCU = 0x80000001; 
//---------------------------------------------------------------- 
// function : regCreateKey(strComputer, strRegPath, strKey) 
// 
//  purpose :  
//             
//---------------------------------------------------------------- 
function regCreateKey(strComputer, strRegPath, strKey) 
{ 
  var bFound             = false; 
  var arrSubKeys         = new Array(); 
  var objLocator         = new ActiveXObject("WbemScripting.SWbemLocator"); 
  var objService         = objLocator.ConnectServer(strComputer, "root\\default"); 
  var objReg             = objService.Get("StdRegProv"); 
  var objMethod          = objReg.Methods_.Item("EnumKey"); 
  var objInParam         = objMethod.InParameters.SpawnInstance_(); 
  objInParam.hDefKey     = HKCU; 
  objInParam.sSubKeyName = strRegPath; 
  var objOutParam        = objReg.ExecMethod_(objMethod.Name, objInParam); 
  if(objOutParam.ReturnValue == 0) 
  { 
    arrSubKeys = objOutParam.sNames.toArray(); 
    for (var idx=0;idx<arrSubKeys.length;idx++) 
    { 
      var strName = arrSubKeys[idx].toUpperCase(); 
      if ( strName == strKey.toUpperCase() ) { bFound = true } 
    } 
 
    if ( bFound == false) 
    { 
      var objMethod          = objReg.Methods_.Item("CreateKey"); 
      var objInParam         = objMethod.InParameters.SpawnInstance_(); 
      objInParam.hDefKey     = HKCU; 
      objInParam.sSubKeyName = strRegPath + "\\" + strKey; 
      objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
      return objOutParam.ReturnValue; 
    } 
    return -1 
  } 
  return -1; 
} 
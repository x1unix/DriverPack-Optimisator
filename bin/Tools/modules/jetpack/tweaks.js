// DriverPack Optimiser

//Commit by odin3 : http://github.com/odin3

var AXShell = new ActiveXObject("wscript.shell");

//AdBlock
var AdBlock = function(){};
AdBlock.tw_name = "Блокировка рекламы";
AdBlock.tw_desc = "Убирает показ рекламы на сайтах и приложениях";
AdBlock.path = "HKEY_CURRENT_USER\\Control Panel\\Desktop\\DRPBlockAds";
AdBlock.KeyType = "REG_SZ";

AdBlock.category = 4;
AdBlock.author = "DriverPack Solution";
//Hosts File Location
AdBlock.HostFile = AXShell.ExpandEnvironmentStrings("%SYSTEMROOT%")+"\\System32\\drivers\\etc\\hosts";

//Ad Hosts List
//"http://hosts-file.net/.%5Cad_servers.txt","http://sysctl.org/cameleon/hosts",,"http://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext"
AdBlock.Hosts = ["http://hosts-file.net/.%5Cad_servers.txt","http://winhelp2002.mvps.org/hosts.txt","http://hosts-file.net/.%5Cad_servers.txt"];
AdBlock.val = "1";
//Install
AdBlock.setValue = function()
{
var h_hosts = new ActiveXObject("Scripting.FileSystemObject");
var o_hosts = h_hosts.OpenTextFile(this.HostFile,8,true);

o_hosts.WriteBlankLines(2);
o_hosts.WriteLine("# === DRIVERPACK AD BLOCKER ===\n");
o_hosts.WriteBlankLines(1);

var req = new ActiveXObject("Msxml2.XMLHttp.6.0");

for (var i = this.Hosts.length - 1; i >= 0; i--) {
	req.open("GET",this.Hosts[i],false);
	req.send
	if(req.Status == 200)
	{
		//var t_out = str_replace("127.0.0.1 ","\n\n127.0.0.1 ",req.responseText);
		o_hosts.WriteLine(req.responseText);
	}
};

// Close the stream
o_hosts.Close();

var i = regCreateKey(".", "Control Panel\\Desktop", "DRPBlockAds");
try{
	AXShell.RegWrite("HKEY_CURRENT_USER\\Control Panel\\Desktop\\DRPBlockAds","1","REG_SZ");
}
catch(e){alert(e);}
alert("Реклама успешно заблокирована");

}
//Check
AdBlock.getValue = function()
{
	var vl;
	try
	{
	vl = WsShell.RegRead("HKEY_CURRENT_USER\\Control Panel\\Desktop\\DRPBlockAds").toString();
	}
	catch(e){
		vl = "null";
		//alert(e);
	}
	return vl;
}


//Коллекция твиков для оптимизатора
/*
 ======= TWEAK CATEGORIES =======

 0. System
 1. Applications
 2. Memory
 3. Hard Drive
 4. Networking
 5. Security


 */

var tw_AlwaysUnloadDLL 				= new OptParameter("HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Explorer\\AlwaysUnloadDLL","1","REG_SZ","Автоматическая выгрузка DLL","Используйте этот ключ для автоматической выгрузки всех DLL используемых программой когда она завершает работу. Данный параметр включен, то объем оперативной памяти увеличится.",0);
var tw_AutoEndTasks 				= new OptParameter("HKEY_CURRENT_USER\\Control Panel\\Desktop\\AutoEndTasks","1","REG_SZ","Автозакрытие зависших программ","Используется для автоматического закрытия без всякого предупреждения всех зависших программ",1);
//var tw_StartShowDelay				= new OptParameter("HKEY_CURRENT_USER\\Control Panel\\Desktop\\MenuShowDelay","150","REG_SZ","Ускорение открытия меню 'Пуск'","Ускорение открытия меню 'Пуск' путем уменьшения интервала его открытия.",0);
var tw_WaitToKillServiceTimeout		= new OptParameter("HKEY_CURRENT_USER\\Control Panel\\Desktop\\WaitToKillServiceTimeout","5000","REG_SZ","Интервал завершения работы сервиса","Служит для уменьшения временного интервала, в течении которого Windows ожидает перед остановкой сервиса, в том числе и зависшего. Ускоряет процесс завершения работы.",1);
var tw_WaitToKillAppTimeout 		= new OptParameter("HKEY_CURRENT_USER\\Control Panel\\Desktop\\WaitToKillAppTimeout","5000","REG_SZ","Интервал завершения работы приложения","Служит для уменьшения временного интервала, в течении которого Windows ожидает перед закрытием приложения, в том числе и зависшего. Ускоряет процесс завершения работы.",1);
var tw_HungAppTimeout 				= new OptParameter("HKEY_CURRENT_USER\\Control Panel\\Desktop\\HungAppTimeout","5000","REG_SZ","Интервал ожидания ответа программы","Сокращает время, которое ожидает диспечер задач Windows перед закрытием зависшей, не отвечающей на запросы программы.",1);
var tw_AutoReboot					= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\CrashControl\\AutoReboot","1","REG_DWORD","Автоперезагрузка при BSOD","Используется для автоматической перезагрузки системы после краха Windows.",0);
var tw_AutoRestartShell 			= new OptParameter("HKEY_CURRENT_USER\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon\\AutoRestartShell","1","REG_DWORD","Автоперезагрузка оболочки","Включает автоматический перезапуск оболочки и проводника ('explorer.exe') после краха ил зависания.",0);
var tw_DisablePagingExecutive		= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\DisablePagingExecutive","1","REG_DWORD","Не вытеснять код ядра в файл подкачки","Для ускорения производительности оставляет исполняемый код ядра резидентным в памяти вместо вытеснения его по мере необходимости в файл подкачки.",2);
var tw_IOPageLockLimit 				= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\IOPageLockLimit","1000","REG_DWORD","Увеличить лимит записи страниц подкачки","Эта установка увеличит число страниц,которые система будет читать или писать на жесткий диск за один раз. Исходя из этого должна вырости производительность.",3);
var tw_LargeSystemCache 			= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\LargeSystemCache","1","REG_DWORD","Увеличить системный кэш","Рекомендовано, если вы имеете 256МБ ОЗУ и больше.",0);
var tw_NtfsDisableLastAccessUpdate	= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem\\NtfsDisableLastAccessUpdate","1","REG_DWORD","Не обновлять метку времени последнего доступа","При использовании этой опции файловая система NTFS не будет обновлять метки времени последнего доступа к каждому файлу или папке. Данный параметр увеличит производительность вашей дисковой подсистемы.",3);
var tw_EnableUDMA66 				= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E96A-E325-11CE-BFC1-08002BE10318}\\0000\\EnableUDMA66","1","REG_DWORD","Включить UDMA66","Включение поддержки UDMA-66 для вашего винчестера увеличит его производительность и уменьшит нагрузку на процессор при дисковых операциях",3);
//var tw_AutoRun 						= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Cdrom\\AutoRun","0","REG_DWORD","Отключить автозапуск","Предотвращает автозапуск только что вставленного CD / DVD, а также разгружает процессор от обязаности  проверять каждую секунду привод компакт-диска.",0);
var tw_ClearPageFileAtShutdown 		= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\ClearPageFileAtShutdown","1","REG_DWORD","Очищать файл подкачки при завершении работы","Эта установка повышает защиту компьютера. Перед каждым завершением работы ваш своп-файл будет очищатся. А из него при желании можно извлечь многое, например последние редактируемые документы, пароди и т.п.д.",5);
var tw_MenuShowDelay				= new OptParameter("HKEY_CURRENT_USER\\Control Panel\\Desktop\\MenuShowDelay","1","REG_SZ","Интервал при раскрытии окон","Сокращает паузу при раскрытии окон",0);



var tw_PromptPasswordOnResume	= new OptParameter("HKEY_CURRENT_USER\\Software\\Policies\\Microsoft\\Windows\\System\\Power\\PromptPasswordOnResume","1","REG_DWORD","Пароль после ждущего режима","Позволяет настроить систему таким образом, чтобы при включении компьютера после Ждущего режима появлялось диалоговое окно с приглашением ввести пароль",5);
var tw_Win32PrioritySeparation	= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl\\Win32PrioritySeparation","6","REG_DWORD","Повышение приоритета активным приложениям","Приложения в Windows работают как в активном режиме, так и в фоновом. Если хотите, чтобы активные приложения получали больше ресурсов, тем самым работали быстрее, то в активируйте данный твик.",1);

//Only Vista or Higher
var tw_EnableSuperfetch			= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters\\EnableSuperfetch","0","REG_DWORD","Отключить Superfetch","Отключение Superfetch позволит экономить больше оперативной памяти",2);
var tw_EnablePrefetcher			= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters\\EnablePrefetcher","0","REG_DWORD","Отключить Prefetcher","Отключение Prefetcher позволит экономить больше оперативной памяти",2);

//HDD
var tw_NtfsDisable8dot3NameCreation	= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem\\NtfsDisable8dot3NameCreation","1","REG_DWORD","Отключить таблицу совместимости","При использовании этой опции ОС Windows не будет создавать в разделе NTFS специальную таблицу для совместимости со старыми приложениями, содержащую все имена файлов и папок (данного логического диска), представленные в формате MS-DOS (8 символов в имени и 3 символа в разширении файла). В настоящее время подобная специфика NTFS не является актуальной, поэтому эту особенность желательно отключить для увеличения производительности",3);
var tw_NtfsMemoryUsage				= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem\\NtfsMemoryUsage","2","REG_DWORD","Увеличить кеш для файловой системы","Включение данного параметра позволяет повысить производительность дисковой файловой системы.",3);
var tw_NtfsDisableEncryption 		= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem\\NtfsDisableEncryption","1","REG_DWORD","Отключить Зашифрованную файловую систему","Зашифрованная файловая система (Encrypting File System - EFS) позволяет вам засекретить данные на разделе формата NTFS, но она также добавляет некоторую задержку к времени работы процессора компьютера и может влиять на производительность некоторых приложений, особенно SQL-сервера. Вы можете запретить пользователям зашифровывать их файлы при помощи этой настройки. Эта настройка действует на всех пользователей компьютера. Необходимо перезагрузить компьютер для вступления изменений в силу.",3);

//var tw_NtfsDisable8dot3NameCreation	= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem\\NtfsDisable8dot3NameCreation","1","REG_DWORD","Отключить таблицу совместимости","",3);


var tw_CDPrefetch					= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem\\CDFS\\Prefetch","4000","REG_DWORD","Увеличить CDFS Prefetch кеш","Опция позволяет увеличить размер Prefetch кеша, резервируемого для CD/DVD-ROM. Параметр позволит повысить скорость чтения с привода.",3);
var tw_CDPrefetchTail				= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem\\CDFS\\PrefetchTail","4000","REG_DWORD","Увеличить CDFS Prefetch Tail кеш","Опция позволяет увеличить размер Prefetch Tail кеша, резервируемого для CD/DVD-ROM. Параметр позволит повысить скорость чтения с привода.",3);
//var tw_CDCacheSize					= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\FileSystem\\CDFS\\CacheSize","ff ff 00 00","REG_BINARY","Увеличить кеш CDFS","Опция позволяет увеличить размер кеша, резервируемого для CD/DVD-ROM. Параметр позволит повысить скорость чтения с привода.",3);

// Security
var tw_restrictanonymous			= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Lsa\\restrictanonymous","1","REG_DWORD","Отключить просмотр общих ресурсов анонимным пользователям","Отключить просмотр общих ресурсов анонимным пользователям. Повышает безопасность компьютера. Рекомендуется включить.",5);
var tw_AutoShareWks					= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters\\AutoShareWks","0","REG_DWORD","Отключить 'расшаренные' административные ресурсы","Отключает удаленный доступ к административным ресурсам C$, D$, ADMIN$ Повышает безопасность компьютера. Рекомендуется включить.",5);
var tw_NoInstrumentation 			= new OptParameter("HKEY_CURRENT_USER\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Policies\\Explorer\\NoInstrumentation","1","REG_DWORD","Отключить слежение за пользователем","Этот параметр запрещает системе выполнять слежение за тем, какие программы вызывает пользователь, какие папки просматривает и какие документы открывает. Эти сведения используются для настройки некоторых возможностей Windows, например сокращенных меню.",5);
var tw_RemoteRegistry				= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\RemoteRegistry","4","REG_DWORD","Отключить сетевой доступ к реестру","Отключает возможность для сетевых пользователей изменять настройки реестра этого компьютера. Для увеличения уровня безопасности системы рекомендуется включить эту настройку. Эта настройка действует на всех пользователей этого компьютера. Для применения настройки необходимо перезагрузить компьютер.",5);


//Оптимизация TCP
var tw_TCPWindowSize 				= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\TCPWindowSize","2238","REG_DWORD","Увеличить размер окна TCP","Увеличивает размер окна для приема TCP-пакетов, предлагаемый ОС. Окно приема определяет кол-во байтов, которые отправитель может передать, не получая подтверждения.",4);
var tw_EnablePMTUDiscovery 			= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\EnablePMTUDiscovery","1","REG_DWORD","Включить автоопределение MTU","Включение этой опции заставляет TCP автоматически определять MTU.",4);
var tw_DefaultTTL 					= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\DefaultTTL","128","REG_DWORD","Увеличить стандартный TTL","TTL определяет максимальное время, которое пакет IP может прожить в сети, не достигая адресата.",4);
var tw_SackOpts 					= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\SackOpts","1","REG_DWORD","Включить поддержку SACK","Когда поддержка SACK включена и пакет или ряд пакетов TCP потеряны, то получатель может сообщить отправителю точно,какие данные были получены и где находится дыра в данных.",4);
var tw_Tcp1323Opts					= new OptParameter("HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Tcp1323Opts","3","REG_DWORD","Активировать поддержку больших TCP окон","Совместно с опцией 'Размер окна TCP/IP', включает поддержку больших TCP-окон. Это особенно актуально для сетей с большой пропускной способностью.",4);

//Добавление твиков в оптимайзер
//Optimiser.Tweaks = [AdBlock,tw_AlwaysUnloadDLL,tw_AutoEndTasks,tw_WaitToKillServiceTimeout,tw_WaitToKillAppTimeout,tw_HungAppTimeout,tw_AutoReboot,tw_AutoRestartShell,tw_DisablePagingExecutive,tw_IOPageLockLimit,tw_LargeSystemCache,tw_NtfsDisableLastAccessUpdate,tw_EnableUDMA66,tw_AutoRun,tw_ClearPageFileAtShutdown,tw_TCPWindowSize,tw_EnablePMTUDiscovery,tw_DefaultTTL,tw_SackOpts,tw_Tcp1323Opts,tw_MenuShowDelay, tw_NtfsDisable8dot3NameCreation,tw_CDPrefetch,tw_CDPrefetchTail,tw_CDCacheSize,tw_PromptPasswordOnResume,tw_restrictanonymous,tw_AutoShareWks, tw_StartShowDelay, tw_Win32PrioritySeparation, tw_EnableSuperfetch, tw_EnablePrefetcher, tw_NtfsMemoryUsage, tw_NoInstrumentation, tw_RemoteRegistry, tw_NtfsDisableEncryption];
Optimiser.Tweaks = [AdBlock,tw_AlwaysUnloadDLL,tw_AutoEndTasks,tw_WaitToKillServiceTimeout,tw_WaitToKillAppTimeout,tw_HungAppTimeout,tw_AutoReboot,tw_AutoRestartShell,tw_DisablePagingExecutive,tw_IOPageLockLimit,tw_LargeSystemCache,tw_NtfsDisableLastAccessUpdate,tw_EnableUDMA66,tw_ClearPageFileAtShutdown,tw_TCPWindowSize,tw_EnablePMTUDiscovery,tw_DefaultTTL,tw_SackOpts,tw_Tcp1323Opts,tw_MenuShowDelay, tw_NtfsDisable8dot3NameCreation,tw_CDPrefetch,tw_CDPrefetchTail,tw_PromptPasswordOnResume,tw_restrictanonymous,tw_AutoShareWks, tw_Win32PrioritySeparation, tw_EnableSuperfetch, tw_EnablePrefetcher, tw_NtfsMemoryUsage, tw_NoInstrumentation, tw_RemoteRegistry, tw_NtfsDisableEncryption];
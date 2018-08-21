/***
 *
 * EasyWindow v1.1
 *
 * This js has realized the relationship and control between windows.
 *
 */





//获得窗体容器页面，递归取parent iframe并取变量是否直到找到为止,顶层窗体有isWindowContainer变量
function getWindowContainer(w){
	if(w==undefined){
		w=window;
	}
	if(w.isWindowContainer!=undefined && w.isWindowContainer==true){
		return w;
	}else{
		return getWindowContainer(w.parent);
	}
}

//窗体容器页面window对象
var windowContainer = null;

//以下变量在窗体容器页面调用openWindow()方法时值会为undefined,只有已弹出的窗体中弹出子窗体时才会有值
var currentWindowId = null;//本窗体id
var parentWindowId = null;//父窗体id
var windowParam = null;
var parentWindow = null;


function sayHello(){
	alert("hello world!");
}

$(document).ready(function(){

	//初始化

	//获得窗体容器页面window对象，便于访问其变量及方法，该变量始终有值
	windowContainer = getWindowContainer();

	currentWindowId = windowContainer.lastOpenedWindowId;//取得本窗体的id
	parentWindowId = windowContainer.lastOpenEventWindowId;//取得父窗体的id

	if(parentWindowId){
		windowParam = windowContainer.windowParam;
		parentWindow = windowContainer.document.getElementById(parentWindowId).getElementsByTagName("iframe")[0].contentWindow;

	}

});





//打开窗体，调用方法openWindow('windowId',param);
function openWindow(){

	//打开窗体的时候，调用window-api，传入窗体id及参数

	var p = arguments;
	var toWindowId = p[0];
	var param = null;

	//设置窗体容器全局变量，当前打开的窗体id，用于打开的窗体iframe内得到自己的id。
	windowContainer.lastOpenedWindowId=toWindowId;
	windowContainer.lastOpenEventWindowId=currentWindowId;
	if(arguments.length==2){//如果有参数传递的话
		param = p[1];
	}
	windowContainer.windowParam=param;

	windowContainer.apiOpenWindow(toWindowId);
}

//窗体关闭前动作，需要在窗体关闭前执行代码，可在页面内重定义该方法覆盖该方法，并返回状态
function onWindowClose(){return true;}//默认实现

//关闭本窗体
function closeWindow(){
	//执行WindowContainer里的关闭窗体方法，传入currentWindowId窗体id
	$(windowContainer.document).find("#"+currentWindowId).find(".win-close-btn")[0].click();

}

//关闭父窗体
function closeParent(){
	if(parentWindow){
		parentWindow.closeWindow();
	}
}

//向父窗体返回值，父窗体页面需要实现returnDataProcess方法
function returnData(dataObject){

	if(parentWindow){
		parentWindow.returnDataProcess(dataObject);
	}
}

//根据窗体id访问已打开的窗体
function getWindow(windowId){
	if(id){
		return windowContainer.document.getElementById(windowId).getElementsByTagName("iframe")[0].contentWindow;

		//return $(windowContainer.document).find("#"+windowId).find("iframe").eq(0)[0].contentWindow;
	}else{
		return null;
	}
}

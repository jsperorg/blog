
var currentQueryButton = null;
var queryid = null;
var currentQueryBoxId = null;
function queryBoxClick(queryBox){

	
	if(currentQueryButton != null){
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	var queryButton = queryBox.parentNode.getElementsByTagName('input')[1];
	queryButton.style.display = 'block';
	queryButton.style.width="16px";
	queryButton.style.height="16px";
	currentQueryButton = queryButton;
}



if(window.attachEvent){
	  document.attachEvent("onclick",hiddenQueryButton);
}else if(window.addEventListener){
	  document.addEventListener("mousedown",hiddenQueryButton);
}

function hiddenQueryButton(e){

	var evt=(window.event || e);//获得事件
	var evtsrc = (evt.srcElement || evt.target);
	
	if(currentQueryButton != null && evtsrc.className != "querybox" && evtsrc.className != "innerfinder"){
		currentQueryButton.style.display = 'none';
		currentQueryButton = null;
	}
	
}




//页面加载完成后执行
winui.onDOMContentLoaded(function(){
	
	var qbs = winui.getElements("div","type","querybox");
	//alert(qbs.length);
	for(var i=0;i<qbs.length;i++){
		
		var temp_html = qbs[i].innerHTML;
		
		var append_html = "<input type=\"button\" class=\"innerfinder\"/><div class=\"floatclear\"></div>";
		//window.parent.openWindow('"+open_target+"');
		qbs[i].innerHTML = temp_html + append_html;
		var input0 = qbs[i].getElementsByTagName("input")[0];
		var input1 = qbs[i].getElementsByTagName("input")[1];
		input1.onclick=function(e){
			var evt=(window.event || e);//获得事件
			var evtsrc = (evt.srcElement || evt.target);
			var onquery = evtsrc.parentNode.getAttribute("onquery");
			currentQueryBoxId = evtsrc.parentNode.getElementsByTagName("input")[0].id;
			eval(onquery);
			
		};
		input0.setAttribute("onclick","queryBoxClick(this)");
		input0.className = "querybox";//
		
		
		
	}
	
	
});








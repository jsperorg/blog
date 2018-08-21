
/**
 * 全局winui对象
 */
var winui = {};

/**
 * 获得浏览器类型函数
 * 返回字符串值
 */
winui.getBrowserType = function(){
  //浏览器检测相关对象
  var ua = navigator.userAgent.toLowerCase();//获得浏览器信息
  var browser=null;
  if(/msie/.test(ua) && !/opera/.test(ua)){
    browser="ie";
  }
  if(/opera/.test(ua)){
    browser="opera";
  }
  if(/version.*safari/.test(ua)){
    browser="safari";
  }
  if(/chrome/.test(ua)){
    browser="chrome";
  }
  if(/gecko/.test(ua) && !/webkit/.test(ua)){
    browser="firefox";
  }
  
  return browser;
};



/**
 * 初始化处理函数
 * 本函数相当于IE的window.onload，Firefox的onDOMContentLoaded，与JQuery的document.ready(function(){...});同理。
 * 即页面载入完后执行一些初始化动作，如遍历DOM设置样式、注册事件、初始化数据等
 * onready:传入要执行的函数名
 * config:一些配置信息
 */
winui.onDOMContentLoaded = function(onready,config){
	
	//浏览器检测相关对象
    var ua = navigator.userAgent.toLowerCase();//获得浏览器信息
    var browser = {
      ie: /msie/.test(ua) && !/opera/.test(ua),//匹配IE浏览器
      opera: /opera/.test(ua),//匹配Opera浏览器
      safari: /version.*safari/.test(ua),//匹配Safari浏览器
      chrome: /chrome/.test(ua),//匹配Chrome浏览器
      firefox: /gecko/.test(ua) && !/webkit/.test(ua)//匹配Firefox浏览器
    };
    //设置是否在FF下使用DOMContentLoaded（在FF2下的特定场景有Bug）
    this.conf = {enableMozDOMReady:true};  
    if( config )  
    for( var p in config)  
        this.conf[p] = config[p];  
  
    var isReady = false;  
    function doReady(){  
        if( isReady ) return;  
        //确保onready只执行一次  
        isReady = true;  
        onready();  
    }  
    //IE
    if( browser.ie ){  
    	/*
        (function(){  
            if ( isReady ) return;  
            try {  
                document.documentElement.doScroll("left");  
            } catch( error ) {  
                setTimeout( arguments.callee, 0 );  
                return;  
            }  
            doReady();  
        })();  
        */
        window.attachEvent('onload',doReady);  
    }  
    //Webkit
    else if ((browser.opera || browser.safari || browser.chrome) && browser.version < 525){  
        (function(){  
            if( isReady ) return;  
            if (/loaded|complete/.test(document.readyState))  
                doReady();  
            else  
                setTimeout( arguments.callee, 0 );  
        })();  
        window.addEventListener('load',doReady,false);  
    }  
    //FF Opera 高版webkit 其他 
    else{  
        if( browser.ff || browser.version != 2 || this.conf.enableMozDOMReady)  
            document.addEventListener( "DOMContentLoaded", function(){  
                document.removeEventListener( "DOMContentLoaded", arguments.callee, false );  
                doReady();  
            }, false );  
        window.addEventListener('load',doReady,false);  
    }  
	
};


/**
 * 根据标记名、属性名、属性值查找DOM
 * tagName:传入的标记名称
 * atributeName:传入的属性名称
 * atributeValue:传入的属性的值
 * 用法示例：var array = winui.getElements("DIV","type","window");
 * <div type="window">...</div>
 * 返回:集合
 */
winui.getElements = function(tagName,atributeName,atributeValue){
	
	var doms = document.getElementsByTagName(tagName);
	var array = [];
	for(var i=0;i<doms.length;i++){
		var value = doms[i].getAttribute(atributeName);
		if(value == atributeValue){
			array[array.length] = doms[i];
		}
	}
	return array;
		
};





/**
 * 查找DOM下的下级节点（不包括孙节点），返回数组
 * 该函数只对dom节点下一级标记节点有效
 * dom:传入的dom对象
 * 用法示例：var children = winui.getChildren(document.getElementById("mydiv"));
 * <div type="window">...</div>
 * 返回:数组
 */
winui.getChildren = function(dom){
	
	var cn = dom.childNodes;
	
	var array = [];
	for(var i=0;i<cn.length;i++){
		if(cn[i].nodeType==1 && cn[i].parentNode==dom){
			array[array.length] = cn[i];
		}
	}
	return array;
};



/**
 * 查找DOM下指定的下级节点（查找时不会遍历孙节点），返回DOM
 * 该函数只对dom节点下一级标记节点有效
 */
winui.getChild = function(dom,index){
	
	var cn = dom.childNodes;
	var count = -1;
	for(var i=0;i<cn.length;i++){
		if(cn[i].nodeType==1 && cn[i].parentNode==dom){
			count++;
			if(index==count){
				return cn[i];
			}
		}
	}
};


/**
 * 获取元素在父节点下的下标（元素必须是父节点的下一级节点），返回数字
 */
winui.getIndex = function(dom){
	
	var cn = dom.parentNode.childNodes;
	var index = -1;
	for(var i=0;i<cn.length;i++){
		if(cn[i].nodeType==1){
			index+=1;
			if(cn[i]==dom){
				return index;
			}
		}
		
		
	}

};



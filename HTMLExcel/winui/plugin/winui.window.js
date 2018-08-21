



//hashMap数据结构 用于窗体间传值
function hashMap(){
	var map = {
			put 	 : function(key,value){this[key] = value;},
			get 	 : function(key){return this[key];},
			contains : function(key){return this.get(key) == null?false:true;},
			remove 	 : function(key){delete this[key];}
			};
	return map;
}

	

/*********** lightbox S ********************/

	
		
		function lightbox(parObj){
			
			this.isIE = (document.all) ? true : false;
			this.isIE6 = lightbox.isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
			this.Lay =  document.body.insertBefore(document.createElement("div"), document.body.childNodes[0]);
			this.Lay.setAttribute("name","window_cover");
			this.Color = (parObj != undefined ? parObj.Color : "#000");
			this.Opacity = (parObj != undefined ? parObj.Opacity :40);
			this.zIndex = (parObj != undefined ? parObj.zIndex : 200);
			
			
			//兼容ie6
			if(this.isIE6){ 
			
				this.Lay.style.position = "absolute";
				//ie6设置覆盖层大小程序
				this._resize = function(){
					this.Lay.style.width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
					this.Lay.style.height = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
				};
				
			}
			

			//遮盖select
			this.Lay.innerHTML = '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);opacity:0;"></iframe>';
			///yyexamid/blank.html
			//显示
			this.Show=function() {
				with(this.Lay.style){ display = "none"; zIndex = this.zIndex; left = top = 0; position = "fixed"; width = height = "100%"; }
				
				
				if(this.isIE6){ 
					this._resize();
					window.attachEvent("onresize", this._resize);
				}
		
				//设置样式
				with(this.Lay.style){
					//设置透明度
					this.isIE ? filter = "alpha(opacity:" + this.Opacity + ")" : opacity = this.Opacity / 100;
					
					//如果是IE10，则和其他类型浏览器一样使用标准滤镜代码
					if(/MSIE\s+10.0/i.test(navigator.userAgent)
				    && (function() {"use strict";return this === undefined;}())){
						opacity = this.Opacity / 100;
					}
					
					
					backgroundColor = this.Color; display = "block";
				}
			  };
			
		  //关闭
		  this.Close=function() {
			  try{
				  
				  var ifr = this.Lay.getElementsByTagName("iframe");
				  for(var i=0;i<ifr.length;i++){
					  ifr[i].style.display="none";
				  }
			  }catch(e){}
			this.Lay.style.display = "none";
			if(this.isIE6){ window.detachEvent("onresize", this._resize); }
		  };
			
			
			
		}
		
		
		


	/***
	 * 窗体-lightbox 映射存储器
	 * 内容为弹出的窗体和其对应的lightbox的映射关系
	 * key弹出的窗体的id
	 * value为对应的lightbox对象
	 */
	var lightboxMap = new hashMap();


	

/*********** lightbox E ********************/





















/***
 * 记录弹出窗体的map对象
 * 内容为子窗体与父窗体的映射关系
 * key为子窗体DIV的id
 * value为父窗体DIV的id
 */
var openerMap = new hashMap();




/**
 * 窗体间传值函数
 * 描述：在弹出的多级窗体里选择值后调用本函数调用弹出窗体页面（父窗体）处理函数处理选中的值对象
 * 接受并处理值的窗体（父窗体）必须实现deliverValue(child,valueObject)函数，用于接收并处理来自弹出的窗体传进来的值对象
 * 函数会根据传入的child(被弹出窗体DIV的id)调用map所对应的“父窗体DIV的id”进而调用窗体内的传值函数
 * 
 * 窗体间传值说明：
 * 
 * 传给弹窗：
 * 父窗体调用window.parent.openWindow("子窗体ID","父窗体ID","值对象");
 * 子窗体body之后实现取值：window.parent.valueMap.get("子窗体ID");//注意，这里是子窗体ID
 * 
 * 弹窗回传：
 * 父窗体调用window.parent.openWindow("子窗体ID","父窗体ID")弹出窗体
 * 父窗体实现deliverValue("值对象")函数，取得子窗体传入的值
 * 子窗体里选中值后调用window.parent.deliverValue("本窗体ID","值对象")将值传给父窗体，注意这里是本窗体ID
 * 
 * @param 子窗体DIV的id,值
 * @returns
 */
function deliverValue(child,valueObject){
	document.getElementById(openerMap.get(child)).getElementsByTagName("iframe")[0].contentWindow.deliverValue(valueObject);
}

/***
 * 根据窗体id获得窗体的document，以便调用其全局变量或函数。
 * 用法：window.parent.window("windowId").aaa();
 * @param windowId
 * @returns
 */
function getWindow(windowId){
	return document.getElementById(windowId).getElementsByTagName("iframe")[0].contentWindow;
}

//根据ID修改窗体标题函数
function setWindowTitle(windowId,title){
	document.getElementById(windowId).getElementsByTagName("span")[0].innerHTML=title;
}

//访问父窗体
function getParentWindow(childId){
	if(openerMap.get(childId)==null||openerMap.get(childId)==""){
		return null;
	}else{
		return document.getElementById(openerMap.get(childId)).getElementsByTagName("iframe")[0].contentWindow;
	}
}


//访问父窗体
function getParentWindow(childId){
	if(openerMap.get(childId)==null||openerMap.get(childId)==""){
		return null;
	}else{
		return document.getElementById(openerMap.get(childId)).getElementsByTagName("iframe")[0].contentWindow;
	}
}



//portal顶层页面访问右侧iframe内窗体
function getRightIframeWindow(windowId){
	return document.getElementById("rightiframe").contentWindow.document.getElementById(windowId).getElementsByTagName("iframe")[0].contentWindow;
}



/***
 * 记录向弹出窗体传入的值
 * key为子窗体DIV的id
 * value值
 * 当弹出窗体的目标页面加载完毕后会调用此map取得需要传过去的值
 */
var valueMap = new hashMap();






function getBrowserType(){
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
}

/* 
 * 注册浏览器的DOMContentLoaded事件 
 * @param { Function } onready [必填]在DOMContentLoaded事件触发时需要执行的函数 
 * @param { Object } config [可选]配置项 
 */  
function onDOMContentLoaded(onready,config){  
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
    /*IE*/  
    if( browser.ie ){  
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
        window.attachEvent('onload',doReady);  
    }  
    /*Webkit*/  
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
    /*FF Opera 高版webkit 其他*/  
    else{  
        if( browser.ff || browser.version != 2 || this.conf.enableMozDOMReady){

            document.addEventListener( "DOMContentLoaded", function(){
                document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
                doReady();
            }, false );
            window.addEventListener('load',doReady,false);
        	
        }
    }
}  

	var winui_window_cwi = 3005;//当前最上层窗体的层级值（z-index）
	var currentWindow = null;
	function dragWindow(evt){
		
	    var evtsrc=(evt.srcElement || evt.target);

	    //alert(evt);
	    var win = evtsrc.parentNode.parentNode.parentNode;
	    
	    
	    //win.focus();
	    //currentWindow=win;
		if(win.getAttribute("drawable")=="false"){
			return false;
		}else{
			
		    //以下为了解决拖拽标题栏，速度过快时窗体停顿问题：
		    evtsrc.style.height="200px";
		    evtsrc.style.position="absolute";
		    evtsrc.style.marginTop="-100px";
		    evtsrc.style.paddingTop="100px";
		    //evtsrc.style.border="1px solid red";
		    var ifr = win.getElementsByTagName("iframe");
		    if(ifr.length>0) ifr[0].style.display="none";//隐藏窗体内的iframe
			
			win.style.zIndex = winui_window_cwi++;
			  if(evt.button!=2){
		      //var win = (evt.srcElement || evt.target).parentNode.parentNode;//获取事件源对象
		      //if(win.getAttribute("type")!=null && win.getAttribute("type")=="window"){
		        var x,y;
		        
		        var mwidth=0;
		        var mheight=0;
		        //如果是平台页，窗体可拖拽区域面积=1024*768，否则为
		        if(window.openedPages != undefined){
		        	mwidth=10220;
		        	mheight=7240;
		        }else{
		        	mwidth=8590;
		        	mheight=6630;
		        }
		        
		        //如果是IE浏览器
		        if(getBrowserType()=="ie"){
		          x = evt.clientX-parseInt(win.style.marginLeft);
		          y = evt.clientY-parseInt(win.style.marginTop);
		          document.onmousemove=function(){
		        	  win.style.marginLeft=(window.event.clientX - x)+"px";
		        	  win.style.marginTop=(window.event.clientY - y)+"px";
		        	  
		        	  //控制拖拽到顶边时不不再移动
		        	  var mt = parseInt(win.style.marginTop);
		        	  var ml = parseInt(win.style.marginLeft);
		        	  var w = parseInt(win.style.width);
		        	  var h = parseInt(win.style.height);
		        	  if(mt<1) win.style.marginTop="0px";
		        	  if(ml<1) win.style.marginLeft="0px";
		        	  
		        	  
		        	  
		        	  if(mt>(mheight-h)) win.style.marginTop=(mheight-h)+"px";
		        	  if(ml>(mwidth-w)) win.style.marginLeft=(mwidth-w)+"px";
		          };
		          
		        }else{
		          x = evt.pageX - parseInt(win.style.marginLeft);
		          y = evt.pageY - parseInt(win.style.marginTop);
		          document.onmousemove=function(event){
		        	  win.style.marginLeft = (event.pageX - x) + "px";
		        	  win.style.marginTop = (event.pageY - y) + "px";
		        	  
		        	//控制拖拽到顶边时不不再移动
		        	  var mt = parseInt(win.style.marginTop);
		        	  var ml = parseInt(win.style.marginLeft);
		        	  var w = parseInt(win.style.width);
		        	  var h = parseInt(win.style.height);
		        	  if(mt<1) win.style.marginTop="0px";
		        	  if(ml<1) win.style.marginLeft="0px";
		        	  if(mt>(mheight-h)) win.style.marginTop=(mheight-h)+"px";
		        	  if(ml>(mwidth-w)) win.style.marginLeft=(mwidth-w)+"px";
		          };
		        }
		      document.onmouseup = function(){
		    	  document.onmousemove = null;
		    	//还原标题栏拖拽区域的样式  
		    	evtsrc.style.height="20px";
		  	    evtsrc.style.position="relative";
		  	    evtsrc.style.marginTop="0px";
			    evtsrc.style.paddingTop="0px";
			    var ifr = win.getElementsByTagName("iframe");
			    if(ifr.length>0) ifr[0].style.display="block";
		      };
		      //}
		    }
		}
	    
	}

	
	
	
	
	function bindCloseButtonEvent(windowId,model){

  	  //不同的窗体模型点击叉叉按钮时，执行模式不同
  	  switch(model){
  	  	
  	  	//常规
  	  	case 'general':
  	  		closeWindow(windowId);
  	  		break;

  	  	//消息
  	  	case 'alert':
  	  		//调用确定按钮的方法
  	  		var btns = document.getElementById(windowId).getElementsByTagName("input");
  	  		for(var i=0;i<btns.length;i++){
  	  			if(btns[i].value=="确定"){
  	  				btns[i].onclick();
  	  			}
  	  		}
  	  		break;

  	  	//确认
  	  	case 'confirm':

  	  		//调用取消按钮的方法
  	  		var btns = document.getElementById(windowId).getElementsByTagName("input");
  	  		for(var i=0;i<btns.length;i++){
  	  			if(btns[i].value=="取消"){
  	  				btns[i].onclick();
  	  			}
  	  		}
  	  		break;

  	  	//录入
  	  	case 'prompt':
	    		 
  	  		break;
	    			  
  	  }
  	  
	}
	
	

	
	/***
	 * 画窗体函数
	 * @param windowDiv 要画的窗体div的ID
	 * @param model 模型，general、alert、confirm、prompt等
	 * @returns {Boolean} 画成功结束，返回true
	 */
	function drawWindow(windowDiv,model){
		

    	
	      windowDiv.style.position="absolute";
	      
	      if(windowDiv.getAttribute("width")!=null){
	        windowDiv.style.width=windowDiv.getAttribute("width")+"px";
	      }else{
	        windowDiv.style.width="400px";
	      }
	      
	      try{
	    	  windowDiv.style.boxShadow="4px 4px 2px -2px #aaa";//窗体边框阴影
	      }catch(e){}
	      
	      if(windowDiv.getAttribute("height")!=null){
	        windowDiv.style.height=windowDiv.getAttribute("height")+"px";
	      }else{
	        windowDiv.style.height="300px";
	      }
	      
	      if(windowDiv.style.marginLeft=="" || windowDiv.style.marginLeft==null){
	        windowDiv.style.marginLeft= "100px";
	      }
	      if(windowDiv.style.marginTop=="" || windowDiv.style.marginTop==null){
	        windowDiv.style.marginTop= "150px";
	      }
	      
	      //设置外围边框样式
	      windowDiv.style.borderTop="1px solid #D4D0C8";
	      windowDiv.style.borderLeft="1px solid #D4D0C8";
	      windowDiv.style.borderRight="1px solid #404040";
	      windowDiv.style.borderBottom="1px solid #404040";
	      
	      //窗体内围边框
	      var window_inside_start = "<div style=\"border-top:1px solid #FFFFFF;border-left:1px solid #FFFFFF;border-right:1px solid #808080;border-bottom:1px solid #808080;\">";
	      var window_inside_end = "</div>";
	      
	      
		  //标题栏蓝色渐变背景样式
		  var titlebar_background = "filter:progid:DXImageTransform.Microsoft.gradient(startcolorstr=#0A246A,endcolorstr=#A6CAF0,gradientType=1);";//IE6颜色渐变
		  titlebar_background += "-ms-filter:progid:DXImageTransform.Microsoft.gradient(startcolorstr=#0A246A,endcolorstr=#A6CAF0,gradientType=1);";//IE7/8颜色渐变
		  titlebar_background += "background:-moz-linear-gradient(left, #0A246A, #A6CAF0);";//兼容Mozilla浏览器颜色渐变
		  titlebar_background += "background:-webkit-gradient(linear, 0% 100%, 100% 100%, from(#0A246A), to(#A6CAF0));";//兼容Webkit浏览器颜色渐变
		  titlebar_background += "background:-ms-linear-gradient(left, #0A246A, #A6CAF0);";//兼容IE10及以上颜色渐变
		  
		  
		  
	      var titlebar_start = "<div oncontextmenu='return false;' style='"+titlebar_background+"width:"+(parseInt(windowDiv.style.width)-2)+"px;height:20px;color:#fff;font-size:12px;font-weight:bold;'>";
	      var titlebar_between = "";
	      var titlebar_end = "</div>";
	      var content = "";
	      
	      if(windowDiv.getAttribute("icon")!=undefined){
	        titlebar_between = "<img onselectstart='function(){return false}' onmousedown='function(){return false};' src='"+windowDiv.getAttribute("icon")+"' style=\"vertical-align:middle;float:left;width:16px;height:16px;border:0px;margin-left:2px;margin-top:2px;\"/>"+titlebar_between;
	      }
	      
	      var titleBarOtherConpentWidth = 8;
	      if(windowDiv.getAttribute("icon")!=undefined){
	        titleBarOtherConpentWidth+=18;
	      }
	      if(windowDiv.getAttribute("closeable")!="false"){
	        titleBarOtherConpentWidth+=14;
	      }
	      titlebar_between = titlebar_between+"<span style='vertical-align:middle;float:left;width:"+(parseInt(windowDiv.style.width)-titleBarOtherConpentWidth-2)+"px;line-height:20px;margin-left:2px;cursor:default;' onmousedown='javascript:var evt=(window.event || arguments[0]);dragWindow(evt);'>"+windowDiv.title+"</span>";
	      windowDiv.title="";
	      
		  
		  
		  //初始标题栏右上角按钮样式
		  var button_outside_init_style = "float:right;width:15px;height:14px;border-top:1px solid #FFF;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;font-weight:bold;color:#000;background:#D4D0C8;margin-right:2px;margin-top:2px;cursor:default;";
		  var button_inside_init_style = "width:13px;height:12px;border-top:1px solid #D4D0C8;border-left:1px solid #D4D0C8;border-right:1px solid #808080;border-bottom:1px solid #808080;";
		  
		  //鼠标按下后按钮样式
		  var button_outside_mousedown_style = "this.style.borderTop='1px solid #404040';this.style.borderLeft='1px solid #404040';this.style.borderRight='1px solid #FFFFFF';this.style.borderBottom='1px solid #FFFFFF';";
		  var button_inside_mousedown_style = "this.style.borderTop='1px solid #808080';this.style.borderLeft='1px solid #808080';this.style.borderRight='1px solid #D4D0C8';this.style.borderBottom='1px solid #D4D0C8';var insd = this.getElementsByTagName('div')[0];insd.style.marginBottom='-1px';insd.style.marginRight='-1px';";
		  
		  
	      if(windowDiv.getAttribute("closeable")!="false"){
	    	  
	    	  //不同的窗体模型点击叉叉按钮时，执行模式不同
	    	  switch(model){
	    	  	
	    	  	//常规
	    	  	case 'general':
	    	  		
	    	  		titlebar_between = titlebar_between+"<div style=\""+button_outside_init_style+"\" onmousedown=\""+button_outside_mousedown_style+"\" onmouseup=\"this.style.cssText='"+button_outside_init_style+"'\" onmouseout=\"this.style.cssText='"+button_outside_init_style+"'\" onclick=\"bindCloseButtonEvent(this.parentNode.parentNode.parentNode.id,'general');\"><div style=\""+button_inside_init_style+"\" onmousedown=\""+button_inside_mousedown_style+"\" onmouseup=\"this.style.cssText='"+button_inside_init_style+"'\"><div style='font-family:Arial;text-align:center;font-size:12px;font-weight:bold;'>✕</div></div></div>";
	    	  		break;

	    	  	//消息
	    	  	case 'alert':
	    	  		titlebar_between = titlebar_between+"<div style=\""+button_outside_init_style+"\" onmousedown=\""+button_outside_mousedown_style+"\" onmouseup=\"this.style.cssText='"+button_outside_init_style+"'\" onmouseout=\"this.style.cssText='"+button_outside_init_style+"'\" onclick=\"bindCloseButtonEvent(this.parentNode.parentNode.parentNode.id,'alert');\"><div style=\""+button_inside_init_style+"\" onmousedown=\""+button_inside_mousedown_style+"\" onmouseup=\"this.style.cssText='"+button_inside_init_style+"'\"><div style='font-family:Arial;text-align:center;font-size:12px;font-weight:bold;'>✕</div></div></div>";
	    	  		break;

	    	  	//确认
	    	  	case 'confirm':
	  	    		 
	    	  		break;

	    	  	//录入
	    	  	case 'prompt':
	  	    		 
	    	  		break;
	  	    			  
	    	  }
	    	  
	    	  
	        
	      }
	      
	      
	      
	      
	      
	      
	      
	      var contentareaWidth = parseInt(windowDiv.style.width)-2;
	      var contentareaHeight = parseInt(windowDiv.style.height)-2-20;
	      
	      if(windowDiv.getAttribute("src")!=undefined){
	    	//  src=\""+windowDiv.getAttribute("src")+"\"
	    	  var framescrolling=" scrolling='no' ";
	    	  if(windowDiv.getAttribute("framescrolling")!=undefined){
	    		  
	    		  framescrolling="scrolling='"+windowDiv.getAttribute("framescrolling")+"' ";
	  	    	  
	  	    	}

	        content += "<iframe frameborder='0' "+framescrolling+" style='width:100%;height:100%;' onfocus='this.parentNode.parentNode.parentNode.style.zIndex=winui_window_cwi++;'></iframe>";
	      }

	      
	      windowDiv.innerHTML=window_inside_start+titlebar_start+titlebar_between+titlebar_end+"<div style='width:"+contentareaWidth+"px;height:"+contentareaHeight+"px;overflow:hidden;cursor:default;' onclick='this.parentNode.parentNode.style.zIndex=winui_window_cwi++;void(0)'>"+content+windowDiv.innerHTML+window_inside_end;
	      windowDiv.style.backgroundColor="#D4D0C8";
	      
	      
	      
		
		return true;
	}
	
	
	
	
	
	

	//根据div的type属性值获取div对象
	function getDivElementsByType(value){
		
		var divdoms = document.getElementsByTagName("DIV");
		var array = [];
		for(var k=0;k<divdoms.length;k++){
			var typevalue = divdoms[k].getAttribute("type");
			if(typevalue == value){
				array[array.length] = divdoms[k];
			}
		}
		return array;
			
	}
	
	
	

	//当页面所有内容载入完成后执行窗体初始化
	onDOMContentLoaded(function(){
	
		//实现标题栏灰色思路：
		//将所有的window添加进集合，当调用弹出窗体函数时，循环集合，设置其他窗体的标题栏为灰色。
		
		 
		
		//1.获得所有type="window"的div对象
	    
	    //未完事项：
	    //1.为标题显示span标记设置长短，根据window的width减去左右两边控件的宽度
	     
	    //var xWidth = document.body.clientWidth;//得到网页可见区域宽
	    //var yHeight = document.body.clientHeight;//得到网页可见区域高
	    
	    var window_divs = getDivElementsByType("window");
	    //alert(window_divs.length);
	    for(var i=0;i<window_divs.length;i++){
	    	drawWindow(window_divs[i],'general');
	    }
    
    
	});
	
	


	var currentWindowId = null;
	var openedWindowCount = 0;
	var openedWindows=new Array();
	
	
	//窗体页面内弹出新窗体调用的函数
	function openWindow() {
		
			var windowId=arguments[0];
			var win = document.getElementById(windowId);
			if(win == null || win==undefined){
				return false;
			}

			
			
			winui_window_cwi++;
			
			var winui_lightbox = lightboxMap.get(windowId);
			//如果此窗体已经存在遮挡层，则不再重新创建遮挡层对象，而只是改变zindex值
			if(winui_lightbox==null || winui_lightbox==undefined){
				winui_lightbox=new lightbox();
			}
				
				
				
			
			
			
			
			winui_lightbox.Opacity = 0;
			winui_lightbox.zIndex = winui_window_cwi;
			winui_lightbox.Show();
			lightboxMap.put(windowId,winui_lightbox);
			
			winui_window_cwi++;
			win.style.zIndex = winui_window_cwi;
			win.style.display = "block";
			
			
			/* 点击本页面下的子窗体页面A里面的一个按钮弹出窗体页面B，双击B里的内容，将选择的值赋值给页面A里的文本控件，
			 * 本变量存储当前被弹出的子窗体页面的ID，当本页面下第一个子窗体页面弹出时，baseWindowId为null，本变量的值为弹
			 * 出的窗体DIV的ID，当在弹出的窗体中触发弹出二级窗体时，baseWindowId为隶属父窗体DIV的id，本变量的值为弹出的二
			 * 级窗体DIV的ID，设定本变量的目的是在弹出的多级窗体页面里执行调用基窗体（父窗体）的变量和函数时定位基窗体（父窗
			 * 体）用（因为要通过document.getElementById("windowId")的方式访问基窗体（父窗体））。
			 */
			//baseWindowId=currentWindowId;
			currentWindowId=windowId;
			
			if (arguments.length == 2) {
				//添加弹窗记录：子窗体对应该父窗体，在窗体传值时提供依据
				var parentWindowId=arguments[1];
				openerMap.put(windowId, parentWindowId);
				
				//判断是否存在上次打开窗体时缓存的参数，如果有，就删掉。
				var parm = valueMap.get(windowId);
				if(parm!=null){
					valueMap.put(windowId,null);
				}
			}
			
			//添加要传给子窗体的值到映射表，子窗体页面加载完成后将调用该映射取得要传过去的值
			if(arguments.length == 3){
				//添加弹窗记录：子窗体对应该父窗体，在窗体传值时提供依据
				var parentWindowId=arguments[1];
				openerMap.put(windowId, parentWindowId);
				
				var param = arguments[2];
				valueMap.put(windowId, param);
			}
			
			
			
			/*
			//如果有src属性，也就是说有iframe，那么先等iframe把页面加载完后再执行window的显示。如果无src属性，说明是无iframe的窗体，则直接显示
			if(win.getAttribute("src")!=undefined){
				win.getElementsByTagName("iframe")[0].src = win.getAttribute("src");
				
				//每隔100毫秒，检查一次iframe是否已加载完，是，则清除循环检查并显示window
				var itv = setInterval(function(){
					var cw = null;
					try{
						cw = win.getElementsByTagName("iframe")[0].contentWindow;
					}catch(e){
						
					}
					
					if(cw!=null && cw!=undefined){
						
						clearInterval(itv);
						//等待200毫秒后再显示
						var now = new Date();
						var exitTime = now.getTime() + 200;
						while (true) {
						    now = new Date();
						    if (now.getTime() > exitTime) break;
						}
						
						win.style.display = "block";
					}
				},100);
				
			}else{

				win.style.display = "block";
			}
			*/


			
			if(win.getAttribute("src")!=undefined){
				win.getElementsByTagName("iframe")[0].src = win.getAttribute("src");
			}
			
			

			//弹出窗体时，背景全禁用，不但是所在页面，而且如果所在页面被嵌入到iframe，比如平台主页，那么平台主页也应该被禁用，
			//这时调用平台主页里的显示遮挡层的方法进行遮挡。
			//平台页面里有openedPages变量，根据此变量可以判断当前弹出的窗体是平台页面里的还是模块页面里的。
			try{	
				if(window.parent.openedPages != undefined){
					//如果是模块页面里弹出的窗体，则要执行挡住平台页面元素。
					window.parent.showCover();
				}
		    }catch(e){}
	    
	    
			openedWindowCount++;

			
			
			var pushFlag=false;
			for(var i=0;i<openedWindows.length;i++){
				if(windowId==openedWindows[i]){
					pushFlag=true;
					break;
				}
			}
			if(!pushFlag){
				openedWindows.push(windowId);
			}
			
			
	}
	
	

	//关闭window div函数，传入windowdiv的id值
	function closeWindow(windowId){
		
		
		
		
		
		
		
		var winDiv = document.getElementById(windowId);
		var winOnClose = winDiv.getAttribute("onclose");
		if(winOnClose!=undefined && winOnClose!="" && winOnClose!=null){
			eval(winOnClose+"");
		}
		
		
		var filter = true;
		var ifrs = document.getElementById(windowId).getElementsByTagName("iframe");
		if(ifrs.length>0 && getWindow(windowId).onWindowClose){
			//执行关闭之前的回调函数
			filter = getWindow(windowId).onWindowClose();
			
		}
		

		if( typeof filter=='undefined' || filter){

			var wid = lightboxMap.get(windowId);
			if(wid!=undefined){
				lightboxMap.get(windowId).Close();//隐藏窗体后面的透明遮挡层
			}
			document.getElementById(windowId).style.display="none";//隐藏窗体
			
			try{
				openerMap.remove(windowId);//删除窗体和父窗体的映射信息
			}catch(e){}
			
			try{
				valueMap.remove(windowId);//删除传入窗体的参数
			}catch(e){}
			
			

			
			//如果是模块主页，关闭窗体时同时取消平台页面的遮罩层（openedWindowCount==1，为了避免窗体之上弹出窗体再关闭背后窗体时隐藏平台页面的遮罩层）
			if(openedWindowCount==1){
				//如果是模块页面里弹出的窗体，则要执行挡住平台页面元素。
				try{
					window.parent.hiddenCover();
				}catch(e){}
			}
			

			//alert("openedWindowCount--");
			

			openedWindowCount--;
			
			
			
		}
		
		//执行关闭之后回调函数
		if(ifrs.length>0 && getWindow(windowId).afterWindowClose){
			filter = getWindow(windowId).afterWindowClose();
		}
		
		
		
		checkWindowShow();
		
		

	}
	
	
	
	
	/***
	 * 仅仅只关闭窗体，不执行回调
	 */
	function justCloseWindow(windowId){

		lightboxMap.get(windowId).Close();//隐藏窗体后面的透明遮挡层
		document.getElementById(windowId).style.display="none";//隐藏窗体
		openerMap.remove(windowId);//删除窗体和父窗体的映射信息
		valueMap.remove(windowId);//删除传入窗体的参数
		
		//如果是模块主页，关闭窗体时同时取消平台页面的遮罩层（openedWindowCount==1，为了避免窗体之上弹出窗体再关闭背后窗体时隐藏平台页面的遮罩层）
		if(openedWindowCount==1){
			//如果是模块页面里弹出的窗体，则要执行挡住平台页面元素。
			try{
				window.parent.hiddenCover();
			}catch(e){}
		}
		
		openedWindowCount--;
		
	}
	
	
	function checkWindowShow(){

		var allNone=true;
		for(var i=0;i<openedWindows.length;i++){
			var dis = document.getElementById(openedWindows[i]).style.display;
			if(dis!="none"){
				allNone=false;
				break;
			}
		}
		if(allNone==true){
			try{
				window.parent.hiddenCover();
			}catch(e){}
		}
		
	}
	
	
	function showAlert(param){
		
		
		
		//向body里创建alert窗体的DOM，初始化高宽度等(代码参考报表里alert.html里的，左边icon使用public.css里的)！这里不能创建HTML元素，不然调用drawWindow方法后，所有添加的事件都没了，应放到drawWindow方法里判断生成。
		
		//调用drawWindow(windowDiv,'alert')函数画窗体
		
		//显示窗体(display:none)
		
		//为alert窗体里创建标记
		
		//为按钮添加事件执行回调函数
		
		
		
	}
	
	
	
	
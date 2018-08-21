/*
 *    支持所有可见DOM对象
 *    支持的浏览器内核及版本：IE6-IE9、FireFox、Chrome、Opera、Safari
 *    2009-07-24 陈建宇 thejava@163.com
 *
 *用法：
 *    支持四种用法：一、为页面内用户选中的内容授予右键菜单；
 *                  二、为HTML标签设置默认右键菜单，如为所有超链接设置默认
 *                      右键菜单；
 *                  三、为某一特定可见元素设置私有右键菜单，如为众多DIV中
 *                      的其中一个设置独有的右键菜单；
 *                  四、用于屏蔽浏览器默认右键菜单，如屏蔽某个元素的右键浏
 *                      览器菜单。
 *
 *    菜单显示优先级：选中内容 > 私有菜单 > 标签默认菜单 > 浏览器默认菜单
 *    当右键事件触发时，将首先检查页面是否有用户已经选中的内容，如果有，则
 *    显示特定的针对选中内容的菜单，如果没有被选中的内容，则检查事件源元素
 *    是否设置了私有菜单，如果有，那么将显示私有菜单，如果未找到私有菜单，
 *    则考虑是否设置了标签菜单，如果有，则显示标签菜单，如果没有设置标签菜
 *    单，则显示浏览器右键菜单。
 *
 *    
 *
 *示例：
 *    //为被选中的内容设定菜单
 *    setSelectionContextmenu("selectionMenu");
 *    上面的方法参数有二个可选值：[system|false]，system:指定该对象的右
 *    键菜单为浏览器默认右键菜单；false:指定该对象无右键菜单，此时，同时
 *    浏览器默认右键菜单也不会显示出来，此方法是屏蔽右键的便捷方法；
 *
 *    //为所有“a”标签设置默认右键菜单，菜单Id为“aDefualtContextmenuId”
 *    setTagContextmenu("a","aDefualtContextmenuId");
 *    这步需要在页面加载完成后用javascript动态设置。可以一次性为多个标签设
 *    置右键菜单。
 *
 *    //为某个“a”元素设置私有菜单
 *    <a href="#" contextmenu="menuId">我用的自己的菜单</a>
 *    设计好菜单，为需要显示自定义右键菜单的对象设置contextmenu属性的值，
 *    contextmenu值为用户自定义右键菜单对象的Id。
 *    contextmenu属性有二个可选值：[system|false]，system:指定该对象的右
 *    键菜单为浏览器默认右键菜单；false:指定该对象无右键菜单，此时，同时
 *    浏览器默认右键菜单也不会显示出来，此方法是屏蔽右键的便捷方法；
 *
 *    //在此“a”标签上屏蔽鼠标右键
 *    <a  href="#" contextmenu="false">在我上面点右键将没有反应</a>
 *    
 *
 *细节：
 *    1.菜单对象最好是绝对定位的(position:absolute)；
 *    2.菜单必须指定设定一个较高的zIndex值，以确保显示在最顶层；
 *    3.菜单必须指定ID属性，并保证全局唯一；
 *    4.必须自行设计菜单的显示样式以及实现菜单中各选项的功能；
 *    5.可以为各菜单项添加属性“contextmenu”并赋值为“false”或“”用于屏蔽右键菜单；
 *    6.自定义菜单Id的值不能为“system”或“false”，这两个具有特殊意义。
 *    
 *    
 */

/**********************以下是代码区*************************/


function findContextMenuAttributeByParent(element){
	if(element.tagName==undefined) return null;
	var cb = element.getAttribute("contextmenu");
	
	if(cb!=undefined && cb!=null){
		return element;
	}else if(element.parentNode){
		return findContextMenuAttributeByParent(element.parentNode);
	}else{
		return null;
	}
	
}



var contextmenuId=null;
var contextmenu=null;
var tagmenu=new Object();//标签默认菜单列表，用于存储指定标签的默认菜单，键值对关系。
var selectionmenuId=null;//选中项的右键菜单Id
var currentContextmenuElement = null;//当前show右键菜单的DOM

//标签默认右键菜单的添加方法
function setTagContextmenu(tagName,contextmenuId){
  if(tagName.length>0 && contextmenuId.length>0){
    tagmenu[tagName.toUpperCase()]=contextmenuId.toString();
  }
}

//选中项右键菜单的添加方法
function setSelectionContextmenu(contextmenuId){
  if(contextmenuId.length>0){
    selectionmenuId=contextmenuId;
  }
}

//当在document中按下鼠标右键的时候
document.oncontextmenu = function (e){
  if(contextmenu!=null){
    contextmenu.style.display = "none";
  }

  var evt=(window.event || e);
  var evtsrc = (evt.srcElement || evt.target);
  
  //判断页面中是否有选中内容，如果是IE内核：
  if(document.selection && document.selection.createRange){
    if(document.selection.createRange().text.length>0){
      contextmenuId=selectionmenuId;
    }else{contextmenuId=null;}
  }
  //判断页面中是否有选中内容，如果是FireFox内核：
  else if(window.getSelection){
    if(window.getSelection().toString().length>0){
      contextmenuId=selectionmenuId;
    }else{contextmenuId=null;}
  }
  evtsrc = findContextMenuAttributeByParent(evtsrc);
  if(evtsrc==null) return;
  
  //如果contextmenuId==null，说明页面中没有选中的内容。那么就尝试得到事件源的菜单。
  if(contextmenuId==null){
    contextmenuId = evtsrc.getAttribute("contextmenu");
    
  }

  currentContextmenuElement = evtsrc;
  
  
  var tagmenuId=tagmenu[evtsrc.tagName];
  //如果该节点没有“contextmenu”属性，则显示事件源标签的默认菜单。
  if(contextmenuId == null && tagmenuId!=undefined){
    contextmenuId = tagmenuId;
  }
  //如果“contextmenu”属性值为system，返回false，也不显示系统右键菜单。
  if(contextmenuId == null || contextmenuId == "system"){return true;}
  //如果“contextmenu”属性值为false或空，返回false，屏蔽右键菜单。
  if(contextmenuId == "false" || contextmenuId == false || contextmenuId == ""){return false;}
  //如果contextmenuId所表示的对象不存在，返回false，屏蔽右键菜单。
  if(document.getElementById(contextmenuId)==null){return false;}

  contextmenu=document.getElementById(contextmenuId);
  
  var x,y;
  //如果是IE
  if(document.all && document.getElementById && !window.opera){
    x=document.documentElement.scrollLeft-2;
    y=document.documentElement.scrollTop-2;
  }//否则如果是FrieFox等
  else if(!document.all && document.getElementById && !window.opera){
    x=window.pageXOffset;
    y=window.pageYOffset;
  }else{
    x=document.documentElement.scrollLeft;
    y=document.documentElement.scrollTop;
  }
  contextmenu.style.left = (evt.clientX + x) + "px";
  contextmenu.style.top = (evt.clientY + y) + "px";
  contextmenu.style.display = 'inline';

  return false;//返回false，屏蔽浏览器默认右键菜单
};


if(window.attachEvent){
  document.attachEvent("onmousedown",function(){
                                if(window.event.button!=2 && contextmenu!=null ){
                                	
                                	var src = window.event.srcElement;
                                	
                                	if(src.tagName==undefined) return;//IE8点滚动条时会出发此事件，且事件源为undefined;
                                	
                                	var flag = true;//是否在右键菜单上按下了鼠标
                                	if(src.className!="winui_contextmenu"){
                                		flag = false;
                                		if(src.parentNode && src.parentNode.className!="winui_contextmenu"){
                                			flag = false;
                                		}else{
                                			flag = true;
                                			src.attachEvent("onclick",function(){
                                				
                                  				src.parentNode.style.display="none";
                                  			});
                                		}
                                	}else{
                                		flag = true;
                                	}
                                	if(!flag){
                                        contextmenu.style.display = "none";
                                	}
                                	
                                }
                              });
}else if(window.addEventListener){
  document.addEventListener("mousedown",function(e){
                                  if(e.button!=2 && contextmenu!=null){
                                	  

                                  	var src = e.target;
                                  	var flag = true;//是否在右键菜单上按下了鼠标
                                  	if(src.className!="winui_contextmenu"){
                                  		flag = false;
                                  		if(src.parentNode && src.parentNode.className!="winui_contextmenu"){
                                  			flag = false;
                                  		}else{
                                  			flag = true;
                                  			src.addEventListener("click",function(event){
                                  				src.parentNode.style.display="none";
                                  			},false);
                                  		}
                                  	}else{
                                  		flag = true;
                                  	}
                                  	if(!flag){
                                          contextmenu.style.display = "none";
                                  	}
                                  	
                                	  
                                  }
                              },false);
}else{
  //...
}


/**********************以上是代码区*************************/
//setSelectionContextmenu("selectionMenu");
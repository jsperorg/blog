
/**
 * 当页面载入完成后初始化页面所有winui_menubar
 */
winui.onDOMContentLoaded(function(){
	
	/*菜单控件初始样式*/
	var WINUI_MENUBAR_DEFAULT_STYLE = "";				//默认样式
	WINUI_MENUBAR_DEFAULT_STYLE = "width:100%;height:18px;font-size:12px;font-family:宋体;cursor:default;background-color:#D4D0C8;vertical-align:middle;padding-top:1px;padding-bottom:1px;";
	
	/*一级菜单样式*/
	var WINUI_MENUBAR_LEVEL1_DEFAULT_STYLE = "";		//外围DIV默认样式
	var WINUI_MENUBAR_LEVEL1_ONMOUSEOVER_STYLE = "";	//当鼠标移动至菜单后样式
	var WINUI_MENUBAR_LEVEL1_ONMOUSEDOWN_STYLE = "";	//当鼠标按下后样式

	
	/**说明：以下三个样式的的height值需要根据引入的不同的HTML标准进行设定，当无标准时height=18px，当引入了4.0.1标准时height=16px;**/
	WINUI_MENUBAR_LEVEL1_DEFAULT_STYLE = "height:18px;border:1px solid #D4D0C8;/*float:left;*/padding:1px 5px 1px 5px;text-align:center;vertical-align:middle;";
	WINUI_MENUBAR_LEVEL1_ONMOUSEOVER_STYLE = "height:18px;/*float:left;*/border-top:1px solid #FFFFFF;border-left:1px solid #FFFFFF;border-right:1px solid #808080;border-bottom:1px solid #808080;padding:1px 5px 1px 5px;text-align:center;vertical-align:middle;";
	WINUI_MENUBAR_LEVEL1_ONMOUSEDOWN_STYLE = "height:18px;/*float:left;*/border-top:1px solid #808080;border-left:1px solid #808080;border-right:1px solid #FFFFFF;border-bottom:1px solid #FFFFFF;padding:2px 4px 0px 6px;text-align:center;vertical-align:middle;";
	
	var WINUI_MENUBAR_LEVEL1_OUTBORDER_DEFAULT_STYLE = "float:left;width:55px;";
	
	/*一级菜单表样式*/
	var WINUI_MENUBAR_MENUTABLE_STYLE = "";				//菜单表默认样式
	var WINUI_MENUBAR_MENUITEM_DEFAULT_STYLE = "";		//一级以下菜单项默认样式
	var WINUI_MENUBAR_MENUITEM_MOUSEOVER_STYLE = "";	//当鼠标移动至一级以下菜单项后样式
	
	WINUI_MENUBAR_MENUTABLE_STYLE = "z-index:999999;border:2px;border-style:outset;border-color:#eee;padding:0px;margin-top:0px;margin-left:0px;width:100px;position:absolute;background-color:#D4D0C8;display:none;";		//默认样式
	WINUI_MENUBAR_MENUITEM_DEFAULT_STYLE = "color:#000;background-color:#D4D0C8;width:100%;height:18px;line-height:18px;text-align:left;padding-left:17px;";	//一级以下菜单项默认样式
	WINUI_MENUBAR_MENUITEM_MOUSEOVER_STYLE = "color:#fff;background-color:#0A246A;width:100%;height:18px;line-height:18px;text-align:left;padding-left:17px;";	//当鼠标移动至菜单后样式
	
	/*多级菜单表样式*/
	var WINUI_MENUBAR_MULTISTAGE_MENUTABLE_STYLE = "";				//菜单表默认样式
	
	WINUI_MENUBAR_MULTISTAGE_MENUTABLE_STYLE = "z-index:999999;border:2px;border-style:outset;border-color:#eee;padding:0px;margin-top:-18px;margin-left:90px;width:100px;position:absolute;background-color:#D4D0C8;display:none;";		//默认样式
	
	
	var currentDisplaiedMenuTable=null;
	
	
	/*当前被选中的菜单*/
	var CURRENT_SELECTED_MENU = null;
	
	//获得所有menubar，ml为menubar_list的简写
	var ml = winui.getElements("div","type","menubar");
	
	
	
	/**循环设置每个menubar的初始化样式和事件**/
	//思路：遍历childNodes，根据子节点级别层次设置其样式和事件
	for(var i=0;i<ml.length;i++){
		
		ml[i].style.cssText=WINUI_MENUBAR_DEFAULT_STYLE;
		
		//得到该menubar的所有div子节点
		var cn = ml[i].getElementsByTagName("div");//childNodes;
		
		//遍历每个子节点，根据节点级别层次设置其样式和事件
		for(var j=0;j<cn.length;j++){
			
			var div = cn[j];
			
			/**判断节点级别层次**/
			
			
			
			
			//如果遇到一级菜单项内部文本div则：
			if(div.parentNode.parentNode.getAttribute("type")=="menubar" && div.getElementsByTagName("div").length<1){
				
				
				//div.style.cssText=WINUI_MENUBAR_LEVEL1_TEXTBOX_DEFAULT_STYLE;
				
				//设置一级菜单项样式
				div.style.cssText=WINUI_MENUBAR_LEVEL1_DEFAULT_STYLE;
				
				//1.当 鼠标移动至 一级菜单时，if被选择项为null:菜单项凸出显示，else:被选择项恢复初始样式&&被选择项隐藏其子菜单&&菜单项凹进显示&&被选中项=菜单项&&菜单项显示子菜单；
				
				div.onmouseover = function(event){
					
					//得到事件及事件源
					var evt = event || window.event;
					var div = (evt.srcElement || evt.target);
					
				
						
					//避开当移动到一级菜单表内的多级菜单项上时触发一级菜单表的onmouseover出错。
					//if(div.parentNode.getAttribute("type")=="menubar"){
						//if被选择项为null:菜单项凸出显示
						if(CURRENT_SELECTED_MENU==null){
							//菜单凸出显示
				    		div.style.cssText=WINUI_MENUBAR_LEVEL1_ONMOUSEOVER_STYLE;
				    		
						}
						//else:被选择项恢复初始样式&&被选择项隐藏其子菜单&&菜单项凹进显示&&菜单项显示子菜单
						else{
							

							
							//被选择项恢复初始样式
							CURRENT_SELECTED_MENU.style.cssText=WINUI_MENUBAR_LEVEL1_DEFAULT_STYLE;
							
							//TODO 被选择项隐藏其子菜单
							CURRENT_SELECTED_MENU.parentNode.getElementsByTagName("div")[1].style.display="none";
							
							//alert(div.innerHTML);
							//菜单项凹进显示
							div.style.cssText=WINUI_MENUBAR_LEVEL1_ONMOUSEDOWN_STYLE;
							
							//被选中项=菜单项
							CURRENT_SELECTED_MENU=div;
							
							//TODO 菜单项显示子菜单
							div.parentNode.getElementsByTagName("div")[1].style.display="block";
							
							

						}
					//}
						
						
						
						
					
				};
				
				//2.当 鼠标移出 一级菜单时，if菜单项!=被选择项:菜单项恢复初始样式，else:不做任何动作
				div.onmouseout = function(event){

					//得到事件及事件源
					var evt = event || window.event;
					var div = (evt.srcElement || evt.target);
					
						
						
					
					//if菜单项!=被选择项:菜单项恢复初始样式
					if(div!=CURRENT_SELECTED_MENU){
						
						//菜单项恢复初始样式
						div.style.cssText=WINUI_MENUBAR_LEVEL1_DEFAULT_STYLE;
						
					}
						
						
					
					
					
					
				};
				
				//3.当 鼠标按下 一级菜单时，if被选择项==菜单项:隐藏菜单项子菜单&&菜单项凸出显示&&被选择项=null，else:菜单项凹进显示&&菜单项显示子菜单&&设置被选择项为菜单项
				
				
				/**
				 * 这里有个添加事件方式的问题，是用addEventListener追加事件呢，还是用=覆盖事件。
				 * ·如果是追加事件就要考虑到浏览器追加函数兼容性问题，因为它们要执行同样的操作，所以就得将动作封装到一个函数里
				 * 然后将函数名作为它们各自追加事件函数的参数。
				 * ·如果是用等号覆盖，就不需要太多考虑浏览器兼容问题，但这样就使得原本菜单标记上手动定义的事件失效，有损程序健壮性
				 * 
				 * 这两者间必须二选其一
				 * 
				 * 另类方案：偷梁换柱，先斩后奏
				 * 先将手动在DOM标记上定义的事件转移至临时变量，执行程序动作，然后再调用转移后的事件函数，这样既无需考虑浏览器兼容问题，也兼顾了用户手写的事件
				 * 
				 */
				
				//用上面的第三种方案
				div.onmousedown = function(event){
					
					//得到事件及事件源
					var evt = event || window.event;
					var div = (evt.srcElement || evt.target);
					
						
					//IE下左键值为1，Mozilla及webkit下左键值为0
				    if(evt.button==0 || evt.button==1){
				    	
				    	
				    	//if被选择项==菜单项:隐藏菜单项子菜单&&菜单项凸出显示&&被选择项=null
				    	if(CURRENT_SELECTED_MENU==div){
				    		
				    		//TODO 隐藏菜单项子菜单
				    		div.parentNode.getElementsByTagName("div")[1].style.display="none";
				    		
				    		//菜单凸出显示
				    		div.style.cssText=WINUI_MENUBAR_LEVEL1_ONMOUSEOVER_STYLE;
				    		
				    		//被选择项=null
				    		CURRENT_SELECTED_MENU=null;
				    		
				    	}
				    	//else:菜单项凹进显示&&菜单项显示子菜单&&设置被选择项为菜单项
				    	else{
				    		
				    		//菜单项凹进显示
				    		div.style.cssText=WINUI_MENUBAR_LEVEL1_ONMOUSEDOWN_STYLE;
				    		//alert("执行DIV凹进效果。");
				    		//TODO 菜单项显示子菜单
				    		div.parentNode.getElementsByTagName("div")[1].style.display="block";
				    		
				    		//设置被选择项为菜单项
				    		CURRENT_SELECTED_MENU=div;
				    		
				    	}
				    	
				        //div.style.cssText=WINUI_MENUBAR_LEVEL1_ONMOUSEDOWN_STYLE;
				        
				        //div.
				    }else if(evt.button==2){
				    	
				    	//if点了右键:恢复菜单样式到默认初始化样式&&隐藏菜单项子菜单&&被选择项=null
				    	div.style.cssText=WINUI_MENUBAR_LEVEL1_DEFAULT_STYLE;
				    	
				    	//隐藏菜单项子菜
				    	div.parentNode.getElementsByTagName("div")[1].style.display="none";
				    	
				    	//被选择项=null
				    	CURRENT_SELECTED_MENU=null;
				    	
				    }
						
						
						
					    
					    
				};
				
			}
			//否则如果是一级菜单外围div，设置其样式
			else if(div.parentNode.getAttribute("type")=="menubar"){
				
				div.style.cssText=WINUI_MENUBAR_LEVEL1_OUTBORDER_DEFAULT_STYLE;
				
				
			}
			//否则如果是一级菜单表this.parentNode.parentNode=basediv && this.getElementsByTagName("div").length>0
			else if(div.parentNode.parentNode.getAttribute("type")=="menubar" && div.getElementsByTagName("div").length>0){
				//alert(div.innerHTML);

				
				//下面这两行代码必须保持执行顺序，不能随便颠倒
				menuTableProcess(div);
				div.style.cssText=WINUI_MENUBAR_MENUTABLE_STYLE;
				//div.style.display="none";
				
				
			}
			
			
				
				
			
			
		}
		
	}
	
	

	
	//当 鼠标点击 菜单以外的地方时，恢复整个菜单对象到初始化样式&&设置被选择项为null
	var menuReset = function(event){
		
		//如果点击的对象不是一级菜单项
		var evt=(window.event || event);
        var evtsrc = (evt.srcElement || evt.target);
        //alert(evtsrc.typeName);
		if(CURRENT_SELECTED_MENU!=null){
			
			try{
				if(evtsrc.parentNode.getAttribute("type")!="menubar" && evtsrc.parentNode.parentNode.getAttribute("type")!="menubar"){
					
					//恢复整个菜单对象到初始化样式&&设置被选择项为null
					CURRENT_SELECTED_MENU.style.cssText=WINUI_MENUBAR_LEVEL1_DEFAULT_STYLE;
					//隐藏被选中项子菜单
					CURRENT_SELECTED_MENU.parentNode.getElementsByTagName("div")[1].style.display="none";
					//设置被选择项为null
					CURRENT_SELECTED_MENU=null;
					
				}
			}catch(e){
				//恢复整个菜单对象到初始化样式&&设置被选择项为null
				CURRENT_SELECTED_MENU.style.cssText=WINUI_MENUBAR_LEVEL1_DEFAULT_STYLE;
				//隐藏被选中项子菜单
				CURRENT_SELECTED_MENU.parentNode.getElementsByTagName("div")[1].style.display="none";
				//设置被选择项为null
				CURRENT_SELECTED_MENU=null;
			}
			
			
		}
		
	};
	
	
	if(window.attachEvent){
		document.attachEvent("onclick",menuReset);
	}else if(window.addEventListener){
		document.addEventListener("click",menuReset,false);
	}else{
		  //TODO 其他浏览器类型...
	}
	
	
	function menuTableProcess(mt){
		
		

		//一级菜单不显示提示箭头避开一级菜单表
		if(mt.parentNode.parentNode.getAttribute("type")!="menubar"){
			
			//TODO 首先设置菜单表的样式：
			mt.style.cssText=WINUI_MENUBAR_MULTISTAGE_MENUTABLE_STYLE;
			//取得从属菜单项
			var refrence = mt.parentNode.getElementsByTagName("div")[0];
			refrence.innerHTML=refrence.innerHTML+"   >>";
			
			//refrence.parentNode.style.border="1px solid red";
			
			refrence.style.cssText=WINUI_MENUBAR_MENUITEM_DEFAULT_STYLE;
			
			
			//当鼠标移动到菜单项时
			refrence.onmouseover=function(event){
				
				//得到事件及事件源
				var evt = event || window.event;
				var div = (evt.srcElement || evt.target);
				
				//if(div==refrence.parentNode){
					//设置菜单项mouseover样式
					div.style.cssText=WINUI_MENUBAR_MENUITEM_MOUSEOVER_STYLE;
					
					
					//mt.style.display="block";
				//}
					if(currentDisplaiedMenuTable!=null){
						currentDisplaiedMenuTable.style.display="none";
						//TODO 显示子菜单（若有）
						div.parentNode.getElementsByTagName("div")[1].style.display="block";
						currentDisplaiedMenuTable=div.parentNode.getElementsByTagName("div")[1];
					}
					
					
				
			};
			
			
			
			/*
			//当鼠标移出菜单项时
			refrence.parentNode.onmouseout=function(event){
				
				//得到事件及事件源
				var evt = event || window.event;
				var div = (evt.srcElement || evt.target);
				

				//if(div!=refrence.parentNode){
					//设置菜单项mouseout样式
				var menu = div.getElementsByTagName("div")[0];
				if(menu!=undefined && menu!=null){
					menu.style.cssText=WINUI_MENUBAR_MENUITEM_DEFAULT_STYLE;
				}
					
					
					//TODO 隐藏子菜单（若有）

				//div.getElementsByTagName("div")[1].style.display="none";
					mt.style.display="none";
				//}
				
			};
			*/
			
		}
		
		
		//获得菜单表下的子菜单
		var nodes = mt.getElementsByTagName("div");
		
		//循环遍历子菜单，如果是菜单项则这是菜单项样式，如果是菜单表则递归调用此函数
		for(var i=0;i<nodes.length;i++){
			
			//避开菜单的外围div
			if(nodes[i].parentNode.parentNode==mt && nodes[i].getElementsByTagName("div").length>0){

				
				//递归调用本函数
				menuTableProcess(nodes[i]);
				
				
				
				
			}
			//如果是菜单项
			else if(nodes[i].getElementsByTagName("div").length<1 /*&& nodes[i].parentNode.getElementsByTagName("div")[1].getElementsByTagName("div").length>0*/){
				nodes[i].style.cssText=WINUI_MENUBAR_MENUITEM_DEFAULT_STYLE;
				//当鼠标移动到菜单项时
				nodes[i].onmouseover=function(event){
					
					//得到事件及事件源
					var evt = event || window.event;
					var div = (evt.srcElement || evt.target);
					
					
					//设置菜单项mouseover样式
					div.style.cssText=WINUI_MENUBAR_MENUITEM_MOUSEOVER_STYLE;
					
					//TODO 显示子菜单（若有）
					
				};
				
				//当鼠标移动到菜单项时
				nodes[i].onmouseout=function(event){
					
					//得到事件及事件源
					var evt = event || window.event;
					var div = (evt.srcElement || evt.target);
					
					
					//设置菜单项mouseout样式
					div.style.cssText=WINUI_MENUBAR_MENUITEM_DEFAULT_STYLE;
					
					//TODO 隐藏子菜单（若有）
					
				};
				
			}
			
		}
	}
	
	
	
},false);
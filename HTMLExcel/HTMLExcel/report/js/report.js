


//hashMap数据结构
function hashMap(){
	var map = {
			put 	 : function(key,value){this[key] = value;},
			get 	 : function(key){return this[key];},
			contains : function(key){return this.get(key) == null?false:true;},
			remove 	 : function(key){delete this[key];},
			keySet   : function(){
				var keys = null;
				for(var key in this){
					if(key!="put" && key!="get" && key!="contains" && key!="remove" && key!="keySet"){
						if(keys==null) keys={};
						keys[key]=null;
					}
				}
				return keys;
			}
				
			};
	return map;
}




//关键字格式样式制作函数
function get_keyword_style(keyword_type){
	
	//unit 用于报表数据、格式切换时显示值字符串组合
	//format 用于显示关键字格式
	//align 用于显示关键字对齐方式
	
	var obj = {};
	switch(keyword_type){
	case "year":
		obj.format = "xxxx 年";
		obj.unit = "年";
		obj.align="right";
		break;

	case "month":
		obj.format = "xx 月";
		obj.unit = "月";
		obj.align="right";
		break;

	case "day":
		obj.format = "xx 日";
		obj.unit = "日";
		obj.align="right";
		break;

	case "quarter":
		obj.format = "x 季";
		obj.unit = "季";
		obj.align="right";
		break;
		
	case "unitName":
		obj.format = "单位名称：xxx";
		obj.unit = "";
		obj.align="left";
		break;
		
	case "unitNumber":
		obj.format = "单位编号：xxx";
		obj.unit = "";
		obj.align="left";
		break;
	}
	
	return obj;
}



//新建报表，根据传入的行数和列数动态生成表格并初始化
function buildReport(rowCount,colCount){
	
	//思路：生成表格HTML代码，为sheet赋值
	
	var sheet_id = "sheet_1";

	//求表头宽度
	var tableWidth = colCount*cell_width;
	var tableHeight = rowCount*20;
	var html = "";

	html += "<!-- 表格外围容器 S -->";
	html += "<div id=\""+sheet_id+"\">";
		
		
	html += "	<!-- 表头代码 S -->";
	html += "	<div style=\"position:absolute;margin-top:2px;margin-left:2px;z-index:603;\">";

	html += "		<!-- 表头左侧 -->";
	html += "		<div style=\"float:left;width:40px;\">";
	html += "			<table class=\"table_header\" width=\"40\" cellSpacing=\"0\" cellPadding=\"0\">";
	html += "				<tbody>";
	html += "					<tr>";
	html += "						<td></td>";
	html += "					</tr>";
	html += "				</tbody>";
	html += "			</table>";
	html += "		</div>";

	
	html += "		<!-- 表头右侧  -->";
	html += "		<div style=\"float:left;width:934px;overflow:hidden;\">";
	
	html += "		<div style=\"position:absolute;overflow-y:auto;overflow-x:hidden;width:934px;height:20px;\">";
	html += "			<div id=\""+sheet_id+"_column_drag_container\">";
	
	var startMarginLeft = cell_width-6;
	for(var i=0;i<colCount;i++){
		html += "			<div style=\"position:absolute;width:12px;height:20px;float:left;margin-left:"+startMarginLeft+"px;cursor:e-resize;\" onmousedown=\"column_drag_container(event,this,"+i+");\" ></div>";
		startMarginLeft += cell_width;
	}
	
	html += "			</div>";
	html += "		</div>";
	
	html += "			<table id=\""+sheet_id+"_scroll_header\" class=\"table_header\" style=\"table-layout:fixed;width:" +tableWidth+ "px;\" cellspacing=\"0\" cellpadding=\"0\">";// style=\"width:" +tableWidth+ "px;\" 
	

	html += "			<colgroup>";
	//循环列数，生成col标签，设置列公共属性
	for(var j=0;j<colCount;j++){
		html += "			<col style='width:"+cell_width+"px;'/>";
	}
	html += "			</colgroup>";
	
	
	html += "				<tbody>";
	html += "					<tr>";
	
	for(var i=0;i<colCount;i++){
		html += "						<td>" +String.fromCharCode(i+65)+ "</td>";
	}
	
	html += "					</tr>";
	html += "				</tbody>";
	html += "			</table>";
	
	
	html += "		</div>";
	html += "	</div>";
	html += "	<!-- 表头代码 E -->";
				
				
	html += "	<!-- 左侧表体代码 S -->";
	html += "	<div style=\"width:40px;height:294px;overflow:hidden;float:none;clear:both;position:absolute;margin-top:22px;margin-left:2px;z-index:602;\">";
	

	

	html += "		<div style=\"position:absolute;overflow-x:auto;overflow-y:hidden;width:40px;height:294px;\">";
	html += "			<div id=\""+sheet_id+"_row_drag_container\">";
	
	var startMarginTop = 15;
	for(var i=0;i<rowCount;i++){
		html += "			<div style=\"position:absolute;width:40px;height:10px;margin-top:"+startMarginTop+"px;cursor:n-resize;\" onmousedown=\"row_drag_container(event,this,"+i+");\" ></div>";
		startMarginTop += 20;
	}
	
	html += "			</div>";
	html += "		</div>";
	
	
	
	
	html += "		<table id=\""+sheet_id+"_scroll_lefter\" class=\"table_lefter\" style=\"width:40px;height:"+tableHeight+"px;\" cellSpacing=\"0\" cellPadding=\"0\">";
	html += "			<tbody>";
	
	for(var i=1;i<=rowCount;i++){
		html += "				<tr>";
		html += "						<td style='height:18px'>" +i+ "</td>";
		html += "				</tr>";
	}
	
	html += "			</tbody>";
	html += "		</table>";
	html += "	</div>";
	html += "	<!-- 左侧表体代码 E -->";
					

	html += "	<!-- 右侧表体代码 S -->";
	html += "	<div id=\""+sheet_id+"_data_table_container\" style=\"padding:0;margin:0;width:100%;height:314px;border:2px inset #ccc;background-color:#c0c0c0;overflow-y:auto;overflow-x:hidden;z-index:601;\" onscroll=\"tableScroll(this);\">";

	
	html += "		<table class=\"table_bodyer\" style=\"margin-left:40px;margin-top:20px;width:" +tableWidth+ "px;height:" +tableHeight+ "px;table-layout:fixed;\" cellspacing=\"0\" cellpadding=\"0\" oncontextmenu=\"return show_cell_contextmenu(event);\">";//width:" +tableWidth+ "px;
	
	html += "			<colgroup>";
	//循环列数，生成col标签，设置列公共属性
	for(var j=0;j<colCount;j++){
		html += "			<col style='width:"+cell_width+"px;max-width:"+cell_width+"px;height:19px;' nowrap='nowrap' />";
	}
	html += "			</colgroup>";
	
	html += "			<tbody>";

	for(var i=1;i<=rowCount;i++){
		html += "				<tr>";
		
		for(var j=0;j<colCount;j++){
			html += "					<td></td>";
		}
		
		html += "				</tr>";
	}
	
	html += "			</tbody>";
	html += "		</table>";


	//html += "	<div>";
	html += "		<div id='"+sheet_id+"_cell_border_top'		oncontextmenu='return false;' onmouseup='container_border_mouse_up();' class='cell_border'></div>";
	html += "		<div id='"+sheet_id+"_cell_border_right' 	oncontextmenu='return false;' onmouseup='container_border_mouse_up();' class='cell_border'></div>";
	html += "		<div id='"+sheet_id+"_cell_border_bottom' 	oncontextmenu='return false;' onmouseup='container_border_mouse_up();' class='cell_border'></div>";
	html += "		<div id='"+sheet_id+"_cell_border_left' 	oncontextmenu='return false;' onmouseup='container_border_mouse_up();' class='cell_border'></div>";
	//html += "	</div>";
	
	html += "	</div>";
	html += "	<!-- 右侧表体代码 E -->";
		
			
	html += "</div>";
	html += "<!-- 表格外围容器 E -->";

	document.getElementById("sheet_container").innerHTML = html;
	
	current_sheet = document.getElementById("sheet_1");
	document.getElementById("scrollbar_scroll_width_bar").style.width=tableWidth+"px";
	
	//初始化表格单元格
	cell_init();
	toolbar_init();//初始化工具条
}



//表格滚动条处理
function tableScroll(container){

	var sheet_id = current_sheet.id;
	var scroll_header = document.getElementById(sheet_id+"_scroll_header");
	var scroll_lefter = document.getElementById(sheet_id+"_scroll_lefter");
	var column_drag_container = document.getElementById(sheet_id+"_column_drag_container");
	var row_drag_container = document.getElementById(sheet_id+"_row_drag_container");
	
	scroll_header.style.marginLeft = "-"+parseInt(container.scrollLeft)+"px";
	scroll_lefter.style.marginTop = "-"+parseInt(container.scrollTop)+"px";

	column_drag_container.style.marginLeft = "-"+parseInt(container.scrollLeft)+"px";
	row_drag_container.style.marginTop = "-"+parseInt(container.scrollTop)+"px";
	

}

//报表横向滚动条控制
function scrolly(scrollbar){

	/***
	 *说明：根据此方法的思路，一个滚动条控制一个容器，
	 *滚动条和容器的内容宽度值需保持一致，当容器内容宽度发生变化时应当同步更新滚动条内容的宽度。
	 *滚动条和容器本身的宽度可以随便。
	 */
	if(current_sheet==null){
		return;
	}
	
	var uc = document.getElementById(current_sheet.id+"_data_table_container");
	var dc = scrollbar;//document.getElementById("scrollbar_scroll_width_bar");
	var usw = uc.scrollWidth;
	var dsw = dc.scrollWidth;

	var uw = parseInt(uc.style.width,10);
	uw = uc.offsetWidth-40;
	var dw = parseInt(dc.style.width,10);
	dw = dc.offsetWidth;
	
	//1.求底部滚动条滚动率,被滚动的宽度除以内容总宽度
	var sl = parseInt(scrollbar.scrollLeft,10);
	var lv = sl/dsw;
	
	//2.求上部容器滚动值，下面滚动条滚动值减(上面容器宽度减下面容器宽度)乘以滚动率
	uc.scrollLeft = sl-(uw-dw)*lv;
	
	//var s = "uw:"+uw+"   dw:"+dw+"   usw:"+usw+"   dsw:"+dsw+"   sl:"+sl+"   lv:"+lv+"   ul:"+(sl-(uw-dw)*lv);
	//document.getElementById("showbox").value=s;
	
}


/***
 * 判断是否有合并的单元格
 */
function hasMergeCells(){

	var tb = document.getElementById(current_sheet.id+"_data_table_container").getElementsByTagName("TABLE")[0];
	var flag = false;
	for(var i=0;i<tb.rows.length;i++){
		for(var j=0;j<tb.rows[i].cells.length;j++){
			var colSpan = tb.rows[i].cells[j].colSpan;
			var rowSpan = tb.rows[i].cells[j].rowSpan;
			if(colSpan!=null && rowSpan!=null){
				if(colSpan>1 || rowSpan>1){
					flag = true;
				}
			}
		}
	}
	return flag;
	
}






/***
 * 得到当前表格数据区的宽度
 * @returns {Number}
 */
function getTableBodyerColsWidth(){

	var header = document.getElementById(current_sheet.id+"_data_table_container").getElementsByTagName("TABLE")[0].getElementsByTagName("COL");
	var width = 0;
	
	for(var i=0;i<header.length;i++){
		width += parseInt(header[i].style.width,10);
	}
	return width;
}


/***
 * 得到当前表头的clogroup
 */
function getTableHeaderCols(){

	var header = document.getElementById(current_sheet.id+"_scroll_header");
	
	return header.getElementsByTagName("COL");
}


/***
 * 得到当前表头的宽度
 * @returns {Number}
 */
function getTableHeaderColsWidth(){

	var header = document.getElementById(current_sheet.id+"_scroll_header").getElementsByTagName("COL");
	var width = 0;
	
	for(var i=0;i<header.length;i++){
		width += parseInt(header[i].style.width,10);
	}
	return width;
}





/***
 * 得到当前表格数据区的clogroup
 */
function getTableBodyerCols(){
	
	var tb = document.getElementById(current_sheet.id+"_data_table_container").getElementsByTagName("TABLE")[0];
	return tb.getElementsByTagName("COL");
}





//列伸缩，传入拖拽线DOM和拖拽线index（列index）
var xoffset=0;
var ml = 0;
function column_drag_container(event,line,index){

	//如果存在合并的单元格：
	/*
	if(hasMergeCells()){
		jAlert("表格存在合并的单元格，无法再调整列宽，请在最开始时调整好列宽再进行合并单元格操作");
		return;
	}
	*/
	
	var x=0;
	var evt=(window.event || event);
	//var evtsrc = (evt.srcElement || evt.target);
	if(xoffset==0){
		ml = parseInt(line.style.marginLeft);
	}

	line.style.width="700px";
	line.style.marginLeft=(ml-350)+"px";

	var header = getTableHeaderCols();
	
	var tbcols = getTableBodyerCols();
	
	var ht = document.getElementById(current_sheet.id+"_scroll_header");
	var tb = document.getElementById(current_sheet.id+"_data_table_container").getElementsByTagName("TABLE")[0];
	
	
	var tblwdh=getTableBodyerColsWidth();
	
	
	var scaling_lines = document.getElementById(current_sheet.id+"_column_drag_container").getElementsByTagName("DIV");
	
	//console.info(index+":"+header.length);
	
	var hcw = parseInt(header[index].style.width);
	
	var htw = getTableHeaderColsWidth();
	
	if(document.all){
		x = evt.clientX;
		document.onmousemove=function(event){
			
			xoffset = window.event.clientX - x;
			if((hcw+xoffset)<20){
				xoffset = 20-hcw;
				return;
			}
			
			line.style.marginLeft =  (ml+xoffset-350)+ "px";
			header[index].style.width=(hcw+xoffset)+ "px";
			ht.style.width = (htw+xoffset)+ "px";
		}
	}else{
		x = evt.pageX;
		document.onmousemove=function(event){

			xoffset = event.pageX - x;
			if((hcw+xoffset)<20){
				xoffset = 20-hcw;
				return;
			}
			line.style.marginLeft =  (ml+xoffset-350)+ "px";
			header[index].style.width=(hcw+xoffset)+ "px";
			ht.style.width = (htw+xoffset)+ "px";
		}
		
	}

	
	
	document.onmouseup=function(event){

		line.style.width="12px";
		line.style.marginLeft=(ml+xoffset)+"px";
		
		//cell.style.width=(width+offset)+"px";
		for(var i=0;i<tb.rows.length;i++){

			//遇到行有合并单元格的情况，如果满足：(单元格索引号+colspan)>=index，则说明要修改的单元格被包含在合并的单元格内，则跳出进入下一个循环。
			
			var cellIndex = index;
			/*
			if(tb.rows[i].cells.length<header.cells.length){
				console.info(tb.rows[i].cells.length+":"+header.cells.length);
				
				var flag = false;
				for(var j=0;j<tb.rows[i].cells.length;j++){
					var ccell = tb.rows[i].cells[j];
					
					var colSpan = ccell.colSpan;
					var rowSpan = ccell.rowSpan;
					
					if(colSpan!=null && colSpan!="" && colSpan>1 && j<index){
						
						console.info(j+"::"+colSpan);
						
						
						if((j+colSpan-1)>=index){
							
							flag = true;
							

							if(rowSpan!=null && rowSpan!="" && rowSpan>1){
								i = i+rowSpan;
								
								console.info("i:"+i);
							}
							
							console.info("break");
							break;
						}
						

						cellIndex = index-colSpan+1;
						
						
					}
					
					
					
				}
				
				if(flag){

					continue;
					console.info("continue...");
				}
			}
*/
			//tb.rows[i].cells[cellIndex].style.width=(width+xoffset)+"px";
			tbcols[cellIndex].style.width=(hcw+xoffset)+"px";
			
			
			
		}
		
		tb.style.width=tblwdh+xoffset+"px";

		for(var i=index+1;i<scaling_lines.length;i++){
			var sml = parseInt(scaling_lines[i].style.marginLeft,10);
			scaling_lines[i].style.marginLeft = (sml+xoffset)+"px";
		}

		document.getElementById("scrollbar_scroll_width_bar").style.width=tblwdh+xoffset+"px";
		
		//var s = "x:"+x+"   offset:"+offset+"   width:"+width+"   tblwdh:"+tblwdh+"   cell.style.width:"+cell.style.width+"   tb.style.width:"+tb.style.width;
		//document.getElementById("showbox").value=s;

		show_container_border(tb,current_cell,current_cell);
		xoffset=0;
		document.onmousemove=null;
		document.onmouseup=null;
	}
	
	contentChanged = true;//声明报表已发生改变
}




//行伸缩，传入拖拽线DOM和拖拽线index（行index）
var yoffset=0;
var mt = 0;
function row_drag_container(event,line,index){
	
	

	var y=0;
	var evt=(window.event || event);
	//var evtsrc = (evt.srcElement || evt.target);
	if(yoffset==0){
		mt = parseInt(line.style.marginTop);
	}

	//console.info(mt);
	
	line.style.height="300px";
	line.style.marginTop=(mt-150)+"px";

	//console.info((mt-150)+"px");
	
	var tb = document.getElementById(current_sheet.id+"_data_table_container").getElementsByTagName("TABLE")[0];
	var cell = tb.rows[index].cells[0];
	var height = parseInt(cell.style.height,10);
	var tblhgt=parseInt(tb.style.height);
	var scaling_lines = document.getElementById(current_sheet.id+"_row_drag_container").getElementsByTagName("DIV");
	
	var lt = document.getElementById(current_sheet.id+"_scroll_lefter");
	
	var lch = parseInt(lt.rows[index].cells[0].style.height);
	var lth = parseInt(lt.style.height);
	
	if(document.all){
		y = evt.clientY;
		document.onmousemove=function(event){
			yoffset = window.event.clientY - y;
			
			if((lch+yoffset)<20){
				yoffset = 20-lch;
				return;
			}
			
			
			line.style.marginTop =  (mt+yoffset-150)+ "px";
			lt.rows[index].cells[0].style.height=(lch+yoffset)+ "px";
			lt.style.height = (lth+yoffset)+ "px";
		}
	}else{
		y = evt.pageY;
		document.onmousemove=function(event){
			yoffset = event.pageY - y;
			
			if((lch+yoffset)<20){
				yoffset = 20-lch;
				return;
			}
			
			line.style.marginTop =  (mt+yoffset-150)+ "px";
			lt.rows[index].cells[0].style.height=(lch+yoffset)+ "px";
			lt.style.height = (lth+yoffset)+ "px";
		}
		
	}

	//console.info(line.style.marginTop);
	
	
	document.onmouseup=function(event){

		line.style.height="10px";
		line.style.marginTop=(mt+yoffset)+"px";
		
		//cell.style.width=(width+offset)+"px";
		/*for(var i=0;i<tb.rows.length;i++){
			tb.rows[i].cells[index].style.width=(height+yoffset)+"px";
		}*/
		
		for(var i=0;i<tb.rows[index].cells.length;i++){
			tb.rows[index].cells[i].style.height=(height+yoffset)+"px";
		}
		
		tb.style.height=tblhgt+yoffset+"px";

		for(var i=index+1;i<scaling_lines.length;i++){
			var smt = parseInt(scaling_lines[i].style.marginTop,10);
			scaling_lines[i].style.marginTop = (smt+yoffset)+"px";
		}

		//document.getElementById("scrollbar_scroll_width_bar").style.height=tblhgt+yoffset+"px";
		
		//var s = "x:"+x+"   offset:"+offset+"   width:"+width+"   tblwdh:"+tblwdh+"   cell.style.width:"+cell.style.width+"   tb.style.width:"+tb.style.width;
		//document.getElementById("showbox").value=s;


		show_container_border(tb,current_cell,current_cell);
		
		yoffset=0;
		document.onmousemove=null;
		document.onmouseup=null;
		
		
	}
	

	contentChanged = true;//声明报表已发生改变
	
}







//单个单元格事件初始化
function cell_event_init(cell){

	var tb=cell.parentNode.parentNode.parentNode;
	
	//单元格鼠标点下事件
	cell.onmousedown=function(event){


		//有时候拖选会出发浏览器的内容拖选功能，导致不会执行mouseover和mouseup事件，导致再次点击时出现混乱现象，此处特判断拖选过程中是否出发了mouseup，如果还没触发则退出单元格定位，让其触发Mouseup，默认走多选逻辑。
		if(current_mouseup_cell==null) return;
		
		//得到事件及事件源
		var evt = event || window.event;
		
		//如果点的是右键，则不清空被选区，支持对被选区的右键菜单
		if(evt.button==2) return;
		
		var cell = (evt.srcElement || evt.target);
		/*
		if(current_cell==cell){
			return;
		}
		*/
		if(cell.tagName=="DIV"){
			cell = cell.parentNode;
		}
		
		var editor = cell.getElementsByTagName("DIV")[0];
		if(current_cell!=null && current_cell!=cell){
			
			//合并单元格时，current_cell可能消失，因此以下使用try catch
			try{
				current_cell.getElementsByTagName("DIV")[0].contentEditable=false;
			}catch(e){}
			
			
			
		}else if(current_cell==null || current_cell==cell){
			
			
			editor.contentEditable=true;
			editor.focus();//解决IE9下，输入法中文被禁的问题
			
			editor.onkeydown=function(event){
				if(event.keyCode==13) return false;//禁止在单元格输入回车
				var editor_content = "";
				editor_content = editor.innerHTML.replace(new RegExp("&nbsp;","gm")," ");
				document.getElementById("showbox").value = editor_content;

				//contentChanged = true;//声明报表已发生改变。
			}
			
			editor.onblur=function(){
				editor.contentEditable=false;

				contentChanged = true;//声明报表已发生改变。
			}
			
			return;
		}



		//IE8下 事件机制不同，对IE8坐特殊处理
		if(navigator.userAgent.indexOf("MSIE")>0){
			if(navigator.userAgent.indexOf("MSIE 8.0")>0){
				editor = cell.getElementsByTagName("DIV")[0];
				editor.contentEditable=true;
				
				editor.onkeydown=function(event){
					if(window.event.keyCode==13) return false;//禁止在单元格输入回车
					var editor_content = "";
					editor_content = editor.innerHTML.replace(new RegExp("&nbsp;","gm")," ");
					document.getElementById("showbox").value = editor_content;

					
				}
				
			}
			
		}
		


		//如果showbox处于焦点状态，则先执行其失去焦点动作
		if(showbox_focus_state==true){
			document.getElementById("showbox").blur();
		}

		document.getElementById("delete_icon").src="report/images/delete_h.jpg";
		document.getElementById("confirm_icon").src="report/images/confirm_h.jpg";
		
		
		var keySet = cell_map.keySet();
		//遍历上次拖选的的单元格，改变其背景颜色为默认状态
		for(var k in keySet){
			var bgc = cell_map.get(k).style.backgroundColor;
			
			if(bgc=="#ddeeff" || bgc=="rgb(221, 238, 255)"){
				cell_map.get(k).style.backgroundColor="";
			}
		}
		
		current_cell = cell;
		current_mousedown_cell = cell;
		is_mousedown = true;
		current_mouseup_cell = null;
		current_mouseover_cell = null;
		
		//绘制选中区边框线
		show_container_border(tb,cell,cell);
		
		
		document.getElementById("cell_name").innerHTML=cell.getAttribute("name");
		
		//根据单元格类型显示相应值到showbox
		var type = cell.getAttribute("type");
		var value = cell.getElementsByTagName("div")[0].innerHTML;
		value = value.replace(new RegExp("&nbsp;","gm")," ");
		var showbox = document.getElementById("showbox");
		if(type=="keyword"){
			value = "";
			showbox.readOnly="readonly";
			editor.contentEditable=false;
		}else 
		if(type=="fx"){
			value = "="+cell.getAttribute("value");
			showbox.readOnly="readonly";
			showbox.style.backgroundColor="#D4D0C8";
			editor.contentEditable=false;
		}else{
			showbox.readOnly="";
			showbox.style.backgroundColor="";
			
			//根据单元格各样式属性显示各样式控制组件内容：
			
			//字体
			var fontFamily = cell.style.fontFamily;
			var ffs = document.getElementById("toobarFontFamily");
			if(fontFamily==""){
				ffs.selectedIndex=0;
			}else{

				for(var i=0;i<ffs.options.length;i++){
					
					if(ffs.options[i].text==fontFamily){
						ffs.selectedIndex=i;
					}
					
				}
			}
			
			

			var fss = document.getElementById("toobarFontSize");
			//字号
			var fontSize = cell.style.fontSize;
			if(fontSize==""){
				fss.selectedIndex=0;
			}else{
				fontSize = parseInt(fontSize,10);
				
				for(var i=0;i<fss.options.length;i++){
					
					if(fss.options[i].text==fontSize){
						fss.selectedIndex=i;
					}
					
				}
			}
			
			
			
		}
		showbox.value=value;
		
		cell_map = new hashMap();
		
	}
	
	
	//单元格鼠标点下事件
	cell.onmouseover=function(event){

		
		
		if(is_mousedown){
			
			//得到事件及事件源
			var evt = event || window.event;
			
			//如果非IE浏览器，拖选单元格时，实时判断鼠标左键是否是按下的，如果不是，则退出不执行选择。
			//TODO 
			
			
			var evtsrc = (evt.srcElement || evt.target);

			if(evtsrc.tagName=="DIV"){
				evtsrc = evtsrc.parentNode;

				//alert(evtsrc.style.backgroundColor);//IE8下evtsrc有可能为表格容器
			}


			
			
			if(evtsrc==current_mousedown_cell){
				return;
			}
			

			//设置被拖动选中的单元格的背景颜色
			
			/**
			 *拖动多选单元格时，设置被选中的单元格背景颜色、边框等样式思路：
			 *当拖动移动到单元格时，得到mousedown和当前mouseover单元格的id
			 *分割它们的id，判断比较它们的x、y的大小，拟定出四种循环处理方案
			 *
			 *如果mouseeover的y减mousedown的y为正数，则列渲染的循环用++，
			 *如果mouseeover的y减mousedown的y为负数，则列渲染的循环用--，
			 *
			 *如果mouseeover的x减mousedown的x为正数，则列渲染的循环用++，
			 *如果mouseeover的x减mousedown的x为负数，则列渲染的循环用--，
			 *
			 *两个循环（行循环）内判断x的正负，嵌入x的循环
			 *
			 */
			
			//取得mousedown单元格的横纵坐标
			var cmd_id = current_mousedown_cell.id;
			cmd_id = cmd_id.substr(cmd_id.lastIndexOf("_")+1);
			
			cmd_x = parseInt(cmd_id.substr(1));//current_mousedown_cell.parentNode.rowIndex;
			cmd_y = cmd_id.charCodeAt(0)-64;//字母转数字//current_mousedown_cell.cellIndex;
			
			cc_id = evtsrc.id;
			cc_id = cc_id.substr(cc_id.lastIndexOf("_")+1);
			
			//取得当前移动到的单元格的横纵坐标
			cc_x = parseInt(cc_id.substr(1));//evtsrc.parentNode.rowIndex;
			cc_y = cc_id.charCodeAt(0)-64;//evtsrc.cellIndex;
			
			//alert("["+cmd_x+":"+cmd_y+"],["+cc_x+":"+cc_y+"]");
			var temp_cell_map = new hashMap();
			
			
			
			
			/* 背景颜色渲染方式一，为提高js性能，仅选择未被渲染的单元格进行渲染，不对已渲染的单元格进行遍历，IE8下需要动作很慢：
			var row = tb.rows[cc_x];
			if(cmd_y < cc_y){

				for(var i=cmd_y;i<=cc_y;i++){
					row.cells[i].style.backgroundColor="#000000";
				}
					
			}else if(cmd_y > cc_y){

				for(var i=cmd_y;i>=cc_y;i--){
					row.cells[i].style.backgroundColor="#000000";
				}
					
			}
			
			
			if(cmd_x < cc_x){
				for(var i=cmd_x;i<=cc_x;i++){
					tb.rows[i].cells[cc_y].style.backgroundColor="#000000";
				}
			}else if(cmd_x > cc_x){

				for(var i=cmd_x;i>=cc_x;i--){
					tb.rows[i].cells[cc_y].style.backgroundColor="#000000";
				}
			}
			
			*/
			
			
			
			
			
			//方案二：每次拖选目标改变时，改变起点和终点间矩形范围内的单元格的背景颜色

			//如果mouseover单元格的行值减mousedown单元格的行为正数，则说明是从上点住往下拖选，则从上行往下行循环
			if((cc_x-cmd_x)>=0){
				
				//从上行往下行循环
				for(var i=cmd_x;i<=cc_x;i++){
					
					//如果mouseover单元格的列值减mousedown单元格的列为正数，则说明是从左点住往右拖选，则从左列往右列循环
					if((cc_y-cmd_y)>=0){
						
						for(var j=cmd_y;j<=cc_y;j++){
							
							var name = String.fromCharCode(j+64)+""+i;
							
							var c = document.getElementById(current_sheet.id+"_"+name);
							
							
							
							if(c!=null && c!=current_mousedown_cell){
								
								if(c.style.backgroundColor==""){
									c.style.backgroundColor="#ddeeff";//ddddff
								}
								

								//将鼠标滑动选中的单元格存储到映射表，如果鼠标在滑动时收回，则取消背景颜色改变，遍历时排除选中范围内的单元格
								cell_map.put(name,c);
								temp_cell_map.put(name,c);
							}
							
							
							
							
						}
						
					}
					//如果mouseover单元格的列值减mousedown单元格的列为负数，则说明是从右点住往左拖选，则从右列往左列循环
					else{
						
						for(var j=cmd_y;j>=cc_y;j--){

							var name = String.fromCharCode(j+64)+""+i;

							var c = document.getElementById(current_sheet.id+"_"+name);
							if(c!=null && c!=current_mousedown_cell){
								if(c.style.backgroundColor==""){
									c.style.backgroundColor="#ddeeff";//ddddff
								}
								//将鼠标滑动选中的单元格存储到映射表，如果鼠标在滑动时收回，则取消背景颜色改变，遍历时排除选中范围内的单元格
								cell_map.put(name,c);
								temp_cell_map.put(name,c);
							}
							
							
						}
						
					}
					
				}
				
			}
			//如果为负数，则说明是从下点住往上拖选，则从下行往上行循环
			else{
				
				//从下行往上行循环
				for(var i=cmd_x;i>=cc_x;i--){

					//如果mouseover单元格的列值减mousedown单元格的列为正数，则说明是从左点住往右拖选，则从左列往右列循环
					if((cc_y-cmd_y)>=0){
						
						for(var j=cmd_y;j<=cc_y;j++){

							var name = String.fromCharCode(j+64)+""+i;

							var c = document.getElementById(current_sheet.id+"_"+name);
							if(c!=null && c!=current_mousedown_cell){
								if(c.style.backgroundColor==""){
									c.style.backgroundColor="#ddeeff";//ddddff
								}
								//将鼠标滑动选中的单元格存储到映射表，如果鼠标在滑动时收回，则取消背景颜色改变，遍历时排除选中范围内的单元格
								cell_map.put(name,c);
								temp_cell_map.put(name,c);
							}
							
							
							
						}
						
					}
					//如果mouseover单元格的列值减mousedown单元格的列为负数，则说明是从右点住往左拖选，则从右列往左列循环
					else{
						
						for(var j=cmd_y;j>=cc_y;j--){


							var name = String.fromCharCode(j+64)+""+i;

							var c = document.getElementById(current_sheet.id+"_"+name);
							if(c!=null && c!=current_mousedown_cell){
								if(c.style.backgroundColor==""){
									c.style.backgroundColor="#ddeeff";//ddddff
								}
								//将鼠标滑动选中的单元格存储到映射表，如果鼠标在滑动时收回，则取消背景颜色改变，遍历时排除选中范围内的单元格
								cell_map.put(name,c);
								temp_cell_map.put(name,c);
							}
							
							
						}
						
					}
				}
				
			}


			var tKeySet = temp_cell_map.keySet();
			
			//删除映射表中被设置背景色的单元格，剩下上次与本次比多出的单元格
			for(var k in tKeySet){
				cell_map.remove(k);
			}

			var keySet = cell_map.keySet();
			//遍历剩下的单元格，改变其背景颜色为默认状态
			for(var k in keySet){
				
				var bgc = cell_map.get(k).style.backgroundColor;
				
				if(bgc=="#ddeeff" || bgc=="rgb(221, 238, 255)"){
					cell_map.get(k).style.backgroundColor="";
				}
				
			}

			//将本次选中的单元格映射表赋值给全局变量，以便下次拖选时
			cell_map = temp_cell_map;

			
			
			//调用绘制边框函数，这里异步执行提高速度
			setTimeout(function(){
				show_container_border(tb,current_mousedown_cell,evtsrc);
			},0);
			
			current_mouseover_cell = evtsrc;
			
		}
		
		
		
	}
	
	

	//单元格鼠标点下事件
	cell.onmouseup=function(event){

		//得到事件及事件源
		var evt = event || window.event;
		var cell = (evt.srcElement || evt.target);
		
		if(cell.tagName=="DIV"){
			cell = cell.parentNode;
		}


		//current_mouseover_cell = cell;
		current_mouseup_cell = cell;
		is_mousedown = false;
		

	}
	

	cell.ondblclick=function(event){

		//alert(1);
		//得到事件及事件源
		var evt = event || window.event;
		var evtsrc = (evt.srcElement || evt.target);
		
		var cell = evtsrc;
		if(evtsrc.tagName=="DIV"){
			cell = evtsrc.parentNode;
		}
		
		//根据单元格类型显示相应值到showbox
		var type = cell.getAttribute("type");
		if(type=="keyword"){
			return;
		}else if(type=="fx"){
			defineFormula();
		}
		/*
		else{
			var editor = cell.getElementsByTagName("DIV")[0];
			editor.contentEditable=true;
		}
		*/
		
	}
	
	
	
}




//单个单元格初始化
function single_cell_init(cell){
/*
	var container = document.getElementById(current_sheet.id+"_data_table_container");
	var tb = container.getElementsByTagName("TABLE")[0];
	
	*/
	
	
	cell.setAttribute("nowrap","nowrap");
	
	//可编辑div代码
	//var editor = "<div style='white-space:nowrap;width:inherit;height:inherit;padding-left:2px;'></div>";//"+cell.getAttribute("name")+"
	var editor = "<DIV class='c'></DIV>";//"+cell.getAttribute("name")+",
	
	
	cell.innerHTML = editor;
	
	//设置单元格高宽度样式，高度=行头高度，宽度=列头宽度

	var cellIndex = cell.cellIndex;
	var rowIndex = cell.parentNode.rowIndex;
	var header = document.getElementById(current_sheet.id+"_scroll_header").rows[0];
	var lefter = document.getElementById(current_sheet.id+"_scroll_lefter");
	//var cwidth = header.cells[cellIndex].style.width;
	var rheight = lefter.rows[rowIndex].cells[0].style.height;
	
	//cell.style.width=cwidth;
	
	cell.style.height=rheight;
	cell.nowrap="nowrap";

	
	cell_event_init(cell);
	
}

//单元格初始化
function cell_init(){

	var container = document.getElementById(current_sheet.id+"_data_table_container");
	var tb = container.getElementsByTagName("TABLE")[0];
	

	for(var i=0;i<tb.rows.length;i++){
		for(var j=0;j<tb.rows[i].cells.length;j++){
			var cell = tb.rows[i].cells[j];
			

			var name = String.fromCharCode(cell.cellIndex+65)+(cell.parentNode.rowIndex+1);
			//设置单元格id
			cell.id=current_sheet.id+"_"+name;
			
			cell.setAttribute("name",name);
			
			single_cell_init(cell);
			
			
			
		}
	}
	
	//初始化右键菜单
	var cell_contextmenu = document.getElementById('cell_contextmenu');
	var items = cell_contextmenu.getElementsByTagName("li");
	for(var i=0;i<items.length;i++){
		items[i].setAttribute("type","contextmenu_item");
		items[i].onmouseup=function(){
			cell_contextmenu.style.display="none";
		}
	}
	
	
	
	//默认选中第一个单元格
	current_cell = tb.rows[0].cells[0];
	current_mousedown_cell = tb.rows[0].cells[0];
	current_mouseup_cell = tb.rows[0].cells[0];
	show_container_border(tb,current_cell,current_cell);
	
	
}





//查询显示的单元格初始化
function queried_cell_init(){

	var container = document.getElementById(current_sheet.id+"_data_table_container");
	var tb = container.getElementsByTagName("TABLE")[0];
	
	keyword_cell_map = new hashMap();
	fx_cell_map = new hashMap();
	for(var i=0;i<tb.rows.length;i++){
		for(var j=0;j<tb.rows[i].cells.length;j++){
			var cell = tb.rows[i].cells[j];
			
			//如果非普通单元格，将其put到相应map集合中，以便单元格事件正常取值赋值。
			var cellType = cell.getAttribute("type");
			if(cellType=="keyword"){
				var keywordName=cell.getAttribute("keywordName");
				keyword_cell_map.put(keywordName,cell);
			}else
				
			if(cellType=="fx"){
				fx_cell_map.put(cell.getAttribute("id"),cell.getAttribute("value"));
			}
			
			cell_event_init(cell);
			
		}
	}
	
	//初始化右键菜单
	var cell_contextmenu = document.getElementById('cell_contextmenu');
	var items = cell_contextmenu.getElementsByTagName("li");
	for(var i=0;i<items.length;i++){
		items[i].setAttribute("type","contextmenu_item");
		items[i].onmouseup=function(){
			cell_contextmenu.style.display="none";
		}
	}
	
	
	
	//默认选中第一个单元格
	current_cell = tb.rows[0].cells[0];
	current_mousedown_cell = tb.rows[0].cells[0];
	current_mouseup_cell = tb.rows[0].cells[0];
	show_container_border(tb,current_cell,current_cell);
	
	
}





//选中单元格区域边框线鼠标弹起事件处理函数,边框线上弹起鼠标应执行被移动到的单元格的mouseup事件。
function container_border_mouse_up(){

	current_mouseup_cell = current_mouseover_cell;
	is_mousedown = false;
	
	
}

function show_container_border(tb,cell1,cell2){
	
	//console.info(tb.id+","+cell1.name+","+cell2.name);

	var greater_x = null;//较大x
	var less_x = null;//较小x
	
	var greater_y = null;//较大y
	var less_y = null;//较小y

	var cell1_name = cell1.getAttribute("name");
	var cell2_name = cell2.getAttribute("name");
	
	if(cell1_name==null || cell2_name==null){
		return;
	}
	
	try{
		cell1_name = cell1_name.split(":")[0];
	}catch(e){}
	
	cell1_x = parseInt(cell1_name.substr(1));
	cell1_y = cell1_name.charCodeAt(0)-64;//字母转数字

	
	
	try{
		cell2_name = cell2_name.split(":")[0];
	}catch(e){}
	
	cell2_x = parseInt(cell2_name.substr(1));
	cell2_y = cell2_name.charCodeAt(0)-64;//字母转数字
	
	
	if(cell1_x < cell2_x){
		less_x = cell1_x;
		greater_x = cell2_x;
	}else{
		less_x = cell2_x;
		greater_x = cell1_x;
	}
	
	if(cell1_y < cell2_y){
		less_y = cell1_y;
		greater_y = cell2_y;
	}else{
		less_y = cell2_y;
		greater_y = cell1_y;
	}
	
	
	
	/*
	if(cell1.parentNode.rowIndex < cell2.parentNode.rowIndex){
		less_x = cell1.parentNode.rowIndex;
		greater_x = cell2.parentNode.rowIndex;
	}else{
		less_x = cell2.parentNode.rowIndex;
		greater_x = cell1.parentNode.rowIndex;
	}
	*/
		
	/*
	if(cell1.cellIndex < cell2.cellIndex){
		less_y = cell1.cellIndex;
		greater_y = cell2.cellIndex;
	}else{

		less_y = cell2.cellIndex;
		greater_y = cell1.cellIndex;
	}
	*/	

	var header_row = document.getElementById(current_sheet.id+"_scroll_header").rows[0];
	var headerCols = getTableHeaderCols();
	var lefter = document.getElementById(current_sheet.id+"_scroll_lefter");
	
	var line_width = 0;
	var line_height = 0;
	
	//重置列头所有边框样式
	for(var i=0;i<header_row.cells.length;i++){
		header_row.cells[i].style.borderTop="1px solid #848484";
		header_row.cells[i].style.borderBottom="1px solid #848484";
		header_row.cells[i].style.fontWeight="";
	}

	//重置行头所有边框样式
	for(var i=0;i<lefter.rows.length;i++){
		lefter.rows[i].cells[0].style.borderBottom="1px solid #848484";
		lefter.rows[i].cells[0].style.borderLeft="1px solid #848484";
		lefter.rows[i].cells[0].style.fontWeight="";
	}
	
	for(var i=less_y;i<=greater_y;i++){
		//设置被选中区域列头边框样式
		
		header_row.cells[i-1].style.borderTop="1px solid #ffffff";
		header_row.cells[i-1].style.borderBottom="1px solid #000000";
		header_row.cells[i-1].style.fontWeight="bold";
		
		//header_row.cells[i-1].style.backgroundColor="#ffff00";
		
		line_width += parseInt(headerCols[i-1].style.width);
		
	}
	
	for(var i=less_x;i<=greater_x;i++){
		//设置被选中区域行头边框样式
		
		lefter.rows[i-1].cells[0].style.borderBottom="1px solid #000000";
		lefter.rows[i-1].cells[0].style.borderLeft="1px solid #ffffff";
		lefter.rows[i-1].cells[0].style.fontWeight="bold";
		
		//lefter.rows[i-1].cells[0].style.backgroundColor="#ff00ff";
		
		line_height += parseInt(lefter.rows[i-1].cells[0].style.height)+2;
	}

	
	var bodyerCols = getTableBodyerCols();
	if(cell1==cell2){

		
		line_width = cell1.offsetWidth;//parseInt(bodyerCols[cell1.cellIndex].style.width);
		/*
		var colSpan = cell1.colSpan;
		
		if(colSpan>1){
			line_width = 0;
			for(var i=0;i<colSpan;i++){
				line_width += parseInt(bodyerCols[cell1.cellIndex+i].style.width);
			}
		}
		*/
		line_height = parseInt(cell1.style.height);
		
	}
	
	current_selected_cells_border_width = line_width;
	current_selected_cells_border_height = line_height;
	
	
	var cell = document.getElementById(current_sheet.id+"_"+String.fromCharCode(less_y+64)+""+less_x);//tb.rows[less_x].cells[less_y];
	
	

	//生成边框
	var ot = cell.offsetTop;
	var ol = cell.offsetLeft;

	var cell_border_top = document.getElementById(current_sheet.id+"_cell_border_top");
	var cell_border_right = document.getElementById(current_sheet.id+"_cell_border_right");
	var cell_border_bottom = document.getElementById(current_sheet.id+"_cell_border_bottom");
	var cell_border_left = document.getElementById(current_sheet.id+"_cell_border_left");
	
	cell_border_top.style.width=(line_width+6)+"px";//(parseInt(cell.style.width)+4)+"px";
	cell_border_top.style.height="3px";
	cell_border_top.style.marginTop = (ot-parseInt(tb.style.height)-2)+"px";
	cell_border_top.style.marginLeft = (ol+40-2)+"px";
	
	cell_border_right.style.width="3px";
	cell_border_right.style.height=line_height+"px";//parseInt(cell.style.height)+"px";
	cell_border_right.style.marginTop = "-2px";
	cell_border_right.style.marginLeft = (ol+40+line_width+1)+"px";//(ol+40+parseInt(cell.style.width))+"px";
	
	cell_border_bottom.style.width=(line_width+6)+"px";//(parseInt(cell.style.width)+4)+"px";
	cell_border_bottom.style.height="3px";
	cell_border_bottom.style.marginTop = "0px";
	cell_border_bottom.style.marginLeft = (ol+40-2)+"px";

	cell_border_left.style.width="3px";
	cell_border_left.style.height=line_height+"px";;//parseInt(cell.style.height)+"px";
	cell_border_left.style.marginTop = (0-line_height-3)+"px";//(0-parseInt(cell.style.height)-3)+"px";
	cell_border_left.style.marginLeft = (ol+40+-2)+"px";

	cell_border_top.style.display="block";
	cell_border_right.style.display="block";
	cell_border_bottom.style.display="block";
	cell_border_left.style.display="block";

	var sc = document.getElementById(current_sheet.id+"_data_table_container");
	
	sc.scrollTop = sc.scrollTop-1;
	sc.scrollTop = sc.scrollTop+1;
	
	


	if(cell1!=cell2){
		
		document.getElementById("cell_name").innerHTML=cell.getAttribute("name")+":"+String.fromCharCode(greater_y+64)+""+greater_x;//tb.rows[greater_x].cells[greater_y].getAttribute("name");
	}else{
		document.getElementById("cell_name").innerHTML=cell.getAttribute("name");
	}
	
	//sc.joe=liee;//专门设置错误禁止IE浏览器事件事务机制
	
	
}



//工具条初始化
function toolbar_init(){
	var ibs = document.getElementById("toolbar").getElementsByTagName("div");
	
	for(var i=0;i<ibs.length;i++){
		if(ibs[i].className=="ib"){
			
			ibs[i].onmouseover=function(event){

				var evt = event || window.event;
				var evtsrc = (evt.srcElement || evt.target);
				
				if(evtsrc.tagName=="IMG"){
					evtsrc = evtsrc.parentNode;
				}
				
				//不对灰色图标改变样式
				var imgname = evtsrc.getElementsByTagName("IMG")[0].src;
				if(imgname.indexOf("_h")>0){
					return;
				}
				
				if(current_icon_button!=null){

					current_icon_button.style.borderTop="1px solid #D4D0C8";
					current_icon_button.style.borderRight="1px solid #D4D0C8";
					current_icon_button.style.borderBottom="1px solid #D4D0C8";
					current_icon_button.style.borderLeft="1px solid #D4D0C8";
					
				}
				
				evtsrc.style.borderTop="1px solid #ffffff";
				evtsrc.style.borderRight="1px solid #808080";
				evtsrc.style.borderBottom="1px solid #808080";
				evtsrc.style.borderLeft="1px solid #ffffff";
				
				current_icon_button = evtsrc;
			}
			

			ibs[i].onmousedown=function(event){

				var evt = event || window.event;
				var evtsrc = (evt.srcElement || evt.target);

				if(evtsrc.tagName=="IMG"){
					evtsrc = evtsrc.parentNode;
				}

				//不对灰色图标改变样式
				var imgname = evtsrc.getElementsByTagName("IMG")[0].src;
				if(imgname.indexOf("_h")>0){
					return;
				}
				
				evtsrc.style.borderTop="1px solid #808080";
				evtsrc.style.borderRight="1px solid #ffffff";
				evtsrc.style.borderBottom="1px solid #ffffff";
				evtsrc.style.borderLeft="1px solid #808080";
				
			}
			

			ibs[i].onmouseup=function(event){

				var evt = event || window.event;
				var evtsrc = (evt.srcElement || evt.target);

				if(evtsrc.tagName=="IMG"){
					evtsrc = evtsrc.parentNode;
				}

				//不对灰色图标改变样式
				var imgname = evtsrc.getElementsByTagName("IMG")[0].src;
				if(imgname.indexOf("_h")>0){
					return;
				}
				
				evtsrc.style.borderTop="1px solid #ffffff";
				evtsrc.style.borderRight="1px solid #808080";
				evtsrc.style.borderBottom="1px solid #808080";
				evtsrc.style.borderLeft="1px solid #ffffff";
				
			}
			
			
			ibs[i].onmouseout=function(event){

				var evt = event || window.event;
				var evtsrc = (evt.srcElement || evt.target);

				if(evtsrc.tagName=="IMG"){
					evtsrc = evtsrc.parentNode;
				}
				//不对灰色图标改变样式
				var imgname = evtsrc.getElementsByTagName("IMG")[0].src;
				if(imgname.indexOf("_h")>0){
					return;
				}
				
				evtsrc.style.borderTop="1px solid #D4D0C8";
				evtsrc.style.borderRight="1px solid #D4D0C8";
				evtsrc.style.borderBottom="1px solid #D4D0C8";
				evtsrc.style.borderLeft="1px solid #D4D0C8";
				
			}
		}
	}
	
}



//工具栏‘B’加粗按钮事件处理
function toolbar_b(){
	var fontWeight = current_cell.style.fontWeight;
	
	if(fontWeight==""){
		current_cell.style.fontWeight="bold";
	}else if(fontWeight=="bold"){
		current_cell.style.fontWeight="";
	}

	contentChanged = true;//声明报表已发生改变
}


//工具栏‘I’倾斜按钮事件处理
function toolbar_i(){
	var fontStyle = current_cell.style.fontStyle;
	
	if(fontStyle==""){
		current_cell.style.fontStyle="italic";
	}else if(fontStyle=="italic"){
		current_cell.style.fontStyle="";
	}

	contentChanged = true;//声明报表已发生改变
}


//工具栏‘U’下划线按钮事件处理
function toolbar_u(){
	var textDecoration = current_cell.style.textDecoration;
	
	if(textDecoration==""){
		current_cell.style.textDecoration="underline";
	}else if(textDecoration=="underline"){
		current_cell.style.textDecoration="";
	}

	contentChanged = true;//声明报表已发生改变
}


//工具栏左对齐按钮事件处理
function toolbar_zdq(){

	var textAlign = current_cell.style.textAlign;

	if(textAlign!="left"){
		current_cell.style.textAlign="left";
	}else{
		current_cell.style.textAlign="";
	}

	contentChanged = true;//声明报表已发生改变
	
}


//工具栏左对齐按钮事件处理
function toolbar_jzdq(){

	var textAlign = current_cell.style.textAlign;
	
	if(textAlign!="center"){
		current_cell.style.textAlign="center";
	}else{
		current_cell.style.textAlign="";
	}

	contentChanged = true;//声明报表已发生改变
	
}


//工具栏右对齐按钮事件处理
function toolbar_ydq(){

	var textAlign = current_cell.style.textAlign;
	
	if(textAlign!="right"){
		current_cell.style.textAlign="right";
	}else{
		current_cell.style.textAlign="";
	}

	contentChanged = true;//声明报表已发生改变
}




//合并单元格
function merge_cell(){
	
	
	if(current_mousedown_cell==null || current_mouseover_cell==null) return;
	if(current_mousedown_cell==current_mouseover_cell) return;
	
	
	/*
	//取得mousedown单元格的横纵坐标
	cmd_x = parseInt(current_mousedown_cell.parentNode.rowIndex);
	cmd_y = parseInt(current_mousedown_cell.cellIndex);
	
	//取得当前移动到的单元格的横纵坐标
	cmu_x = parseInt(current_mouseover_cell.parentNode.rowIndex);
	cmu_y = parseInt(current_mouseover_cell.cellIndex);
	*/
	
	

	//取得mousedown单元格的横纵坐标
	var cmd_name = current_mousedown_cell.getAttribute("name");
	cmd_name = cmd_name.split(":")[0];
	cmd_x = parseInt(cmd_name.substr(1));
	cmd_y = cmd_name.charCodeAt(0)-64;//字母转数字

	//取得当前移动到的单元格的横纵坐标
	var cmu_name = current_mouseover_cell.getAttribute("name");
	cmu_name = cmu_name.split(":")[0];
	cmu_x = parseInt(cmu_name.substr(1));
	cmu_y = cmu_name.charCodeAt(0)-64;//字母转数字
	
	
	//合并单元格采用从左上角至右下角删除合并方式
	//这样必须得到最小的x和y、最大的x和y

	//得到最大的x
	max_x=cmd_x>cmu_x?cmd_x:cmu_x;

	//得到最大的y
	max_y=cmd_y>cmu_y?cmd_y:cmu_y;
	

	//得到最小的x
	min_x=cmd_x<cmu_x?cmd_x:cmu_x;

	//得到最小的y
	min_y=cmd_y<cmu_y?cmd_y:cmu_y;
	
	
	//alert("最大的x,y:"+max_x+","+max_y+";最小的x,y:"+min_x+","+min_y);
	
	var tb = current_mousedown_cell.parentNode.parentNode.parentNode;

	var firstCell = null;
	//循环行
	for(var i=min_x;i<=max_x;i++){
		
		
		for(var j=min_y;j<=max_y;j++){
			
			var cell_id = current_sheet.id+"_"+String.fromCharCode(j+64)+""+i;
			var cell=document.getElementById(cell_id);
			
			//如果是首单元格，则跳出本轮循环，进入下一个
			if(j==min_y && i==min_x){
				
				firstCell = cell;
				continue;
			}

			if(cell!=null){
				//alert(cell.cellIndex);
				cell.parentNode.deleteCell(cell.cellIndex);
				
			}
			
			
		}
		
	}
	
	
	

	if(firstCell!=null){

		firstCell.colSpan=max_y-min_y+1;
		firstCell.rowSpan=max_x-min_x+1;
		

		var first_cell_name = String.fromCharCode(min_y+64)+""+min_x;
		var last_cell_name = String.fromCharCode(max_y+64)+""+max_x;
		
		
		//firstCell.style.width = current_selected_cells_border_width+"px";
		firstCell.style.height = current_selected_cells_border_height+"px";
		
		
		
		firstCell.setAttribute("name",first_cell_name+":"+last_cell_name);
		
	}
	
	

	
//	tb.style.display="none";
//	tb.style.display="block";

	contentChanged = true;//声明报表已发生改变
}


//拆分单元格，查找单元格应创建的行中的位置
function get_cell_insert_location(row,cellIndex){
	var prve_cell = null;
	for(var i=cellIndex;i>=0;i--){

		prve_cell = current_sheet.id+"_"+String.fromCharCode(i+65)+(row.rowIndex+1);
		prve_cell = document.getElementById(prve_cell);
		if(prve_cell!=null){
			return prve_cell.cellIndex+1;
		}
		
	}
	
/*
	var next_cell = current_sheet.id+"_"+String.fromCharCode(cellIndex+65+1)+(row.rowIndex+1);
	next_cell = document.getElementById(next_cell);
	if(next_cell!=null){
		return next_cell.cellIndex-1;
	}
	*/
	
	return 0;
	
	
}



//拆分单元格
function split_cell(){
	var cell_ccc=current_mousedown_cell;
	if(cell_ccc!=null && cell_ccc!=undefined){
		
		var colspan = cell_ccc.getAttribute("colspan");
		var rowspan = cell_ccc.getAttribute("rowspan");

		colspan = parseInt(colspan,10);
		rowspan = parseInt(rowspan,10);
		var rowIndex = cell_ccc.parentNode.rowIndex;
		var cellIndex = cell_ccc.cellIndex;
		var table = cell_ccc.parentNode.parentNode.parentNode;

		cell_ccc.removeAttribute("colspan");
		cell_ccc.removeAttribute("rowspan");

		var header_row = document.getElementById(current_sheet.id+"_scroll_header").rows[0];
		var lefter = document.getElementById(current_sheet.id+"_scroll_lefter");
		//修改单元格高宽度为表行头列头高宽度
		//cell_ccc.style.width = header_row.cells[cell_ccc.cellIndex].style.width;
		cell_ccc.style.height = (parseInt(lefter.rows[cell_ccc.parentNode.rowIndex].cells[0].style.height)+1)+"px";
		

		var height = 0;
		var width = 0;
		
		//从选中单元格所在行下一行开始循环至行标+rowspan行，在对应位置生成colspan个单元格（实现拆分）
		for(var i=rowIndex;i<rowIndex+rowspan;i++){

			height = (parseInt(lefter.rows[i].cells[0].style.height)+1)+"px";

			if(i==rowIndex){

				//按照被合并的列数在相应位置生成cell
				for(var j=cellIndex+1;j<cellIndex+colspan;j++){
					
					var location = get_cell_insert_location(table.rows[i],j);
					var cell = table.rows[i].insertCell(location);
					//width = header_row.cells[j].style.width;
					//cell.style.width=width;
					cell.style.height=height;

					var name = String.fromCharCode(j+65)+(i+1);
					//设置单元格id
					cell.id=current_sheet.id+"_"+name;
					cell.setAttribute("name",name);
					
					single_cell_init(cell);
				}
			}else{

				//按照被合并的列数在相应位置生成cell
				for(var j=cellIndex;j<cellIndex+colspan;j++){
					
					var location = get_cell_insert_location(table.rows[i],j);
					var cell = table.rows[i].insertCell(location);
					//width = header_row.cells[j].style.width;
					//cell.style.width=width;
					cell.style.height=height;
					
					var name = String.fromCharCode(j+65)+(i+1);
					//设置单元格id
					cell.id=current_sheet.id+"_"+name;
					cell.setAttribute("name",name);
					
					single_cell_init(cell);
				}
			}

		}
		
		
		//cell_ccc.id = cell_ccc.id.substr(0,cell_ccc.id.lastIndexOf("_"));
		
		var cellName = cell_ccc.getAttribute("name");
		cellName = cellName.substr(0,cellName.indexOf(":"));
		cell_ccc.setAttribute("name",cellName);
		
		
		
		
	}

	contentChanged = true;//声明报表已发生改变
}



//显示右键菜单
function show_cell_contextmenu(event){
	
	

	var evt=(window.event || event);
	var x = 0;
	if(document.all){
		x = evt.clientX;
	}else{
		x = evt.pageX;
	}
	
	var cm = document.getElementById('cell_contextmenu');
	cm.style.top="110px";
	cm.style.left = x+"px";
	cm.style.display="block";
	
	document.onmousedown=function(event){

		var evt=(window.event || event);
		var evtsrc = (evt.srcElement || evt.target);
		
		if(evtsrc.tagName=="SPAN"){
			evtsrc = evtsrc.parentNode;
		}
		
		if(evtsrc.getAttribute("type")!="contextmenu_item"){
			cm.style.display="none";
			
		}
		
	}
	
	return false;
}

//字体大小发生改变
function font_size_change(s){
	current_mousedown_cell.style.fontSize = s.options[s.selectedIndex].text+"px";

	contentChanged = true;//声明报表已发生改变
}

//字体样式发生改变
function font_family_change(s){
	current_mousedown_cell.style.fontFamily = s.options[s.selectedIndex].text;

	contentChanged = true;//声明报表已发生改变
}



function showbox_focus(){
	showbox_focus_state=true;
	document.getElementById("delete_icon").src="report/images/delete_c.jpg";
	document.getElementById("confirm_icon").src="report/images/confirm_c.jpg";
}

function showbox_blur(){
	showbox_focus_state=false;
	var showbox = document.getElementById("showbox");
	if(showbox.readOnly==true){
		return;
	}
	var v = showbox.value;
	v = v.replace(new RegExp(" ","gm"),"&nbsp;");
	
	current_cell.getElementsByTagName("div")[0].innerHTML=v;

	contentChanged = true;//声明报表已发生改变
}


function fx_icon_click(btn){
	if(current_cell!=null){
		defineFormula();
	}
}


function delete_icon_click(btn){
	
	//遇到禁用按钮退出
	var imgname = btn.getElementsByTagName("IMG")[0].src;
	if(imgname.indexOf("_h")>0){
		return;
	}
	
	document.getElementById("showbox").value="";
	

	document.getElementById("delete_icon").src="report/images/delete_h.jpg";
	document.getElementById("confirm_icon").src="report/images/confirm_h.jpg";
	btn.style.border="1px solid #D4D0C8";
	
	contentChanged = true;//声明报表已发生改变
}



function confirm_icon_click(btn){
	
	//遇到禁用按钮退出
	var imgname = btn.getElementsByTagName("IMG")[0].src;
	if(imgname.indexOf("_h")>0){
		return;
	}

	var v = document.getElementById("showbox").value;
	var prefix = v.substr(0,1);
	if(prefix=="="){
		v = v.substr(1);
		action = "defineFormula";
		deliverValue(v);
	}else{

		current_cell.getElementsByTagName("div")[0].innerHTML=v;
		document.getElementById("delete_icon").src="report/images/delete_h.jpg";
		document.getElementById("confirm_icon").src="report/images/confirm_h.jpg";
		btn.style.border="1px solid #D4D0C8";

	}
	
	
	
	contentChanged = true;//声明报表已发生改变
}

//清理单元格（重置单元格到普通状态）
function clean_cell(cell){

	var kwn = cell.getAttribute("keywordName");
	if(kwn!=null){
		keyword_cell_map.remove(kwn);
	}

	fx_cell_map.remove(current_cell.id);
	temp_fx_cells_map.remove(current_cell.id);
	
	
	var div = cell.getElementsByTagName("div")[0];
	div.innerHTML="";
	cell.style.color="";
	cell.style.textAlign="";
	cell.style.fontSize="";
	cell.style.backgroundColor="";
	cell.style.fontFamily="";
	cell.removeAttribute("type");
	cell.removeAttribute("keywordName");
	cell.removeAttribute("value");
	

	contentChanged = true;//声明报表已发生改变
}


//清除
function clearCell(){
	if(current_cell!=null){
		clean_cell(current_cell);
	}

	contentChanged = true;//声明报表已发生改变
}



/***
 * 单元格公式计算方法
 * 说明：
 * 公式分为函数公式和单元格关联计算公式。
 * 函数公式需要后台查询数据并计算返回。
 * 单元格关联公式需要在前端计算各关联单元格的值，如C1=A1+B1。
 * 思路：
 * 由于每个单元格都有可能有自己的公式，如果单元格之间的值存在依赖，
 * 如C1=A1+B1，C3=C1+C2，在计算C3的值时首先应先算出C1的值，
 * 因此需要采用递归算法。
 * 算法思路：
 * 递归函数需要计算的传入单元格DOM对象，函数内部对该单元格对象的值进行判断，
 * 如果有值则直接返回，无值则进而判断公式是函数式公式还是
 * 关联式公式，如果是函数式公式，则调用后台查询计算方法并得到返回值返回，如
 * 果是关联式公式，则根据运算符分割公式，列出单元格并递归单元格值计算函数得
 * 到各单元格值并进行计算返回。
 * 
 * 
 */
/*
function correlation_calculation(cell){

	//判断单元格是否有值，有则直接返回
	var div = cell.getElementsByTagName("div")[0];
	var result = div.innerHTML;
	if(result==""){
		

		//判断单元格公式类型
		var formula = cell.getAttribute("value");
		
		//函数公式情况
		if(formula.indexOf("(")>0){
			//调用后台计算
			result = calculateCell(cell,formula);
			result = parseFloat(result).toFixed(2);
		}
		//关联公式情况
		else{
			
			//将"A1+B1-C2"公式字符串转换为：["A1","+","B1","-","C2"]
			var ss = formula.split("");
			var expslpstr = new Array();
			var startIndex=0;
			for(var i=0;i<ss.length;i++){
				if(ss[i]=="+" || ss[i]=="-"){
					expslpstr.push(formula.substring(startIndex,i));
					expslpstr.push(ss[i]);
					startIndex=i+1;
				}
			}
			expslpstr.push(formula.substring(startIndex,formula.length));

			//将["A1","+","B1","-","C2"]转变为：["12","+","3","-","5"]
			for(var j=0;j<=expslpstr.length;j+=2){
				cell = document.getElementById(current_sheet.id+"_"+expslpstr[j]);
				
				var v = correlation_calculation(cell);//递归计算
				expslpstr[j]=v;
			}
			
			//将["12","+","3","-","5"]变为：12+3-5
			var express = expslpstr.join("");
			
			result = eval(express);//计算表达式结果
			result = parseFloat(result).toFixed(2);
			
		}
		
		
	}

	return result;
	
	
}
*/


//新版：
function correlation_calculation(cell){


	if(cell==null){
		//关闭进度窗
		closeProgressWindow();
		jAlert("存在不合法的公式单元格，请检查！");
		return 0.00;
	}
	
	
	//判断单元格是否有值，有则直接返回
	var div = cell.getElementsByTagName("div")[0];
	
	
	var result = div.innerHTML;
	
	//console.info("result:"+result);
	
	if(result==""){
		

		//判断单元格公式类型
		var formula = cell.getAttribute("value");
		if(formula==null || formula==""){
			return 0.00;
		}
		
		//解决公式设错，自己对自己进行递归计算进入死循环问题。
		var cell_name = cell.getAttribute("name");
		if(formula.indexOf(cell_name)>-1){
			
			jAlert(cell_name+"单元格公式不能包含对自身的运算，请重新设置重新计算！");
			return result;
		}

		//console.info("formula:"+formula);
		
		
		//将'QM("1001",,)+ptotal(B1:B5)-A5+C3'转换为：['QM("1001",,)','+','ptotal(B1:B5)','-','A5','+','C3']
		var ss = formula.split("");
		var expslpstr = new Array();
		var startIndex=0;
		for(var i=0;i<ss.length;i++){
			if(ss[i]=="+" || ss[i]=="-"){
				expslpstr.push(formula.substring(startIndex,i));
				expslpstr.push(ss[i]);
				startIndex=i+1;
			}
		}
		expslpstr.push(formula.substring(startIndex,formula.length));

		//将['QM("1001",,)','+','ptotal(B1:B5)','-','A5','+','C3']转变为：['12','+','39','-','17','+','24']
		for(var j=0;j<=expslpstr.length;j+=2){
			
			var exp = expslpstr[j];
			
			
			
			//是否是公式，如：QC()
			if(exp.indexOf("(")>0){
				var funName = exp.substr(0,exp.indexOf("("));

				//公式分为后台计算型和前台计算型，后台计算型如：QC()等，前台计算型如：ptotal(B1:B3)
				if(funName.indexOf("ptotal")>=0){
					
					//从'ptotal(B1:B5)'中取得'B1:B5'
					var lgth = exp.indexOf(")")-exp.indexOf("(")-1;
					var cellexp = exp.substr(exp.indexOf("(")+1,lgth);
					var cellList = cellexp.split(":");//得到['B1','B5']
					
					var scn = cellList[0];//start cell name
					var ecn = cellList[1];//end cell name
					
					var s_x = parseInt(scn.substr(1));
					var s_y = scn.charCodeAt(0)-64;//字母转数字
					
					var e_x = parseInt(ecn.substr(1));
					var e_y = ecn.charCodeAt(0)-64;//字母转数字

					var max_x=s_x>e_x?s_x:e_x;//得到最大的行
					var max_y=s_y>e_y?s_y:e_y;//得到最大的列
					var min_x=s_x<e_x?s_x:e_x;//得到最小的行
					var min_y=s_y<e_y?s_y:e_y;//得到最小的列
					
					//遍历所设范围单元格，累加值
					var sum = 0;
					for(var ii=min_x;ii<=max_x;ii++){
						for(var jj=min_y;jj<=max_y;jj++){
							

							var cell_id = current_sheet.id+"_"+String.fromCharCode(jj+64)+""+ii;
							var cell=document.getElementById(cell_id);

							cell.getElementsByTagName("div")[0].innerHTML="";
							
							result = correlation_calculation(cell);
							
							cell.getElementsByTagName("div")[0].innerHTML=result;
							sum = sum + parseFloat(result);

						}
					}
					expslpstr[j]=sum.toFixed(2);
					
					
				}else{
					
					
					
					var value = formula_value_map.get(exp);
					if(value!=null){
						result = value;
					}else{

						//调用后台计算
						result = calculateCell(exp);
					}

					
					expslpstr[j] = parseFloat(result).toFixed(2);

				}
			}

			//单元格，如：A1
			else{
				cell = document.getElementById(current_sheet.id+"_"+exp);
				
				//console.info("exp:"+exp);
				
				if(cell==null || cell==undefined){
					jAlert("公式非法，请检查！");
					expslpstr[j]=0.00;
				}else{

					cell.getElementsByTagName("div")[0].innerHTML="";
					
					var v = correlation_calculation(cell);//递归计算
					v = parseFloat(v).toFixed(2);
					
					cell.getElementsByTagName("div")[0].innerHTML=v;
					expslpstr[j]=v;
				}
				
			}
		}

		//将是数字的元素用括号包裹，解决遇到负数时，拼成x--y的情况时eval函数报表达式语法错误问题。
		for(var k=0;k<expslpstr.length;k++){
			if(!isNaN(expslpstr[k])) {
				expslpstr[k] = "(" + expslpstr[k] + ")";
			}
		}
		//将['12','+','39','-','17','+','24']变为：'12+39-17+24'
		var express = expslpstr.join("");

		result = eval(express);//计算表达式结果
		

		//console.info(express+":"+result+";");
		
		result = parseFloat(result).toFixed(2);
		
		//console.info("result2:"+result);
	}

	return result;
}















function onWindowClose(){
	
	if(contentChanged == true){

		if(!reportTemplateUpdate){

			jConfirm("是否保存报表？","提示",function(flag){
				if(flag){
					saveReport();
					isReportWindowClosing = true;
				}else{
					window.parent.justCloseWindow("HTMLExcel");
					
				}
			});
			return false;
			
		}else{

			jConfirm("是否保存模板？","提示",function(flag){
				if(flag){
					saveReportTemplate();
					isReportWindowClosing = true;
				}else{
					window.parent.justCloseWindow("HTMLExcel");
					
				}
			});
			return false;
			
		}
		
		
		
	}else{
		return true;
	}
	
	
}



//向右求和
function toRightSum(){

	

	if(current_mousedown_cell==null || current_mouseover_cell==null) return;
	if(current_mousedown_cell==current_mouseover_cell) return;
	

	//取得mousedown单元格的横纵坐标
	var cmd_name = current_mousedown_cell.getAttribute("name");
	cmd_name = cmd_name.split(":")[0];
	cmd_x = parseInt(cmd_name.substr(1));
	cmd_y = cmd_name.charCodeAt(0)-64;//字母转数字

	//取得当前移动到的单元格的横纵坐标
	var cmu_name = current_mouseover_cell.getAttribute("name");
	cmu_name = cmu_name.split(":")[0];
	cmu_x = parseInt(cmu_name.substr(1));
	cmu_y = cmu_name.charCodeAt(0)-64;//字母转数字
	
	

	//得到最大的x
	max_x=cmd_x>cmu_x?cmd_x:cmu_x;

	//得到最大的y
	max_y=cmd_y>cmu_y?cmd_y:cmu_y;
	

	//得到最小的x
	min_x=cmd_x<cmu_x?cmd_x:cmu_x;

	//得到最小的y
	min_y=cmd_y<cmu_y?cmd_y:cmu_y;
	
	
	
	//循环最下方一行，判断是否存在有值的行，如果有，则退出函数
	var flag = true;
	for(var i=min_x;i<=max_x;i++){
		var cell_id = current_sheet.id+"_"+String.fromCharCode(max_y+64)+""+i;
		var cell=document.getElementById(cell_id);
		
		var textValue = cell.getElementsByTagName("div")[0].innerHTML;
		if(textValue!=""){
			flag = false;
		}
	}
	
	if(!flag){
		return;
	}
	
	for(var i=min_x;i<=max_x;i++){
		
		var fx = "";
		for(var j=min_y;j<max_y;j++){
			
			fx += "+"+String.fromCharCode(j+64)+""+i;
		}
		fx = fx.substr(1);
		
		var cell_id = current_sheet.id+"_"+String.fromCharCode(max_y+64)+""+i;
		var cell=document.getElementById(cell_id);
		
		cell.getElementsByTagName("div")[0].innerHTML="公式单元";
		cell.style.textAlign="right";
		cell.style.fontSize="16px";
		cell.style.color="";
		cell.setAttribute("type","fx");
		cell.setAttribute("value",fx);
		
		fx_cell_map.put(cell.id,fx);
		temp_fx_cells_map.put(cell.id,fx);
		
	}
	
	contentChanged = true;//声明报表已发生改变
}

//向下求和
function toFootSum(){

	if(current_mousedown_cell==null || current_mouseover_cell==null) return;
	if(current_mousedown_cell==current_mouseover_cell) return;
	

	//取得mousedown单元格的横纵坐标
	var cmd_name = current_mousedown_cell.getAttribute("name");
	cmd_name = cmd_name.split(":")[0];
	cmd_x = parseInt(cmd_name.substr(1));
	cmd_y = cmd_name.charCodeAt(0)-64;//字母转数字

	//取得当前移动到的单元格的横纵坐标
	var cmu_name = current_mouseover_cell.getAttribute("name");
	cmu_name = cmu_name.split(":")[0];
	cmu_x = parseInt(cmu_name.substr(1));
	cmu_y = cmu_name.charCodeAt(0)-64;//字母转数字
	
	

	//得到最大的x
	max_x=cmd_x>cmu_x?cmd_x:cmu_x;

	//得到最大的y
	max_y=cmd_y>cmu_y?cmd_y:cmu_y;
	

	//得到最小的x
	min_x=cmd_x<cmu_x?cmd_x:cmu_x;

	//得到最小的y
	min_y=cmd_y<cmu_y?cmd_y:cmu_y;
	
	
	
	//循环最下方一行，判断是否存在有值的行，如果有，则退出函数
	var flag = true;
	for(var i=min_y;i<=max_y;i++){
		var cell_id = current_sheet.id+"_"+String.fromCharCode(i+64)+""+max_x;
		var cell=document.getElementById(cell_id);
		
		var textValue = cell.getElementsByTagName("div")[0].innerHTML;
		if(textValue!=""){
			flag = false;
		}
	}
	
	if(!flag){
		return;
	}
	
	for(var i=min_y;i<=max_y;i++){
		
		var fx = "";
		for(var j=min_x;j<max_x;j++){
			
			fx += "+"+String.fromCharCode(i+64)+""+j;
		}
		fx = fx.substr(1);
		
		var cell_id = current_sheet.id+"_"+String.fromCharCode(i+64)+""+max_x;
		var cell=document.getElementById(cell_id);
		
		cell.getElementsByTagName("div")[0].innerHTML="公式单元";
		cell.style.textAlign="right";
		cell.style.fontSize="16px";
		cell.style.color="";
		cell.setAttribute("type","fx");
		cell.setAttribute("value",fx);
		
		fx_cell_map.put(cell.id,fx);
		temp_fx_cells_map.put(cell.id,fx);
		
	}

	contentChanged = true;//声明报表已发生改变
}


//画网格线
function dragGridLine(){
	

	if(current_mousedown_cell==null || current_mouseover_cell==null) return;
	if(current_mousedown_cell==current_mouseover_cell) return;
	

	//取得mousedown单元格的横纵坐标
	var cmd_name = current_mousedown_cell.getAttribute("name");
	cmd_name = cmd_name.split(":")[0];
	cmd_x = parseInt(cmd_name.substr(1));
	cmd_y = cmd_name.charCodeAt(0)-64;//字母转数字

	//取得当前移动到的单元格的横纵坐标
	var cmu_name = current_mouseover_cell.getAttribute("name");
	cmu_name = cmu_name.split(":")[0];
	cmu_x = parseInt(cmu_name.substr(1));
	cmu_y = cmu_name.charCodeAt(0)-64;//字母转数字
	
	

	//得到最大的x
	max_x=cmd_x>cmu_x?cmd_x:cmu_x;

	//得到最大的y
	max_y=cmd_y>cmu_y?cmd_y:cmu_y;
	

	//得到最小的x
	min_x=cmd_x<cmu_x?cmd_x:cmu_x;

	//得到最小的y
	min_y=cmd_y<cmu_y?cmd_y:cmu_y;
	
	
	for(var i=min_x;i<=max_x;i++){
		
		for(var j=min_y;j<=max_y;j++){
			var cell_id = current_sheet.id+"_"+String.fromCharCode(j+64)+""+i;
			
			var cell=document.getElementById(cell_id);
			//cell.className="b";
			cell.style.border="1px solid #000000";
		}
	}

	contentChanged = true;//声明报表已发生改变
}




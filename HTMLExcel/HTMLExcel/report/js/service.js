
/***
 * 报表各功能入口js
 * 2014-8-19
 * 陈建宇
 * thejava@163.com
 * 
 * 注：目前报表单元格有三种类型：普通单元格、关键字单元格、函数公式单元格，不同类型单元格控制处理方式不同。
 * 若要为报表添加新的单元格类型，需要至少5处添加代码：
 * 1.添加相应窗体及代码
 * 2.deliverValue函数增加相应返回值处理逻辑
 * 3.增加report.js，cell的onmousedown单元格数据显示控制代码
 * 4.报表数据、格式模式切换，单元格显示控制代码
 * 5.查询打开报表，初始化时创建相应map对象，列出类型单元格以便报表模式切换时控制
 */


//报表切换到数据模式
function reportToDataModel(){
	
	var fdcb = document.getElementById("fdcb");//格式数据切换按钮
	var pc = document.getElementById("page_control");//翻页按钮组容器
	var xsc = document.getElementById("xsc");//滚动条容器
	var xscroll = document.getElementById("xscroll");//滚动条
	
	var t = fdcb.innerHTML;
	
	//显示翻页按钮
	pc.style.display="block";

	//滚动条缩短
	xsc.style.marginLeft="0px";
	xsc.style.width=(parseInt(xsc.style.width)-180)+"px";
	xscroll.style.width=(parseInt(xscroll.style.width)-180)+"px";
	
	//更改按钮文本
	fdcb.innerHTML="数据";
	
	//将表格切换到数据显示模式
	var container = document.getElementById(current_sheet.id+"_data_table_container");
	var tb = container.getElementsByTagName("TABLE")[0];
	tb.className="table_bodyer_format";
	
	//遍历关键字映射表，显示关键字数据
	var keys = keyword_cell_map.keySet();
	for(var k in keys){
		
		var cell = keyword_cell_map.get(k);
		var syl = get_keyword_style(k);
		var value = cell.getAttribute("value")+syl.unit;
		cell.getElementsByTagName("div")[0].innerHTML=value;
	}
	
	//遍历公式单元格映射表，显示单元格公式计算结果
	keys = fx_cell_map.keySet();
	for(var k in keys){
		var fx = fx_cell_map.get(k);
		var cell = document.getElementById(k);
		var result = cell.getAttribute("result");
		if(result==null || result=="null"){
			result="";
		}
		cell.getElementsByTagName("div")[0].innerHTML=result
		
	}
	

	//解禁关键字录入菜单
	var enabledMenus=[

	                  "设置(S)...",
	                  "取消(E)",
	                  "表尺寸(S)...",
	                  "表尺寸(S)...",
	                  "行高(H)...",
	                  "列宽(W)...",
	                  "区域画线(T)...",
	                  "单元属性(O)...",
	                  "组合单元(C)...",
	                  "取消组合单元格",
	                  "套用格式(A)...",
	                  "自定义模板(U)...",
	                  "报表模板(M)..."
	                  
	                  ];
	winui.setMenuEnabledByArray(enabledMenus,false);
	enabledMenus = [
	                "录入(I)...",
	                "整表重算(A)..."
	                ];
	winui.setMenuEnabledByArray(enabledMenus,true);
	
	
	document.getElementById("format_model_toolbar").style.visibility="hidden";
	document.getElementById("jsq_icon").src="report/images/jsq_c.jpg";
	document.getElementById("key_icon").src="report/images/key_c.jpg";
	document.getElementById("bypx_icon").src="report/images/bypx_c.jpg";
	
	
}

//报表切换到格式模式
function reportToFormatModel(){

	var fdcb = document.getElementById("fdcb");//格式数据切换按钮
	var pc = document.getElementById("page_control");//翻页按钮组容器
	var xsc = document.getElementById("xsc");//滚动条容器
	var xscroll = document.getElementById("xscroll");//滚动条
	
	var t = fdcb.innerHTML;
	

	//隐藏翻页按钮
	pc.style.display="none";
	
	//滚动条加长
	xsc.style.marginLeft="40px";
	xsc.style.width=(parseInt(xsc.style.width)+180)+"px";
	xscroll.style.width=(parseInt(xscroll.style.width)+180)+"px";
	
	//更改按钮文本
	fdcb.innerHTML="格式";
	

	//将表格切换到格式显示模式
	var container = document.getElementById(current_sheet.id+"_data_table_container");
	var tb = container.getElementsByTagName("TABLE")[0];
	
	tb.className="table_bodyer";

	//遍历关键字映射表，显示关键字格式
	var keys = keyword_cell_map.keySet();
	for(var k in keys){
		var cell = keyword_cell_map.get(k);
		var syl = get_keyword_style(k);
		cell.getElementsByTagName("div")[0].innerHTML=syl.format;
	}

	//遍历公式单元格映射表，切换到格式模式
	keys = fx_cell_map.keySet();

	var value = "公式单元";
	for(var k in keys){
		document.getElementById(k).getElementsByTagName("div")[0].innerHTML=value;
		
	}
	

	//禁用关键字录入菜单
	var enabledMenus=[
	                  
	                  "设置(S)...",
	                  "取消(E)",
	                  "表尺寸(S)...",
	                  "行高(H)...",
	                  "列宽(W)...",
	                  "区域画线(T)...",
	                  "单元属性(O)...",
	                  "组合单元(C)...",
	                  "取消组合单元格",
	                  "套用格式(A)...",
	                  "自定义模板(U)...",
	                  "报表模板(M)..."
	                  
	                  ];
	winui.setMenuEnabledByArray(enabledMenus,true);
	enabledMenus = [
	                "录入(I)...",
	                "整表重算(A)..."
	                ];
	winui.setMenuEnabledByArray(enabledMenus,false);
	
	
	
	

	document.getElementById("format_model_toolbar").style.visibility="visible";
	document.getElementById("jsq_icon").src="report/images/jsq_h.jpg";
	document.getElementById("key_icon").src="report/images/key_h.jpg";
	document.getElementById("bypx_icon").src="report/images/bypx_h.jpg";
	
}



/**
 * 调用全表公式计算与map创建函数
 * 该函数用于在计算全表时，一次性将报表所有公式传给后台进行计算并一次性返回结果，
 * 将返回的结果以公式为key，结果值为value填充进map里，以便累计算函数频繁的获取公式值。
 * 
 */
function getAllFormulasResult(cellIds){
	
	if(cellIds==null){
		return 0;
	}
	
	var formula_array = [];
	
	//1.遍历所有公式单元格，取出所有后台计算型公式，将公式放进数组
	for(id in cellIds){
		
		var cell = document.getElementById(id);

		//判断单元格公式类型
		var formula = cell.getAttribute("value");
		
		if(formula==null){
			return 0;
		}
		
		//将'QM("1001",,)+ptotal(B1:B5)-A5+C3'转换为：['QM("1001",,)','+','ptotal(B1:B5)','-','A5','+','C3']
		
		var expslpstr = splitFormulaExpressToArray(formula);
		
		//将['QM("1001",,)','+','ptotal(B1:B5)','-','A5','+','C3']转变为：['12','+','39','-','17','+','24']
		for(var j=0;j<=expslpstr.length;j+=2){
			
			var exp = expslpstr[j];
			
			
			
			//是否是公式，如：QC()
			if(exp.indexOf("(")>0){
				var funName = exp.substr(0,exp.indexOf("("));

				//公式分为后台计算型和前台计算型，后台计算型如：QC()等，前台计算型如：ptotal(B1:B3)
				if(funName.substr(0,6) != "ptotal"){

					formula_array.push(exp);
				}
			}
		}
		
		
		
		var fpvoList = [];
		for(var l=0;l<formula_array.length;l++){
			var formula = formula_array[l];
			
			var fx = formula.replaceAll("全年","月");//由于报表暂不支持"全年"的计算，将"全年"替换成"月"。
			
			//将FS("1122","月","借",,"年","001",,"否")最终变成["1122", "月", "借", "", "年", "001", "", "否", "", "", "", "", ""] 
			fx = fx.replaceAll(",,",",\"\",");
			fx = fx.replaceAll(",,",",\"\",");
			//判断有多少个“,”号，得出缺少多少个参数，在最后补齐，用空串代替
			var paramCount = fx.split(",").length;
			var apedStr="";
			
			for(var n=paramCount+1;n<=13;n++){
				apedStr+=",\"\"";
			}
			
			//重新拼接函数
			fx = fx.substr(0,fx.length-1)+apedStr;
			var funName = fx.substr(0,fx.indexOf("("));
			var paramStr = fx.substr(fx.indexOf("(")+1);
			
			//变成["1122", "月", "借", "", "年", "001", "", "否", "", "", "", "", ""]
			var pa = paramStr.split(",");
			for(var m=0;m<pa.length;m++){
				pa[m]=pa[m].replaceAll("\"","");
			}
			
			var filenameout = "";
			
			var fpvo = null;
			switch(funName){
				
			case "QC":  // 取期初余额
			case "SQC": // 取数量期初余额
			case "WQC": // 取外币期初余额
			case "QM":  // 期末
			case "SQM": // 数量期末
			case "WQM": // 外币期末
			case "LFS": // 累计发生额
			case "SLFS":// 数量累计发生额
			case "WLFS":// 外币累计发生额
			case "SJE": // 数量净额
			case "WJE": // 外币净额
				
				fpvo = {
					formula:formula,
					fileNameOut : filenameout,
					funName : funName,
					kmcode : pa[0],
					period : pa[1],
					DC : pa[2],
					account : pa[3],
					year : pa[4],
					assP1 : pa[5],
					assP2 : pa[6],
					endDate : pa[7],
					isInclude : pa[8],
					assSort1 : pa[9],
					assSort2 : pa[10]
				}
				break;
	
				
			case "FS": // 发生额
			case "SFS":// 数量发生额
			case "WFS":// 外币发生额
				fpvo = {
					formula:formula,
					fileNameOut : filenameout,
					funName : funName,
					kmcode : pa[0],
					period : pa[1],
					DC : pa[2],
					account : pa[3],
					year : pa[4],
					assP1 : pa[5],
					assP2 : pa[6],
					isInclude : pa[7],
					assSort1 : pa[8],
					assSort2 : pa[9]
				}
				break;
	
				
			case "TFS": // 条件发生额
			case "STFS":// 数量条件发生额
			case "WTFS":// 外币条件发生额
				fpvo = {
					formula:formula,
					fileNameOut : filenameout,
					funName : funName,
					kmcode : pa[0],
					period : pa[1],
					DC : pa[2],
					digest : pa[3], // 摘要
					digestMatchType : pa[4], // 摘要匹配方式
					account : pa[5],
					year : pa[6],
					assP1 : pa[7],
					assP2 : pa[8],
					endDate : pa[9],
					isInclude : pa[10],
					assSort1 : pa[11],
					assSort2 : pa[12]
				}
				break;
	
				
			case "DFS": // 对方科目发生额
			case "SDFS":// 数量对方科目发生额
			case "WDFS":// 数量对方科目发生额
				fpvo = {
					formula:formula,
					fileNameOut : filenameout,
					funName : funName,
					kmcode : pa[0],
					ccode_equal : pa[1],// 对方科目编码
					period : pa[2],
					DC : pa[3],
					digest : pa[4], // 摘要
					digestMatchType : pa[5], // 摘要匹配方式
					account : pa[6],
					year : pa[7],
					assP1 : pa[8],
					assP2 : pa[9],
					endDate : pa[10],
					isInclude : pa[11],
					assSort1 : pa[12],
					assSort2 : pa[13]
				}
				break;
	
				
			case "JE":// 净额
				fpvo = {
					formula:formula,
					fileNameOut : filenameout,
					funName : funName,
					kmcode : pa[0],
					period : pa[1],
					account : pa[2],
					year : pa[3],
					assP1 : pa[4],
					assP2 : pa[5],
					endDate : pa[6],
					isInclude : pa[7],
					assSort1 : pa[8],
					assSort2 : pa[9]
				}
				break;
	
				
			case "HL":// 汇率
				fpvo = {
					formula:formula,
					fileNameOut : filenameout,
					funName : funName,
					cexch_name : pa[0],
					period : pa[1],
					exch_itype : pa[2],
					account : pa[3],
					year : pa[4]
				}
				break;
	
				
			case "XJLL":// 现金流量
				fpvo = {
					formula:formula,
					fileNameOut : filenameout,
					funName : funName,
					dbill_date_begin : pa[0],
					dbill_date_end : pa[1],
					cashItem : pa[2],
					DC : pa[3],
					account : pa[4],
					year : pa[5],
					isInclude : pa[6],
					period : pa[7]
				}
				break;
					
			}
			
			
			fpvoList.push(fpvo);
			
		
		}
	}
	
	//如果fpvoList无数据，则不执行后台查询
	if(fpvoList==null || fpvoList.length==0){
		return;
	}
	
	var urlparam = toUrlParam(fpvoList, "fpvoList");
	
	var resultFpvoList = [];
	
	//2.将数组发送给后台进行取值计算
	$.ajax({
	    url: "reportFunManageAction!getAllCellValue.action",
	    type: "post",
	    data: urlparam,
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	
	    	if (data.status) {
	    		resultFpvoList = data.fpvoList;
				
			}
	    	
	    	
	    	
	    },
	    error:function(msg){
	    	closeProgressWindow();
	    	jAlert("网络连接失败！请稍后再试。");
	    }
	});
	
	
	
	
	
	//3.遍历结果list，取出公式表达式和值，以表达式为key存入全局map对象（formula_value_map）。
	
	for(var h=0;h<resultFpvoList.length;h++){
		var fpvo = resultFpvoList[h];
		formula_value_map.put(fpvo.formula,fpvo.result);
	}
	
	
	
	
}





//计算所有公式
function calculateAllFormulas(){

	//设置计算状态为计算中
	calculateStatus = "calculating";
	//显示进度提示
	showProgressWindow("进度提示","计算中，请稍候……");
	setTimeout(function(){
		
		
		
		//遍历公式单元格映射表，计算单元格结果
		var cellIds = fx_cell_map.keySet();
		
		
		getAllFormulasResult(cellIds);

		
		for(var id in cellIds){
			
			//console.info("id:"+id);
			//var fx = fx_cell_map.get(k);
			var cell = document.getElementById(id);
			
			cell.getElementsByTagName("div")[0].innerHTML="";
			
			var result = correlation_calculation(cell);
			try{
				if(parseInt(result)==0){
					result="";
				}
			}catch(e){
				result="";
			}
			
			cell.getElementsByTagName("div")[0].innerHTML=result;
			cell.setAttribute("result",result);
		}
		
		contentChanged = true;//声明报表已发生改变
		
		//关闭进度窗
		closeProgressWindow();
		calculateStatus="calculated";//设置计算状态为计算结束
	},1000);
	
	
}

//仅计算当轮产生的新公式，与calculateAllFormulas对立。
function calculatePartFormulas(){

	//设置计算状态为计算中
	calculateStatus = "calculating";
	//显示进度提示
	showProgressWindow("进度提示","计算中，请稍候……");
	setTimeout(function(){
		
		//仅计算当前被设置（修改）公式的单元格
		var cellIds = temp_fx_cells_map.keySet();
		
		for(var id in cellIds){
			
			
			//var fx = temp_fx_cells_map.get(k);
			var cell = document.getElementById(id);
			
			cell.getElementsByTagName("div")[0].innerHTML="";
			var result = correlation_calculation(cell);
			cell.getElementsByTagName("div")[0].innerHTML=result;
			cell.setAttribute("result",result);
		}
		
		//清空临时map
		temp_fx_cells_map = new hashMap();
	
		contentChanged = true;//声明报表已发生改变

		//关闭进度窗
		closeProgressWindow();
		calculateStatus="calculated";//设置计算状态为计算结束
	},300);
}


//格式、数据切换
function formatDataChange(){
	var fdcb = document.getElementById("fdcb");//格式数据切换按钮
	var t = fdcb.innerHTML;
	if(t=="格式"){

		reportToDataModel();
		
		jConfirm("是否需要重算全表？","提示",function(flag){
			if(flag==true){
				calculateAllFormulas();
			}else{
				calculatePartFormulas();
			}
		});
		
	}else{
		reportToFormatModel();
	}
	
}



function newReportByTemplate(report){

	$.ajax({
	    url: "mrReportTemplateAction!findReportTemplateByGuid",
	    type: "post",
	    data: {"mrReportTemplate.guid":report.guid},
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	var html = data.clobField;
	    	document.getElementById("sheet_container").innerHTML = html;
	    	queried_cell_init();
	    	
	    	//修改报表标题;
	    	window.parent.setWindowTitle("HTMLExcel",report.name);
	    },
	    error:function(msg){
	    	jAlert("发生错误！");
	    }
	});
	
	
	
	
}



//弹窗回调处理
function deliverValue(param){
	
	switch(action){

	//新建报表
	case "newReport":
		newReportByTemplate(param);
		if(param.name=="空报表"){
	    	//修改报表标题;
	    	window.parent.setWindowTitle("HTMLExcel","新报表");
		}
		
		report_case="new";
		current_queried_report=null;

		//1如果不是在格式模式下，则切换到格式模式;
		
		var fdcb = document.getElementById("fdcb");//格式数据切换按钮
		var t = fdcb.innerHTML;
		if(t!="格式"){
			reportToFormatModel();
		}

		contentChanged = false;//初始化报表内容状态
		break;

	//保存报表
	case "saveAsReport":
		current_queried_report=param;
		report_case="queried";
		contentChanged = false;//初始化报表内容状态
		
		break;
		
		

	//另存为模板
	case "saveAsReportTemplate":
		current_queried_report=param;
		report_case="queried";
		contentChanged = false;//初始化报表内容状态
		
		break;
		
		
		
	//打开报表
	case "openReport":
		//打开报表前，如果不是数据显示模式，则将报表切换到数据显示模式
		var fdcb = document.getElementById("fdcb");//格式数据切换按钮
		var t = fdcb.innerHTML;
		if(t!="数据"){
			reportToDataModel();
		}


		$.ajax({
		    url: "mrReportAction!findReportByName",
		    type: "post",
		    data: {"mrReport.name":param.name},
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	var report = data.mrReport;
		    	var html = data.clobField;
		    	document.getElementById("sheet_container").innerHTML = html;
		    	report_case="queried";
		    	current_queried_report = param;
		    	
		    	queried_cell_init();
		    	
		    	//修改报表标题;
		    	window.parent.setWindowTitle("HTMLExcel",param.name);
		    	
				
		    },
		    error:function(msg){
		    	jAlert("发生错误！");
		    }
		});
		

		contentChanged = false;//初始化报表内容状态
		break;
		
		
		

	//打开报表模板
	case "openReportTemplate":
		
		$.ajax({
		    url: "mrReportTemplateAction!findReportTemplateByGuid",
		    type: "post",
		    data: {"mrReportTemplate.guid":param.guid},
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	
		    	var html = data.clobField;
		    	document.getElementById("sheet_container").innerHTML = html;
		    	report_case="queried";
		    	current_queried_report = data.mrReportTemplate;
		    	
		    	queried_cell_init();
		    	
		    	//修改报表标题;
		    	window.parent.setWindowTitle("HTMLExcel",current_queried_report.name);
		    
				
				
		    },
		    error:function(msg){
		    	jAlert("发生错误！");
		    }
		});
		

		contentChanged = false;//初始化报表内容状态
		break;
			
		
		
		

	//设置报表尺寸
	case "setReportSize":
		
		var tb = document.getElementById(current_sheet.id+"_data_table_container").getElementsByTagName("TABLE")[0];
		var tbrc = tb.rows.length;
		var tbcc = tb.getElementsByTagName("COL").length;
		

		var heatbl = document.getElementById(current_sheet.id+"_scroll_header");
		var header = heatbl.rows[0];
		var lefter = document.getElementById(current_sheet.id+"_scroll_lefter");
		
		var crc = document.getElementById(current_sheet.id+"_column_drag_container");//column resize container
		var crcl = crc.getElementsByTagName("div");//column resize container line
		

		var rrc = document.getElementById(current_sheet.id+"_row_drag_container");//row resize container
		var rrcl = rrc.getElementsByTagName("div");//row resize container line
		

		var headerColgroup = document.getElementById(current_sheet.id+"_scroll_header").getElementsByTagName("colgroup")[0];
		var tableColgroup = document.getElementById(current_sheet.id+"_data_table_container").getElementsByTagName("colgroup")[0];

		var headerCols = getTableHeaderCols();
		var bodyerCols = getTableBodyerCols();
		
		//思路：先处理行，再处理列
		
		//增行或删行
		if(tbrc>param.rowCount){
			var rowOffset = tbrc-param.rowCount;

			var tblHeightOffset = 0;
			for(var i=0;i<rowOffset;i++){
				var idx = tb.rows.length-1;
				
				tblHeightOffset += parseInt(lefter.rows[idx].cells[0].style.height)+2;
				tb.deleteRow(idx);
				lefter.deleteRow(idx);
				rrc.removeChild(rrcl[idx]);
			}
			

			
			//更新表格高度
			var newHeight = parseInt(lefter.style.height)-tblHeightOffset;
			lefter.style.height=newHeight+"px";
			tb.style.height=newHeight+"px";
			
			
		}else if(tbrc<param.rowCount){
			


			//如果存在合并的单元格：
			if(hasMergeCells()){
				jAlert("表格存在合并单元格，只能缩减尺寸，无法增加尺寸，请在最开始时调整好尺寸再进行合并单元格操作。");
				return;
			}
			
			
			
			var rowOffset = param.rowCount-tbrc;
			var tblHeightOffset = 0;
			
			for(var i=0;i<rowOffset;i++){
				
				//增加左侧行头
				var rowheaderRow = lefter.insertRow(tb.rows.length);
				var rowheaderCell = rowheaderRow.insertCell(0);
				rowheaderCell.innerHTML=tb.rows.length+1;
				rowheaderCell.style.height="18px";
				tblHeightOffset += 20;
				
				var row = tb.insertRow(tb.rows.length);
				

				rrcl = rrc.getElementsByTagName("div");
				var nrrcl = document.createElement("div");
				var startMarginTop = parseInt(rrcl[rrcl.length-1].style.marginTop)+20;
				nrrcl.style.cssText="position:absolute;width:40px;height:10px;margin-top:"+startMarginTop+"px;cursor:n-resize;";
				nrrcl.setAttribute("onmousedown","row_drag_container(event,this,"+(lefter.rows.length-1)+")");
				
				rrc.appendChild(nrrcl);
				
				
				
				//初始化行内单元格
				for(var j=0;j<headerCols.length;j++){
					var cell = row.insertCell(j);
					var name = String.fromCharCode(j+65)+(cell.parentNode.rowIndex+1);
					//设置单元格id
					cell.id=current_sheet.id+"_"+name;
					cell.setAttribute("name",name);
					single_cell_init(cell);
					
				}

			}
			
			
			//增行伸缩拖拽线 TODO ...
			
			//更新表格高度
			var newHeight = parseInt(lefter.style.height)+tblHeightOffset;
			lefter.style.height=newHeight+"px";
			tb.style.height=newHeight+"px";
			
		}

		//增列或删列
		if(tbcc>param.cellCount){
			var cellOffset = tbcc-param.cellCount;
			
			//删除数据表列
			for(var k=0;k<tb.rows.length;k++){
				for(var i=0;i<cellOffset;i++){
					var idx = tb.rows[k].cells.length-1;
					tb.rows[k].deleteCell(idx);
				}
			}

			var tblWidthOffset = 0;
			//删除列头列
			for(var i=0;i<cellOffset;i++){
				var idx = header.cells.length-1;
				tblWidthOffset += parseInt(headerCols[idx].style.width);
				header.deleteCell(idx);
				crc.removeChild(crcl[idx]);
				
			}
			

			for(var n=0;n<cellOffset;n++){
				headerCols = getTableHeaderCols();
				bodyerCols = getTableBodyerCols();
				headerColgroup.removeChild(headerCols[headerCols.length-1]);
				tableColgroup.removeChild(bodyerCols[bodyerCols.length-1]);
			}
			
			
			//更新表格宽度
			var newWidth = parseInt(heatbl.style.width)-tblWidthOffset;
			heatbl.style.width=newWidth+"px";
			tb.style.width=newWidth+"px";
			document.getElementById("scrollbar_scroll_width_bar").style.width=newWidth+"px";
			
		}else if(tbcc<param.cellCount){

			//如果存在合并的单元格：
			if(hasMergeCells()){
				jAlert("表格存在合并单元格，只能缩减尺寸，无法增加尺寸，请在最开始时调整好尺寸再进行合并单元格操作。");
				return;
			}
			
			
			var cellOffset = param.cellCount-tbcc;
			var tblWidthOffset = 0;
			for(var i=0;i<cellOffset;i++){
				var cell = header.insertCell(header.cells.length);
				//cell.style.width=cell_width+"px";
				cell.innerHTML=String.fromCharCode(header.cells.length+64);
				tblWidthOffset += cell_width;
				
				//往表头的colgroup里创建col
				var hcol = document.createElement("col");//tableColgroup.insertCol();
				hcol.style.width=cell_width+"px";
				hcol.style.maxWidth=cell_width+"px";
				hcol.style.height="19px";
				hcol.setAttribute("nowrap","nowrap");
				headerColgroup.appendChild(hcol);
				
				//往表数据区的colgroup里创建col
				var bcol = document.createElement("col");//tableColgroup.insertCol();
				bcol.style.width=cell_width+"px";
				bcol.style.maxWidth=cell_width+"px";
				bcol.style.height="19px";
				bcol.setAttribute("nowrap","nowrap");
				tableColgroup.appendChild(bcol);
				
				crcl = crc.getElementsByTagName("div");
				var ncrcl = document.createElement("div");
				var startMarginLeft = parseInt(crcl[crcl.length-1].style.marginLeft)+cell_width;
				ncrcl.style.cssText="position:absolute;width:12px;height:20px;float:left;margin-left:"+startMarginLeft+"px;cursor:e-resize;";
				ncrcl.setAttribute("onmousedown","column_drag_container(event,this,"+(header.cells.length-1)+")");
				
				crc.appendChild(ncrcl);
			}
			
			for(var k=0;k<tb.rows.length;k++){

				//新建单元格的下标=当前行单元格总数+所有colSpan的和
				var indexOffset = 0;
				for(var n=0;n<tb.rows[k].cells.length;n++){
					var colSpan = tb.rows[k].cells[n].colSpan;
					var rowSpan = tb.rows[k].cells[n].rowSpan;
					
					if(colSpan>1){
						indexOffset += colSpan;
					}
					
					
				}

				if(indexOffset>0){					
					indexOffset = indexOffset-1;
				}
				//新建单元格的下标=当前行单元格总数+所有colSpan的和
				indexOffset = indexOffset + tb.rows[k].cells.length;
				
				for(var i=0;i<cellOffset;i++){
					var cell = tb.rows[k].insertCell(tb.rows[k].cells.length);
					indexOffset +=1;
					
					var name = String.fromCharCode(indexOffset+64)+(cell.parentNode.rowIndex+1);
					//设置单元格id
					cell.id=current_sheet.id+"_"+name;
					cell.setAttribute("name",name);
					single_cell_init(cell);
					
				}
			}
			//更新表格宽度
			var newWidth = parseInt(heatbl.style.width)+tblWidthOffset;
			heatbl.style.width=newWidth+"px";
			tb.style.width=newWidth+"px";
			document.getElementById("scrollbar_scroll_width_bar").style.width=newWidth+"px";
		}
		
		contentChanged = true;//声明报表已发生改变。
		break;

	//设置关键字
	case "setKeyword":
		
		var kw = keyword_cell_map.get(param);
		if(kw!=null){
			clean_cell(kw);
		}
		clean_cell(current_cell);
		
		current_cell.style.color="#ff0000";
		var syl = get_keyword_style(param);
		current_cell.getElementsByTagName("div")[0].innerHTML=syl.format;
		current_cell.style.textAlign=syl.align;
		current_cell.style.fontSize="16px";
		current_cell.setAttribute("type","keyword");
		current_cell.setAttribute("keywordName",param);
		current_cell.setAttribute("value","");
		keyword_cell_map.put(param,current_cell);

		contentChanged = true;//声明报表已发生改变。
		break;

	//录入关键字
	case "enteringKeyword":
		var keySet = param.keySet();
		for(var k in keySet){
			var cell = param.get(k);
			var syl = get_keyword_style(k);
			var value = cell.getAttribute("value")+syl.unit;
			cell.getElementsByTagName("div")[0].innerHTML=value;
		}

		contentChanged = true;//声明报表已发生改变。
		break;
		
		
	//取消关键字
	case "cancelKeyword":
		
		for(var i=0;i<param.length;i++){
			
			var cell = keyword_cell_map.get(param[i]);
			clean_cell(cell);
			
		}

		contentChanged = true;//声明报表已发生改变。
		break;

	//定义公式
	case "defineFormula":
		clean_cell(current_cell);
		current_cell.getElementsByTagName("div")[0].innerHTML="公式单元";
		current_cell.style.textAlign="right";
		current_cell.style.fontSize="16px";
		current_cell.style.color="";
		current_cell.setAttribute("type","fx");
		current_cell.setAttribute("value",param);
		var showbox = document.getElementById("showbox");
		showbox.value="="+param;
		showbox.readOnly="readonly";
		showbox.style.backgroundColor="#D4D0C8";
		
		fx_cell_map.put(current_cell.id,param);
		temp_fx_cells_map.put(current_cell.id,param);

		contentChanged = true;//声明报表已发生改变。
		break;


	//单元属性
	case "setCellProperties":
		
		var styleMap = param.styleMap
		if(param.styleMap!=null){
			
			

			//取得mousedown单元格的横纵坐标
			var cmd_name = current_mousedown_cell.getAttribute("name");
			cmd_name = cmd_name.split(":")[0];
			cmd_x = parseInt(cmd_name.substr(1));
			cmd_y = cmd_name.charCodeAt(0)-64;//字母转数字

			//取得当前移动到的单元格的横纵坐标
			var cmu_name = current_mouseup_cell.getAttribute("name");
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
			

			//遍历关键字映射表，显示关键字数据
			var keys = styleMap.keySet();
			
			for(var i=min_x;i<=max_x;i++){
				
				for(var j=min_y;j<=max_y;j++){
					var cell_id = current_sheet.id+"_"+String.fromCharCode(j+64)+""+i;
					
					var cell=document.getElementById(cell_id);
					
					for(var k in keys){
						
						eval("cell.style."+k+"=\""+styleMap.get(k)+"\";");
						
					}
					
					
				}
			}
			
		}
		

		contentChanged = true;//声明报表已发生改变。
		break;

				
		
	}
}






function showNewReportWindow(){

	action = "newReport";
	//弹出新建报表窗
	window.parent.openWindow("HTMLExcel_newReport","HTMLExcel");
}


//新建报表方法
function newReport(){

	
	//新建时，先判断是否有正在编辑的报表，如果有则弹出提示，是否保存。
	if(contentChanged==true/*report_case=="queried"*/){
		
		jConfirm("是否需要保存当前报表？","提示",function(flag){
			if(flag==true){
				show_jAlert=false;
				saveReport();
				newReportAction = true;
				//showNewReportWindow();
			}else{
				showNewReportWindow();
			}
		});
		
	}else{
		showNewReportWindow();
	}
	
	
	
}


function initNewReportTemplate(){
	

	buildReport(20,7);
	report_case="new";
	
	//修改报表标题;
	window.parent.setWindowTitle("HTMLExcel","新模板");
	
}



//新建报表方法
function newReportTemplate(){

	
	//新建时，先判断是否有正在编辑的报表，如果有则弹出提示，是否保存。
	if(contentChanged==true/*report_case=="queried"*/){
		
		jConfirm("是否需要保存当前模板？","提示",function(flag){
			if(flag==true){
				show_jAlert=false;
				saveReportTemplate();
				newReportAction = true;
			}else{
				initNewReportTemplate();
			}
		});
		
	}else{
		initNewReportTemplate();
	}
	
	
	
}






//保存报表
function saveReport(){
	
	
	
	//判断报表情形，如果是新建，弹出另存为对话框，如果是查询修改，则直接保存。
	if(report_case=="new"){
		saveAsReport();
		
	}else if(report_case=="queried"){

		//如果未修改任何值，则退出
		if(!contentChanged){
			return;
		}
		
		action ="saveReport";
		

		//1.如果不是在数据模式下，则切换到数据模式;
		var fdcb = document.getElementById("fdcb");//格式数据切换按钮
		var t = fdcb.innerHTML;
		if(t!="数据"){
			reportToDataModel();
		}
		
		//2.计算单元格结果后再执行保存（重算全表）
		calculateAllFormulas();

		
		var saveInterval = setInterval(function(){
			
			//如果已计算完成，则执行保存
			if(calculateStatus=="calculated"){
				
				

				var html = document.getElementById("sheet_container").innerHTML;
				html = encodeURIComponent(html);
				
				
				//单元格判错
				var flag = determine(current_queried_report.name);
				/*
				if(!flag){
					jAlert("发生未知错误，保存失败!");
					clearInterval(saveInterval);
					return;
				}
				*/
				
				var param={
					"mrReport.name":current_queried_report.name,
					"clobField":html
				};
				$.ajax({
				    url: "mrReportAction!saveReport",
				    type: "post",
				    data: param,
				    dataType: "json",
				    async:false,
				    success: function(data){
				    	if(show_jAlert){
				    		jAlert("保存成功!","提示",function(){

				    			contentChanged = false;//初始化报表内容状态
				    			if(isReportWindowClosing){
					    			window.parent.justCloseWindow("HTMLExcel");
					    			isReportWindowClosing = false;
					    		}

				    			if(newReportAction==true){
				    				showNewReportWindow();
				    				newReportAction=false;
				    			}

				    			if(openReportAction==true){
				    				showOpenReportWindow();
				    				openReportAction=false;
				    			}
				    			
				    			
				    			
				    		});
				    	}else{
				    		if(isReportWindowClosing){
				    			window.parent.justCloseWindow("HTMLExcel");
				    			isReportWindowClosing = false;
				    		}
				    		

			    			if(newReportAction==true){
			    				showNewReportWindow();
			    				newReportAction=false;
			    			}

			    			if(openReportAction==true){
			    				showOpenReportWindow();
			    				openReportAction=false;
			    			}
			    			
				    	}
				    },
				    error:function(msg){
				    	jAlert("发生错误！");

						clearInterval(saveInterval);
				    }
				});
				
				
				clearInterval(saveInterval);
				
			}
			
		},200);
		
		
		
	}
	
}



//保存报表模板
function saveReportTemplate(){
	
	
	
	//判断报表情形，如果是新建，弹出另存为对话框，如果是查询修改，则直接保存。
	if(report_case=="new"){
		
		saveAsReportTemplate();
		
	}else if(report_case=="queried"){
		
		action ="saveReportTemplate";
		
		var html = document.getElementById("sheet_container").innerHTML;
		html = encodeURIComponent(html);
		
		var param={

			"mrReportTemplate.name":current_queried_report.name,
			"mrReportTemplate.classId":current_queried_report.classId,
			"clobField":html
		};
		
		
		$.ajax({
		    url: "mrReportTemplateAction!saveReportTemplate",
		    type: "post",
		    data: param,
		    dataType: "json",
		    async:false,
		    success: function(data){
		    	if(show_jAlert){
		    		jAlert("保存成功!","提示",function(){

		    			contentChanged = false;//初始化报表内容状态
		    			if(isReportWindowClosing){
			    			window.parent.justCloseWindow("HTMLExcel");
			    			isReportWindowClosing = false;
			    		}

		    			if(newReportAction==true){
		    				initNewReportTemplate();
		    				newReportAction=false;
		    			}

		    			if(openReportAction==true){
		    				showOpenReportTemplateWindow();
		    				openReportAction=false;
		    			}
		    			
		    			
		    			
		    		});
		    	}else{
		    		if(isReportWindowClosing){
		    			window.parent.justCloseWindow("HTMLExcel");
		    			isReportWindowClosing = false;
		    		}
		    		

	    			if(newReportAction==true){
	    				initNewReportTemplate();
	    				newReportAction=false;
	    			}

	    			if(openReportAction==true){
	    				showOpenReportTemplateWindow();
	    				openReportAction=false;
	    			}
	    			
		    	}
		    },
		    error:function(msg){
		    	jAlert("发生错误！");
		    }
		});
		
		
		
		
	}
	
}






//报表另存为
function saveAsReport(){
	action ="saveAsReport";
	
	

	//1.如果不是在数据模式下，则切换到数据模式;
	var fdcb = document.getElementById("fdcb");//格式数据切换按钮
	var t = fdcb.innerHTML;
	if(t!="数据"){
		reportToDataModel();
	}
	
	//2.计算单元格结果后再执行保存（重算全表）
	calculateAllFormulas();
	
	
	

	
	var saveAsInterval = setInterval(function(){
		
		//如果已计算完成，则执行保存
		if(calculateStatus=="calculated"){
			
			var html = document.getElementById("sheet_container").innerHTML;
			html = encodeURIComponent(html);
			window.parent.openWindow("HTMLExcel_saveAsReport","HTMLExcel",html);
			
			clearInterval(saveAsInterval);
		}
			
		
		
	},200);
	
	
	
	
	
}





//报表另存为模板
function saveAsReportTemplate(){
	action ="saveAsReportTemplate";
	
	var html = document.getElementById("sheet_container").innerHTML;
	html = encodeURIComponent(html);
	window.parent.openWindow("HTMLExcel_saveAsReportTemplate","HTMLExcel",html);
}








function showOpenReportWindow(){

	action = "openReport";
	window.parent.openWindow("HTMLExcel_openReport","HTMLExcel");
}

//打开报表方法
function openReport(){
	
	//打开时，先判断是否有正在编辑的报表，如果有则弹出提示，是否保存。
	if(contentChanged==true/*report_case=="queried"*/){
		
		
		
		jConfirm("是否需要保存当前报表？","提示",function(flag){
			if(flag==true){
				show_jAlert=false;
				saveReport();
				openReportAction = true;
				
				//showOpenReportWindow();
			}else{
				showOpenReportWindow();
			}
		});
		
		
		
		
	}else{

		showOpenReportWindow();
	}
	
	
	
}






function showOpenReportTemplateWindow(){

	action = "openReportTemplate";
	window.parent.openWindow("HTMLExcel_openReportTemplate","HTMLExcel");
}

//打开报表方法
function openReportTemplate(){
	
	//打开时，先判断是否有正在编辑的报表，如果有则弹出提示，是否保存。
	if(contentChanged==true/*report_case=="queried"*/){
		
		
		
		jConfirm("是否需要保存当前模板？","提示",function(flag){
			if(flag==true){
				show_jAlert=false;
				saveReportTemplate();
				openReportAction = true;
				
				//showOpenReportTemplateWindow();
			}else{
				showOpenReportTemplateWindow();
			}
		});
		
		
		
		
	}else{

		showOpenReportTemplateWindow();
	}
	
	
	
}



//设置报表尺寸
function setReportSize(){
	action = "setReportSize";
	var tb = document.getElementById(current_sheet.id+"_data_table_container").getElementsByTagName("TABLE")[0];
	var rowCount = tb.rows.length;
	var cellCount = tb.getElementsByTagName("COL").length;//tb.rows[0].cells.length;
	var param = {
			rowCount:rowCount,
			cellCount:cellCount
	};
	window.parent.openWindow("HTMLExcel_setReportSize","HTMLExcel",param);
}

//关键字设置
function setKeyword(){
	action = "setKeyword";
	window.parent.openWindow("HTMLExcel_setKeyword","HTMLExcel");
}

//取消关键字
function cancelKeyword(){

	action = "cancelKeyword";
	window.parent.openWindow("HTMLExcel_cancelKeyword","HTMLExcel",keyword_cell_map);
}

//录入关键字
function enteringKeyword(){
	action = "enteringKeyword";
	window.parent.openWindow("HTMLExcel_enteringKeyword","HTMLExcel",keyword_cell_map);
}


//定义公式
function defineFormula(){
	
	//定义公式必须在格式模式下
	var fdcb = document.getElementById("fdcb");//格式数据切换按钮
	var t = fdcb.innerHTML;
	if(t!="格式"){
		reportToFormatModel();
	}
	
	
	action = "defineFormula";
	window.parent.openWindow("HTMLExcel_formula_defineFormula","HTMLExcel",current_cell);
}


//模拟判分
function judgeByName(){

	var html = document.getElementById("sheet_container").innerHTML;
	
	html = encodeURIComponent(html);
	var param={
		"clobField":html
	};
	$.ajax({
	    url: "mrReportAction!judgeByName",
	    type: "post",
	    data: param,
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	jAlert("判分完成!");
	    },
	    error:function(msg){
	    	jAlert("发生错误！");
	    }
	});
}





//为字符串替换函数，根据匹配项替换所有。
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
    } else {  
        return this.replace(reallyDo, replaceWith);  
    }  
}



//计算单元格（公式），本函数已兼容C/S版函数复制使用，会自动转换格式和补全参数。
var requestCount=0;
function calculateCell(fx){

	
	fx = fx.replaceAll("全年","月");//由于报表暂不支持"全年"的计算，将"全年"替换成"月"。
	
	//将FS("1122","月","借",,"年","001",,"否")最终变成["1122", "月", "借", "", "年", "001", "", "否", "", "", "", "", ""] 
	fx = fx.replaceAll(",,",",\"\",");
	fx = fx.replaceAll(",,",",\"\",");
	//判断有多少个“,”号，得出缺少多少个参数，在最后补齐，用空串代替
	var paramCount = fx.split(",").length;
	var apedStr="";
	
	for(var i=paramCount+1;i<=13;i++){
		apedStr+=",\"\"";
	}
	
	//重新拼接函数
	fx = fx.substr(0,fx.length-1)+apedStr;
	var funName = fx.substr(0,fx.indexOf("("));
	var paramStr = fx.substr(fx.indexOf("(")+1);
	
	//变成["1122", "月", "借", "", "年", "001", "", "否", "", "", "", "", ""]
	var pa = paramStr.split(",");
	for(var i=0;i<pa.length;i++){
		pa[i]=pa[i].replaceAll("\"","");
	}
	
	var param = null;
	var filenameout = "";
	switch(funName){
		
	case "QC":  // 取期初余额
	case "SQC": // 取数量期初余额
	case "WQC": // 取外币期初余额
	case "QM":  // 期末
	case "SQM": // 数量期末
	case "WQM": // 外币期末
	case "LFS": // 累计发生额
	case "SLFS":// 数量累计发生额
	case "WLFS":// 外币累计发生额
	case "SJE": // 数量净额
	case "WJE": // 外币净额
		param = {
			"fpvo.fileNameOut" : filenameout,
			"fpvo.funName" : funName,
			"fpvo.kmcode" : pa[0],
			"fpvo.period" : pa[1],
			"fpvo.DC" : pa[2],
			"fpvo.account" : pa[3],
			"fpvo.year" : pa[4],
			"fpvo.assP1" : pa[5],
			"fpvo.assP2" : pa[6],
			"fpvo.endDate" : pa[7],
			"fpvo.isInclude" : pa[8],
			"fpvo.assSort1" : pa[9],
			"fpvo.assSort2" : pa[10]
		}
		break;

		
	case "FS": // 发生额
	case "SFS":// 数量发生额
	case "WFS":// 外币发生额
		param = {
			"fpvo.fileNameOut" : filenameout,
			"fpvo.funName" : funName,
			"fpvo.kmcode" : pa[0],
			"fpvo.period" : pa[1],
			"fpvo.DC" : pa[2],
			"fpvo.account" : pa[3],
			"fpvo.year" : pa[4],
			"fpvo.assP1" : pa[5],
			"fpvo.assP2" : pa[6],
			"fpvo.isInclude" : pa[7],
			"fpvo.assSort1" : pa[8],
			"fpvo.assSort2" : pa[9]
		}
		break;

		
	case "TFS": // 条件发生额
	case "STFS":// 数量条件发生额
	case "WTFS":// 外币条件发生额
		param = {
			"fpvo.fileNameOut" : filenameout,
			"fpvo.funName" : funName,
			"fpvo.kmcode" : pa[0],
			"fpvo.period" : pa[1],
			"fpvo.DC" : pa[2],
			"fpvo.digest" : pa[3], // 摘要
			"fpvo.digestMatchType" : pa[4], // 摘要匹配方式
			"fpvo.account" : pa[5],
			"fpvo.year" : pa[6],
			"fpvo.assP1" : pa[7],
			"fpvo.assP2" : pa[8],
			"fpvo.endDate" : pa[9],
			"fpvo.isInclude" : pa[10],
			"fpvo.assSort1" : pa[11],
			"fpvo.assSort2" : pa[12]
		}
		break;

		
	case "DFS": // 对方科目发生额
	case "SDFS":// 数量对方科目发生额
	case "WDFS":// 数量对方科目发生额
		param = {
			"fpvo.fileNameOut" : filenameout,
			"fpvo.funName" : funName,
			"fpvo.kmcode" : pa[0],
			"fpvo.ccode_equal" : pa[1],// 对方科目编码
			"fpvo.period" : pa[2],
			"fpvo.DC" : pa[3],
			"fpvo.digest" : pa[4], // 摘要
			"fpvo.digestMatchType" : pa[5], // 摘要匹配方式
			"fpvo.account" : pa[6],
			"fpvo.year" : pa[7],
			"fpvo.assP1" : pa[8],
			"fpvo.assP2" : pa[9],
			"fpvo.endDate" : pa[10],
			"fpvo.isInclude" : pa[11],
			"fpvo.assSort1" : pa[12],
			"fpvo.assSort2" : pa[13]
		}
		break;

		
	case "JE":// 净额
		param = {
			"fpvo.fileNameOut" : filenameout,
			"fpvo.funName" : funName,
			"fpvo.kmcode" : pa[0],
			"fpvo.period" : pa[1],
			"fpvo.account" : pa[2],
			"fpvo.year" : pa[3],
			"fpvo.assP1" : pa[4],
			"fpvo.assP2" : pa[5],
			"fpvo.endDate" : pa[6],
			"fpvo.isInclude" : pa[7],
			"fpvo.assSort1" : pa[8],
			"fpvo.assSort2" : pa[9]
		}
		break;

		
	case "HL":// 汇率
		param = {
			"fpvo.fileNameOut" : filenameout,
			"fpvo.funName" : funName,
			"fpvo.cexch_name" : pa[0],
			"fpvo.period" : pa[1],
			"fpvo.exch_itype" : pa[2],
			"fpvo.account" : pa[3],
			"fpvo.year" : pa[4]
		}
		break;

		
	case "XJLL":// 现金流量
		param = {
			"fpvo.fileNameOut" : filenameout,
			"fpvo.funName" : funName,
			"fpvo.dbill_date_begin" : pa[0],
			"fpvo.dbill_date_end" : pa[1],
			"fpvo.cashItem" : pa[2],
			"fpvo.DC" : pa[3],
			"fpvo.account" : pa[4],
			"fpvo.year" : pa[5],
			"fpvo.isInclude" : pa[6],
			"fpvo.period" : pa[7]
		}
		break;
			
	}
	
	var result = 0;
	$.ajax({
	    url: "reportFunManageAction!getCellValue.action",
	    type: "post",
	    data: param,
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	
	    	if (data.status) {
				var res = data.result;
				
				if(res!=null && res!=""){
					result = res;
				}else{
					result = 0;
				}
			}
	    	requestCount++;
	    	
	    	
	    	
	    },
	    error:function(msg){
	    	closeProgressWindow();
	    	jAlert("单元格计算时发生错误！请重新尝试。");
	    	
	    	
	    }
	});
	
	
	return result;
	
	
	
}

//将公式表达式分割到数组中，以计算符隔开
function splitFormulaExpressToArray(formula){
	

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

	return expslpstr;
}


//为数组添加序列化函数，用于jquery ajax向后台传对象数组参数
Array.prototype.serializeObject = function (lName) {
	var o = {};
	$t = this;

	for (var i = 0; i < $t.length; i++) {
		for (var item in $t[i]) {
			o[lName+'[' + i + '].' + item.toString()] = $t[i][item].toString();
		}
	}
	return o;
};

//单元格对错判定
function determine(reportName){

	reportName = encodeURIComponent(reportName);
	
	var answerList = null;
	$.ajax({
	    url: "studentLogin!queryReportAnswers.action",
	    type: "post",
	    data: {'reportname' : reportName},
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	answerList = data.answerList;
	    }
	});

	if(answerList==null || answerList.length==0){
		return false;
	}
	
	var resultList = new Array();
	//遍历判分约定，判断指定单元格是否正确
	for (var i = 0; i < answerList.length; i++) {
		
		
		var answer = answerList[i];
		

		
		var result = {};
		result.fscoreid = answer.scoreid;
		result.answernum = answer.answernum;
		result.istrue=0;//默认是错的
		
		if(answer.sexpression=="IsExistsFile"){
			result.istrue=1;
			resultList[i] = result;
			continue;
		}
		
		var param = answer.param;//DSH_ANSWER_DETAIL表param字段
		var pa = param.split(",");
		var y = pa[0];
		var x = pa[1];

		var cell = document.getElementById(current_sheet.id+"_"+String.fromCharCode(parseInt(y)+64)+x);
		if(cell==null){
			result.istrue=0;
			resultList[i] = result;
			continue;
		}
		
		var trueanswer = answer.trueanswer;
		switch(answer.sexpression){
			//单元格公式
		case "GetCellFormula":
			var fx = cell.getAttribute("value");
			if(fx==null) break;
			
			/***
			 * 说明：
			 * 老版公式单元格判分点录入只支持单个单元格单个公式的判断，不支持QM("1001",月,,,年,,)+QM("1002",月,,,年,,)+QM("1012",月,,,年,,)这种组合公式的判断。
			 * 解决方案：报表判分点录入时，支持直接录入界面生成的标准公式LFS("660201","月","借","1"...)，和：“LFS,660201,1,借”两种模式。
			 * 单元格判定对错时根据模式进行不同的处理，两种模式在表达式上的区别在于一个不带括号，一个带括号，因此可以据括号作为判断依据
			 * 陈建宇 2015-3-6
			 */
			
			
			//标准公式方式“QM("1001",,)+ptotal(B1:B5)-A5+C3”，注：此处判断标准答案中是否包含(、+、-，如果包含说明录入了标准格式公式答案，老版本答案格式不会包含这3个字符。
			if(param.indexOf("(")>-1 || param.indexOf("+")>-1 || param.indexOf("-")>-1){

				
				var afc = param.split("");//answerFormulaChars
				var position=0;
				var count=0;
				for(var a=0;a<afc.length;a++){
					if(afc[a]==","){
						count++;
					}
					if(count==2){
						position=a;
						break;
					}
					
				}
				
				var answerFormula = param.substr(position+1);
				
				
				//取得答案公式，根据“+，-”号分割，再判断当前单元格公式是否存在于录入的判分标准中。
				answerFormula = answerFormula.replaceAll("\"","").replaceAll("'","");//答案公式，替换掉双引号和单引号
				var inputedFormula = fx.replaceAll("\"","").replaceAll("'","");//考生输入的公式。

				
				var answerFormulaArray = splitFormulaExpressToArray(answerFormula);//将答案公式按计算符分割成数组
				var inputedFormulaArray = splitFormulaExpressToArray(inputedFormula);//将考生公式按计算符分割成数组
				

				/***
				 * 一、判断考生输入的公式是否存在于答案公式中
				 */
				

				var allFormulaIn = true;//所有公式是否都存在于答案公式表达式中，假设都存在

				for(var j=0;j<=answerFormulaArray.length;j+=2){
					var exp = answerFormulaArray[j];

					if(inputedFormula.indexOf(exp)==-1){
						allFormulaIn = false;//如果在答案公式表达式中找不到考生输入的公式，说明考生答错。
						break;//退出循环
					}
					
					
				}

				
				
				if(!allFormulaIn){
					result.istrue=0;//答案错误
					break;//跳出case
				}

				/***
				 * 二、如果有被减公式，进而判断被减公式位置是否正确（被减公式不能出现在最前，减号前必须有其他公式）
				 */
				
				var positionFlag = true;
				
				
				try{
					
					for(var l=1;l<=answerFormulaArray.length;l+=2){
						
						var symbol = answerFormulaArray[l];
						var reductionFormula = answerFormulaArray[l+1];//被减公式
	
						if(symbol=="-"){
	
							for(var k=0;k<=inputedFormulaArray.length;k+=2){
								
								var inputedFormula = inputedFormulaArray[k];
								if(inputedFormula==reductionFormula){
	
									//被减公式不能出现在最前，减号前必须有其他公式
									if(k>1 && inputedFormulaArray[k-1]=="-"){
										if(inputedFormulaArray[k-2]==null || inputedFormulaArray[k-2]==""){
											positionFlag=false;
										}
									}else{
										positionFlag=false;
									}
	
									break;
								}
	
							}
	
						}
					}

				}catch(e){
					positionFlag=false;
				}
				
					
				if(positionFlag){
					result.istrue=1;//正确
				}else{
					result.istrue=0;//错误
				}
					
					
				
				
				
			}
			//兼容老版函数公式判分点录入方式“LFS,660201,1,借”
			else{
				
				

				var funName = fx.substr(0,fx.indexOf("("));
				if(funName==pa[2] && fx.indexOf(pa[3])!=-1){//比较函数名称是否相同
					result.istrue=1;
				}
				
				
				/***
				 * 如果带辅助核算的话，还需要比较辅助核算对象和借贷方向是否正确。
				 * 后台查询出的判分参考串如“3,5,FS,1122,001,借”，
				 * 前台的公式处理后如“FS("1122","月","借",,"年","001",,"否")”，
				 * 后台参照值第5位对应前台公式第6位。
				 * 需要进行匹配判断
				 */
				

				//将FS("1122","月","借",,"年","001",,"否")最终变成["1122", "月", "借", "", "年", "001", "", "否", "", "", "", "", ""] 
				fx = fx.replaceAll(",,",",\"\",");
				fx = fx.replaceAll(",,",",\"\",");
				//判断有多少个“,”号，得出缺少多少个参数，在最后补齐，用空串代替
				var paramCount = fx.split(",").length;
				var apedStr="";
				
				for(var j=paramCount+1;j<=13;j++){
					apedStr+=",\"\"";
				}
				
				//重新拼接函数
				fx = fx.substr(0,fx.length-1)+apedStr;
				var paramStr = fx.substr(fx.indexOf("(")+1);
				
				//变成["1122", "月", "借", "", "年", "001", "", "否", "", "", "", "", ""]
				var fxa = paramStr.split(",");
				for(var j=0;j<fxa.length;j++){
					fxa[j]=fxa[j].replaceAll("\"","");
				}
				
				//辅助核算编码，前台公式为第6位，后台参照值为第5位；借贷方向前台第3位对应后台参照值第6位
				//modifiedy by wuchang 20141225  需要根据传入的数组长度,来决定是否要判断公式的参数值 begin
				/*if(fxa[5]!=pa[4] || fxa[2]!=pa[5]){
					result.istrue=0;//答案错误
				}*/
				//辅助核算编码，前台公式为第6位，后台参照值为第5位
				if(pa.length==5){
					if(fxa[5]!=null && pa[4]!=null && fxa[5]!=pa[4]){
					result.istrue=0;//答案错误
					}
				}
				//借贷方向,前台第3位对应后台参照值第6位
				if(pa.length==6){
					if(pa[5]!=null && fxa[2] !=null && fxa[2]!=pa[5]){
						result.istrue=0;//答案错误
					}
				}
				//modifiedy by wuchang 20141225 需要根据传入的数组长度,来决定是否要判断公式的参数值 end
				
			}
			
			
			break;

			//单元格数据
		case "GetCellData":
			var text = cell.getElementsByTagName("div")[0].innerHTML;
			
			if(text=="") text=0;
			
			//modify by wuchang 20140919 如果不是数字，则直接==比较
			if(isNaN(trueanswer) || isNaN(text)){
				
			//如果是数字，需要转换成浮点型
			}else{
				text = parseFloat(text,10);
				trueanswer = parseFloat(trueanswer,10);
			}
			// modify by wuchang 20140919  end
			/*
			console.info("============================");
			console.info("GetCellData");
			console.info(text);
			console.info(trueanswer);
			console.info("============================");
			*/
			
			if(trueanswer==text) result.istrue=1;
			break;

			//关键字
		case "GetCellKeyWord":
			var kn = cell.getAttribute("keywordName");
			if(kn==null) break;
			
			var text = cell.getElementsByTagName("div")[0].innerHTML;
			
			//单位名称和年月日关键字不一样，报表转换成格式模式后单位名称不会有任何符号，此处必须判断。
			if(kn=="unitName"){
				text = get_keyword_style(kn).format;
				
			}
			
			/*
			console.info("============================");
			console.info("GetCellKeyWord");
			console.info(text);
			console.info(pa);
			console.info("============================");
			*/
			
			
			if(text.indexOf(pa[2])!=-1){
				result.istrue=1;
			}
			break;
		
		}
		
		
		resultList[i] = result;

	}
	

	if(resultList.length==null) return false;
	if(resultList.length==0) return false;
	
	var saveFlag = true;



	//保存结果
	$.ajax({
	    url: "studentLogin!updateReportAnswerResult.action",
	    type: "post",
	    data: $.param(resultList.serializeObject("resultList")),
	    dataType: "json",
	    async:false,
	    success: function(data){
	    	saveFlag = data.flag;
	    },
	    error:function(){
	    	saveFlag = false;
	    }
	});

	return saveFlag;
	

}




//单元格属性设置
function setCellProperties(){

	action = "setCellProperties";
	window.parent.openWindow("HTMLExcel_setCellProperties","HTMLExcel");
}

//整表重算
function calculateAll(){

	jConfirm("整表重算需要花费一定时间，是否继续？","提示",function(flag){
		if(flag==true){
			calculateAllFormulas();
		}
	});
}

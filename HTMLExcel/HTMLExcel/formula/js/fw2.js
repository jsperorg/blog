/**
 * 
 * @DESCRIBE 公式界面js
 * @AUTHOR 王丙建
 * @DATE 2012-11-16
 * @COMPANY 畅捷通信息技术股份有限公司
 * @DEPARTMENT 研发中心培教研发部
 * @PORJECT EXAM
 * 
 */

/**
 * 查询科目辅助核算信息
 * 
 * @param iyear
 *            年份
 * @param iperiod
 *            会计期间
 * @param itype
 *            类型
 */



	var code01="";//辅助核算项 编码1
	var code02="";//辅助核算项 编码2
	var cassItem=""; //项目大类编码
	var action="";//弹出参照动作（是项目？部门？供应商？还是个人？……用于弹窗返回值处理）


function queryCodeAddInfo() {
	var accid = "1";
	var year = "2010";
	var ccode = "1001";
	$.ajax({
				url : "code!queryCodeAddInfo.action?year=" + year + "&accid="
						+ accid + "&ccode=" + ccode,
				type : "post",
				datatype : "json",
				success : function(data, status) {
					var codeAddInfoList = data.codeAddInfoList;
					initCodeAddInfo(codeAddInfoList);
				}
			});
}

/**
 * 初始化科目辅助信息
 * 
 * @param codeAddInfoList
 */
function initCodeAddInfo(codeAddInfoList) {
	var addInfoList = codeAddInfoList[0];
	// 得到客户、供应商、部门、个人、项目标志
	var cusBz = addInfoList[2];
	var supBz = addInfoList[3];
	var deptBz = addInfoList[4];
	var personBz = addInfoList[5];
	var itemBz = addInfoList[6];
	$("#cusid").attr({
				"readonly" : true
			});
	$("#cusbtn").attr('disabled', true);

	$("#supid").attr({
				"readonly" : true
			});
	$("#supbtn").attr('disabled', true);

	$("#deptid").attr({
				"readonly" : true
			});
	$("#deptbtn").attr('disabled', true);

	$("#personid").attr({
				"readonly" : true
			});
	$("#personbtn").attr('disabled', true);

	$("#itemid").attr({
				"readonly" : true
			});
	$("#itembtn").attr('disabled', true);

	if (cusBz == "1") {
		$("#cusid").removeAttr("readonly");
		$("#cusbtn").attr('disabled', false);

	}
	if (supBz == "1") {
		$("#supid").removeAttr("readonly");
		$("#supbtn").attr('disabled', false);
	}

	if (deptBz == "1") {
		$("#deptid").removeAttr("readonly");
		$("#deptbtn").attr('disabled', false);

	}
	if (personBz == "1") {
		$("#personid").removeAttr("readonly");
		$("#personbtn").attr('disabled', false);

	}
	if (itemBz == "1") {
		$("#itemid").removeAttr("readonly");
		$("#itembtn").attr('disabled', false);

	}
}

/**
 * 得到函数字符串
 */
function getFuncString() {
	var strFunction = "";
	var code01 = "";// 辅助核算项 编码1
	var code02 = "";// 辅助核算项 编码2
	var i = 0;
	// var pos = $("#funcName").val().indexOf("(");
	// 函数名称
	// var funcName = $("#funcName").val().substr(0,pos) ;

	var funcName = $("#funcName").val();
		funcName=funcName.toUpperCase();
	// jAlert(funcName);
	// 会计年度
	var selyear = $("#selyear").val();
	if (selyear != "") {
		selyear = "\"" + selyear + "\"";
	}
	// 科目编码
	var codeid = $("#codeid").val();
	if (codeid != "") {
		codeid = "\"" + codeid + "\"";
	}
	
	//对方科目编码
	var dfcodeid = $("#dfcodeid").val();
	if (dfcodeid != "") {
		dfcodeid = "\"" + dfcodeid + "\"";
	}
	
	//摘要
	var digest = $("#digest").val();
	if (digest != "") {
		digest = "\"" + digest + "\"";
	}
	
	//摘要匹配方式
	var ppfs = $("#ppfs").val();
	if (ppfs != "") {
		ppfs = "\"" + ppfs + "\"";
	}
	
	// 币种
	var bz = $("#bz").val();
	if (bz != "") {
		bz = "\"" + bz + "\"";
	}
	
	// 汇率类型
	var hllx = $("#hllx").val();
	if (hllx != "") {
		hllx = "\"" + hllx + "\"";
	}
	
	//jAlert(codeid);
	// 会计期间
	var selperiod = $("#selperiod").val();
	if (selperiod != "") {
		selperiod = "\"" + selperiod + "\"";
	}
	// 方向
	var selfx = $("#selfx").val();
	if (selfx != "") {
		selfx = "\"" + selfx + "\"";
	}
	
	// 起始日期
	var beginDate = $("#beginDate").val();
	if (beginDate != "") {
		beginDate = "\"" + beginDate + "\"";
	}
	
	// 截止日期
	var endDate = $("#endDate").val();
	if (endDate != "") {
		endDate = "\"" + endDate + "\"";
	}
	
	// 包含未记账凭证
	var isInclude = $("#isInclude").val();
	if (isInclude != "") {
		isInclude = "\"" + isInclude + "\"";
	}
	// 个人
	var personid = $("#personid").val();
	if (personid != "") {
		personid = "\"" + personid + "\"";
	}
	// 客户
	var cusid = $("#cusid").val();
	if (cusid != "") {
		cusid = "\"" + cusid + "\"";
	}
	// 供应商
	var supid = $("#supid").val();
	if (supid != "") {
		supid = "\"" + supid + "\"";
	}
	// 部门
	var deptid = $("#deptid").val();
	if (deptid != "") {
		deptid = "\"" + deptid + "\"";
	}
	// 项目
	var itemid = $("#itemid").val();//项目code
	//var itemid = $("#citemid").val(); //项目id
	
	if (itemid != "") {
		itemid = "\"" + itemid + "\"";
	}

	if ($("#personid").attr("disabled") != "disabled") {
		code01 = personid;
		i = 1;
	}

	if ($("#cusid").attr("disabled") != "disabled") {
		switch (i) {
			case 0 :
				code01 = cusid;
				i = 1;
				break;
			case 1 :
				code02 = cusid;
				i = 2;
				break;
			default :
				jAlert("科目辅助核算项不能超过2个。");
		}
	}

	if ($("#supid").attr("disabled") != "disabled") {
		switch (i) {
			case 0 :
				code01 = supid;
				i = 1;
				break;
			case 1 :
				code02 = supid;
				i = 2;
				break;
			default :
				jAlert("科目辅助核算项不能超过2个。");
		}
	}
	if ($("#deptid").attr("disabled") != "disabled") {
		switch (i) {
			case 0 :
				code01 = deptid;
				i = 1;
				break;
			case 1 :
				code02 = deptid;
				i = 2;
				break;
			default :
				jAlert("科目辅助核算项不能超过2个。");
		}
	}
	if ($("#itemid").attr("disabled") != "disabled") {
		switch (i) {
			case 0 :
				code01 = itemid;
				i = 1;
				break;
			case 1 :
				code02 = itemid;
				i = 2;
				break;
			default :
				jAlert("科目辅助核算项不能超过2个。");
		}
	}

	switch (funcName) {
		case "QC" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SQC" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WQC" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "QM" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SQM" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WQM" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "FS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "DFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}
			
			if (dfcodeid == "") {
				jAlert("对方科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					//对方科目编码
					+ dfcodeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向					
					+ selfx + ","
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SDFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}
			
			if (dfcodeid == "") {
				jAlert("对方科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					//对方科目编码
					+ dfcodeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向					
					+ selfx + ","
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WDFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}
			
			if (dfcodeid == "") {
				jAlert("对方科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					//对方科目编码
					+ dfcodeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向					
					+ selfx + ","
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "TFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "STFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WTFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					
					// 摘要					
					+ digest + ","
					// 匹配方式					
					+ ppfs + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "LFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SLFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "WLFS" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "JE" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "SJE" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;

		case "WJE" :
			if (codeid == "") {
				jAlert("科目编码不能为空！");
				return "";
			}

			strFunction = funcName + "("
					// 科目编码
					+ codeid + ","
					// 会计期间
					+ selperiod + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 编码1
					+ code01 + ","
					// 编码2
					+ code02 + ","
					// 截止日期
					+ endDate + ","
					// 是否包含未记账凭证
					+ isInclude + ")";
			break;
		case "HL" :
			

			strFunction = funcName + "("
					// 币种
					+ bz + ","
					// 会计期间
					+ selperiod + ","
					
					// 汇率类型
					+ hllx + ","
					
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ") ";
			break;
		case "XJLL" :
			if(selperiod!="" && (beginDate!="" || endDate!="")){
				jAlert("期间和  起始|截至日期不能同时输入！");
				return;
			}
            if(itemid==""){
            	jAlert("项目编码不能为空！");
            	return;
            }
			strFunction = funcName + "("
					// 起始日期
					+ beginDate + ","
					// 截止日期
					+ endDate + ","
					// 项目编码
					+ itemid + ","
					// 方向
					+ selfx + ","
					// 账套号
					+ ","
					// 会计年度
					+ selyear + ","
					// 是否包含未记账凭证
					+ isInclude + ","
					// 会计期间
					+ selperiod + ")";
			break;
		default :
			jAlert(funcName + "函数暂时不支持。");
	}

	

	window.parent.deliverValue("HTMLExcel_formula_fw2",strFunction);
	closeWindow();
	
	
}



//根据函数名称 确定展示的项目
function initItems(funcname){
	funcname=funcname.toUpperCase();//将传入进来的转换成大写(2013-8-23) lyl
	switch (funcname) {
			case "QC" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				setFX();
				setPeriod();
				break;
			case "SQC" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				setFX();
				break;
			case "WQC" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				setFX();
				break;
			case "QM" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				setFX();
				break;
			case "SQM" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				setFX();
				break;
	
			case "WQM" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				setFX();
				break;
			case "FS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "SFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "WFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
	
			case "DFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").show();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").hide();
				$("#tr_digest").show();
				$("#tr_ppfs").show();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "SDFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").show();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").hide();
				$("#tr_digest").show();
				$("#tr_ppfs").show();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "WDFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").show();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").hide();
				$("#tr_digest").show();
				$("#tr_ppfs").show();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
	
			case "LFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "SLFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
	
			case "WLFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
	
			case "TFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").hide();
				$("#tr_digest").show();
				$("#tr_ppfs").show();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "STFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").hide();
				$("#tr_digest").show();
				$("#tr_ppfs").show();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "WTFS" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").hide();
				$("#tr_endDate").hide();
				$("#tr_digest").show();
				$("#tr_ppfs").show();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "JE" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").hide();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "SJE" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").hide();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "WJE" :
				$("#tr_selyear").show();
				$("#tr_codeid").show();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").hide();
				$("#tr_beginDate").hide();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				break;
			case "HL" :
				$("#tr_selyear").show();
				$("#tr_codeid").hide();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").hide();
				$("#tr_beginDate").hide();
				$("#tr_endDate").hide();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").show();
				$("#tr_hllx").show();
				$("#tr_isInclude").show();
				break;
			case "XJLL" :
				$("#tr_selyear").show();
				$("#tr_codeid").hide();
				$("#tr_dfcodeid").hide();
				setPeriod();
				$("#tr_selfx").show();
				$("#tr_beginDate").show();
				$("#tr_endDate").show();
				$("#tr_digest").hide();
				$("#tr_ppfs").hide();
				$("#tr_bz").hide();
				$("#tr_hllx").hide();
				$("#tr_isInclude").show();
				
				$("#tr_personid").hide();
				$("#tr_cusid").hide();
				$("#tr_supid").hide();
				$("#tr_deptid").hide();
				$("#tr_itemid").show();
				disable_false("itemid");
				disable_false("itembtn");
				break;
			default :
				jAlert("暂时没有该函数的向导。");
       }
	
}


//继续输入公式复选框控制处理函数
function setdis(checkbox){
	var rdgc = document.getElementById("rdgc");
	
	if(checkbox.checked==true){
		rdgc.style.display="block";
		
		checkbox.parentNode.parentNode.style.border="1px solid #666";
	}else{
		rdgc.style.display="none";
		checkbox.parentNode.parentNode.style.border="none";
	}
	
}




//设置方向
function setFX(){
	$("#tr_selfx").show();
	//方向添加默认选项-------后台获取科目性质本身方向即可  add ny lval 20130903---begin-----
	$("#selfx").prepend("<option value=0 selected='true'>默认</option>"); 
	$("#selfx").val(0);//选中状态
	//方向添加默认选项-------后台获取科目性质本身方向即可  add ny lval 20130903---end-----
}
//添加会计期间
function setPeriod(){
	$("#tr_selperiod").show();
	$("#selperiod").val("月");
}




//加载科目
function loadCode(codeid){
if(codeid!=""&&codeid!=null){
	 $.getJSON('code!queryCodeByCode', {"ccode":codeid,"year":"2010"},function(r) {
		 //修改 科目方向默认值(2013-9-16)lyl
		 if(selFuncName=="QC"||selFuncName=="SQC"||selFuncName=="WQC"||selFuncName=="QM"||selFuncName=="SQM"||selFuncName=="WQM"){
			 if(r.code1!=null ){
				 if(r.code1.bproperty==1){//借
					 $("#selfx option:selected").attr("value","借");
				 }else if(r.code1.bproperty==0){
					 $("#selfx option:selected").attr("value","贷");
				 }
			 }
			 
		 }
		    
			  if(r.code1!=null && r.code1.bperson==1){
				  //个人辅助核算   启用 
				  disable_false("personid");
				  disable_false("personbtn");
			  }else{
				  //禁用
				   disable_true("personid");
				   disable_true("personbtn");
			  }
			  if(r.code1!=null && r.code1.bcus==1){
				  //客户辅助核算
				  disable_false("cusid");
				  disable_false("cusbtn");
			  }else{
				  //禁用
				  disable_true("cusid");
				   disable_true("cusbtn");
			  }
			  if(r.code1!=null && r.code1.bsup==1){
				  //供应商辅助核算
				  disable_false("supid");
				  disable_false("supbtn");
			  }else{
				  //禁用
				   disable_true("supid");
				   disable_true("supbtn");
			  }
			  if(r.code1!=null && r.code1.bdept){
				  //部门辅助核算
				   disable_false("deptid");
				   disable_false("deptbtn");
			  }else{
				  //禁用
				  disable_true("deptid");
				  disable_true("deptbtn");
			  }
			  if(r.code1!=null && r.code1.bitem){
				  //项目辅助核算
				  disable_false("itemid");
				   disable_false("itembtn");
				   cassItem=r.code1.cassItem;
			  }else{
				  //禁用
				   disable_true("itemid");
				   disable_true("itembtn");
			  }
	});  
}
 $("#supid").val("");
 $("#cusid").val("");
 $("#personid").val("");
 $("#itemid").val("");
 $("#deptid").val("");
}

//会计 期间 和  截止 日期 不能 同时生效 
function period(){
if($("#selperiod").val()==""){
	 disable_false("endDate");
}else{
	 disable_true("endDate");
} 

if($("#selperiod").val()!="" && $("#funcName").val()=="XJLL"){
	disable_true("beginDate");
	disable_true("endDate");
}

	
}

//禁用控件   传入 控件ID
function disable_true(id){
$("#"+id).attr("disabled","disabled");
$("#"+id).css("background-color","#808080");
}
//启用 控件
function disable_false(id){
$("#"+id).attr("disabled",false);
$("#"+id).css("background-color","");
}






function conversioncode_s(type,nowinput,executeClearBlur){
	var c_val=$(nowinput).val().split(",")[0];
	if(c_val==""){
		return;
	}
	$.ajax({
	    url: "consulteditAction!findbycodeorname",
	    type: 'post',
	    dataType: "json",
	    cache:false,
	    async:false,
	    data:"tablename="+type+"&param="+c_val,
	    success: function(data){
	    	var d_result=data.result;
	    	var param={};
	    	var t_message="";
	    	if(d_result!=""){
	    		var ress=d_result.split(":");
	    		if(ress[0]=="0"){
	    			if(type=="code"){
	    				param.selKemuCode=ress[2];
	    				param.selKemuName=ress[3];
			    	}
	    		}
	    		//财务报表公司可录入父节点，录入父节点时是进行子节点数累加计算，因此，此处不用弹出非明细级节点的提示--陈建宇 2015-7-31
	    		/*
	    		else{
	    			if(type=="code"){
	    				param.selKemuCode="";
	    				param.selKemuName="";
	    				t_message="录入科目错误！<br>科目不存在或科目非明细级！";

			    	}
	    		}
	    		*/
	    		
	    	}else{
	    		if(type=="code"){
    				param.selKemuCode="";
    				param.selKemuName="";
    				t_message="录入科目错误！<br>科目不存在或科目非明细级！";

		    	}
	    	}
	    	//deliverValue(param);
	    	if(t_message!=""){
	    		jAlert(t_message,"提示信息",function (){
	    			$(nowinput).focus();
	    			return false;
	    		});
	    	}
	    }
	  });
	return true;
}

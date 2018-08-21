/***
 * tab选项卡组建
 * 陈建宇 1012-11-22
 * 说明：本JS需要winui.js的支持，载入本JS文件的同时必须先载入winui.js
 */
 
//注册tab组建
winui.tab = {};



winui.tab.isExecuted = false;



//tab选项卡切换函数
function winui_tab_showTab(item,fun){
	//先取文本颜色值，判断此tab是否是禁用的

	if(item.getAttribute("enabled") == "false"){
		return;
	}
	if(fun != null && fun != undefined){
		var flag = fun();
		if(flag==false){
			return;
		}
	}
	
	//取得tab组建
	var tab = item.parentNode.parentNode;
	//取得tab下级节点
	var tc = winui.getChildren(tab);
	//取得tab头部选项容器
	var thc = tc[0];
	
	
	
	//取得tab内容项容器
	var tcc = tc[1].getElementsByTagName("div")[0];
	
	//取得被点击的tab项的下标
	var tabIndex = winui.getIndex(item);
	
	//取得之前选中项的下标
	var bai = tab.getAttribute("active");//before active index
	
	//如果被点击的选项卡不是当前活动的选项卡
	if(tabIndex!=bai){

		//根据下标取得内容容器下前一次选中的内容项
		var tcbi = winui.getChild(tcc,bai);
		//根据下标取得内容容器下本次要选中的内容项
		var tcwi = winui.getChild(tcc,tabIndex);
		//改变之前选中项样式
		var before = winui.getChild(thc,bai);
		before.style.width="auto";
		before.style.height="20px";
		before.className="t_h_i_d";
		var ic = winui.getChildren(before);//ic=item components
		ic[0].className="t_h_i_d_l";
		ic[1].className="t_h_i_d_m";
		ic[2].className="t_h_i_d_r";
		ic[2].style.marginLeft="auto";
		tcbi.style.display="none";
		
		//设置当前选中项样式
		var cc = winui.getChildren(item);//cc=content components
		
		item.style.width=(cc[1].innerHTML.length*12+10)+"px";
		item.style.height="20px";
		item.className="t_h_i_a";
		cc[0].className="t_h_i_a_l";
		cc[1].className="t_h_i_a_m";
		cc[2].className="t_h_i_a_r";
		cc[2].style.marginLeft=(cc[1].innerHTML.length*12+10)+"px";
		tcwi.style.display="block";
		
		//更新tab组建当前活动的卡片active
		tab.setAttribute("active",tabIndex);
		

		//执行自定义事件
		var afterShow = item.getAttribute("afterShow");
		if(afterShow!=undefined && afterShow!=null && afterShow!=""){
			eval(afterShow+"");
		}
		
		
	}
}


function winui_tab_init(){
	
	if(winui.tab.isExecuted){return false;}
	

	//取得页面所有tabs
	var tabs = winui.getElements("div","type","tab");
	
	//alert(winui.getChildren(winui.getChild(tabs[0],0))[2].innerHTML);
	/**/
	
	//循环遍历每一个tab组建，并进行初始化组装渲染
	for(var i=0;i<tabs.length;i++){
		
		//取得要设置为活动的tab项的下标
		var activeIndex = tabs[i].getAttribute("active");
		if(activeIndex==null || activeIndex==undefined){
			activeIndex = 0;
			tabs[i].setAttribute("active",0);
		}
		//当前tab
		var t = tabs[i];
		
		//取得tab头容器 thc = tab head container
		var thc = winui.getChild(t,0);
		
		//取得tab内容区容器 tcc = tab content container
		var tcc = winui.getChild(t,1);

		
		//取得tab头容器下所有选择项
		var thci = winui.getChildren(thc);
		
		//取得tab内容区下所有内容面板
		var tcci = winui.getChildren(tcc);
		
		/***
		 *实现思路及步骤：
		 *1.设置选项容器和内容区内容容器的样式，
		 *2.循环遍历头部选择项和内容区内容面板，拼装选项和内容项的HTML字符串，判断设置默认显示的项，
		 *3.将拼装好的字符串分别innerHTML到头部容器和内容容器下。
		 **/
		 
		//1.初始化tab、选项容器和内容区内容容器的样式
		
		t.style.width=(parseInt(tcc.style.width)+2)+"px";
		t.style.height=(parseInt(tcc.style.height)+19)+"px";
		t.style.paddingTop="2px";
		thc.className="t_h_c";
		tcc.className="t_c_c_b_o";
		
		
		//初始化设置头部选择项的padding-left、padding-right值
		
		
		//2.循环遍历头部选择项和内容区内容面板，拼装选项和内容项的HTML字符串
		var thcs = "";//头部选项HTML字符串
		var tccs = "";//内容项HTML字符串
		
		//拼装内容区内部边框HTML开始字符串（这步须放在循环遍历拼装内容项代码之前）
		var biw=parseInt(tcc.style.width)-2;//取得内边框的宽度
		var bih=parseInt(tcc.style.height)-2;//取得内边框的高度
		tccs += "<div class=\"t_c_c_b_i\" style=\"width:"+biw+"px;height:"+bih+"px;\">";
		
		//遍历并拼装HTML字符串
		for(var j=0;j<thci.length;j++){
			
			if(j!=activeIndex){
				//var flag = thci[j].click();
				//alert(thci[j].onclick);
				//选择项开始字符串
				thcs += "<div class=\"t_h_i_d\" onclick=\"winui_tab_showTab(this,"+thci[j].onclick+");\" afterShow=\""+thci[j].getAttribute("afterShow")+"\"><div class=\"t_h_i_d_l\"></div><div class=\"t_h_i_d_m\" style=\""+thci[j].style.cssText+"\">";
				thcs += thci[j].innerHTML;
				//选择项结束字符串
				thcs += "</div><div class=\"t_h_i_d_r\"></div></div>";
				
				//拼装内容项开始字符串
				tccs += "<div style=\"display:none;padding:4px;"+tcci[j].style.cssText+"\">";
				tccs += tcci[j].innerHTML;
				//拼装内容项结束字符串
				tccs += "</div>";
			}else{
				//选择项开始字符串
				thcs += "<div class=\"t_h_i_a\" style=\"width:"+(thci[j].innerHTML.length*12+10)+"px;height:20px;\" onclick=\"winui_tab_showTab(this,"+thci[j].onclick+");\" afterShow=\""+thci[j].getAttribute("afterShow")+"\"><div class=\"t_h_i_a_l\"></div><div class=\"t_h_i_a_m\" style=\""+thci[j].style.cssText+"\">";
				thcs += thci[j].innerHTML;
				//选择项结束字符串
				thcs += "</div><div class=\"t_h_i_a_r\" style=\"margin-left:"+(thci[j].innerHTML.length*12+10)+"px;\"></div></div>";
				
				//拼装内容项开始字符串
				tccs += "<div style=\"display:block;padding:4px;"+tcci[j].style.cssText+"\">";
				tccs += tcci[j].innerHTML;
				//拼装内容项结束字符串
				tccs += "</div>";
				
			}
			
		}
		
		//拼装内容项容器HTML结束字符串
		tccs += "</div>";
		
		//3.将拼装好的字符串分别innerHTML到头部容器和内容容器下
		thc.innerHTML=thcs;
		tcc.innerHTML=tccs;
		
		
		
	}
	winui.tab.isExecuted = true;
}


//tab按下标切换方法
winui.tab.showIndex = function(index){
	
	//取得页面第一个tab
	var tab = winui.getElements("div","type","tab")[0];
	
	//取得tab下级节点
	var tc = winui.getChildren(tab);
	//取得tab头部选项容器
	var thc = tc[0];
	
	//取得tab内容项容器
	var tcc = tc[1].getElementsByTagName("div")[0];
	
	
	//取得之前选中项的下标
	var bai = tab.getAttribute("active");//before active index
	
	//如果要选中的选项卡不是当前活动的选项卡
	if(index!=bai){

		//根据下标取得内容容器下前一次选中的内容项
		var tcbi = winui.getChild(tcc,bai);
		//根据下标取得内容容器下本次要选中的内容项
		var tcwi = winui.getChild(tcc,index);
		//改变之前选中项样式
		var before = winui.getChild(thc,bai);
		before.style.width="auto";
		before.style.height="20px";
		before.className="t_h_i_d";
		var ic = winui.getChildren(before);//ic=item components
		ic[0].className="t_h_i_d_l";
		ic[1].className="t_h_i_d_m";
		ic[2].className="t_h_i_d_r";
		ic[2].style.marginLeft="auto";
		tcbi.style.display="none";
		
		var item = winui.getChildren(thc)[index];
		
		//设置当前选中项样式
		var cc = winui.getChildren(item);//cc=content components
		
		item.style.width=(cc[1].innerHTML.length*12+10)+"px";
		item.style.height="20px";
		item.className="t_h_i_a";
		cc[0].className="t_h_i_a_l";
		cc[1].className="t_h_i_a_m";
		cc[2].className="t_h_i_a_r";
		cc[2].style.marginLeft=(cc[1].innerHTML.length*12+10)+"px";
		tcwi.style.display="block";
		
		//更新tab组建当前活动的卡片active
		tab.setAttribute("active",index);
		
		
		
	}
	
	
	
};








//按下标禁启用tab
winui.tab.setDisabled = function(index,bool){
	
	//取得页面第一个tab
	var tab = winui.getElements("div","type","tab")[0];
	
	//取得tab下级节点
	var th = winui.getChild(tab,0);
	
	var target = winui.getChild(th,index);
	
	if(bool){

		target.setAttribute("enabled","false");
		target.style.color="#808080";
		
	}else{
		target.setAttribute("enabled","true");
		target.style.color="#000000";
	}
	
	
};



//按下标显示隐藏tab
winui.tab.setDisplay = function(index,bool){
	
	//取得页面第一个tab
	var tab = winui.getElements("div","type","tab")[0];
	
	//取得tab下级节点
	var th = winui.getChild(tab,0);
	
	var target = winui.getChild(th,index);
	
	if(bool){

		target.style.display="block";
	}else{

		target.style.display="none";
	}
	
	
	
};









//默认行为：页面元素加载完成后初始化渲染各tab组建
winui.onDOMContentLoaded(function(){
	
	
	winui_tab_init();

	/**/
	
});
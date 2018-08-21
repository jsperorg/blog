/*
 * AeroWindow - jQuery Plugin (v3.51)
 * Copyright 2010, Christian Goldbach
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Project Website:
 * http://www.soyos.net/aerowindow-jquery.html
 * http://www.soyos.net
 *
 *
 *
 * Requires Easing Plugin for Window Animations:
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 *
 * Changelog:
 * ~~~~~~~~~~
 * Version 3.51 (2010-06-09) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Added more config options:
 * New Feature: Window get the focus by clicking window buttons
 * Bugfix: Resizing to regular Size
 *
 * Version 3.5 (2010-06-09) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Added more config options:
 * - WindowAnimationSpeed 
 *
 * Bugfix: iFrames can now change the size correctly
 * Bugfix: The buttons now look clean, in all configurations
 * Bugfix: window without Maximize button can not be maximized by double-clicking on the header
 * Bugfix: When clicking on the buttons appear no more # in the Browser URL 
 * Bugfix: Dragging is not longer possible by the content area. Only by Header.
 * Bugfix: The content can now be scrolled
 * Bugfix: Fixed IE JavaScript crashes
 *
 * Version 2.0 (2010-06-01) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Added more config options:
 * - WindowResizable: 
 * - WindowMaximize    
 * - WindowMinimize    
 * - WindowClosable   
 * - WindowDraggable  
 *
 * Date: 2010-06-01
 */

 
 
(function($){
  $.fn.extend({ 
    //plugin name - Aero Window (like Windows7 Style) 
    AeroWindow: function(options) {
    
	
      //Settings Window and the default values---------------------------------
	  
      var defaults = {
        WindowTitle:          null,
        WindowPositionTop:    60,            /* Posible are pixels or 'center' */
        WindowPositionLeft:   10,            /* Posible are pixels or 'center' */
        WindowWidth:          300,           /* Only pixels */
        WindowHeight:         300,           /* Only pixels */
        WindowMinWidth:       250,           /* Only pixels */
        WindowMinHeight:      0,             /* Only pixels */
        WindowResizable:      true,          /* true, false*/
        WindowMaximize:       true,          /* true, false*/
        WindowMinimize:       true,          /* true, false*/
        WindowClosable:       true,          /* true, false*/
        WindowDraggable:      true,          /* true, false*/
        WindowStatus:         'regular',     /* 'regular', 'maximized', 'minimized' */
        WindowAnimationSpeed: 500,
        WindowAnimation:      'easeOutElastic',
		WindowModalDialog:    true           /*是否模态，此值决定是否生成遮罩层，挡住背面元素禁止点击*/
      };
      
      /*-----------------------------------------------------------------------
      Posible WindowAnimation:
      - easeInQuad
      - easeOutQuad
      - easeInOutQuad
      - easeInCubic
      - easeOutCubic
      - easeInOutCubic
      - easeInQuart
      - easeOutQuart
      - easeInOutQuart
      - easeInQuint
      - easeOutQuint
      - easeInOutQuint
      - easeInSine
      - easeOutSine
      - easeInOutSine
      - easeInExpo
      - easeOutExpo
      - easeInOutExpo
      - easeInCirc
      - easeOutCirc
      - easeInOutCirc
      - easeInElastic
      - easeOutElastic
      - easeInOutElastic
      - easeInBack
      - easeOutBack
      - easeInOutBack
      - easeInBounce
      - easeOutBounce
      - easeInOutBounce      
      -----------------------------------------------------------------------*/
      
	  function stringToBoolean(obj){
		  for(var k in obj){
			  if(obj[k]=="true"){
				  obj[k]=true;
			  }
			  if(obj[k]=="false"){
				  obj[k]=false;
			  }
		  }
	  }
	  
      //Assign current element to variable, in this case is UL element
      var o = $.extend(defaults, options);
	  o.WindowWidth = o.WindowWidth/1;
	  o.WindowHeight = o.WindowHeight/1;
	stringToBoolean(o);
	
      //Identify clearly this window ----------------------------------------
      WindowID = $(this).attr('id');
      if (($('body').data(WindowID)) == null) {
        var $WindowAllwaysRegistered = false;
        //Register this Window
        $('body').data( WindowID , 1);
      } else {
        //Window exists
        var $WindowAllwaysRegistered = true;
      }
	  
		var window_content="";	
		
		
		//再次打开窗体时，重新创建iframe，重新加载页面
		if(o.WindowUrl){
			var param = o.WindowUrl.split("\?");
			if(param.length>1){
				o.WindowUrl = o.WindowUrl + "&";
			}else{
				o.WindowUrl = o.WindowUrl + "?";
			}
			o.WindowUrl = o.WindowUrl + "nocache="+Math.random();//带上随机数防止浏览器缓存
			window_content += '<iframe id="'+WindowID+'_iframe" src="'+o.WindowUrl+'" width="100%" height="100%" style="border: 0px;" frameborder="0"></iframe>';
			window_content += '<div class="iframeHelper"></div>';//添加iframe的透明遮挡层，用于解决拖拽窗体时重新渲染iframe导致卡顿现象的问题。
		}else{
			window_content = $(this).html();
		}
	  
	  
		//判断是否需要生成遮罩层（模态窗体），增加此遮罩层代码只在此处一段和关闭窗体时删除的代码，其他z-index的地方没动过，属于之前窗体本有的代码
		if(o.WindowModalDialog==true){
			var zIndex=$('body').data('AeroWindowMaxZIndex');
			if(!zIndex){
				zIndex = 2;
			}
          //如果不存在则创建,已经有了则直接显示
          var glass = $("#"+WindowID+'_glass');
          if(!glass[0]){
            glass = '<div id="'+WindowID+'_glass" style="z-index:'+zIndex+';position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0.2);background:#000;opacity:0.2;"></div>';
            $('body').append(glass);
          }else{
            glass.css("z-index",zIndex);
          }

			$('body').data( 'AeroWindowMaxZIndex' , zIndex); 
		}
		
	  
      //If the window is registered, just show it and set focus ---------------     
      if ($WindowAllwaysRegistered == true) {
        Window = $(this).find(".AeroWindow");
        $(this).find(".AeroWindow").css('display', 'block'); 
        $(".AeroWindow").removeClass('active');
        if (Window.hasClass('AeroWindow')) Window.addClass('active');
        if (($('body').data('AeroWindowMaxZIndex')) == null) {
          $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
        }
        i = $('body').data('AeroWindowMaxZIndex');
        i++;
        Window.css('z-index', i);
        $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index')); 
		
		$(this).find(".table-mm-content").html(window_content);
		
        return;
      }
      return this.each(function() {
        //var o =options;
        
        //Generate the new Window ---------------------------------------------  

        //BTN --- 
        if (o.WindowMinimize) {
          if (o.WindowMaximize || o.WindowClosable) {
            var WinMinBtn = '<a href="#" class="win-min-btn"></a><div class="win-btn-spacer"></div>';
          } else {
            var WinMinBtn = '<a href="#" class="win-min-btn"></a>';
          }
        } else {
          var WinMinBtn   = '';
        }
        //BTN ---
        if (o.WindowMaximize) {
          if (o.WindowClosable) {
            var WinMaxBtn   = '<div class="WinBtnSet winmax"><a href="#" class="win-max-btn"></a><div class="win-btn-spacer"></div></div>';
            var WinRegBtn   = '<div class="WinBtnSet winreg"><a href="#" class="win-reg-btn"></a><div class="win-btn-spacer"></div></div>';
          } else {
            var WinMaxBtn   = '<div class="WinBtnSet winmax"><a href="#" class="win-max-btn"></a></div>';
            var WinRegBtn   = '<div class="WinBtnSet winreg"><a href="#" class="win-reg-btn"></a></div>';
          }
        } else {
          var WinMaxBtn   = '';
          var WinRegBtn   = '';
        }
        //BTN ---
        if (o.WindowClosable) {
          var WinCloseBtn   = '<a href="#" class="win-close-btn"></a>';
        } else {
          var WinCloseBtn   = '';
        }

        if (o.WindowMinimize || o.WindowMaximize || o.WindowClosable) {
          var WinBtnLeftedge  = '<div class="win-btn-leftedge"></div>';
          var WinBtnRightedge = '<div class="win-btn-rightedge"></div>';
        } else {
          var WinBtnLeftedge  = '';
          var WinBtnRightedge = '';
        }
		
		
		
        $(this).html(
          '<div class="AeroWindow">' +
          '  <table cellpadding="0" cellspacing="0" border="0">' +
          '    <tr>' +
          '      <td class="table-tl"></td>' +
          '      <td class="table-tm"></td>' +
          '      <td class="table-tr"></td>' +
          '    </tr>' +
          '    <tr>' +
          '      <td class="table-lm"></td>' +
          '      <td class="table-mm" align="right">' +
          '        <div class="title"><nobr>'+o.WindowTitle+'</nobr></div>' +
          '        <div class="buttons">' +
                     WinBtnLeftedge +
                     WinMinBtn +
                     WinMaxBtn +
                     WinRegBtn +
                     WinCloseBtn +
                     WinBtnRightedge +
          '        </div>' +
          '        <div class="table-mm-container" align="left">' +
          '          <div class="table-mm-content" style="width: '+o.WindowWidth+'px; height: '+o.WindowHeight+'px;">' +
                       window_content +
          '          </div>' +
          '        </div>' +
          '      </td>' +
          '      <td class="table-rm"></td>' +
          '    </tr>' +
          '    <tr>' +
          '      <td class="table-bl"></td>' +
          '      <td class="table-bm"></td>' +
          '      <td class="table-br"></td>' +
          '    </tr>' +
          '  </table>'+
          '</div>'
        );
        
        //Display hidden Containers -------------------------------------------
        $(this).css('display', 'block'); 

        //Window Objects ------------------------------------------------------
        var Window          = $(this).find(".AeroWindow");
        var WindowContainer = $(this).find(".table-mm-container");
        var WindowContent   = $(this).find(".table-mm-content");
        var BTNMin          = $(this).find(".win-min-btn");
        var BTNMax          = $(this).find(".WinBtnSet.winmax");
        var BTNReg          = $(this).find(".WinBtnSet.winreg");
        var BTNClose        = $(this).find(".win-close-btn");
    
        //Initial Configuration -----------------------------------------------
        BTNReg.css('display', 'none'); 
        FocusWindow(Window);        
        
        //Set Window Position
        if(o.WindowPositionTop == 'center') {
          o.WindowPositionTop = ($(window).height()/2) - o.WindowHeight/2 - 37;
        }
        if(o.WindowPositionLeft == 'center') {
          o.WindowPositionLeft = ($(window).width()/2) - o.WindowWidth/2 - 17;
        }

          switch (o.WindowStatus) {
            case 'regular':
              RegularWindow();
              break;
            case 'maximized':
              MaximizeWindow();
              break;
            case 'minimized':
              MinimizeWindow();
              break;
            default:
              break;
          }
        //Window Functions ----------------------------------------------------
        function MaximizeWindow() {
          WindowContainer.css('visibility', 'visible'); 
          BTNMax.css('display', 'none'); 
          BTNReg.css('display', 'block');
          WindowContent.animate({ 
            width: $(window).width()-22, //原值32
            height: $(window).height()-42}, {//原值77
            queue: false,
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          //Set new Window Position
          Window.animate({ 
            width: $(window).width(), 
            height: $(window).height(),
            top: 0, 
            left: 0}, {
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          o.WindowStatus = 'maximized';
          return(false);          
        }
        function MinimizeWindow() {
          BTNReg.css('display', 'block');
          BTNMax.css('display', 'none');
          WindowContainer.css('visibility', 'hidden'); 
          WindowContent.animate({ 
            width: o.WindowMinWidth, 
            height: o.WindowMinHeight}, {
            queue: true,
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          //Set new Window Position
          Window.animate({ 
            width: o.WindowMinWidth+22, //原值32
            height: o.WindowMinHeight+42,//原值72
            top: $(window).height()-47, //原值77
            left: 0}, {
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          o.WindowStatus = 'minimized';
          return(false);
        }
        function RegularWindow() {
          BTNMax.css('display', 'block');
          BTNReg.css('display', 'none');
          WindowContainer.css('visibility', 'visible'); 
          WindowContent.animate({ 
            width: o.WindowWidth, 
            height: o.WindowHeight}, {
            queue: false,
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          Window.animate({ 
            width: o.WindowWidth+22, //原值32
            height: o.WindowHeight+42}, {//原值72
            queue: false,
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          //Set new Window Position
          //Error handling, if the left position is negative.
          if ((typeof(o.WindowPositionLeft) == 'string') && (o.WindowPositionLeft.substring(0, 1) == '-')) o.WindowPositionLeft = 0;
          Window.animate({ 
            top: o.WindowPositionTop, 
            left: o.WindowPositionLeft}, {
            duration: o.WindowAnimationSpeed,
            easing: o.WindowAnimation
          });
          o.WindowStatus = 'regular';
          return(false);          
        }
        function FocusWindow(Window) {
          $(".AeroWindow").removeClass('active');
          if (Window.hasClass('AeroWindow')) Window.addClass('active');
          if (($('body').data('AeroWindowMaxZIndex')) == null) {
            $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
          }
          i = $('body').data('AeroWindowMaxZIndex');
          i++;
          Window.css('z-index', i);
          $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
        }
        
        //Attach user events to the Window ------------------------------------
        if (o.WindowMaximize) {
          $(this).dblclick(function() {
            switch (o.WindowStatus) {
              case 'regular':
                MaximizeWindow();
                break;
              case 'maximized':
                RegularWindow();
                break;
              case 'minimized':
                RegularWindow();
                break;
              default:
                break;
            }
          }); 
        } else {
          $(this).dblclick(function() {
            switch (o.WindowStatus) {
              case 'maximized':
                RegularWindow();
                break;
              case 'minimized':
                RegularWindow();
                break;
              default:
                break;
            }
          }); 
        }

        //User Interaction - Minimize Button
        BTNMin.click(function () {
          FocusWindow(Window);
          MinimizeWindow();
          return false;
        });
        //User Interaction - Maximize Button
        BTNMax.click(function () {
          FocusWindow(Window);
          MaximizeWindow();
          return false;
        });
        //User Interaction - Regular Button
        BTNReg.click(function () {
          FocusWindow(Window);
          RegularWindow();
          return false;
        });
        //Close Button
        BTNClose.click(function () {
          //Unregister this Window
		  //console.info(windowContainer);
		  //console.info(document.getElementById(Window.parent().attr("id")).getElementsByTagName("iframe")[0].contentWindow);
		  //console.info(WindowContent.find("iframe")[0].contentWindow);
		  //document.getElementById(Window.parent().attr("id")).getElementsByTagName("iframe")[0].contentWindow.onWindowClose();
		
		  var flag = WindowContent.find("iframe").eq(0)[0].contentWindow.onWindowClose();
		  if(flag==true){
			  //关闭窗体前，先调用窗体的onWindowClose()方法，如果该方法返回true,才真正关闭
			  
			  //判断是否需要生成遮罩层（模态窗体），删除遮罩层div
			  if(o.WindowModalDialog==true){
				$("#"+Window.parent().attr("id")+"_glass").remove();
			  }
			  
			  WindowContent.html("");//关闭窗体时删除iframe
			  Window.css('display', 'none'); 
			  return(false); 
		  }         
        });
        
        //Support Dragging ----------------------------------------------------
        if (o.WindowDraggable){
        Window.draggable({
          distance: 3, 
          cancel: ".table-mm-content",
          start: function() {
            FocusWindow(Window);
            $(".AeroWindow").find('.iframeHelper').css({'display': 'block'});
            $(".AeroWindow").removeClass('active');
            $(this).addClass('active');
            $('body').data( 'AeroWindowMaxZIndex' , $(this).css('z-index'));
          },
          drag: function() {
            WindowTop  = -1*$(this).offset().top;
            WindowLeft = -1*$(this).offset().left;
            $(this).css({backgroundPosition: WindowLeft+ 'px ' +WindowTop+ 'px'});
          },
          stop: function() {
            //alert(Window.css('top'));
            o.WindowPositionTop  = Window.css('top');
            o.WindowPositionLeft = Window.css('left');
            $(".AeroWindow").find('.iframeHelper').css({'display': 'none'});
          }
        });
      }
        
        //Support Focus on Window by Click ------------------------------------
        Window.click(function (){
          FocusWindow(Window);
        });

        //Support Window Resizing ---------------------------------------------
        if (o.WindowResizable){
          Window.resizable({
            minHeight: o.WindowMinHeight+42,//原值72
            minWidth: o.WindowMinWidth,
            alsoResize: WindowContent,
            start: function() {
              WindowContainer.css('visibility', 'visible');            
              $(".AeroWindow").find('.iframeHelper').css({'display': 'block'});
              $(".AeroWindow").removeClass('active');
              Window.addClass('active');
              if (($('body').data('AeroWindowMaxZIndex')) == null) {
                $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
              }
              i = $('body').data('AeroWindowMaxZIndex');
              i++;
              Window.css('z-index', i);
              $('body').data( 'AeroWindowMaxZIndex' , Window.css('z-index'));
            }, 
            stop: function() {
              o.WindowWidth  = WindowContent.width();
              o.WindowHeight = WindowContent.height();
              $(".AeroWindow").find('.iframeHelper').css({'display': 'none'});
            }
          });
        }
      });
    }
  });
})(jQuery);

function apiOpenWindow(windowId){
	
	var win = $("#"+windowId);
    if(!win[0]) alert("Window is not found! id: "+windowId);
	win.AeroWindow({
		WindowTitle:          win.attr("title")		|| null,
		WindowPositionTop:    win.attr("top")		|| 60,            /* Posible are pixels or 'center' */
		WindowPositionLeft:   win.attr("left")		|| 10,            /* Posible are pixels or 'center' */
		WindowWidth:          win.attr("width")		|| 400,           /* Only pixels */
		WindowHeight:         win.attr("height")	|| 300,           /* Only pixels */
		WindowMinWidth:       win.attr("minWidth") 	|| 250,           /* Only pixels */
		WindowMinHeight:      win.attr("minHeight")	|| 0,             /* Only pixels */
		WindowResizable:      win.attr("resizable")	|| true,          /* 是否可控制大小 */
		WindowMaximize:       win.attr("maximize")	|| true,          /* 是否可最大化 */
		WindowMinimize:       win.attr("minimize")	|| true,          /* 是否可最小化 */
		WindowClosable:       win.attr("closable")	|| true,          /* 是否可关闭 */
		WindowDraggable:      win.attr("draggable")	|| true,          /* 是否可拖拽 */
		WindowStatus:         win.attr("status")	|| 'regular',     /* 初始状态 'regular', 'maximized', 'minimized' */
		//WindowAnimationSpeed: 500,									  /* 动画速度 */
		WindowAnimation:      'easeOutCubic',
		WindowUrl:				win.attr("url")		|| null,          /* 窗体url */
		WindowModalDialog:    win.attr("modal")		|| true           /*是否模态，此值决定是否生成遮罩层，挡住背面元素禁止点击*/
	});
	
}
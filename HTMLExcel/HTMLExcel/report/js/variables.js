/***
 * 报表全局变量文件
 * 2014-8-19
 * 陈建宇
 * thejava@163.com
 */





var cell_width = 99;//px，初始化单元格宽度

var current_sheet = null;//当前页表

var current_cell = null;//当前被选中的单元格

var current_icon_button = null;//当前获得焦点的icon图标

var current_mousedown_cell = null;//当前鼠标按下的单元格
var current_mouseup_cell = null;//当前鼠标放开的单元格
var current_mouseover_cell = null;//当前鼠标放开的单元格

var current_selected_cells_border_width = null;//当前选中的单元格区域的边框宽度
var current_selected_cells_border_height = null;//当前选中的单元格区域的边框高度

var is_mousedown = false;//鼠标是否处于按下状态

var cell_map = new hashMap();//单元格映射表，单元格坐标为key单元格DOM本身为value

var action = null;//当前操作动作

var keyword_cell_map = new hashMap();//关键字单元格映射表，关键字为key单元格本身为value，一个关键字类别在一个报表中只能有一个，用于设置和还原单元格属性样式(切换、取消关键字等)。
var fx_cell_map = new hashMap();//公式单元格映射表，为单元格定义公式后，向此映射表添加一项，用于格式、数据切换时遍历此表并计算单元格结果。单元格id为key，公式为value


var temp_fx_cells_map = new hashMap();//当前设置（修改）了公式的单元格，用于将报表切换到数据模式时不计算全表，仅计算修改过公式的单元格操作时做参考。

var showbox_focus_state = false;//showbox焦点状态，用于解决在焦点状态点单元格失去前率先触发单元格的onmousedown赋值冲突问题

var report_case = null;//报表情形，new：新建，queried：查询的。保存报表时程序将根据这个状态判断是直接保存还是弹出另存为窗。新建报表时，如果只为queried，则提示是否保存当前报表
var current_queried_report = null;//当前查询显示的报表对象。

var show_jAlert = true;//是否弹出jalert。在有些时候保存需要提示保存成功，有些情况不需要弹出。

var isReportWindowClosing = false;//是否报表正在关闭。用于关闭报表时弹出保存提示并在执行后自动关闭报表判断。

var contentChanged = false;//内容是否发生改变，主要用于保存提示。

var newReportAction = false;//新建报表弹出当前报表保存提示时，如果保存，在保存后需要弹出新建窗，此变量用于保存方法判断是否弹出新建报表窗。
var openReportAction = false;//打开报表弹出当前报表保存提示时，如果保存，在保存后需要弹出打开窗，此变量用于保存方法判断是否弹出打开报表窗。

var reportTemplateUpdate = false;//报表应用场景，是报表模板维护还是制作报表。

var calculateStatus = "calculating";//是否处于计算中，由于计算表时，采用异步调用setTimeout方式，在一些处理方法中必须要等到算出结果才能继续，所以，必须异步的循环判断该变量值，确保异计算完成，参考值：(calculating=计算中,calculated=计算结束)。

var formula_value_map = new hashMap();//单元格公式计算结果map，用于避免同一个公式重复请求后台计算，计算公式前先从map中取，如果有则直接使用值，没有才请求后台。


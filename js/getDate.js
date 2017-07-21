function initialPicker(startID,endID){
    $(startID).datetimepicker({
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        todayBtn:  1,
        autoclose: true,
    });
    $(endID).datetimepicker({
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        todayBtn:  1,
        autoclose: true,
    });
}
function getDate(startID,endID){
    var startDateValue = startID.value;
    var endDateValue = endID.value;
    var result = new Array(startDateValue,endDateValue);
    return result;
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function getMonth1stFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    //if (strDate >= 0 && strDate <= 9) {
    //    strDate = "0" + strDate;
    //}
    strDate = "01";
    var month1stDate = year + seperator1 + month + seperator1 + strDate;
    return month1stDate;
}

//window.onload加载多个函数
function addLoadEvent(func) {
  var oldonload = window.onload;//得到上一个onload事件的函数
  if (typeof window.onload != 'function') {//判断类型是否为'function',注意typeof返回的是字符串
    window.onload = func;
  } else {  
    window.onload = function() {
      oldonload();//调用之前覆盖的onload事件的函数---->由于我对js了解不多,这里我暂时理解为通过覆盖onload事件的函数来实现加载多个函数
      func();//调用当前事件函数
    }
  }
}

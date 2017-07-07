var TWpage = 1,
    TWdataSource = [],
    TWdataTitle = [],
    doc = document,
	TWurlStartTime = "2010-01-01",
    TWurlEndTime = currentDate,
    TWurl = "http://123.206.134.34:8080/Medicals_temp/reportform/tiwei?page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime,
    TWstartDate = doc.getElementById("SSTWstartTime"),
    TWendDate = doc.getElementById("SSTWendTime"),
    TWsubmitDate = doc.getElementById("SSTWsubmitTime");
    TWexport = doc.getElementById("SSTWexport");

$.ajax({
    type: "get",
    url: TWurl,
    dataType: "json",
    jsonp:"callback",
    success: function (data) {
        TWdataSource = data.data;
        TWdataTitle = data.header;
        //console.log(TWdataSource);
        insertTWTable();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    }
});
function insertTWTable(){
    //创建表格
    var table = doc.getElementById("TW_table");
    var thead = doc.getElementById("TW_table_head");
    table.innerHTML = '';
    thead.innerHTML = '';
    //单独添加表头
    for(var t=0;t<TWdataTitle.length;t++){
        var th = doc.createElement("th"),
            thData = doc.createTextNode(TWdataTitle[t]);
        th.appendChild(thData);
        if(t==0){
            th.style.width = '40%';
        }else{
            th.style.width = '10%';
        }
        thead.appendChild(th);
    }
    for(var i=0;i<TWdataSource.length;i++){
        var tr = doc.createElement("tr");
        for(var j=0;j<TWdataSource[i].length;j++){
            if(j !== 0){
                var data = doc.createTextNode(TWdataSource[i][j]),
                    a = doc.createElement("a"),
                    td = doc.createElement("td");
                a.setAttribute("tabindex","0");
                a.setAttribute("role","button");
                a.setAttribute("data-toggle","popover");
                a.setAttribute("data-trigger","focus");
                a.setAttribute("data-placement","left");
                //a.setAttribute("data-content",TWdataSource[i][j]);
                a.department = TWdataSource[i][0];
                a.position = TWdataTitle[j];
                a.onclick = function(){
                    var result;
                    $("[data-toggle='popover']").popover({
                        html:true,
                        content:'<div id="content">loading...</div>'
                    });
                    $.ajax({
                        type: "get",
                        url: "http://123.206.134.34:8080/Medicals_temp/reportform/tiweiQuery?department="+this.department+"&position="+this.position+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime,
                        dataType: "json",
                        jsonp:"callback",
                        success: function (data) {
                            var result = data.data;
                            var title = data.header;
                            var table2 = doc.createElement("table");
                            insertTWSubTable(result,title,table2);
                            $('#content').html(table2);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        }
                    });
                }
                a.appendChild(data);
                td.appendChild(a);
            }
            else{
                var data = doc.createTextNode(TWdataSource[i][j]);
                var td = doc.createElement("td");
                td.title = TWdataSource[i][j];
                td.appendChild(data);
            }
            if(j==0){
                td.style.width = '40%';
            }else{
                td.style.width = '10%';
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function insertTWSubTable(result,title,table){
    for(var t=0;t<title.length;t++) {
        var th = doc.createElement("th"),
            thData = doc.createTextNode(title[t]);
        th.appendChild(thData);
        th.style.width = "200px";
        table.appendChild(th);
    }
    for(var i=0;i<result.length;i++) {
        var tr = doc.createElement("tr");
        for (var j = 0; j < result[i].length; j++) {
            var td = doc.createElement("td");
            var insertData = doc.createTextNode(result[i][j]);
            td.appendChild(insertData);
            td.style.width = "200px";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

//分页
var TWPageBefore = doc.getElementById("TWPageBefore"),
    TWPageNext = doc.getElementById("TWPageNext"),
    TWPageNum = doc.getElementById("TWPageNum");

TWPageBefore.onclick = function(){
    if(TWpage==1){alert("已经是第一页");}
    else{
        TWpage --;
        //console.log(TWpage);
        var url2 = "http://123.206.134.34:8080/Medicals_temp/reportform/tiwei?page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                TWdataSource = data.data;
                TWdataTitle = data.header;
                TWPageNum.placeholder = TWpage;
                insertTWTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
TWPageNext.onclick = function(){
    TWpage ++;
    var url2 = "http://123.206.134.34:8080/Medicals_temp/reportform/tiwei?page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
    //console.log(TWpage);
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            TWdataSource = data.data;
            TWdataTitle = data.header;
            TWPageNum.placeholder = TWpage;
            insertTWTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//设定时间
TWsubmitDate.onclick = function () {
    getDate(TWstartDate,TWendDate);
    TWurlStartTime = getDate(TWstartDate,TWendDate)[0],
    TWurlEndTime = getDate(TWstartDate,TWendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_temp/reportform/tiwei?page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            TWdataSource = data.data;
            TWdataTitle = data.header;
            //console.log(SMdataSource);
            insertTWTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

TWexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_temp/export/tiwei?&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
}

addLoadEvent(initialPicker(TWstartDate,TWendDate));
var MZXGpage = 1,
    MZXGdataSource = [],
    MZXGdataTitle = [],
    doc = document,
	MZXGurlStartTime = "2010-01-01",
    MZXGurlEndTime = currentDate,
    MZXGurl = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime,
    MZXGstartDate = doc.getElementById("MZXGstartTime"),
    MZXGendDate = doc.getElementById("MZXGendTime"),
    MZXGsubmitDate = doc.getElementById("MZXGsubmitTime");
    MZXGexport = doc.getElementById("MZXGexport");

$.ajax({
    type: "get",
    url: MZXGurl,
    dataType: "json",
    jsonp:"callback",
    success: function (data) {
        MZXGdataSource = data.data;
        MZXGdataTitle = data.header;
		createMZXGtable();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    }
});
function createMZXGtable(){
    //创建表格
    var table = doc.getElementById("MZXG_table");
    var thead = doc.getElementById("MZXG_table_head");
    table.innerHTML = '';
    thead.innerHTML = '';
    //单独添加表头
    for(var t=0;t<MZXGdataTitle.length;t++){
        var th = doc.createElement("th"),
            thData = doc.createTextNode(MZXGdataTitle[t]);
        th.appendChild(thData);
        if(t==0){
            th.style.width = '40%';
        }else{
            th.style.width = '15%';
        }
        thead.appendChild(th);
    }
    for(var i=0;i<MZXGdataSource.length;i++){
        var tr = doc.createElement("tr");
        for(var j=0;j<MZXGdataSource[i].length;j++){
            if(j !== 0){
                var data = doc.createTextNode(MZXGdataSource[i][j]),
                    a = doc.createElement("a"),
                    td = doc.createElement("td");
                a.setAttribute("tabindex","0");
                a.setAttribute("role","button");
                a.setAttribute("data-toggle","popover");
                a.setAttribute("data-trigger","focus");
                a.setAttribute("data-placement","left");
                //a.setAttribute("data-content",MZXGdataSource[i][j]);
                a.department = MZXGdataSource[i][0];
                a.effect = MZXGdataTitle[j];
                a.onclick = function(){
                    var result;
                    $("[data-toggle='popover']").popover({
                        html:true,
                        content:'<div id="content">loading...</div>'
                    });
                    $.ajax({
                        type: "get",
                        url: "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguoQuery?department="+this.department+"&effect="+this.effect+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime,
                        dataType: "json",
                        jsonp:"callback",
                        success: function (data) {
                            var result = data.data;
                            var title = data.header;
                            var table2 = doc.createElement("table");
                            createMZXGSubTable(result,title,table2);
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
                var data = doc.createTextNode(MZXGdataSource[i][j]);
                var td = doc.createElement("td");
                td.title = MZXGdataSource[i][j];
                td.appendChild(data);
            }
            if(j==0){
                td.style.width = '40%';
            }else{
                td.style.width = '15%';
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function createMZXGSubTable(result,title,table){
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
var MZXGPageBefore = doc.getElementById("MZXGPageBefore"),
    MZXGPageNext = doc.getElementById("MZXGPageNext"),
    MZXGPageNum = doc.getElementById("MZXGPageNum");

MZXGPageBefore.onclick = function(){
    if(MZXGpage==1){alert("已经是第一页");}
    else{
        MZXGpage --;
        //console.log(MZXGpage);
        var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                MZXGdataSource = data.data;
                MZXGdataTitle = data.header;
                MZXGPageNum.placeholder = MZXGpage;
                createMZXGtable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
MZXGPageNext.onclick = function(){
    MZXGpage ++;
    var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
    //console.log(MZXGpage);
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZXGdataSource = data.data;
            MZXGdataTitle = data.header;
            MZXGPageNum.placeholder = MZXGpage;
            createMZXGtable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//设定时间
MZXGsubmitDate.onclick = function () {
    getDate(MZXGstartDate,MZXGendDate);
    MZXGurlStartTime = getDate(MZXGstartDate,MZXGendDate)[0],
    MZXGurlEndTime = getDate(MZXGstartDate,MZXGendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZXGdataSource = data.data;
            MZXGdataTitle = data.header;
            createMZXGtable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

MZXGexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuixiaoguo?&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
}

addLoadEvent(initialPicker(MZXGstartDate,MZXGendDate));
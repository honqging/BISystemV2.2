﻿var MZXGTotal = doc.getElementById("MZXGTotal"),
    MZXGTotalPage = 0,
    MZXGnumPerPage = doc.getElementById("MZXGnumPerPage"),
    MZXGnumPer = 20,
    MZXGassignPage = doc.getElementById("MZXGassignPage"),
    MZXGconfirm = doc.getElementById("MZXGconfirm");

var MZXGpage = 1,
    MZXGdataSource = [],
    MZXGdataTitle = [],
    doc = document,
	//MZXGurlStartTime = "2010-01-01",
    MZXGurlStartTime = month1stDate,
    MZXGurlEndTime = currentDate,
    MZXGurl = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?rowCount="+ MZXGnumPer +"&page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime,
    MZXGstartDate = doc.getElementById("MZXGstartTime"),
    MZXGendDate = doc.getElementById("MZXGendTime"),
    MZXGsubmitDate = doc.getElementById("MZXGsubmitTime");
    MZXGexport = doc.getElementById("MZXGexport");

var pageD = 1,
    totalPageD = 0;

MZXGstartDate.value = month1stDate;
MZXGendDate.value = currentDate;

var MZXGTopList = new Array();

$.ajax({
    type: "get",
    url: MZXGurl,
    dataType: "json",
    jsonp:"callback",
    success: function (data) {
        MZXGdataSource = data.data;
        MZXGdataTitle = data.header;
        MZXGTotalPage = data.pageCount;

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
    var top = doc.getElementById('MZXG_table_top');
    if(MZXGpage != 1){
        top.style.display = 'none';
    }else{
        top.style.display = 'block';
    }
    var td = doc.createElement('td'),
        span = doc.createElement('span');
    span.innerHTML = '🔝';
    td.appendChild(span);
    td.style.width = '2%';
    td.style.padding = '8px';
    thead.appendChild(td);

    for(var t=0;t<MZXGdataTitle.length;t++){
        var th = doc.createElement("th"),
            thData = doc.createTextNode(MZXGdataTitle[t]);
        th.appendChild(thData);
        if(t==0){
            th.style.width = '38%';
        }else{
            th.style.width = '15%';
        }
        thead.appendChild(th);
    }
    for(var i=0;i<MZXGdataSource.length;i++){
        var tr = doc.createElement("tr");

        var td = doc.createElement('td'),
            span = doc.createElement('span');
        span.innerHTML = '🔝';
        td.appendChild(span);
        td.style.width = '2%';
        tr.appendChild(td);
        tr.onclick = function(){
            $(this).find('span').css('visibility', 'visible');
        };



        var tdIndexTemp = (MZXGpage-1) * MZXGnumPer + i + 1;
        if(MZXGTopList.indexOf(tdIndexTemp) != -1){
            $(td).find('span').css('background-color', 'yellow');
            $(td).find('span').css('visibility', 'visible');
        }
        //var param = { i: i, page: SSHDpage, numPer: SSHDnumPer };
        var param = { tdIndexTemp: tdIndexTemp };
        $(span).click(param, function(event){
            //var ii = event.data.i,
            //    pp = event.data.page,
            //    np = event.data.numPer;
            //var tdIndex = (pp-1) * np + ii + 1;
            var tdIndex = event.data.tdIndexTemp;
            //console.log('tdIndex', tdIndex, SSHDTopList.indexOf(tdIndex));

            if(MZXGTopList.indexOf(tdIndex) == -1){
                $('#MZXG_table_top').prepend($(this).parent().parent().clone(true));
                $(this).css('background-color', 'yellow');
                //$(this).css('visibility', 'hidden');

                alert('成功置顶');
                MZXGTopList.push(tdIndex);
            }else{
                alert('该项已置顶');
            }
        });

        for(var j=0;j<MZXGdataSource[i].length;j++){
            if(j !== 0){
                var data = doc.createTextNode(MZXGdataSource[i][j]),
                    a = doc.createElement("a"),
                    td = doc.createElement("td");
                a.setAttribute("role","button");
                a.setAttribute("data-toggle","modal");
                a.setAttribute("data-target","#MZXGD");
                //a.setAttribute("data-content",MZXGdataSource[i][j]);
                a.department = MZXGdataSource[i][0];
                a.effect = MZXGdataTitle[j];
                var param = { department: a.department, effect: a.effect };
                $(a).click(param, function(event){
                    var department = event.data.department,
                        effect = event.data.effect;

                    pageD = 1;
                    totalPageD = 0;
                    //console.log(pageD, 'pageDDDD');
                    doc.getElementById('MZXGTotalD').innerHTML = '';
                    doc.getElementById('MZXGassignPageD').value = '';
                    doc.getElementById('MZXGpageNumD').placeholder = 1;

                    $('#MZXGDTable').html('loading...');
                    displayDetail(department, effect);

                    doc.getElementById('MZXGpageBeforeD').onclick = function(){
                        if(pageD == 1){
                            alert('已经是第一页');
                        }else{
                            doc.getElementById('MZXGpageNumD').placeholder = --pageD;
                            displayDetail(department, effect);
                        }
                    };

                    doc.getElementById('MZXGpageNextD').onclick = function(){
                        if(pageD >= totalPageD){
                            alert('已经是最后一页');
                        }else{
                            //console.log('pageD', pageD, totalPageD);
                            pageD++;
                            doc.getElementById('MZXGpageNumD').placeholder = pageD;
                            displayDetail(department, effect);
                            //console.log('pageD2', pageD, totalPageD);

                        }
                    };

                    doc.getElementById('MZXGconfirmD').onclick = function(){
                        var tempPage = pageD;
                        pageD = parseFloat(doc.getElementById('MZXGassignPageD').value);
                        if(isInteger(pageD)){
                            if(pageD <= totalPageD){
                                doc.getElementById('MZXGpageNumD').placeholder = pageD;
                                displayDetail(department, effect);
                            }else{
                                pageD = tempPage;
                                alert('超出页数上限，请重新选择页数');
                                doc.getElementById('MZXGassignPageD').value = '';
                            }
                        }else{
                            alert('请输入正整数！')
                        }
                    };

                    function displayDetail(department, effect){
                        $.ajax({
                            type: "get",
                            url: "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguoQuery?rowCount="+ MZXGnumPer +"&page="+ pageD +"&department="+department+"&effect="+effect+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime,
                            dataType: "json",
                            jsonp:"callback",
                            success: function (data) {
                                var result = data.data;
                                var title = data.header;
                                totalPageD = data.pageCount;
                                var table2 = doc.getElementById("MZXGDTable");
                                table2.innerHTML = '';
                                doc.getElementById('MZXGTotalD').innerHTML = totalPageD;
                                createMZXGSubTable(result,title,table2);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            }
                        });
                    }
                });
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
                td.style.width = '38%';
            }else{
                td.style.width = '15%';
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    MZXGTotal.innerHTML = MZXGTotalPage;
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
        var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?rowCount="+ MZXGnumPer +"&page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                MZXGdataSource = data.data;
                MZXGdataTitle = data.header;
                MZXGTotalPage = data.pageCount;

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
    var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?rowCount="+ MZXGnumPer +"&page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
    //console.log(MZXGpage);
    if(MZXGpage > MZXGTotalPage){
        MZXGpage --;
        alert('已经是最后一页');
    }else {
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp: "callback",
            success: function (data) {
                MZXGdataSource = data.data;
                MZXGdataTitle = data.header;
                MZXGTotalPage = data.pageCount;

                MZXGPageNum.placeholder = MZXGpage;
                createMZXGtable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}

//设定时间
MZXGsubmitDate.onclick = function () {
    getDate(MZXGstartDate,MZXGendDate);
    MZXGurlStartTime = getDate(MZXGstartDate,MZXGendDate)[0],
    MZXGurlEndTime = getDate(MZXGstartDate,MZXGendDate)[1];
    MZXGpage = 1;
    var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?rowCount="+ MZXGnumPer +"&page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZXGdataSource = data.data;
            MZXGdataTitle = data.header;
            MZXGTotalPage = data.pageCount;

            doc.getElementById('MZXG_table_top').innerHTML = '';
            MZXGPageNum.placeholder = 1;
            MZXGTopList.length = 0;
            createMZXGtable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

MZXGconfirm.onclick = function(){
    tempPage = MZXGpage;
    MZXGpage = parseFloat(MZXGassignPage.value);
    if(isInteger(MZXGpage)){
        console.log(MZXGpage);
        if(MZXGpage <= MZXGTotalPage){
            var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?rowCount="+ MZXGnumPer +"&page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
            console.log(url2);
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp:"callback",
                success: function (data) {
                    MZXGdataSource = data.data;
                    MZXGdataTitle = data.header;
                    MZXGTotalPage = data.pageCount;
                    MZXGPageNum.placeholder = MZXGpage;
                    createMZXGtable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }else{
            MZXGpage = tempPage;
            alert('超出页数上限，请重新选择页数');
        }
    }else{
        alert('请输入正整数！')
    }
}

MZXGnumPerPage.onchange = function(){
    var tempPer = MZXGnumPer,
        tempTotalPage = MZXGTotalPage,
        tempSelected = MZXGnumPer;
    var p1 = $(this).children('option:selected').val();//这就是selected的值
    MZXGnumPer = p1;
    var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuixiaoguo?rowCount="+ MZXGnumPer +"&page="+MZXGpage+"&startTime="+MZXGurlStartTime+"&endTime="+MZXGurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZXGdataSource = data.data;
            MZXGdataTitle = data.header;
            MZXGTotalPage = data.pageCount;

            if(MZXGTotalPage < MZXGpage){
                alert('超出数据量上限，请重新选择页数或者每页数据条数');
                MZXGnumPer = tempPer;
                MZXGTotalPage = tempTotalPage;
                for(var i = 0; i < MZXGnumPerPage.options.length; i++){
                    if(MZXGnumPerPage.options[i].innerHTML == tempSelected){
                        MZXGnumPerPage.options[i].selected = true;
                        break;
                    }
                }
            }else{
                createMZXGtable();
            }
            console.log(url2);
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

var TWTotal = doc.getElementById("TWTotal"),
    TWTotalPage = 0,
    TWnumPerPage = doc.getElementById("TWnumPerPage"),
    TWnumPer = 20,
    TWassignPage = doc.getElementById("TWassignPage"),
    TWconfirm = doc.getElementById("TWconfirm");

var TWpage = 1,
    TWdataSource = [],
    TWdataTitle = [],
    doc = document,
	//TWurlStartTime = "2010-01-01",
    TWurlStartTime = month1stDate,
    TWurlEndTime = currentDate,
    TWurl = "http://123.206.134.34:8080/Medicals_war/reportform/tiwei?rowCount="+ TWnumPer +"&page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime,
    TWstartDate = doc.getElementById("SSTWstartTime"),
    TWendDate = doc.getElementById("SSTWendTime"),
    TWsubmitDate = doc.getElementById("SSTWsubmitTime");
    TWexport = doc.getElementById("SSTWexport");

var pageD = 1,
    totalPageD = 0;

TWstartDate.value = month1stDate;
TWendDate.value = currentDate;

$.ajax({
    type: "get",
    url: TWurl,
    dataType: "json",
    jsonp:"callback",
    success: function (data) {
        TWdataSource = data.data;
        TWdataTitle = data.header;
        TWTotalPage = data.pageCount;
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
                a.setAttribute("role","button");
                a.setAttribute("data-toggle","modal");
                a.setAttribute("data-target","#TWD");
                //a.setAttribute("data-content",TWdataSource[i][j]);
                a.department = TWdataSource[i][0];
                a.position = TWdataTitle[j];
                a.onclick = function(){
                    var department = this.department,
                        position = this.position;

                    pageD = 1;
                    totalPageD = 0;
                    //console.log(pageD, 'pageDDDD');
                    doc.getElementById('TWTotalD').innerHTML = '';
                    doc.getElementById('TWassignPageD').value = '';
                    doc.getElementById('TWpageNumD').placeholder = 1;

                    $('#TWDTable').html('loading...');
                    $('#TWassignPageD').html('');
                    displayDetail(department, position)

                    doc.getElementById('TWpageBeforeD').onclick = function(){
                        if(pageD == 1){
                            alert('已经是第一页');
                        }else{
                            doc.getElementById('TWpageNumD').placeholder = --pageD;
                            displayDetail(department, position)
                        }
                    };

                    doc.getElementById('TWpageNextD').onclick = function(){
                        if(pageD >= totalPageD){
                            alert('已经是最后一页');
                        }else{
                            //console.log('pageD', pageD, totalPageD);
                            pageD++;
                            doc.getElementById('TWpageNumD').placeholder = pageD;
                            displayDetail(department, position)
                            //console.log('pageD2', pageD, totalPageD);

                        }
                    };

                    doc.getElementById('TWconfirmD').onclick = function(){
                        var tempPage = pageD;
                        pageD = parseFloat(doc.getElementById('TWassignPageD').value);
                        if(isInteger(pageD)){
                            if(pageD <= totalPageD){
                                doc.getElementById('TWpageNumD').placeholder = pageD;
                                displayDetail(department, position)
                            }else{
                                pageD = tempPage;
                                alert('超出页数上限，请重新选择页数');
                                doc.getElementById('TWassignPageD').value = '';
                            }
                        }else{
                            alert('请输入正整数！')
                        }
                    };

                    function displayDetail(department, position){
                        $.ajax({
                            type: "get",
                            url: "http://123.206.134.34:8080/Medicals_war/reportform/tiweiQuery?rowCount="+ 20 +"&page="+ pageD +"&department="+department+"&position="+position+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime,
                            dataType: "json",
                            jsonp:"callback",
                            success: function (data) {
                                var result = data.data;
                                var title = data.header;
                                totalPageD = data.pageCount;
                                var table2 = doc.getElementById("TWDTable");
                                table2.innerHTML = '';
                                doc.getElementById('TWTotalD').innerHTML = totalPageD;
                                insertTWSubTable(result,title,table2);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            }
                        });
                    }
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

    TWTotal.innerHTML = TWTotalPage;
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
        var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/tiwei?rowCount="+ TWnumPer +"&page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                TWdataSource = data.data;
                TWdataTitle = data.header;
                TWTotalPage = data.pageCount;

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
    var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/tiwei?rowCount="+ TWnumPer +"&page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
    //console.log(TWpage);
    if(TWpage > TWTotalPage){
        TWpage --;
        alert('已经是最后一页');
    }else{
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                TWdataSource = data.data;
                TWdataTitle = data.header;
                TWTotalPage = data.pageCount;

                TWPageNum.placeholder = TWpage;
                insertTWTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}

//设定时间
TWsubmitDate.onclick = function () {
    getDate(TWstartDate,TWendDate);
    TWurlStartTime = getDate(TWstartDate,TWendDate)[0],
    TWurlEndTime = getDate(TWstartDate,TWendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/tiwei?rowCount="+ TWnumPer +"&page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            TWdataSource = data.data;
            TWdataTitle = data.header;
            TWTotalPage = data.pageCount;

            //console.log(TWdataSource);
            insertTWTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

TWconfirm.onclick = function(){
    tempPage = TWpage;
    TWpage = parseFloat(TWassignPage.value);
    if(isInteger(TWpage)){
        console.log(TWpage);
        if(TWpage <= TWTotalPage){
            var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/tiwei?rowCount="+ TWnumPer +"&page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
            console.log(url2);
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp:"callback",
                success: function (data) {
                    TWdataSource = data.data;
                    TWdataTitle = data.header;
                    TWTotalPage = data.pageCount;
                    TWPageNum.placeholder = TWpage;
                    insertTWTable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }else{
            TWpage = tempPage;
            alert('超出页数上限，请重新选择页数');
        }
    }else{
        alert('请输入正整数！')
    }
}

TWnumPerPage.onchange = function(){
    var tempPer = TWnumPer,
        tempTotalPage = TWTotalPage,
        tempSelected = TWnumPer;
    var p1 = $(this).children('option:selected').val();//这就是selected的值
    TWnumPer = p1;
    var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/tiwei?rowCount="+ TWnumPer +"&page="+TWpage+"&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            TWdataSource = data.data;
            TWdataTitle = data.header;
            TWTotalPage = data.pageCount;

            if(TWTotalPage < TWpage){
                alert('超出数据量上限，请重新选择页数或者每页数据条数');
                TWnumPer = tempPer;
                TWTotalPage = tempTotalPage;
                for(var i = 0; i < TWnumPerPage.options.length; i++){
                    if(TWnumPerPage.options[i].innerHTML == tempSelected){
                        TWnumPerPage.options[i].selected = true;
                        break;
                    }
                }
            }else{
                insertTWTable();
            }
            console.log(url2);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

TWexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/tiwei?&startTime="+TWurlStartTime+"&endTime="+TWurlEndTime;
}

addLoadEvent(initialPicker(TWstartDate,TWendDate));

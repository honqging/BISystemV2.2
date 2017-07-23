var MZFFTotal = doc.getElementById("MZFFTotal"),
    MZFFTotalPage = 0,
    MZFFnumPerPage = doc.getElementById("MZFFnumPerPage"),
    MZFFnumPer = 20,
    MZFFassignPage = doc.getElementById("MZFFassignPage"),
    MZFFconfirm = doc.getElementById("MZFFconfirm");

var MZFSpage = 1,
    MZFSdataSource = [],
    MZFSdataTitle = [],
    doc = document,
	//MZFSurlStartTime = "2010-01-01",
    MZFSurlStartTime = month1stDate
    MZFSurlEndTime = currentDate,
    MZFSurl = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?rowCount="+ MZFFnumPer +"&page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime,
    MZFSstartDate = doc.getElementById("MZFSstartTime"),
    MZFSendDate = doc.getElementById("MZFSGendTime"),
    MZFSsubmitDate = doc.getElementById("MZFSsubmitTime");
    MZFSexport = doc.getElementById("MZFSexport");

MZFSstartDate.value = month1stDate;
MZFSendDate.value = currentDate;

$.ajax({
    type: "get",
    url: MZFSurl,
    dataType: "json",
    jsonp:"callback",
    success: function (data) {
        MZFSdataSource = data.data;
        MZFSdataTitle = data.header;
        MZFFTotalPage = data.pageCount;

        insertMZXGTable();
		//test();
        //addLinkClick();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    }
});

function insertMZXGTable(){
    //var table = doc.getElementById("MZFS_table");
    var thead = doc.getElementById("MZFS_table_head");

    var divAccordion = doc.getElementById("accordion");

    //table.innerHTML = "";
    thead.innerHTML = "";
    divAccordion.innerHTML = "";

    // 插入表头
    for(var t=0;t<MZFSdataTitle.length;t++){
        var th = doc.createElement("th"),
            thData = doc.createTextNode(MZFSdataTitle[t]);
        th.appendChild(thData);
        th.style.width = '50%';
        thead.appendChild(th);
    }

    // 插入数据
    for(var i=1;i<MZFSdataSource.length;i++){
        // Bootstrap collapse plugin
        var div1 = doc.createElement("div"),
            div21 = doc.createElement("div"),
            div22 = doc.createElement("div"),
            div3 = doc.createElement("div"),
            divh4 = doc.createElement("h4"),
            table21 = doc.createElement("table"),
            table22 = doc.createElement("table");

        // bootstrap div adds class
        divh4.setAttribute("class", "panel-title");
        div21.setAttribute("class", "panel-heading");
        div1.setAttribute("class", "panel panel-default");
        div3.setAttribute("class", "panel-body");
        div22.setAttribute("class", "panel-collapse collapse");

        div22.id = "collapse" + i;
        table21.id = "table21";
        table22.id = "table22";



        //var tr1 = doc.createElement("tr");
        var data1 = doc.createTextNode(MZFSdataSource[i].groupName),
            a0 = doc.createElement("a"),
            td1 = doc.createElement("td");
        a0.setAttribute("data-toggle", "collapse");
        a0.setAttribute("data-parent", "#accordion");
        var a0Href = "#collapse" + i;
        a0.setAttribute("href", a0Href);
        a0.appendChild(data1);
        a0.style.fontWeight = 'normal';
        a0.id = "a0";
        td1.appendChild(a0);

        //var xx = doc.getElementById(a0Href);
        //$(a0Href).collapse("hide");

        var data2 = doc.createTextNode(MZFSdataSource[i].sum),
            a = doc.createElement("a"),
            td2 = doc.createElement("td");
        a.setAttribute("role","button");
        a.setAttribute("data-toggle","modal");
        a.setAttribute("data-target","#MZFFD");
        a.id = MZFSdataSource[i].groupName;
        a.onclick = function(){
            var idd = this.id;

            pageD = 1;
            totalPageD = 0;
            //console.log(pageD, 'pageDDDD');
            doc.getElementById('MZFFTotalD').innerHTML = '';
            doc.getElementById('MZFFassignPageD').value = '';
            doc.getElementById('MZFFpageNumD').placeholder = 1;

            $('#MZFFDTable').html('loading...');
            displayDetail(idd);

            doc.getElementById('MZFFpageBeforeD').onclick = function(){
                if(pageD == 1){
                    alert('已经是第一页');
                }else{
                    doc.getElementById('MZFFpageNumD').placeholder = --pageD;
                    displayDetail(idd);
                }
            };

            doc.getElementById('MZFFpageNextD').onclick = function(){
                if(pageD >= totalPageD){
                    alert('已经是最后一页');
                }else{
                    //console.log('pageD', pageD, totalPageD);
                    pageD++;
                    doc.getElementById('MZFFpageNumD').placeholder = pageD;
                    displayDetail(idd);
                    //console.log('pageD2', pageD, totalPageD);

                }
            };

            doc.getElementById('MZFFconfirmD').onclick = function(){
                var tempPage = pageD;
                pageD = parseFloat(doc.getElementById('MZFFassignPageD').value);
                if(isInteger(pageD)){
                    if(pageD <= totalPageD){
                        doc.getElementById('MZFFpageNumD').placeholder = pageD;
                        displayDetail(idd);
                    }else{
                        pageD = tempPage;
                        alert('超出页数上限，请重新选择页数');
                        doc.getElementById('MZFFassignPageD').value = '';
                    }
                }else{
                    alert('请输入正整数！')
                }
            };

            function displayDetail(idd){
                $.ajax({
                    type: "get",
                    url: "http://123.206.134.34:8080/Medicals_war/reportform/genggaiDepartmentQuery?rowCount="+ 20 +"&page="+ pageD +"&department="+idd+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime,
                    dataType: "json",
                    jsonp:"callback",
                    success: function (data) {
                        var result = data.data;
                        var title = data.header;
                        totalPageD = data.pageCount;
                        var table2 = doc.getElementById("MZFFDTable");
                        table2.innerHTML = '';
                        doc.getElementById('MZFFTotalD').innerHTML = totalPageD;
                        insertLCLJGGSubTable(result,title,table2);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
            }

        }


        a.appendChild(data2);
        td2.appendChild(a);
        table21.appendChild(td1);
        table21.appendChild(td2);
        //table21.appendChild(tr1);
        divh4.appendChild(table21);
        div21.appendChild(divh4);

        // 插入子表table22
        for(var k=0; k<MZFSdataSource[i].groupRows.length; k++){
            var tr2 = doc.createElement("tr");
            var data3 = doc.createTextNode(MZFSdataSource[i].groupRows[k][0]),
                td3 = doc.createElement("td");
            td3.appendChild(data3);
            var data4 = doc.createTextNode(MZFSdataSource[i].groupRows[k][1]),
                a2 = doc.createElement("a"),
                td4 = doc.createElement("td");

            a2.setAttribute("role","button");
            a2.setAttribute("data-toggle","modal");
            a2.setAttribute("data-target","#MZFFD");
            //a.setAttribute("data-content",MZYSZGZLdataSource[i][j]);
            a2.id = MZFSdataSource[i].groupRows[k][0];
            a2.setAttribute("name", MZFSdataSource[i].groupName);

            //console.log(departmentName);

            a2.onclick = function(){
                var idd = this.id,
                    name = this.name;

                pageD = 1;
                totalPageD = 0;
                //console.log(pageD, 'pageDDDD');
                doc.getElementById('MZFFTotalD').innerHTML = '';
                doc.getElementById('MZFFassignPageD').value = '';
                doc.getElementById('MZFFpageNumD').placeholder = 1;

                $('#MZFFDTable').html('loading...');
                displayDetail(name, idd);

                doc.getElementById('MZFFpageBeforeD').onclick = function(){
                    if(pageD == 1){
                        alert('已经是第一页');
                    }else{
                        doc.getElementById('MZFFpageNumD').placeholder = --pageD;
                        displayDetail(name, idd);
                    }
                };

                doc.getElementById('MZFFpageNextD').onclick = function(){
                    if(pageD >= totalPageD){
                        alert('已经是最后一页');
                    }else{
                        //console.log('pageD', pageD, totalPageD);
                        pageD++;
                        doc.getElementById('MZFFpageNumD').placeholder = pageD;
                        displayDetail(name, idd);
                        //console.log('pageD2', pageD, totalPageD);

                    }
                };

                doc.getElementById('MZFFconfirmD').onclick = function(){
                    var tempPage = pageD;
                    pageD = parseFloat(doc.getElementById('MZFFassignPageD').value);
                    if(isInteger(pageD)){
                        if(pageD <= totalPageD){
                            doc.getElementById('MZFFpageNumD').placeholder = pageD;
                            displayDetail(name, idd);
                        }else{
                            pageD = tempPage;
                            alert('超出页数上限，请重新选择页数');
                            doc.getElementById('MZFFassignPageD').value = '';
                        }
                    }else{
                        alert('请输入正整数！')
                    }
                };

                function displayDetail(name, idd){
                    $.ajax({
                        type: "get",
                        url: "http://123.206.134.34:8080/Medicals_war/reportform/genggaiAnesthetistQuery?rowCount="+ 20 +"&page="+ pageD +"&department="+name+"&anesthetist="+idd+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime,
                        dataType: "json",
                        jsonp:"callback",
                        success: function (data) {
                            var result = data.data;
                            var title = data.header;
                            totalPageD = data.pageCount;
                            var table2 = doc.getElementById("MZFFDTable");
                            table2.innerHTML = '';
                            doc.getElementById('MZFFTotalD').innerHTML = totalPageD;
                            insertLCLJGGSubTable(result,title,table2);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        }
                    });
                }

            }

            a2.appendChild(data4);
            td4.appendChild(a2);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            table22.appendChild(tr2);
            div3.appendChild(table22);
            div22.appendChild(div3);
            //table.getElementsByTagName("tr").onclick = function(){
            //    console.log("wwwww");
            //}
        }


        div1.appendChild(div21);
        div1.appendChild(div22);
        divAccordion.appendChild(div1);
    }

    MZFFTotal.innerHTML = MZFFTotalPage;
}

function insertLCLJGGSubTable(result,title,table){
    for(var t=0;t<title.length;t++) {
        var th = doc.createElement("th"),
            thData = doc.createTextNode(title[t]);
        th.appendChild(thData);
        table.appendChild(th);
    }
    for(var i=0;i<result.length;i++) {
        var tr = doc.createElement("tr");
        for (var j = 0; j < result[i].length; j++) {
            var td = doc.createElement("td");
            var insertData = doc.createTextNode(result[i][j]);
            td.appendChild(insertData);
            if(j==8){
                td.style.width = "20%";
            }
            //}else{
            //    td.style.width = "30px";
            //}
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    //table.style.width = "1000px";
}

//��ҳ
var MZFSpageBefore = doc.getElementById("MZFSPageBefore"),
    MZFSpageNext = doc.getElementById("MZFSPageNext"),
    MZFSpageNum = doc.getElementById("MZFSPageNum");

MZFSpageBefore.onclick = function(){
    if(MZFSpage==1){alert("已经是第一页");}
    else{
        MZFSpage --;
        var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?rowCount="+ MZFFnumPer +"&page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                MZFSdataSource = data.data;
                MZFSdataTitle = data.header;
                MZFFTotalPage = data.pageCount;

                MZFSpageNum.placeholder = MZFSpage;
                insertMZXGTable();
				//test();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
MZFSpageNext.onclick = function(){
    MZFSpage ++;
    var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?rowCount="+ MZFFnumPer +"&page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
    if(MZFSpage > MZFFTotalPage){
        MZFSpage --;
        alert('已经是最后一页');
    }else{
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                MZFSdataSource = data.data;
                MZFSdataTitle = data.header;
                MZFFTotalPage = data.pageCount;

                MZFSpageNum.placeholder = MZFSpage;
                insertMZXGTable();
                //test();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}

//�趨ʱ��
MZFSsubmitDate.onclick = function () {
    getDate(MZFSstartDate,MZFSendDate);
    MZFSurlStartTime = getDate(MZFSstartDate,MZFSendDate)[0],
    MZFSurlEndTime = getDate(MZFSstartDate,MZFSendDate)[1];
    MZFSpage = 1;
    var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?rowCount="+ MZFFnumPer +"&page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZFSdataSource = data.data;
            MZFSdataTitle = data.header;
            MZFFTotalPage = data.pageCount;

            insertMZXGTable();
			//test();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

MZFFconfirm.onclick = function(){
    tempPage = MZFSpage;
    MZFSpage = parseFloat(MZFFassignPage.value);
    if(isInteger(MZFSpage)){
        console.log(MZFSpage);
        if(MZFSpage <= MZFFTotalPage){
            var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?rowCount="+ MZFFnumPer +"&page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
            console.log(url2);
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp:"callback",
                success: function (data) {
                    MZFSdataSource = data.data;
                    MZFSdataTitle = data.header;
                    MZFFTotalPage = data.pageCount;
                    MZFSpageNum.placeholder = MZFSpage;
                    insertMZXGTable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }else{
            MZFSpage = tempPage;
            alert('超出页数上限，请重新选择页数');
        }
    }else{
        alert('请输入正整数！')
    }
}

MZFFnumPerPage.onchange = function(){
    var tempPer = MZFFnumPer,
        tempTotalPage = MZFFTotalPage,
        tempSelected = MZFFnumPer;
    var p1 = $(this).children('option:selected').val();//这就是selected的值
    MZFFnumPer = p1;
    var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?rowCount="+ MZFFnumPer +"&page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZFSdataSource = data.data;
            MZFSdataTitle = data.header;
            MZFFTotalPage = data.pageCount;

            if(MZFFTotalPage < MZFSpage){
                alert('超出数据量上限，请重新选择页数或者每页数据条数');
                MZFFnumPer = tempPer;
                MZFFTotalPage = tempTotalPage;
                for(var i = 0; i < MZFFnumPerPage.options.length; i++){
                    if(MZFFnumPerPage.options[i].innerHTML == tempSelected){
                        MZFFnumPerPage.options[i].selected = true;
                        break;
                    }
                }
            }else{
                insertMZXGTable();
            }
            console.log(url2);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

MZFSexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuigenggai?&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
}

addLoadEvent(initialPicker(MZFSstartDate,MZFSendDate));

//��ʼ����
function test(){
	var otb = null;
	/*var isLoaded = false;
	if(!isLoaded){ */
		otb = new oTreeTable('otb', document.getElementById('treeTable'), {skin:'default',showIcon:false});
		//isLoaded = true;
	//}
}

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

var topNum = 0;
var MZFSTopList = new Array();

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
    var tdWidth = new Array('2%', '2%', '20%', '20%', '56%');

    // 插入表头
    // 置顶table显示
    var top = doc.getElementById('MZFS_table_top');
    if(MZFSpage != 1){
        top.style.display = 'none';
    }else{
        top.style.display = 'block';
    }

    // 表头td显示
    var th1 = doc.createElement('th'),
        th2 = doc.createElement('th'),
        th3 = doc.createElement('th'),
        s1 = doc.createElement('span'),
        s2 = doc.createElement('span');
    s1.innerHTML = '🔝';
    s2.innerHTML = '+';
    th1.appendChild(s1);
    th2.appendChild(s2);
    th3.innerHTML = '';

    th1.style.width = tdWidth[0];
    th2.style.width = tdWidth[1];
    th3.style.width = tdWidth[4];

    th1.style.padding = '8px';
    th2.style.padding = '8px';

    thead.appendChild(th1);
    thead.appendChild(th2);

    for(var t=0;t<MZFSdataTitle.length;t++){
        var th = doc.createElement("th"),
            thData = doc.createTextNode(MZFSdataTitle[t]);
        th.appendChild(thData);
        th.style.width = tdWidth[t+2];
        thead.appendChild(th);
    }

    thead.appendChild(th3);

    // 插入数据
    for(var i=1;i<MZFSdataSource.length;i++){
        // Bootstrap collapse plugin

        // 添加麻醉总例数
        var tdNum = 5;
        var table1 = document.createElement('table'),
            tbody1 = doc.createElement('tbody'),
            tr = document.createElement('tr'),
            span11 = document.createElement('span'),
            span12 = document.createElement('span'),
            a = document.createElement('a');
        var td = new Array(tdNum);
        for(var k = 0; k < tdNum; k++){
            td[k] = document.createElement('td');
        }

        table1.setAttribute('class', 'table table-striped table-hover');


        span11.innerHTML = '🔝';
        td[0].appendChild(span11);

        span12.innerHTML = '+';
        span12.setAttribute('data-toggle', 'collapse');
        span12.setAttribute('data-target', '#'+i);
        var dd = doc.createElement('div');
        dd.appendChild(span12);
        td[1].appendChild(dd);

        td[2].innerHTML = MZFSdataSource[i].groupName;

        a.innerHTML = MZFSdataSource[i].sum;
        td[3].appendChild(a);

        a.setAttribute("role","button");
        a.setAttribute("data-toggle","modal");
        a.setAttribute("data-target","#MZFFD");
        a.id = MZFSdataSource[i].groupName;
        var param = { idd: a.id };
        $(a).click(param, function(event){
            var idd = event.data.idd;

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

        });

        td[4].innerHTML = '';

        for(var m = 0; m < tdNum; m++){
            td[m].style.width = tdWidth[m];
            tr.appendChild(td[m]);
        }

        tbody1.appendChild(tr);
        table1.appendChild(tbody1);

        // 添加置顶事件
        td[2].onclick = function(){
            $(this).parent().find('span').first().css('visibility', 'visible');
        };



        var tdIndexTemp = (MZFSpage-1) * MZFFnumPer + getTotalNumBef(MZFSdataSource, i) + 1;
        if(MZFSTopList.indexOf(tdIndexTemp) != -1){
            $(td[0]).find('span').css('background-color', 'yellow');
            $(td[0]).find('span').css('visibility', 'visible');
        }

        var param = { tdIndexTemp: tdIndexTemp };
        $(td[0]).click(param, function(event){
            var tdIndex = event.data.tdIndexTemp;
            if(MZFSTopList.indexOf(tdIndex) == -1){
                var topTable = $(this).parent().parent().parent().clone(true),
                    detailDiv = $(this).parent().parent().parent().next().clone(true);

                var detailPlus = topTable.find('td').first().next().find('span').first();

                //console.log('div id:' + detailDiv.attr('id'));


                detailPlus.attr('data-target', '#top'+topNum);
                detailDiv.attr('id', 'top'+topNum);

                topNum += 1;

                //console.log('div id:' + detailDiv.attr('id'));
                console.log('div id:' + detailDiv.prop("tagName"));



                $('#MZFS_table_top').prepend(detailDiv);
                $('#MZFS_table_top').prepend(topTable);
                $(this).find('span').css('background-color', 'yellow');
                //$(this).find('span').css('visibility', 'hidden');

                alert('成功置顶');
                MZFSTopList.push(tdIndex);
            }else{
                alert('该项已置顶');
            }
        });


        // 添加麻醉单例数
        var div = document.createElement('div'),
            table2 = document.createElement('table'),
            tbody2 = doc.createElement('tbody');

            table2.setAttribute('class', 'table table-striped table-hover');

        for(var j=0; j<MZFSdataSource[i].groupRows.length; j++){
            var tr2 = document.createElement('tr'),
                span21 = document.createElement('span'),
                span22 = document.createElement('span'),
                a2 = document.createElement('a');
            var td2 = new Array(tdNum);
            for(var k = 0; k < tdNum; k++){
                td2[k] = document.createElement('td');
            }

            div.id = i;
            div.className = 'collapse';

            span21.innerHTML = '🔝';
//                span2.style.padding = '8px';
            td2[0].appendChild(span21);


            span22.innerHTML = '+';
            td2[1].appendChild(span22);

//                span2.innerHTML = MZFSdataSource[i].groupRows[j][0];
            td2[2].innerHTML = MZFSdataSource[i].groupRows[j][0];

            a2.innerHTML = MZFSdataSource[i].groupRows[j][1];
            td2[3].appendChild(a2);

            a2.setAttribute("role","button");
            a2.setAttribute("data-toggle","modal");
            a2.setAttribute("data-target","#MZFFD");
            //a.setAttribute("data-content",MZYSZGZLdataSource[i][j]);
            a2.id = MZFSdataSource[i].groupRows[j][0];
            a2.setAttribute("name", MZFSdataSource[i].groupName);

            //console.log(departmentName);
            var param = { idd: MZFSdataSource[i].groupRows[j][0], name: MZFSdataSource[i].groupName };
            $(a2).click(param, function(event){
                var idd = event.data.idd;
                var name = event.data.name;

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

            });

            td2[4].innerHTML = '';

            for(var m = 0; m < tdNum; m++){
                td2[m].style.width = tdWidth[m];
                tr2.appendChild(td2[m]);
            }

            tbody2.appendChild(tr2);
            table2.appendChild(tbody2);

        }

        div.appendChild(table2);


        // 添加到index page
        divAccordion.appendChild(table1);
        divAccordion.appendChild(div);
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

            topNum = 0;
            doc.getElementById('MZFS_table_top').innerHTML = '';
            MZFSpageNum.placeholder = 1;
            MZFSTopList.length = 0;
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

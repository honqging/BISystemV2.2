var MZYSGZLTotal = doc.getElementById("MZYSGZLTotal"),
    MZYSGZLTotalPage = 0,
    MZYSGZLnumPerPage = doc.getElementById("MZYSGZLnumPerPage"),
    MZYSGZLnumPer = 20,
    MZYSGZLassignPage = doc.getElementById("MZYSGZLassignPage"),
    MZYSGZLconfirm = doc.getElementById("MZYSGZLconfirm");

var MzDocWorkloadpage = 1,
    MZYSGZLtableData = [],
    MZYSGZLtableTiTle = [],
    doc = document,
	//MZYSGZLurlStartTime = "2010-01-01",
    MZYSGZLurlStartTime = month1stDate,
    MZYSGZLurlEndTime = currentDate,
    MZYSGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?rowCount="+ MZYSGZLnumPer +"&page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime,
    MZYSGZLstartDate = doc.getElementById("MZYSGZLstartTime"),
    MZYSGZLendDate = doc.getElementById("MZYSGZLendTime"),
    MZYSGZLsubmitDate = doc.getElementById("MZYSGZLsubmitTime");
    MZYSGZLexport = doc.getElementById("MZYSGZLexport");

MZYSGZLstartDate.value = month1stDate;
MZYSGZLendDate.value = currentDate;

$.ajax({
    type: "get",
    url: MZYSGZLurl,
    dataType: "json",
    jsonp:"callback",
    success: function (data) {
        MZYSGZLtableData = data.data;
        MZYSGZLtableTiTle = data.header;
        MZYSGZLTotalPage = data.pageCount;

        //console.log(MZYSGZLtableData[0].rows);
        insertMZYSGZLTable();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    }
});

function insertMZYSGZLTable(){
    var del = 0;
    var titleRow = 0;
	var totalRow = 0;
    //创建表格
    var table = doc.getElementById("MZYSGZL_table");
    var thead = doc.getElementById("MZYSGZL_table_head");

    table.innerHTML = '';
    thead.innerHTML = '';

    //单独添加表头
    var top = doc.getElementById('MZYSGZL_table_top');
    if(MzDocWorkloadpage != 1){
        top.style.display = 'none';
    }else{
        top.style.display = 'block';
    }
    var th = doc.createElement('th'),
        span = doc.createElement('span');
    span.innerHTML = '🔝';
    th.appendChild(span);
    th.style.width = '2%';
    th.style.padding = '8px';
    thead.appendChild(th);

    var th = doc.createElement("th"),
        thData = doc.createTextNode('科室'),
        td = doc.createElement("td");
    th.appendChild(thData);
    th.style.width = '19%';
    thead.appendChild(th);
    for(var t=0; t<MZYSGZLtableTiTle.length; t++){
        var th = doc.createElement("th"),
            thData = doc.createTextNode(MZYSGZLtableTiTle[t]);
        th.appendChild(thData);
        th.style.width = '19%';
        thead.appendChild(th);
    }

    var colorLen = new Array(MZYSGZLtableData.length);
    var colorLenD = new Array(MZYSGZLtableData.length);
    for(var x=0; x<MZYSGZLtableData.length; x++){
        for(var i=0; i<MZYSGZLtableData[x].groupRows.length; i++){
            var tr = doc.createElement("tr");

            var td = doc.createElement('td'),
                span = doc.createElement('span');
            span.innerHTML = '🔝';
            td.appendChild(span);
            td.style.width = '2%';
            if(x == 0){
                //console.log('x i: ', x, i);
                colorLen[x] = '#F9F9F9';
                colorLenD[x] = '#F5F5F5';
            }else{
                if(MZYSGZLtableData[x-1].groupRows.length % 2 == 0){
                    colorLen[x] = colorLen[x-1];
                    colorLenD[x] = colorLenD[x-1];
                }else{
                    colorLen[x] = colorLenD[x-1];
                    colorLenD[x] = colorLen[x-1];
                }
            }
            td.style.backgroundColor = colorLen[x];

            if(i==0){
                td.style.borderTop = '1px #D6D6D6 solid';
                //console.log('bColor: ', td.style.backgroundColor);
            }else{
                td.style.border = '0px';
            }

            tr.appendChild(td);
            tr.onclick = function(){
                $(this).find('span').css('visibility', 'visible');
            };
            var trLen = MZYSGZLtableData[x].groupRows[0].length;
            //console.log('trLen', trLen);
            td.trlen = trLen + 1;
            var param = { trLen: td.trlen };

            $(td).click(param, function(event){
                var trLen = event.data.trLen;
                if($(this).find('span').css('background-color') != 'rgb(255, 255, 0)'){
                    var trr = $(this).parent().clone();
                    //console.log('start', trr.children('td').length, trLen, 'end');

                    // start to toggle detailed info
                    var a = trr.find('a').first()[0];
                    a.setAttribute("tabindex","0");
                    a.setAttribute("role","button");
                    a.setAttribute("data-toggle","popover");
                    a.setAttribute("data-trigger","focus");
                    a.setAttribute("data-placement","top");
                    //a.setAttribute("data-content",MZYSGZLtableData[x].groupRows[i][j]);
                    a.department = a.getAttribute('department');
                    a.name = a.getAttribute('name');

                    var param = { department: a.department, name: a.name };
                    $(a).click(param, function(event){
                        var department = event.data.department,
                            name = event.data.name;
                        var result;
                        $("[data-toggle='popover']").popover({
                            html:true,
                            content:'<div id="content2">loading...</div>'
                        });
                        $.ajax({
                            type: "get",
                            url: "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengQuery?name="+name+"&department="+department+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime,
                            dataType: "json",
                            jsonp:"callback",
                            success: function (data) {
                                result = data;
                                var wholeDiv = doc.createElement("div");
                                for(var i=0;i<result.length;i++){
                                    var eachData = doc.createTextNode(result[i]);
                                    var p = doc.createElement("p");
                                    p.appendChild(eachData);
                                    wholeDiv.appendChild(p);
                                }
                                $('#content2').html(wholeDiv);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            }
                        });
                    });
                    // end of toggle detailed info


                    trr.children().first().css('border-top', '1px #D6D6D6 solid');
                    //trr.children().first().next('border-right', '0px');
                    if(trr.children('td').length == trLen){
                        var addData = doc.createTextNode(trr.attr('title'));
                        var addTd = doc.createElement('td');
                        addTd.appendChild(addData);
                        addTd.style.borderRight = '0px';
                        addTd.style.width = '19%';
                        trr.children().first().after(addTd);
                    }else{
                        trr.children().first().next().attr('rowspan', 1);
                        trr.children().first().next().css('border-right', '0px');

                    }
                    //console.log(trr.children('td').length);
                    $('#MZYSGZL_table_top').prepend(trr);
                    $("[data-toggle='popover']").popover({
                        html:true,
                        content:'<div id="content2">loading...</div>'
                    });
                    $(this).find('span').css('background-color', 'yellow');
                    $(this).find('span').css('visibility', 'hidden');

                    alert('成功置顶');
                }else{
                    alert('该项已置顶');
                }
            });

            for(var j=-1; j<MZYSGZLtableData[x].groupRows[i].length; j++){
                if(j==-1 && i==0){
                    var data = doc.createTextNode(MZYSGZLtableData[x].groupName),
                        td = doc.createElement("td");
                    td.title = "office";
                    td.appendChild(data);
                    td.style.width = '19%';
                    tr.appendChild(td);
                }
                else{
					if(j == MZYSGZLtableData[x].groupRows[i].length-1){
						var data = doc.createTextNode(MZYSGZLtableData[x].groupRows[i][j]),
							a = doc.createElement("a"),
							td = doc.createElement("td");
						a.setAttribute("tabindex","0");
						a.setAttribute("role","button");
						a.setAttribute("data-toggle","popover");
						a.setAttribute("data-trigger","focus");
						a.setAttribute("data-placement","top");
                        a.setAttribute('department',MZYSGZLtableData[x].groupName);
						//a.setAttribute("data-content",MZYSGZLtableData[x].groupRows[i][j]);
						a.department = MZYSGZLtableData[x].groupName;
						a.name = MZYSGZLtableData[x].groupRows[i][0];
                        $("[data-toggle='popover']").popover({
                            html:true,
                            content:'<div id="content">loading...</div>'
                        });

                        var param = { department: a.department, name: a.name };
                        $(a).click(param, function(event){
                            var department = event.data.department,
                                name = event.data.name;
                            var result;
                            $("[data-toggle='popover']").popover({
                                html:true,
                                content:'<div id="content">loading...</div>'
                            });
                            $.ajax({
                                  type: "get",
                                  url: "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengQuery?name="+name+"&department="+department+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime,
                                  dataType: "json",
                                  jsonp:"callback",
                                  success: function (data) {
                                      result = data;
                                      var wholeDiv = doc.createElement("div");
                                      for(var i=0;i<result.length;i++){
                                          var eachData = doc.createTextNode(result[i]);
                                          var p = doc.createElement("p");
                                          p.appendChild(eachData);
                                          wholeDiv.appendChild(p);
                                      }
                                      $('#content').html(wholeDiv);
                                       },
                                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                                  alert(errorThrown);
                                 }
                             });
                        });
						a.appendChild(data);
						td.appendChild(a);
					}
					else{
						var data = doc.createTextNode(MZYSGZLtableData[x].groupRows[i][j]);
						var td = doc.createElement("td");
						td.title = MZYSGZLtableData[x].groupRows[i][j];
						td.appendChild(data);
					}
                    td.style.width = '19%';
                    //td.style.textAlign = 'left';
                    tr.appendChild(td);
                    tr.title = MZYSGZLtableData[x].groupName;
                }
            }
            table.appendChild(tr);
        }
    }
	//合并office单元格
	for(var y=0;y<MZYSGZLtableData.length;y++) {
        totalRow = MZYSGZLtableData[y].groupRows.length;
		//w设为公有变量，否则每次会对表格再次重头进行遍历。
       for(var w=0;w<totalRow;w++,del++) {
           if (del !== titleRow) {
               table.rows[del].deleteCell(1);
               table.rows[titleRow].cells[1].rowSpan = totalRow;
           }
           table.rows[titleRow].cells[1].style.verticalAlign = 'middle';
           table.rows[titleRow].cells[1].style.borderRight = '1px #D6D6D6 solid';
       }
	   titleRow += totalRow;
    }

    MZYSGZLTotal.innerHTML = MZYSGZLTotalPage;
}

//分页
var MZYSGZLbeforePage = doc.getElementById("MZYSGZLPageBefore"),
    MZYSGZLnextPage = doc.getElementById("MZYSGZLPageNext"),
	MZYSGZLPageNum = doc.getElementById("MZYSGZLPageNum");

	MZYSGZLbeforePage.onclick = function(){
		if(MzDocWorkloadpage==1){alert("已经是第一页");}
		else{
            MzDocWorkloadpage --;
			//console.log(MzDocWorkloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?rowCount="+ MZYSGZLnumPer +"&page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					MZYSGZLtableData = data.data;
					MZYSGZLtableTiTle = data.header;
                    MZYSGZLTotalPage = data.pageCount;

                    MZYSGZLPageNum.placeholder = MzDocWorkloadpage;
					insertMZYSGZLTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}
	}
	MZYSGZLnextPage.onclick = function(){
        MzDocWorkloadpage ++;
		var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?rowCount="+ MZYSGZLnumPer +"&page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
		//console.log(MzDocWorkloadpage);
        if(MzDocWorkloadpage > MZYSGZLTotalPage){
            console.log(MzDocWorkloadpage, MZYSGZLTotalPage);
            MzDocWorkloadpage --;
            alert('已经是最后一页');
        }else {
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp: "callback",
                success: function (data) {
                    MZYSGZLtableData = data.data;
                    MZYSGZLtableTiTle = data.header;
                    MZYSGZLTotalPage = data.pageCount;

                    MZYSGZLPageNum.placeholder = MzDocWorkloadpage;
                    //console.log(pageNum.placeholder);
                    insertMZYSGZLTable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }
	}

//设定时间
MZYSGZLsubmitDate.onclick = function () {
    getDate(MZYSGZLstartDate,MZYSGZLendDate);
    MZYSGZLurlStartTime = getDate(MZYSGZLstartDate,MZYSGZLendDate)[0],
    MZYSGZLurlEndTime = getDate(MZYSGZLstartDate,MZYSGZLendDate)[1];
    MzDocWorkloadpage = 1;
    doc.getElementById('SSHD_table_top').innerHTML = '';
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?rowCount="+ MZYSGZLnumPer +"&page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZYSGZLtableData = data.data;
            MZYSGZLtableTiTle = data.header;
            MZYSGZLTotalPage = data.pageCount;

            //console.log(SMdataSource);
            doc.getElementById('MZYSGZL_table_top').innerHTML = '';
            insertMZYSGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

MZYSGZLconfirm.onclick = function(){
    tempPage = MzDocWorkloadpage;
    MzDocWorkloadpage = parseFloat(MZYSGZLassignPage.value);
    if(isInteger(MzDocWorkloadpage)){
        console.log(MzDocWorkloadpage);
        if(MzDocWorkloadpage <= MZYSGZLTotalPage){
            var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?rowCount=" + MZYSGZLnumPer + "&page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
            console.log(url2);
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp:"callback",
                success: function (data) {
                    MZYSGZLtableData = data.data;
                    MZYSGZLtableTiTle = data.header;
                    MZYSGZLTotalPage = data.pageCount;
                    MZYSGZLPageNum.placeholder = MzDocWorkloadpage;
                    insertMZYSGZLTable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }else{
            MzDocWorkloadpage = tempPage;
            alert('超出页数上限，请重新选择页数');
        }
    }else{
        alert('请输入正整数！')
    }
}

MZYSGZLnumPerPage.onchange = function(){
    var tempPer = MZYSGZLnumPer,
        tempTotalPage = MZYSGZLTotalPage,
        tempSelected = MZYSGZLnumPer;
    var p1 = $(this).children('option:selected').val();//这就是selected的值
    MZYSGZLnumPer = p1;
    var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?rowCount=" + MZYSGZLnumPer + "&page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZYSGZLtableData = data.data;
            MZYSGZLtableTiTle = data.header;
            MZYSGZLTotalPage = data.pageCount;

            if(MZYSGZLTotalPage < MzDocWorkloadpage){
                alert('超出数据量上限，请重新选择页数或者每页数据条数');
                MZYSGZLnumPer = tempPer;
                MZYSGZLTotalPage = tempTotalPage;
                for(var i = 0; i < MZYSGZLnumPerPage.options.length; i++){
                    if(MZYSGZLnumPerPage.options[i].innerHTML == tempSelected){
                        MZYSGZLnumPerPage.options[i].selected = true;
                        break;
                    }
                }
            }else{
                insertMZYSGZLTable();
            }
            console.log(url2);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
MZYSGZLexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuiyisheng?&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
}

addLoadEvent(initialPicker(MZYSGZLstartDate,MZYSGZLendDate));

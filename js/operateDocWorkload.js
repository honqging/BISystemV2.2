var SSYSGZLTotal = doc.getElementById("SSYSGZLTotal"),
    SSYSGZLTotalPage = 0,
    SSYSGZLnumPerPage = doc.getElementById("SSYSGZLnumPerPage"),
    SSYSGZLnumPer = 20,
    SSYSGZLassignPage = doc.getElementById("SSYSGZLassignPage"),
    SSYSGZLconfirm = doc.getElementById("SSYSGZLconfirm");

var operateDocWorkLoadpage = 1,
	SSYSGZLtableData = [],
	SSYSGZLtableTitle = [],
	doc = document,
	//SSYSGZLurlStartTime = "2010-01-01",
    SSYSGZLurlStartTime = month1stDate,
    SSYSGZLurlEndTime = currentDate,
    SSYSGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuyisheng?rowCount="+ SSYSGZLnumPer +"&page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime,
    SSYSGZLstartDate = doc.getElementById("SSYSGZLstartTime"),
    SSYSGZLendDate = doc.getElementById("SSYSGZLendTime"),
    SSYSGZLsubmitDate = doc.getElementById("SSYSGZLsubmitTime");
    SSYSGZLexport = doc.getElementById("SSYSGZLexport");

SSYSGZLstartDate.value = month1stDate;
SSYSGZLendDate.value = currentDate;

var SSYSGZLTopList = new Array();

//获取手术医生工作量
$.ajax({
          type: "get",
          url: SSYSGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  SSYSGZLtableData = data.data;
						  SSYSGZLtableTitle = data.header;
                          SSYSGZLTotalPage = data.pageCount;

                          //console.log(SSYSGZLtableData[0].rows);
						  insertSSYSGZLTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });

function insertSSYSGZLTable(){
    var del = 0;
    var titleRow = 0;
	var totalRow = 0;
	//创建表格
	var table = doc.getElementById("SSYSGZL_table");
    var thead = doc.getElementById("SSYSGZL_table_head");

    table.innerHTML = '';
    thead.innerHTML = '';
    //单独添加表头
    var top = doc.getElementById('SSYSGZL_table_top');
    if(operateDocWorkLoadpage != 1){
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
        th.style.width = '16%';
		thead.appendChild(th);
	for(var t=0;t<SSYSGZLtableTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(SSYSGZLtableTitle[t]);
		th.appendChild(thData);
        th.style.width = '16%';
        thead.appendChild(th);
	}

    var colorLen = new Array(SSYSGZLtableData.length);
    var colorLenD = new Array(SSYSGZLtableData.length);
	for(var x=0;x<SSYSGZLtableData.length;x++){
		for(var i=0;i<SSYSGZLtableData[x].groupRows.length;i++){
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
                if(SSYSGZLtableData[x-1].groupRows.length % 2 == 0){
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

            var tdIndexTemp = (operateDocWorkLoadpage-1) * SSYSGZLnumPer + getTotalNumBef(SSYSGZLtableData, x) + i + 1;
            if(SSYSGZLTopList.indexOf(tdIndexTemp) != -1){
                $(td).find('span').css('background-color', 'yellow');
                $(td).find('span').css('visibility', 'visible');
            }

            var trLen = SSYSGZLtableData[x].groupRows[0].length;
            //console.log('trLen', trLen);
            td.trlen = trLen + 1;
            var param = { trLen: td.trlen, tdIndexTemp: tdIndexTemp };
            $(td).click(param, function(event){
                var trLen = event.data.trLen;
                var tdIndex = event.data.tdIndexTemp;
                if(SSYSGZLTopList.indexOf(tdIndex) == -1){
                    var trr = $(this).parent().clone(true);
                    //console.log('start', trr.children('td').length, trLen, 'end');

                    trr.children().first().css('border-top', '1px #D6D6D6 solid');
                    //trr.children().first().next('border-right', '0px');
                    if(trr.children('td').length == trLen){
                        var addData = doc.createTextNode(trr.attr('title'));
                        var addTd = doc.createElement('td');
                        addTd.appendChild(addData);
                        addTd.style.borderRight = '0px';
                        addTd.style.width = '16%';
                        trr.children().first().after(addTd);
                    }else{
                        trr.children().first().next().attr('rowspan', 1);
                        trr.children().first().next().css('border-right', '0px');

                    }
                    //console.log(trr.children('td').length);
                    $('#SSYSGZL_table_top').prepend(trr);
                    $(this).find('span').css('background-color', 'yellow');
                    $(this).find('span').css('visibility', 'hidden');

                    alert('成功置顶');
                    SSYSGZLTopList.push(tdIndex);
                }else{
                    alert('该项已置顶');
                }
            });

			for(var j=-1;j<SSYSGZLtableData[x].groupRows[i].length;j++){
				if(j==-1 && i==0){
					var data = doc.createTextNode(SSYSGZLtableData[x].groupName),
					td = doc.createElement("td");
					td.title = "office";
					td.appendChild(data);
                    td.style.width = '16%';
                    tr.appendChild(td);
				}
				else{
					var data = doc.createTextNode(SSYSGZLtableData[x].groupRows[i][j]),
						td = doc.createElement("td");
					td.title = SSYSGZLtableData[x].groupRows[i][j];
					td.appendChild(data);
                    td.style.width = '16%';
                    tr.appendChild(td);
                    tr.title = SSYSGZLtableData[x].groupName;
                }
			}
			table.appendChild(tr);
		}
	}
	//合并office单元格
	for(var y=0;y<SSYSGZLtableData.length;y++) {
        totalRow = SSYSGZLtableData[y].groupRows.length;
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

    SSYSGZLTotal.innerHTML = SSYSGZLTotalPage;
}

//分页
var operateDocWorkloadbeforePage = doc.getElementById("SSYSGZLPageBefore"),
    operateDocWorkloadnextPage = doc.getElementById("SSYSGZLPageNext"),
    operateDocWorkloadPageNum = doc.getElementById("SSYSGZLPageNum");

operateDocWorkloadbeforePage.onclick = function(){
    if(operateDocWorkLoadpage==1){alert("已经是第一页");}
    else{
        operateDocWorkLoadpage --;
        //console.log(MzDocZongWorkloadpage);
        var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuyisheng?rowCount="+ SSYSGZLnumPer +"&page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                SSYSGZLtableData = data.data;
                SSYSGZLtableTitle = data.header;
                SSYSGZLTotalPage = data.pageCount;

                operateDocWorkloadPageNum.placeholder = operateDocWorkLoadpage;
                insertSSYSGZLTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
operateDocWorkloadnextPage.onclick = function(){
    operateDocWorkLoadpage ++;
    var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuyisheng?rowCount="+ SSYSGZLnumPer +"&page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
    //console.log(MzDocZongWorkloadpage);
    if(operateDocWorkLoadpage > SSYSGZLTotalPage){
        operateDocWorkLoadpage --;
        alert('已经是最后一页');
    }else {
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp: "callback",
            success: function (data) {
                SSYSGZLtableData = data.data;
                SSYSGZLtableTitle = data.header;
                SSYSGZLTotalPage = data.pageCount;

                //console.log(SSYSGZLtableData);
                operateDocWorkloadPageNum.placeholder = operateDocWorkLoadpage;
                insertSSYSGZLTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}

//设定时间
SSYSGZLsubmitDate.onclick = function () {
    getDate(SSYSGZLstartDate,SSYSGZLendDate);
    SSYSGZLurlStartTime = getDate(SSYSGZLstartDate,SSYSGZLendDate)[0],
    SSYSGZLurlEndTime = getDate(SSYSGZLstartDate,SSYSGZLendDate)[1];
    operateDocWorkLoadpage = 1;
    SSYSGZL_table_top = '';
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuyisheng?rowCount="+ SSYSGZLnumPer +"&page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSYSGZLtableData = data.data;
            SSYSGZLtableTitle = data.header;
            SSYSGZLTotalPage = data.pageCount;

            doc.getElementById('SSYSGZL_table_top').innerHTML = '';
            operateDocWorkloadPageNum.placeholder = 1;
            SSYSGZLTopList.length = 0;
            insertSSYSGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

SSYSGZLconfirm.onclick = function(){
    tempPage = operateDocWorkLoadpage;
    operateDocWorkLoadpage = parseFloat(SSYSGZLassignPage.value);
    if(isInteger(operateDocWorkLoadpage)){
        console.log(operateDocWorkLoadpage);
        if(operateDocWorkLoadpage <= SSYSGZLTotalPage){
            var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuyisheng?rowCount=" + SSYSGZLnumPer + "&page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
            console.log(url2);
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp:"callback",
                success: function (data) {
                    SSYSGZLtableData = data.data;
                    SSYSGZLtableTitle = data.header;
                    SSYSGZLTotalPage = data.pageCount;
                    operateDocWorkloadPageNum.placeholder = operateDocWorkLoadpage;
                    insertSSYSGZLTable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }else{
            operateDocWorkLoadpage = tempPage;
            alert('超出页数上限，请重新选择页数');
        }
    }else{
        alert('请输入正整数！')
    }
}

SSYSGZLnumPerPage.onchange = function(){
    var tempPer = SSYSGZLnumPer,
        tempTotalPage = SSYSGZLTotalPage,
        tempSelected = SSYSGZLnumPer;
    var p1 = $(this).children('option:selected').val();//这就是selected的值
    SSYSGZLnumPer = p1;
    var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuyisheng?rowCount=" + SSYSGZLnumPer + "&page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSYSGZLtableData = data.data;
            SSYSGZLtableTitle = data.header;
            SSYSGZLTotalPage = data.pageCount;

            if(SSYSGZLTotalPage < operateDocWorkLoadpage){
                alert('超出数据量上限，请重新选择页数或者每页数据条数');
                SSYSGZLnumPer = tempPer;
                SSYSGZLTotalPage = tempTotalPage;
                for(var i = 0; i < SSYSGZLnumPerPage.options.length; i++){
                    if(SSYSGZLnumPerPage.options[i].innerHTML == tempSelected){
                        SSYSGZLnumPerPage.options[i].selected = true;
                        break;
                    }
                }
            }else{
                insertSSYSGZLTable();
            }
            console.log(url2);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

SSYSGZLexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/shoushuyisheng?&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
}

addLoadEvent(initialPicker(SSYSGZLstartDate,SSYSGZLendDate));

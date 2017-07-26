var HSGZLTotal = doc.getElementById("HSGZLTotal"),
    HSGZLTotalPage = 0,
    HSGZLnumPerPage = doc.getElementById("HSGZLnumPerPage"),
    HSGZLnumPer = 20,
    HSGZLassignPage = doc.getElementById("HSGZLassignPage"),
    HSGZLconfirm = doc.getElementById("HSGZLconfirm");

var nurseWorkloadpage = 1,
	//HSGZLurlStartTime = "2010-01-01",
    HSGZLurlStartTime = month1stDate,
    HSGZLurlEndTime = currentDate,
    HSGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?rowCount="+ HSGZLnumPer +"&page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime,
	HSGZLtableData = [],
	HSGZLtableTiTle = [],
	doc = document,
	HSGZLstartDate = doc.getElementById("HSGZLstartTime"),
    HSGZLendDate = doc.getElementById("HSGZLendTime"),
    HSGZLsubmitDate = doc.getElementById("HSGZLsubmitTime");
    HSGZLexport = doc.getElementById("HSGZLexport");

HSGZLstartDate.value = month1stDate;
HSGZLendDate.value = currentDate;

//获取手麻病人数据
$.ajax({
          type: "get",
          url: HSGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  HSGZLtableData = data.data;
						  HSGZLtableTiTle = data.header;
                          HSGZLTotalPage = data.pageCount;

                          //console.log(HSGZLtableData[0].rows);
						  insertHSGZLTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });

function insertHSGZLTable(){
    var del = 0;
    var titleRow = 0;
	var totalRow = 0;
	//创建表格
	var table = doc.getElementById("HSGZL_table");
    var thead = doc.getElementById("HSGZL_table_head");

    table.innerHTML = '';
    thead.innerHTML = '';

    //单独添加表头
    var top = doc.getElementById('HSGZL_table_top');
    if(nurseWorkloadpage != 1){
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
        th.style.width = '22%';
        thead.appendChild(th);
	for(var t=0;t<HSGZLtableTiTle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(HSGZLtableTiTle[t]);
		th.appendChild(thData);
        th.style.width = '19%';
        thead.appendChild(th);
	}


    var colorLen = new Array(HSGZLtableData.length);
    var colorLenD = new Array(HSGZLtableData.length);
	for(var x=0;x<HSGZLtableData.length;x++){
		for(var i=0;i<HSGZLtableData[x].groupRows.length;i++){
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
                if(HSGZLtableData[x-1].groupRows.length % 2 == 0){
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
            var trLen = HSGZLtableData[x].groupRows[0].length;
            //console.log('trLen', trLen);
            td.trlen = trLen + 1;
            var param = { trLen: td.trlen };
            $(td).click(param, function(event){
                var trLen = event.data.trLen;
                if($(this).find('span').css('background-color') != 'rgb(255, 255, 0)'){
                    var trr = $(this).parent().clone(true);
                    //console.log('start', trr.children('td').length, trLen, 'end');

                    trr.children().first().css('border-top', '1px #D6D6D6 solid');
                    //trr.children().first().next('border-right', '0px');
                    if(trr.children('td').length == trLen){
                        var addData = doc.createTextNode(trr.attr('title'));
                        var addTd = doc.createElement('td');
                        addTd.appendChild(addData);
                        addTd.style.borderRight = '0px';
                        trr.children().first().after(addTd);
                    }else{
                        trr.children().first().next().attr('rowspan', 1);
                        trr.children().first().next().css('border-right', '0px');

                    }
                    //console.log(trr.children('td').length);
                    $('#HSGZL_table_top').prepend(trr);
                    $(this).find('span').css('background-color', 'yellow');
                    $(this).find('span').css('visibility', 'hidden');

                    alert('成功置顶');
                }else{
                    alert('该项已置顶');
                }
            });

			for(var j=-1;j<HSGZLtableData[x].groupRows[i].length;j++){
				if(j==-1 && i==0){
					var data = doc.createTextNode(HSGZLtableData[x].groupName),
					td = doc.createElement("td");
					td.title = "office";
					td.appendChild(data);
                    td.style.width = '22%';
                    tr.appendChild(td);
				}
				else{
					var data = doc.createTextNode(HSGZLtableData[x].groupRows[i][j]),
						td = doc.createElement("td");
					td.title = HSGZLtableData[x].groupRows[i][j];
					td.appendChild(data);
                    td.style.width = '19%';
                    tr.appendChild(td);
                    tr.title = HSGZLtableData[x].groupName;
				}
			}
			table.appendChild(tr);
		}
	}
	//合并office单元格
    for(var y=0;y<HSGZLtableData.length;y++) {
        totalRow = HSGZLtableData[y].groupRows.length;
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

    HSGZLTotal.innerHTML = HSGZLTotalPage;
}

//分页
var nurseWorkloadbeforePage = doc.getElementById("nurseWorkloadPageBefore"),
    nurseWorkloadnextPage = doc.getElementById("nurseWorkloadPageNext"),
    nurseWorkloadPageNum = doc.getElementById("nurseWorkloadPageNum");

nurseWorkloadbeforePage.onclick = function(){
    if(nurseWorkloadpage==1){alert("已经是第一页");}
    else{
        nurseWorkloadpage --;
        //console.log(nurseWorkloadpage);
        var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?rowCount="+ HSGZLnumPer +"&page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                HSGZLtableData = data.data;
                HSGZLtableTiTle = data.header;
                HSGZLTotalPage = data.pageCount;

                nurseWorkloadPageNum.placeholder = nurseWorkloadpage;
                insertHSGZLTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
nurseWorkloadnextPage.onclick = function(){
    nurseWorkloadpage ++;
    var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?rowCount="+ HSGZLnumPer +"&page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
    //console.log(nurseWorkloadpage);
    if(nurseWorkloadpage > HSGZLTotalPage){
        nurseWorkloadpage --;
        alert('已经是最后一页');
    }else {
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp: "callback",
            success: function (data) {
                HSGZLtableData = data.data;
                HSGZLtableTiTle = data.header;
                HSGZLTotalPage = data.pageCount;

                nurseWorkloadPageNum.placeholder = nurseWorkloadpage;
                //console.log(pageNum.placeholder);
                insertHSGZLTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}

//设定时间
HSGZLsubmitDate.onclick = function () {
    getDate(HSGZLstartDate,HSGZLendDate);
    HSGZLurlStartTime = getDate(HSGZLstartDate,HSGZLendDate)[0],
    HSGZLurlEndTime = getDate(HSGZLstartDate,HSGZLendDate)[1];
    nurseWorkloadpage = 1;
    doc.getElementById('HSGZL_table_top').innerHTML = '';
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?rowCount="+ HSGZLnumPer +"&page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            HSGZLtableData = data.data;
            HSGZLtableTiTle = data.header;
            HSGZLTotalPage = data.pageCount;

            //console.log(SMdataSource);
            insertHSGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

HSGZLconfirm.onclick = function(){
    tempPage = nurseWorkloadpage;
    nurseWorkloadpage = parseFloat(HSGZLassignPage.value);
    if(isInteger(nurseWorkloadpage)){
        console.log(nurseWorkloadpage);
        if(nurseWorkloadpage <= HSGZLTotalPage){
            var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?rowCount=" + HSGZLnumPer + "&page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
            console.log(url2);
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp:"callback",
                success: function (data) {
                    HSGZLtableData = data.data;
                    HSGZLtableTiTle = data.header;
                    HSGZLTotalPage = data.pageCount;
                    nurseWorkloadPageNum.placeholder = nurseWorkloadpage;
                    insertHSGZLTable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }else{
            nurseWorkloadpage = tempPage;
            alert('超出页数上限，请重新选择页数');
        }
    }else{
        alert('请输入正整数！')
    }
}

HSGZLnumPerPage.onchange = function(){
    var tempPer = HSGZLnumPer,
        tempTotalPage = HSGZLTotalPage,
        tempSelected = HSGZLnumPer;
    var p1 = $(this).children('option:selected').val();//这就是selected的值
    HSGZLnumPer = p1;
    var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?rowCount=" + HSGZLnumPer + "&page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            HSGZLtableData = data.data;
            HSGZLtableTiTle = data.header;
            HSGZLTotalPage = data.pageCount;

            if(HSGZLTotalPage < nurseWorkloadpage){
                alert('超出数据量上限，请重新选择页数或者每页数据条数');
                HSGZLnumPer = tempPer;
                HSGZLTotalPage = tempTotalPage;
                for(var i = 0; i < HSGZLnumPerPage.options.length; i++){
                    if(HSGZLnumPerPage.options[i].innerHTML == tempSelected){
                        HSGZLnumPerPage.options[i].selected = true;
                        break;
                    }
                }
            }else{
                insertHSGZLTable();
            }
            console.log(url2);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

HSGZLexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/hushi?&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
}

addLoadEvent(initialPicker(HSGZLstartDate,HSGZLendDate));

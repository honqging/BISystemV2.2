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

	for(var x=0;x<SSYSGZLtableData.length;x++){
		for(var i=0;i<SSYSGZLtableData[x].groupRows.length;i++){
			var tr = doc.createElement("tr");
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
               table.rows[del].deleteCell(0);
               table.rows[titleRow].cells[0].rowSpan = totalRow;
           }
           table.rows[titleRow].cells[0].style.verticalAlign = 'middle';
           table.rows[titleRow].cells[0].style.borderRight = '1px #D6D6D6 solid';

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
                    SSYSGZLPageNum.placeholder = operateDocWorkLoadpage;
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

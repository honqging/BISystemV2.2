var operateDocWorkLoadpage = 1,
	SSYSGZLtableData = [],
	SSYSGZLtableTitle = [],
	doc = document,
	SSYSGZLurlStartTime = "2010-01-01",
    SSYSGZLurlEndTime = currentDate,
    SSYSGZLurl = "http://123.206.134.34:8080/Medicals_temp/statistic/shoushuyisheng?page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime,
    SSYSGZLstartDate = doc.getElementById("SSYSGZLstartTime"),
    SSYSGZLendDate = doc.getElementById("SSYSGZLendTime"),
    SSYSGZLsubmitDate = doc.getElementById("SSYSGZLsubmitTime");
    SSYSGZLexport = doc.getElementById("SSYSGZLexport");

//获取手术医生工作量
$.ajax({
          type: "get",
          url: SSYSGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  SSYSGZLtableData = data.data;
						  SSYSGZLtableTitle = data.header;
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
        th.style.width = '40%';
		thead.appendChild(th);
	for(var t=0;t<SSYSGZLtableTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(SSYSGZLtableTitle[t]);
		th.appendChild(thData);
        th.style.width = '12%';
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
                    td.style.width = '40%';
                    tr.appendChild(td);
				}
				else{
					var data = doc.createTextNode(SSYSGZLtableData[x].groupRows[i][j]),
						td = doc.createElement("td");
					td.title = SSYSGZLtableData[x].groupRows[i][j];
					td.appendChild(data);
                    td.style.width = '12%';
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
       }
	   titleRow += totalRow;
    }
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
        var url2 = "http://123.206.134.34:8080/Medicals_temp/statistic/shoushuyisheng?page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                SSYSGZLtableData = data.data;
                SSYSGZLtableTitle = data.header;
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
    var url2 = "http://123.206.134.34:8080/Medicals_temp/statistic/shoushuyisheng?page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
    //console.log(MzDocZongWorkloadpage);
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSYSGZLtableData = data.data;
            SSYSGZLtableTitle = data.header;
            //console.log(SSYSGZLtableData);
            operateDocWorkloadPageNum.placeholder = operateDocWorkLoadpage;
            insertSSYSGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//设定时间
SSYSGZLsubmitDate.onclick = function () {
    getDate(SSYSGZLstartDate,SSYSGZLendDate);
    SSYSGZLurlStartTime = getDate(SSYSGZLstartDate,SSYSGZLendDate)[0],
    SSYSGZLurlEndTime = getDate(SSYSGZLstartDate,SSYSGZLendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_temp/statistic/shoushuyisheng?page="+operateDocWorkLoadpage+"&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSYSGZLtableData = data.data;
            SSYSGZLtableTitle = data.header;
            insertSSYSGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

SSYSGZLexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_temp/export/shoushuyisheng?&startTime="+SSYSGZLurlStartTime+"&endTime="+SSYSGZLurlEndTime;
}

addLoadEvent(initialPicker(SSYSGZLstartDate,SSYSGZLendDate));
var nurseWorkloadpage = 1,
	HSGZLurlStartTime = "2010-01-01",
    HSGZLurlEndTime = currentDate,
    HSGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime,
	HSGZLtableData = [],
	HSGZLtableTiTle = [],
	doc = document,
	HSGZLstartDate = doc.getElementById("HSGZLstartTime"),
    HSGZLendDate = doc.getElementById("HSGZLendTime"),
    HSGZLsubmitDate = doc.getElementById("HSGZLsubmitTime");
    HSGZLexport = doc.getElementById("HSGZLexport");
//获取手麻病人数据
$.ajax({
          type: "get",
          url: HSGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  HSGZLtableData = data.data;
						  HSGZLtableTiTle = data.header;
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
    table.innerHTML = '';
	//单独添加表头
	var th = doc.createElement("th"),
			thData = doc.createTextNode('科室'),
        	td = doc.createElement("td");
		th.appendChild(thData);
		table.appendChild(th);
	for(var t=0;t<HSGZLtableTiTle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(HSGZLtableTiTle[t]);
		th.appendChild(thData);
		table.appendChild(th);
	}

	for(var x=0;x<HSGZLtableData.length;x++){
		for(var i=0;i<HSGZLtableData[x].groupRows.length;i++){
			var tr = doc.createElement("tr");
			for(var j=-1;j<HSGZLtableData[x].groupRows[i].length;j++){
				if(j==-1 && i==0){
					var data = doc.createTextNode(HSGZLtableData[x].groupName),
					td = doc.createElement("td");
					td.title = "office";
					td.appendChild(data);
					tr.appendChild(td);
				}
				else{
					var data = doc.createTextNode(HSGZLtableData[x].groupRows[i][j]),
						td = doc.createElement("td");
					td.title = HSGZLtableData[x].groupRows[i][j];
					td.appendChild(data);
					tr.appendChild(td);
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
               table.rows[del].deleteCell(0);
               table.rows[titleRow].cells[0].rowSpan = totalRow;
           }
       }
	   titleRow += totalRow;
    }
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
        var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                HSGZLtableData = data.data;
                HSGZLtableTiTle = data.header;
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
    var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
    //console.log(nurseWorkloadpage);
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            HSGZLtableData = data.data;
            HSGZLtableTiTle = data.header;
            nurseWorkloadPageNum.placeholder = nurseWorkloadpage;
            //console.log(pageNum.placeholder);
            insertHSGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//设定时间
HSGZLsubmitDate.onclick = function () {
    getDate(HSGZLstartDate,HSGZLendDate);
    HSGZLurlStartTime = getDate(HSGZLstartDate,HSGZLendDate)[0],
    HSGZLurlEndTime = getDate(HSGZLstartDate,HSGZLendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            HSGZLtableData = data.data;
            HSGZLtableTiTle = data.header;
            //console.log(SMdataSource);
            insertHSGZLTable();
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
var HSGZLTotal = doc.getElementById("HSGZLTotal"),
    HSGZLTotalPage = 0,
    HSGZLnumPerPage = doc.getElementById("HSGZLnumPerPage"),
    HSGZLnumPer = 20,
    HSGZLassignPage = doc.getElementById("HSGZLassignPage"),
    HSGZLconfirm = doc.getElementById("HSGZLconfirm");

var nurseWorkloadpage = 1,
	HSGZLurlStartTime = "2010-01-01",
    HSGZLurlEndTime = currentDate,
    HSGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/hushi?rowCount="+ HSGZLnumPer +"&page="+nurseWorkloadpage+"&startTime="+HSGZLurlStartTime+"&endTime="+HSGZLurlEndTime,
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
	var th = doc.createElement("th"),
			thData = doc.createTextNode('科室'),
        	td = doc.createElement("td");
		th.appendChild(thData);
        th.style.width = '16%';
        thead.appendChild(th);
	for(var t=0;t<HSGZLtableTiTle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(HSGZLtableTiTle[t]);
		th.appendChild(thData);
        th.style.width = '16%';
        thead.appendChild(th);
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
                    td.style.width = '16%';
                    tr.appendChild(td);
				}
				else{
					var data = doc.createTextNode(HSGZLtableData[x].groupRows[i][j]),
						td = doc.createElement("td");
					td.title = HSGZLtableData[x].groupRows[i][j];
					td.appendChild(data);
                    td.style.width = '16%';
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
           table.rows[titleRow].cells[0].style.verticalAlign = 'middle';
           table.rows[titleRow].cells[0].style.borderRight = '1px #D6D6D6 solid';
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

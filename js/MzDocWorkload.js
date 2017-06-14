var MzDocWorkloadpage = 1,
    MZYSGZLtableData = [],
    MZYSGZLtableTiTle = [],
    doc = document,
	MZYSGZLurlStartTime = "2010-01-01",
    MZYSGZLurlEndTime = currentDate,
    MZYSGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime,
    MZYSGZLstartDate = doc.getElementById("MZYSGZLstartTime"),
    MZYSGZLendDate = doc.getElementById("MZYSGZLendTime"),
    MZYSGZLsubmitDate = doc.getElementById("MZYSGZLsubmitTime");
    MZYSGZLexport = doc.getElementById("MZYSGZLexport");


$.ajax({
    type: "get",
    url: MZYSGZLurl,
    dataType: "json",
    jsonp:"callback",
    success: function (data) {
        MZYSGZLtableData = data.data;
        MZYSGZLtableTiTle = data.header;
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
	table.innerHTML = '';
    //单独添加表头
    var th = doc.createElement("th"),
        thData = doc.createTextNode('科室'),
        td = doc.createElement("td");
    th.appendChild(thData);
    table.appendChild(th);
    for(var t=0; t<MZYSGZLtableTiTle.length; t++){
        var th = doc.createElement("th"),
            thData = doc.createTextNode(MZYSGZLtableTiTle[t]);
        th.appendChild(thData);
        table.appendChild(th);
    }

    for(var x=0; x<MZYSGZLtableData.length; x++){
        for(var i=0; i<MZYSGZLtableData[x].groupRows.length; i++){
            var tr = doc.createElement("tr");
            for(var j=-1; j<MZYSGZLtableData[x].groupRows[i].length; j++){
                if(j==-1 && i==0){
                    var data = doc.createTextNode(MZYSGZLtableData[x].groupName),
                        td = doc.createElement("td");
                    td.title = "office";
                    td.appendChild(data);
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
						//a.setAttribute("data-content",MZYSGZLtableData[x].groupRows[i][j]);
						a.department = MZYSGZLtableData[x].groupName;
						a.name = MZYSGZLtableData[x].groupRows[i][0];
						a.onclick = function(){
                            var result;
                            $("[data-toggle='popover']").popover({
                                html:true,
                                content:'<div id="content">loading...</div>'
                            });
                            $.ajax({
                                  type: "get",
                                  url: "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengQuery?name="+this.name+"&department="+this.department+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime,
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
                        }
						a.appendChild(data);
						td.appendChild(a);
					}
					else{
						var data = doc.createTextNode(MZYSGZLtableData[x].groupRows[i][j]);
						var td = doc.createElement("td");
						td.title = MZYSGZLtableData[x].groupRows[i][j];
						td.appendChild(data);
					}
                    tr.appendChild(td);
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
               table.rows[del].deleteCell(0);
               table.rows[titleRow].cells[0].rowSpan = totalRow;
           }
       }
	   titleRow += totalRow;
    }
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
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					MZYSGZLtableData = data.data;
					MZYSGZLtableTiTle = data.header;
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
		var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
		//console.log(MzDocWorkloadpage);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					MZYSGZLtableData = data.data;
					MZYSGZLtableTiTle = data.header;
					MZYSGZLPageNum.placeholder = MzDocWorkloadpage;
					//console.log(pageNum.placeholder);
					insertMZYSGZLTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
	}

//设定时间
MZYSGZLsubmitDate.onclick = function () {
    getDate(MZYSGZLstartDate,MZYSGZLendDate);
    MZYSGZLurlStartTime = getDate(MZYSGZLstartDate,MZYSGZLendDate)[0],
    MZYSGZLurlEndTime = getDate(MZYSGZLstartDate,MZYSGZLendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyisheng?page="+MzDocWorkloadpage+"&startTime="+MZYSGZLurlStartTime+"&endTime="+MZYSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZYSGZLtableData = data.data;
            MZYSGZLtableTiTle = data.header;
            //console.log(SMdataSource);
            insertMZYSGZLTable();
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
var NLDTotal = doc.getElementById("NLDTotal"),
	NLDTotalPage = 0,
	NLDnumPerPage = doc.getElementById("NLDnumPerPage"),
	NLDnumPer = 20,
	NLDassignPage = doc.getElementById("NLDassignPage"),
	NLDconfirm = doc.getElementById("NLDconfirm");

var NLDpage = 1,
	NLDdataSource = [],
	NLDdataTitle = [],
	doc = document,
	//NLDurlStartTime = "2010-01-01",
	NLDurlStartTime = month1stDate,
    NLDurlEndTime = currentDate,
    NLDurl = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?rowCount="+ NLDnumPer +"&page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime,
    NLDstartDate = doc.getElementById("NLDstartTime"),
    NLDendDate = doc.getElementById("NLDendTime"),
    NLDsubmitDate = doc.getElementById("NLDsubmitTime");
	NLDexport = doc.getElementById("NLDexport");

NLDstartDate.value = month1stDate;
NLDendDate.value = currentDate;

$.ajax({
          type: "get",
          url: NLDurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  NLDdataSource = data.data;
						  NLDdataTitle = data.header;
			  			  NLDTotalPage = data.pageCount;
						 //console.log(NLDdataSource);
						  insertNLDTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertNLDTable(){
	//�������
	var table = doc.getElementById("NLD_table");
	var thead = doc.getElementById("NLD_table_head");
	thead.innerHTML = '';
	table.innerHTML = '';
	//������ӱ�ͷ
	for(var t=0;t<NLDdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(NLDdataTitle[t]);
		th.appendChild(thData);
		if(t==0){
			th.style.width = '44%';
		}else{
			th.style.width = '8%';
		}
		thead.appendChild(th);
	}
	for(var i=0;i<NLDdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<NLDdataSource[i].length;j++){
			if(j !== 0){
				var data = doc.createTextNode(NLDdataSource[i][j]),
					a = doc.createElement("a"),
					td = doc.createElement("td");
				a.setAttribute("tabindex","0");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","popover");
				a.setAttribute("data-trigger","focus");
				a.setAttribute("data-placement","left");
				//a.setAttribute("data-content",NLDdataSource[i][j]);
                a.method = NLDdataSource[i][0];
                a.age = NLDdataTitle[j];
				$("[data-toggle='popover']").popover({
					html:true,
					content:'<div id="content">loading...</div>'
				});
				a.onclick = function(){
					var result;
					$("[data-toggle='popover']").popover({
						html:true,
						content:'<div id="content">loading...</div>'
					});
					$.ajax({
						  type: "get",
						  url: "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfaQuery?rowCount="+ 20 +"&page="+ 1 +"&method="+this.method.replace(/\+/g, "%2B")+"&age="+this.age+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime,
						  dataType: "json",
						  jsonp:"callback",
						  success: function (data) {
                              var result = data.data;
                              var title = data.header;
                              var table2 = doc.createElement("table");
                              insertNLDSubTable(result,title,table2);
                              $('#content').html(table2);
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
                var data = doc.createTextNode(NLDdataSource[i][j]);
				var td = doc.createElement("td");
				td.title = NLDdataSource[i][j];
				td.appendChild(data);
			}
			if(j==0){
				td.style.width = '44%';
			}else{
				td.style.width = '8%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	NLDTotal.innerHTML = NLDTotalPage;
}

function insertNLDSubTable(result,title,table){
    for(var t=0;t<title.length;t++) {
        var th = doc.createElement("th"),
            thData = doc.createTextNode(title[t]);
        th.appendChild(thData);
        th.style.width = "200px";
        table.appendChild(th);
    }
    for(var i=0;i<result.length;i++) {
        var tr = doc.createElement("tr");
        for (var j = 0; j < result[i].length; j++) {
            var td = doc.createElement("td");
            var insertData = doc.createTextNode(result[i][j]);
            td.appendChild(insertData);
            td.style.width = "200px";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

//��ҳ
var NLDPageBefore = doc.getElementById("NLDPageBefore"),
    NLDPageNext = doc.getElementById("NLDPageNext"),
	NLDPageNum = doc.getElementById("NLDPageNum");

	NLDPageBefore.onclick = function(){
		if(NLDpage==1){alert("�Ѿ��ǵ�һҳ");}
		else{
            NLDpage --;
			//console.log(NLDpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?rowCount="+ NLDnumPer +"&page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  NLDdataSource = data.data;
								  NLDdataTitle = data.header;
								  NLDTotalPage = data.pageCount;

								  NLDPageNum.placeholder = NLDpage;
								  insertNLDTable();
								   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
	NLDPageNext.onclick = function(){
        NLDpage ++;
		var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?rowCount="+ NLDnumPer +"&page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
		//console.log(NLDpage);
		if(NLDpage > NLDTotalPage){
			NLDpage --;
			alert('已经是最后一页');
		}else{
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					NLDdataSource = data.data;
					NLDdataTitle = data.header;
					NLDTotalPage = data.pageCount;

					NLDPageNum.placeholder = NLDpage;
					insertNLDTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}
	}

//�趨ʱ��
NLDsubmitDate.onclick = function () {
    getDate(NLDstartDate,NLDendDate);
    NLDurlStartTime = getDate(NLDstartDate,NLDendDate)[0],
    NLDurlEndTime = getDate(NLDstartDate,NLDendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?rowCount="+ NLDnumPer +"&page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            NLDdataSource = data.data;
            NLDdataTitle = data.header;
			NLDTotalPage = data.pageCount;

			//console.log(NLDdataSource);
            insertNLDTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}


function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

NLDconfirm.onclick = function(){
	tempPage = NLDpage;
	NLDpage = parseFloat(NLDassignPage.value);
	if(isInteger(NLDpage)){
		console.log(NLDpage);
		if(NLDpage <= NLDTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?rowCount="+ NLDnumPer +"&page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					NLDdataSource = data.data;
					NLDdataTitle = data.header;
					NLDTotalPage = data.pageCount;

					NLDPageNum.placeholder = NLDpage;
					insertNLDTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			NLDpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

NLDnumPerPage.onchange = function(){
	var tempPer = NLDnumPer,
		tempTotalPage = NLDTotalPage,
		tempSelected = NLDnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	NLDnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?rowCount="+ NLDnumPer +"&page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			NLDdataSource = data.data;
			NLDdataTitle = data.header;
			NLDTotalPage = data.pageCount;

			if(NLDTotalPage < NLDpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				NLDnumPer = tempPer;
				NLDTotalPage = tempTotalPage;
				for(var i = 0; i < NLDnumPerPage.options.length; i++){
					if(NLDnumPerPage.options[i].innerHTML == tempSelected){
						NLDnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertNLDTable();
			}
			console.log(url2);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

NLDexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuifangfa?&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
}

addLoadEvent(initialPicker(NLDstartDate,NLDendDate));

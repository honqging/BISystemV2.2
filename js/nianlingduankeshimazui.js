var NLDKSTotal = doc.getElementById("NLDKSTotal"),
	NLDKSTotalPage = 0,
	NLDKSnumPerPage = doc.getElementById("NLDKSnumPerPage"),
	NLDKSnumPer = 20,
	NLDKSassignPage = doc.getElementById("NLDKSassignPage"),
	NLDKSconfirm = doc.getElementById("NLDKSconfirm");

var NLDKSloadpage = 1,
	NLDKSdataSource = [],
	NLDKSdataTitle = [],
	doc = document,
	//NLDKSurlStartTime = "2010-01-01",
	NLDKSurlStartTime = month1stDate,
	NLDKSurlEndTime = currentDate,
	NLDKSurl = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?rowCount="+ NLDKSnumPer +"&page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime,
	NLDKSstartDate = doc.getElementById("NLDKSstartTime"),
	NLDKSendDate = doc.getElementById("NLDKSendTime"),
	NLDKSsubmitDate = doc.getElementById("NLDKSsubmitTime");
	NLDKSexport = doc.getElementById("NLDKSexport");

NLDKSstartDate.value = month1stDate;
NLDKSendDate.value = currentDate;

var allData = new Array(9);

$.ajax({
          type: "get",
          url: NLDKSurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
			  NLDKSdataSource = data.data;
			  NLDKSdataTitle = data.header;
			  NLDKSTotalPage = data.pageCount;

			  insertNLDKSTable();
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });

function insertNLDKSTable(){
	var table = doc.getElementById("NLDKS_table");
	var thead = doc.getElementById("NLDKS_table_head");
	table.innerHTML = '';
	thead.innerHTML = '';
	//add table head
	var top = doc.getElementById('NLDKS_table_top');
	if(NLDKSloadpage != 1){
		top.style.display = 'none';
	}else{
		top.style.display = 'block';
	}
	var td = doc.createElement('td'),
		span = doc.createElement('span');
	span.innerHTML = '🔝';
	td.appendChild(span);
	td.style.width = '2%';
	thead.appendChild(td);

	for(var t=0;t<NLDKSdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(NLDKSdataTitle[t]);
		th.appendChild(thData);
		if(t==0){
			th.style.width = '23%';
		}else{
			th.style.width = '10%';
		}

		thead.appendChild(th);
	}

	// add a row containing total number of operation methods
	var tr = doc.createElement("tr");

	// display summation: statistic data
	//var allData = new Array(8);
	allData[0] = '';
	allData[1] = "合计";
	for(var i=2; i<allData.length; i++){
		allData[i] = 0;
	}

	//console.log("NLDKSdataSource.length" + NLDKSdataSource[0].length);
	for(var i=2;i<allData.length;i++){
		for(var j=0; j<NLDKSdataSource.length; j++){
			allData[i] += NLDKSdataSource[j][i-1];
		}
	}
	var data = new Array(9);
	for(var q=0; q<data.length; q++){
		data[q] = doc.createTextNode(allData[q]);
	}

	for(var t=0; t<data.length; t++){
		var td = doc.createElement("td");
		td.title = data[t];
		td.appendChild(data[t]);
		tr.appendChild(td);
	}
	table.appendChild(tr);

	// add data rows
	for(var i=0;i<NLDKSdataSource.length;i++){
		var tr = doc.createElement("tr");

		var td = doc.createElement('td'),
			span = doc.createElement('span');
		span.innerHTML = '🔝';
		td.appendChild(span);
		td.style.width = '2%';
		tr.appendChild(td);
		tr.onclick = function(){
			$(this).find('span').css('visibility', 'visible');
		};
		td.onclick = function(){
			if($(this).find('span').css('background-color') != 'rgb(255, 255, 0)'){
				$('#NLDKS_table_top').prepend($(this).parent().clone(true));
				$(this).find('span').css('background-color', 'yellow');
				$(this).find('span').css('visibility', 'hidden');

				alert('成功置顶');
			}else{
				alert('该项已置顶');
			}
		};

		for(var j=0;j<NLDKSdataSource[i].length;j++){
			var data;
			if(NLDKSdataSource[i][j] == 0){
				data = doc.createTextNode("");
			}else{
				data = doc.createTextNode(NLDKSdataSource[i][j]);
			}
			var td = doc.createElement("td");
			if(j>0){
				var a = doc.createElement("a");
				td.title = NLDKSdataSource[i][j];
				a.appendChild(data);
				td.appendChild(data);
				td.style.width = '10%';
			}else{
				td.title = NLDKSdataSource[i][j];
				td.appendChild(data);
				td.style.width = '23%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	NLDKSTotal.innerHTML = NLDKSTotalPage;
}

var NLDKSbeforePage = doc.getElementById("NLDKSPageBefore"),
	NLDKSnextPage = doc.getElementById("NLDKSPageNext"),
	NLDKSPageNum = doc.getElementById("NLDKSPageNum");

	NLDKSbeforePage.onclick = function(){
		if(NLDKSloadpage==1){alert("已经是第一页");}
		else{
			NLDKSloadpage --;
			//console.log(NLDKSloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?rowCount="+ NLDKSnumPer +"&page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  NLDKSdataSource = data.data;
					  NLDKSdataTitle = data.header;
					  NLDKSTotalPage = data.pageCount;

					  NLDKSPageNum.placeholder = NLDKSloadpage;
					  insertNLDKSTable();
					  NLDKSEcharts();
				  },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
NLDKSnextPage.onclick = function(){
	NLDKSloadpage ++;
	var url2 = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?rowCount="+ NLDKSnumPer +"&page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime;
	if(NLDKSloadpage > NLDKSTotalPage){
		NLDKSloadpage --;
		alert('已经是最后一页');
	}else{
		$.ajax({
			type: "get",
			url: url2,
			dataType: "json",
			jsonp:"callback",
			success: function (data) {
				NLDKSdataSource = data.data;
				NLDKSdataTitle = data.header;
				NLDKSTotalPage = data.pageCount;

				NLDKSPageNum.placeholder = NLDKSloadpage;
				insertNLDKSTable();
				NLDKSEcharts();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
}

// 设定时间
NLDKSsubmitDate.onclick = function () {
    getDate(NLDKSstartDate,NLDKSendDate);
	NLDKSurlStartTime = getDate(NLDKSstartDate,NLDKSendDate)[0],
	NLDKSurlEndTime = getDate(NLDKSstartDate,NLDKSendDate)[1];
	NLDKSloadpage = 1;
	var urlTime = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?rowCount="+ NLDKSnumPer +"&page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
			NLDKSdataSource = data.data;
			NLDKSdataTitle = data.header;
			NLDKSTotalPage = data.pageCount;

			//console.log(NLDKSdataSource);
			doc.getElementById('NLDKS_table_top').innerHTML = '';
			insertNLDKSTable();
			NLDKSEcharts();
		},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

NLDKSconfirm.onclick = function(){
	tempPage = NLDKSloadpage;
	NLDKSloadpage = parseFloat(NLDKSassignPage.value);
	if(isInteger(NLDKSloadpage)){
		console.log(NLDKSloadpage);
		if(NLDKSloadpage <= NLDKSTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?rowCount="+ NLDKSnumPer +"&page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					NLDKSdataSource = data.data;
					NLDKSdataTitle = data.header;
					NLDKSTotalPage = data.pageCount;
					NLDKSPageNum.placeholder = NLDKSloadpage;
					insertNLDKSTable();
					NLDKSEcharts();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			NLDKSloadpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

NLDKSnumPerPage.onchange = function(){
	var tempPer = NLDKSnumPer,
		tempTotalPage = NLDKSTotalPage,
		tempSelected = NLDKSnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	NLDKSnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?rowCount="+ NLDKSnumPer +"&page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			NLDKSdataSource = data.data;
			NLDKSdataTitle = data.header;
			NLDKSTotalPage = data.pageCount;

			if(NLDKSTotalPage < NLDKSloadpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				NLDKSnumPer = tempPer;
				NLDKSTotalPage = tempTotalPage;
				for(var i = 0; i < NLDKSnumPerPage.options.length; i++){
					if(NLDKSnumPerPage.options[i].innerHTML == tempSelected){
						NLDKSnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertNLDKSTable();
				NLDKSEcharts();
			}
			console.log(url2);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

NLDKSexport.onclick = function () {
    // no interface yet, add later
    window.location="http://123.206.134.34:8080/Medicals_war/export/keshinianlingduan?startTime=" + NLDKSurlStartTime + "&endTime=" + NLDKSurlEndTime;
}

addLoadEvent(initialPicker(NLDKSstartDate,NLDKSendDate));

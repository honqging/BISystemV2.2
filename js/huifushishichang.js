var HFSSCTotal = doc.getElementById("HFSSCTotal"),
	HFSSCTotalPage = 0,
	HFSSCnumPerPage = doc.getElementById("HFSSCnumPerPage"),
	HFSSCnumPer = 20,
	HFSSCassignPage = doc.getElementById("HFSSCassignPage"),
	HFSSCconfirm = doc.getElementById("HFSSCconfirm");

var HFSSCloadpage = 1,
	HFSSCdataSource = [],
	HFSSCdataTitle = [],
	doc = document,
	//HFSSCurlStartTime = "2010-01-01",
	HFSSCurlStartTime = month1stDate,
	HFSSCurlEndTime = currentDate,
	HFSSCurl = "http://123.206.134.34:8080/Medicals_war/recovery/morethan1hour?rowCount="+ HFSSCnumPer +"&page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime,
	HFSSCstartDate = doc.getElementById("HFSSCstartTime"),
	HFSSCendDate = doc.getElementById("HFSSCendTime"),
	HFSSCsubmitDate = doc.getElementById("HFSSCsubmitTime");
	HFSSCexport = doc.getElementById("HFSSCexport");

HFSSCstartDate.value = month1stDate;
HFSSCendDate.value = currentDate;

$.ajax({
          type: "get",
          url: HFSSCurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
			  HFSSCdataSource = data.data;
			  HFSSCdataTitle = data.header;
			  HFSSCTotalPage = data.pageCount;

			  insertHFSSCTable();
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });

function insertHFSSCTable(){
	var table = doc.getElementById("HFSSC_table");
	var thead = doc.getElementById("HFSSC_table_head");
	table.innerHTML = '';
	thead.innerHTML = '';

	//add table head
	var top = doc.getElementById('HFSSC_table_top');
	if(HFSSCloadpage != 1){
		top.style.display = 'none';
	}else{
		top.style.display = 'block';
	}

	for(var rows=0; rows<2; rows++) {
		var trHead = doc.createElement("tr");
		for (var t = 0; t < HFSSCdataTitle.length-1; t++) {


			var th = doc.createElement("th");
			var	thData;
			if(rows == 0){
				if(t == 0){
					var pp = doc.createElement('div');
					//span.innerHTML = '🔝';
					th.appendChild(pp);
					pp.style.width = '10%';
					pp.style.float = 'left';
					pp.style.padding = '8px';
					//trHead.appendChild(th);

					thData = doc.createTextNode(HFSSCdataTitle[t]);
					th.appendChild(thData);
					th.rowSpan = '2';
					th.style.width = '22%';
					th.style.verticalAlign = "middle";
					th.style.borderRight = '1px #D6D6D6 solid';
					th.id = "tdd";
				}else if(t == 1){
					thData = doc.createTextNode("超过一小时");
					th.appendChild(thData);
					th.colSpan = '2';
					th.style.width = '30%';
				}
			}else if(rows == 1){
				thData = doc.createTextNode(HFSSCdataTitle[t+1]);
				th.appendChild(thData);
				th.style.width = '15%';
			}
			th.style.textAlign = "center";
			trHead.appendChild(th);
		}
		thead.appendChild(trHead);
	}

	// add a row containing total number of operation methods
	var tr = doc.createElement("tr");

	// allOpe: the total number of operation
	// allEmergentOpe: the total number of emergent operation
	// allChangeOpe: the total number of changing data operation
	var allOpe = 0,
		allEmergentOpe = 0,
		allChangeOpe = 0;

	console.log(HFSSCdataSource.length);

	for(var i=0;i<HFSSCdataSource.length;i++){
		allOpe += HFSSCdataSource[i][1];
		allEmergentOpe += HFSSCdataSource[i][2];
		allChangeOpe += HFSSCdataSource[i][3];
	}
	var data = new Array(4);
	data[0] = doc.createTextNode(''),
	data[1] = doc.createTextNode("合计"),
	data[2] = doc.createTextNode(allOpe),
	data[3] = doc.createTextNode(allEmergentOpe);

	for(var t=0; t<data.length; t++){
		var td = doc.createElement("td");
		td.title = data[t];
		td.appendChild(data[t]);
		if(t==0){
			td.style.padding = '8px';
		}
		if(t>0){
			td.style.textAlign = "center";
		}
		tr.appendChild(td);
	}
	table.appendChild(tr);

	// ***************before detail a, now with td
	// add data rows
	for(var i=0;i<HFSSCdataSource.length;i++){
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
				$('#HFSSC_table_top').prepend($(this).parent().clone(true));
				$(this).find('span').css('background-color', 'yellow');
				$(this).find('span').css('visibility', 'hidden');

				alert('成功置顶');
			}else{
				alert('该项已置顶');
			}
		};

		for(var j=0;j<HFSSCdataSource[i].length;j++){
			var data = doc.createTextNode(HFSSCdataSource[i][j]);
			var td = doc.createElement("td");
			if(j>0){
				var a = doc.createElement("a");
				td.title = HFSSCdataSource[i][j];
				a.appendChild(data);
				td.appendChild(data);
				td.style.textAlign = "center";
			}else{
				td.title = HFSSCdataSource[i][j];
				td.appendChild(data);
			}
			if(j==0){
				td.style.width = '20%';
			}else{
				td.style.width = '15%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	HFSSCTotal.innerHTML = HFSSCTotalPage;
}

//��ҳ
var HFSSCbeforePage = doc.getElementById("HFSSCPageBefore"),
	HFSSCnextPage = doc.getElementById("HFSSCPageNext"),
	HFSSCPageNum = doc.getElementById("HFSSCPageNum");

	HFSSCbeforePage.onclick = function(){
		if(HFSSCloadpage==1){alert("已经是第一页");}
		else{
			HFSSCloadpage --;
			//console.log(HFSSCloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/recovery/morethan1hour?rowCount="+ HFSSCnumPer +"&page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  HFSSCdataSource = data.data;
					  HFSSCdataTitle = data.header;
					  HFSSCTotalPage = data.pageCount;

					  HFSSCPageNum.placeholder = HFSSCloadpage;
					  insertHFSSCTable();
					   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
HFSSCnextPage.onclick = function(){
	HFSSCloadpage ++;
	var url2 = "http://123.206.134.34:8080/Medicals_war/recovery/morethan1hour?rowCount="+ HFSSCnumPer +"&page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
	if(HFSSCloadpage > HFSSCTotalPage){
		HFSSCloadpage --;
		alert('已经是最后一页');
	}else {
		$.ajax({
			type: "get",
			url: url2,
			dataType: "json",
			jsonp: "callback",
			success: function (data) {
				HFSSCdataSource = data.data;
				HFSSCdataTitle = data.header;
				HFSSCTotalPage = data.pageCount;

				HFSSCPageNum.placeholder = HFSSCloadpage;
				insertHFSSCTable();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
}

// 按日期搜索
HFSSCsubmitDate.onclick = function () {
    getDate(HFSSCstartDate,HFSSCendDate);
	HFSSCurlStartTime = getDate(HFSSCstartDate,HFSSCendDate)[0],
	HFSSCurlEndTime = getDate(HFSSCstartDate,HFSSCendDate)[1];
	HFSSCloadpage = 1;
	var urlTime = "http://123.206.134.34:8080/Medicals_war/recovery/morethan1hour?rowCount="+ HFSSCnumPer +"&page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
			HFSSCdataSource = data.data;
			HFSSCdataTitle = data.header;
			HFSSCTotalPage = data.pageCount;

			//console.log(HFSSCdataSource);
			doc.getElementById('HFSSC_table_top').innerHTML = '';
			insertHFSSCTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

HFSSCconfirm.onclick = function(){
	tempPage = HFSSCloadpage;
	HFSSCloadpage = parseFloat(HFSSCassignPage.value);
	if(isInteger(HFSSCloadpage)){
		console.log(HFSSCloadpage);
		if(HFSSCloadpage <= HFSSCTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/recovery/morethan1hour?rowCount="+ HFSSCnumPer +"&page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					HFSSCdataSource = data.data;
					HFSSCdataTitle = data.header;
					HFSSCTotalPage = data.pageCount;
					HFSSCPageNum.placeholder = HFSSCloadpage;
					insertHFSSCTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			HFSSCloadpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

HFSSCnumPerPage.onchange = function(){
	var tempPer = HFSSCnumPer,
		tempTotalPage = HFSSCTotalPage,
		tempSelected = HFSSCnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	HFSSCnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/recovery/morethan1hour?rowCount="+ HFSSCnumPer +"&page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			HFSSCdataSource = data.data;
			HFSSCdataTitle = data.header;
			HFSSCTotalPage = data.pageCount;

			if(HFSSCTotalPage < HFSSCloadpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				HFSSCnumPer = tempPer;
				HFSSCTotalPage = tempTotalPage;
				for(var i = 0; i < HFSSCnumPerPage.options.length; i++){
					if(HFSSCnumPerPage.options[i].innerHTML == tempSelected){
						HFSSCnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertHFSSCTable();
			}
			console.log(url2);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

HFSSCexport.onclick = function () {
    // no interface yet, add later
    window.location="http://123.206.134.34:8080/Medicals_war/export/morethan1hour?startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
}

addLoadEvent(initialPicker(HFSSCstartDate,HFSSCendDate));

var ASSMCZLTJTotal = doc.getElementById("ASSMCZLTJTotal"),
	ASSMCZLTJTotalPage = 0,
	ASSMCZLTJnumPerPage = doc.getElementById("ASSMCZLTJnumPerPage"),
	ASSMCZLTJnumPer = 20,
	ASSMCZLTJassignPage = doc.getElementById("ASSMCZLTJassignPage"),
	ASSMCZLTJconfirm = doc.getElementById("ASSMCZLTJconfirm");

var ASSMCZLTJloadpage = 1,
	ASSMCZLTJdataSource = [],
	ASSMCZLTJdataTitle = [],
	doc = document,
	//ASSMCZLTJurlStartTime = "2010-01-01",
	ASSMCZLTJurlStartTime = month1stDate,
	ASSMCZLTJurlEndTime = currentDate,
	ASSMCZLTJurl = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?rowCount="+ ASSMCZLTJnumPer +"&page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime,
	ASSMCZLTJstartDate = doc.getElementById("ASSMCZLTJstartTime"),
	ASSMCZLTJendDate = doc.getElementById("ASSMCZLTJendTime"),
	ASSMCZLTJsubmitDate = doc.getElementById("ASSMCZLTJsubmitTime");
	ASSMCZLTJexport = doc.getElementById("ASSMCZLTJexport");

ASSMCZLTJstartDate.value = month1stDate;
ASSMCZLTJendDate.value = currentDate;

var ASSMCZLTJTopList = new Array();

$.ajax({
          type: "get",
          url: ASSMCZLTJurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
			  ASSMCZLTJdataSource = data.data;
			  ASSMCZLTJdataTitle = data.header;
			  ASSMCZLTJTotalPage = data.pageCount;

			  insertASSMCZLTJTable();
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertASSMCZLTJTable(){
	//console.log("手术名称");
	//创建表格
	var table = doc.getElementById("ASSMCZLTJ_table");
	var thead = doc.getElementById("ASSMCZLTJ_table_head");
	table.innerHTML = '';
	thead.innerHTML = '';
	//单独添加表头
	var top = doc.getElementById('ASSMCZLTJ_table_top');
	if(ASSMCZLTJloadpage != 1){
		top.style.display = 'none';
	}else{
		top.style.display = 'block';
	}
	var td = doc.createElement('td'),
		span = doc.createElement('span');
	span.innerHTML = '🔝';
	td.appendChild(span);
	td.style.width = '2%';
	td.style.padding = '8px';
	thead.appendChild(td);

	for(var t=0;t<ASSMCZLTJdataTitle.length+1;t++){
		var th = doc.createElement("th");
		if(t<ASSMCZLTJdataTitle.length){
			thData = doc.createTextNode(ASSMCZLTJdataTitle[t]);
		}else{
			thData = doc.createTextNode('');
		}
		th.appendChild(thData);
		if(t==0){
			th.style.width = '30%';
		}else if(t==ASSMCZLTJdataTitle.length){
			th.style.width = '48%';
		}else{
			th.style.width = '10%';
		}
		thead.appendChild(th);
	}
	for(var i=0;i<ASSMCZLTJdataSource.length;i++){
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

		var tdIndexTemp = (ASSMCZLTJloadpage-1) * ASSMCZLTJnumPer + i + 1;
		if(ASSMCZLTJTopList.indexOf(tdIndexTemp) != -1){
			$(td).find('span').css('background-color', 'yellow');
			$(td).find('span').css('visibility', 'visible');
		}
		//var param = { i: i, page: SSHDpage, numPer: SSHDnumPer };
		var param = { tdIndexTemp: tdIndexTemp };
		$(span).click(param, function(event){
			//var ii = event.data.i,
			//    pp = event.data.page,
			//    np = event.data.numPer;
			//var tdIndex = (pp-1) * np + ii + 1;
			var tdIndex = event.data.tdIndexTemp;
			//console.log('tdIndex', tdIndex, SSHDTopList.indexOf(tdIndex));

			if(ASSMCZLTJTopList.indexOf(tdIndex) == -1){
				$('#ASSMCZLTJ_table_top').prepend($(this).parent().parent().clone(true));
				$(this).css('background-color', 'yellow');
				//$(this).css('visibility', 'hidden');

				alert('成功置顶');
				ASSMCZLTJTopList.push(tdIndex);
			}else{
				alert('该项已置顶');
			}
		});

		for(var j=0;j<ASSMCZLTJdataSource[i].length+1;j++){
			if(j<ASSMCZLTJdataSource[i].length){
				var data = doc.createTextNode(ASSMCZLTJdataSource[i][j]);
			}else{
				var data = doc.createTextNode('');
			}
			var td = doc.createElement("td");
			td.title = ASSMCZLTJdataSource[i][j];
			td.appendChild(data);
			if(j==0){
				td.style.width = '30%';
			}else if(j==ASSMCZLTJdataSource[i].length){
				td.style.width = '48%';
			}else{
				td.style.width = '10%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	ASSMCZLTJTotal.innerHTML = ASSMCZLTJTotalPage;
}

var ASSMCZLTJbeforePage = doc.getElementById("ASSMCZLTJPageBefore"),
	ASSMCZLTJnextPage = doc.getElementById("ASSMCZLTJPageNext"),
	ASSMCZLTJPageNum = doc.getElementById("ASSMCZLTJPageNum");

	ASSMCZLTJbeforePage.onclick = function(){
		if(ASSMCZLTJloadpage==1){alert("已经是第一页");}
		else{
			ASSMCZLTJloadpage --;
			//console.log(ASSMCZLTJloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?rowCount="+ ASSMCZLTJnumPer +"&page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  ASSMCZLTJdataSource = data.data;
					  ASSMCZLTJdataTitle = data.header;
					  ASSMCZLTJTotalPage = data.pageCount;

					  ASSMCZLTJPageNum.placeholder = ASSMCZLTJloadpage;
					  insertASSMCZLTJTable();
					   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
ASSMCZLTJnextPage.onclick = function(){
	ASSMCZLTJloadpage ++;
	var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?rowCount="+ ASSMCZLTJnumPer +"&page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
	if(ASSMCZLTJloadpage > ASSMCZLTJTotalPage){
		ASSMCZLTJloadpage --;
		alert('已经是最后一页');
	}else{
		$.ajax({
			type: "get",
			url: url2,
			dataType: "json",
			jsonp:"callback",
			success: function (data) {
				ASSMCZLTJdataSource = data.data;
				ASSMCZLTJdataTitle = data.header;
				ASSMCZLTJTotalPage = data.pageCount;

				ASSMCZLTJPageNum.placeholder = ASSMCZLTJloadpage;
				insertASSMCZLTJTable();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
}

//�趨ʱ��
ASSMCZLTJsubmitDate.onclick = function () {
	console.log("手术名称类型统计");
    getDate(ASSMCZLTJstartDate,ASSMCZLTJendDate);
	ASSMCZLTJurlStartTime = getDate(ASSMCZLTJstartDate,ASSMCZLTJendDate)[0],
	ASSMCZLTJurlEndTime = getDate(ASSMCZLTJstartDate,ASSMCZLTJendDate)[1];
	ASSMCZLTJloadpage = 1;
	var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?rowCount="+ ASSMCZLTJnumPer +"&page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
			ASSMCZLTJdataSource = data.data;
			ASSMCZLTJdataTitle = data.header;
			ASSMCZLTJTotalPage = data.pageCount;

			//console.log(SMdataSource);
			doc.getElementById('ASSMCZLTJ_table_top').innerHTML = '';
			ASSMCZLTJPageNum.placeholder = 1;
			ASSMCZLTJTopList.length = 0;
			insertASSMCZLTJTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

ASSMCZLTJconfirm.onclick = function(){
	tempPage = ASSMCZLTJloadpage;
	ASSMCZLTJloadpage = parseFloat(ASSMCZLTJassignPage.value);
	if(isInteger(ASSMCZLTJloadpage)){
		console.log(ASSMCZLTJloadpage);
		if(ASSMCZLTJloadpage <= ASSMCZLTJTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?rowCount="+ ASSMCZLTJnumPer +"&page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					ASSMCZLTJdataSource = data.data;
					ASSMCZLTJdataTitle = data.header;
					ASSMCZLTJTotalPage = data.pageCount;
					ASSMCZLTJPageNum.placeholder = ASSMCZLTJloadpage;
					insertASSMCZLTJTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			ASSMCZLTJloadpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

ASSMCZLTJnumPerPage.onchange = function(){
	var tempPer = ASSMCZLTJnumPer,
		tempTotalPage = ASSMCZLTJTotalPage,
		tempSelected = ASSMCZLTJnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	ASSMCZLTJnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?rowCount="+ ASSMCZLTJnumPer +"&page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			ASSMCZLTJdataSource = data.data;
			ASSMCZLTJdataTitle = data.header;
			ASSMCZLTJTotalPage = data.pageCount;

			if(ASSMCZLTJTotalPage < ASSMCZLTJloadpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				ASSMCZLTJnumPer = tempPer;
				ASSMCZLTJTotalPage = tempTotalPage;
				for(var i = 0; i < ASSMCZLTJnumPerPage.options.length; i++){
					if(ASSMCZLTJnumPerPage.options[i].innerHTML == tempSelected){
						ASSMCZLTJnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertASSMCZLTJTable();
			}
			console.log(url2);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

ASSMCZLTJexport.onclick = function () {
    // no interface yet, add later
    window.location="http://123.206.134.34:8080/Medicals_war/export/shoushumingcheng?&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
}

addLoadEvent(initialPicker(ASSMCZLTJstartDate,ASSMCZLTJendDate));

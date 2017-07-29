var MZJZZQTotal = doc.getElementById("MZJZZQTotal"),
	MZJZZQTotalPage = 0,
	MZJZZQnumPerPage = doc.getElementById("MZJZZQnumPerPage"),
	MZJZZQnumPer = 20,
	MZJZZQassignPage = doc.getElementById("MZJZZQassignPage"),
	MZJZZQconfirm = doc.getElementById("MZJZZQconfirm");

var MZJZZQloadpage = 1,
	MZJZZQdataSource = [],
	MZJZZQdataTitle = [],
	doc = document,
	//MZJZZQurlStartTime = "2010-01-01",
	MZJZZQurlStartTime = month1stDate,
	MZJZZQurlEndTime = currentDate,
	MZJZZQurl = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?rowCount="+ MZJZZQnumPer +"&page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime,
	MZJZZQstartDate = doc.getElementById("MZJZZQstartTime"),
	MZJZZQendDate = doc.getElementById("MZJZZQendTime"),
	MZJZZQsubmitDate = doc.getElementById("MZJZZQsubmitTime");
	MZJZZQexport = doc.getElementById("MZJZZQexport");

MZJZZQstartDate.value = month1stDate;
MZJZZQendDate.value = currentDate;

var MZJZZQTopList = new Array();

$.ajax({
          type: "get",
          url: MZJZZQurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
			  MZJZZQdataSource = data.data;
			  MZJZZQdataTitle = data.header;
			  MZJZZQTotalPage = data.pageCount;

			  insertMZJZZQTable();
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertMZJZZQTable(){
	var table = doc.getElementById("MZJZZQ_table");
	var thead = doc.getElementById("MZJZZQ_table_head");
	table.innerHTML = '';
	thead.innerHTML = '';
	//add table head
	var top = doc.getElementById('MZJZZQ_table_top');
	if(MZJZZQloadpage != 1){
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

	for(var t=0;t<MZJZZQdataTitle.length+1;t++){
		var th = doc.createElement("th");
		if(t<MZJZZQdataTitle.length){
			thData = doc.createTextNode(MZJZZQdataTitle[t]);
		}else{
			thData = doc.createTextNode('');
		}
		th.appendChild(thData);
		if(t==0){
			th.style.width = '20%';
		}else if(t==MZJZZQdataTitle.length){
			th.style.width = '48%';
		}else{
			th.style.width = '10%';
		}
		thead.appendChild(th);
	}

	// add a row containing total number of operation methods
	var tr = doc.createElement("tr");

	// allOpe: the total number of operation
	// allEmergentOpe: the total number of emergent operation
	// allChangeOpe: the total number of changing data operation
	var allOpe = 0,
		allEmergentOpe = 0,
		allChangeOpe = 0;

	console.log(MZJZZQdataSource.length);

	for(var i=0;i<MZJZZQdataSource.length;i++){
		allOpe += MZJZZQdataSource[i][1];
		allEmergentOpe += MZJZZQdataSource[i][2];
		allChangeOpe += MZJZZQdataSource[i][3];
	}
	var data = new Array(6);
	data[0] = doc.createTextNode(''),
	data[1] = doc.createTextNode("合计"),
	data[2] = doc.createTextNode(allOpe),
	data[3] = doc.createTextNode(allEmergentOpe),
	data[4] = doc.createTextNode(allChangeOpe);
	data[5] = doc.createTextNode('');

	for(var t=0; t<data.length; t++){
		var td = doc.createElement("td");
		td.title = data[t];
		if(t==0){
			td.style.padding = '8px';
		}
		td.appendChild(data[t]);
		tr.appendChild(td);
	}
	table.appendChild(tr);

	// **************used a before, now use td
	// add data rows
	for(var i=0;i<MZJZZQdataSource.length;i++){
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

		var tdIndexTemp = (MZJZZQloadpage-1) * MZJZZQnumPer + i + 1;
		if(MZJZZQTopList.indexOf(tdIndexTemp) != -1){
			$(td).find('span').css('background-color', 'yellow');
			$(td).find('span').css('visibility', 'visible');
		}
		//var param = { i: i, page: SSHDpage, numPer: SSHDnumPer };
		var param = { tdIndexTemp: tdIndexTemp };
		$(td).click(param, function(event){
			//var ii = event.data.i,
			//    pp = event.data.page,
			//    np = event.data.numPer;
			//var tdIndex = (pp-1) * np + ii + 1;
			var tdIndex = event.data.tdIndexTemp;
			//console.log('tdIndex', tdIndex, SSHDTopList.indexOf(tdIndex));

			if(MZJZZQTopList.indexOf(tdIndex) == -1){
				$('#MZJZZQ_table_top').prepend($(this).parent().clone(true));
				$(this).find('span').css('background-color', 'yellow');
				$(this).find('span').css('visibility', 'hidden');

				alert('成功置顶');
				MZJZZQTopList.push(tdIndex);
			}else{
				alert('该项已置顶');
			}
		});

		for(var j=0;j<MZJZZQdataSource[i].length+1;j++){
			if(j<MZJZZQdataSource[i].length){
				var data = doc.createTextNode(MZJZZQdataSource[i][j]);
			}else{
				var data = doc.createTextNode('');
			}
			var td = doc.createElement("td");
			if(j>1){
				var a = doc.createElement("a");
				td.title = MZJZZQdataSource[i][j];
				a.appendChild(data);
				td.appendChild(data);
			}else{
				td.title = MZJZZQdataSource[i][j];
				td.appendChild(data);
			}
			if(j==0){
				td.style.width = '20%';
			}else if(j==MZJZZQdataSource[i].length){
				td.style.width = '48%';
			}else{
				td.style.width = '10%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	MZJZZQTotal.innerHTML = MZJZZQTotalPage;
}

//��ҳ
var MZJZZQbeforePage = doc.getElementById("MZJZZQPageBefore"),
	MZJZZQnextPage = doc.getElementById("MZJZZQPageNext"),
	MZJZZQPageNum = doc.getElementById("MZJZZQPageNum");

	MZJZZQbeforePage.onclick = function(){
		if(MZJZZQloadpage==1){alert("已经是第一页");}
		else{
			MZJZZQloadpage --;
			//console.log(MZJZZQloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?rowCount="+ MZJZZQnumPer +"&page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  MZJZZQdataSource = data.data;
					  MZJZZQdataTitle = data.header;
					  MZJZZQTotalPage = data.pageCount;

					  MZJZZQPageNum.placeholder = MZJZZQloadpage;
					  insertMZJZZQTable();
					   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
MZJZZQnextPage.onclick = function(){
	MZJZZQloadpage ++;
	var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?rowCount="+ MZJZZQnumPer +"&page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
	if(MZJZZQloadpage > MZJZZQTotalPage){
		MZJZZQloadpage --;
		alert('已经是最后一页');
	}else{
		$.ajax({
			type: "get",
			url: url2,
			dataType: "json",
			jsonp:"callback",
			success: function (data) {
				MZJZZQdataSource = data.data;
				MZJZZQdataTitle = data.header;
				MZJZZQTotalPage = data.pageCount;

				MZJZZQPageNum.placeholder = MZJZZQloadpage;
				insertMZJZZQTable();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
}

//�趨ʱ��
MZJZZQsubmitDate.onclick = function () {
    getDate(MZJZZQstartDate,MZJZZQendDate);
	MZJZZQurlStartTime = getDate(MZJZZQstartDate,MZJZZQendDate)[0],
	MZJZZQurlEndTime = getDate(MZJZZQstartDate,MZJZZQendDate)[1];
	MZJZZQloadpage = 1;
	var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?rowCount="+ MZJZZQnumPer +"&page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
			MZJZZQdataSource = data.data;
			MZJZZQdataTitle = data.header;
			MZJZZQTotalPage = data.pageCount;

			//console.log(MZJZZQdataSource);
			doc.getElementById('MZJZZQ_table_top').innerHTML = '';
			MZJZZQTopList.length = 0;
			insertMZJZZQTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

MZJZZQconfirm.onclick = function(){
	tempPage = MZJZZQloadpage;
	MZJZZQloadpage = parseFloat(MZJZZQassignPage.value);
	if(isInteger(MZJZZQloadpage)){
		console.log(MZJZZQloadpage);
		if(MZJZZQloadpage <= MZJZZQTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?rowCount="+ MZJZZQnumPer +"&page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					MZJZZQdataSource = data.data;
					MZJZZQdataTitle = data.header;
					MZJZZQTotalPage = data.pageCount;
					MZJZZQPageNum.placeholder = MZJZZQloadpage;
					insertMZJZZQTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			MZJZZQloadpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

MZJZZQnumPerPage.onchange = function(){
	var tempPer = MZJZZQnumPer,
		tempTotalPage = MZJZZQTotalPage,
		tempSelected = MZJZZQnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	MZJZZQnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?rowCount="+ MZJZZQnumPer +"&page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			MZJZZQdataSource = data.data;
			MZJZZQdataTitle = data.header;
			MZJZZQTotalPage = data.pageCount;

			if(MZJZZQTotalPage < MZJZZQloadpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				MZJZZQnumPer = tempPer;
				MZJZZQTotalPage = tempTotalPage;
				for(var i = 0; i < MZJZZQnumPerPage.options.length; i++){
					if(MZJZZQnumPerPage.options[i].innerHTML == tempSelected){
						MZJZZQnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertMZJZZQTable();
			}
			console.log(url2);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

MZJZZQexport.onclick = function () {
    // no interface yet, add later
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuijizhenzeqi?&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
}

addLoadEvent(initialPicker(MZJZZQstartDate,MZJZZQendDate));

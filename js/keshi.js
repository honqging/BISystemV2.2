var KSTotal = doc.getElementById("KSTotal"),
	KSTotalPage = 0,
	KSnumPerPage = doc.getElementById("KSnumPerPage"),
	KSnumPer = 20,
	KSassignPage = doc.getElementById("KSassignPage"),
	KSconfirm = doc.getElementById("KSconfirm");

var KSpage = 1,
	KSdataSource = [],
	KSdataTitle = [],
	doc = document,
	//KSurlStartTime = "2010-01-01",
	KSurlStartTime = month1stDate,
    KSurlEndTime = currentDate,
    KSurl = "http://123.206.134.34:8080/Medicals_war/statistic/keshi?rowCount="+ KSnumPer +"&page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime,
	KSCharts1url = "http://123.206.134.34:8080/Medicals_war/statistic/keshiChart?rowCount="+ 20 +"&page="+KSpage+"&type=0"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime,
	KSCharts2url = "http://123.206.134.34:8080/Medicals_war/statistic/keshiChart?rowCount="+ 20 +"&page="+KSpage+"&type=1"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime,
    KSstartDate = doc.getElementById("KSGZLstartTime"),
    KSendDate = doc.getElementById("KSGZLendTime"),
    KSsubmitDate = doc.getElementById("KSsubmitTime");
    KSexport = doc.getElementById("KSGZLexport");

var pageD = 1,
	totalPageD = 0;

KSstartDate.value = month1stDate;
KSendDate.value = currentDate;

$.ajax({
          type: "get",
          url: KSurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  KSdataSource = data.data;
						  KSdataTitle = data.header;
						  KSTotalPage = data.pageCount;

						  //console.log(KSdataSource);
						  insertKSTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertKSTable(){
	var table = doc.getElementById("KSGZL_table");
	var thead = doc.getElementById("KSGZL_table_head");

	table.innerHTML = '';
	thead.innerHTML = '';

	//单独添加表头
	var top = doc.getElementById('KSGZL_table_top');
	if(KSpage != 1){
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

	for(var t=0;t<KSdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(KSdataTitle[t]);
		th.appendChild(thData);
		if(t==0){
			th.style.width = '18%';
		}else{
			th.style.width = '10%';
		}
		thead.appendChild(th);
	}
	for(var i=0;i<KSdataSource.length;i++){
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
				$('#KSGZL_table_top').prepend($(this).parent().clone(true));
				$(this).find('span').css('background-color', 'yellow');
				$(this).find('span').css('visibility', 'hidden');

				alert('成功置顶');
			}else{
				alert('该项已置顶');
			}
		};

		for(var j=0;j<KSdataSource[i].length;j++){
			if(j !== 0 && j!==6){
				//console.log(KSdataSource[i][j]);
				var data = doc.createTextNode(KSdataSource[i][j]),
					a = doc.createElement("a"),
					td = doc.createElement("td");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","modal");
				a.setAttribute("data-target","#keshiD");
				a.office = KSdataSource[i][0];
				a.level = KSdataTitle[j];
				var param = { department: a.office, feature: a.level };
				$(a).click(param, function(event){
					var department = event.data.department,
						feature = event.data.feature;

					pageD = 1;
					totalPageD = 0;
					//console.log(pageD, 'pageDDDD');
					doc.getElementById('KSTotalD').innerHTML = '';
					doc.getElementById('KSassignPageD').value = '';
					doc.getElementById('KSpageNumD').placeholder = 1;

					$('#keshiDTable').html('loading...');
					displayDetail(department, feature);

					doc.getElementById('KSpageBeforeD').onclick = function(){
						if(pageD == 1){
							alert('已经是第一页');
						}else{
							doc.getElementById('KSpageNumD').placeholder = --pageD;
							displayDetail(department, feature);
						}
					};

					doc.getElementById('KSpageNextD').onclick = function(){
						if(pageD >= totalPageD){
							alert('已经是最后一页');
						}else{
							//console.log('pageD', pageD, totalPageD);
							pageD++;
							doc.getElementById('KSpageNumD').placeholder = pageD;
							displayDetail(department, feature);
							//console.log('pageD2', pageD, totalPageD);

						}
					};

					doc.getElementById('KSconfirmD').onclick = function(){
						var tempPage = pageD;
						pageD = parseFloat(doc.getElementById('KSassignPageD').value);
						if(isInteger(pageD)){
							if(pageD <= totalPageD){
								doc.getElementById('KSpageNumD').placeholder = pageD;
								displayDetail(department, feature);
							}else{
								pageD = tempPage;
								alert('超出页数上限，请重新选择页数');
								doc.getElementById('KSassignPageD').value = '';
							}
						}else{
							alert('请输入正整数！')
						}
					};

					function displayDetail(department, feature){
						$.ajax({
							type: "get",
							url: "http://123.206.134.34:8080/Medicals_war/statistic/keshiQuery?rowCount="+ 20 +"&page="+ pageD +"&department="+department+"&feature="+feature+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime,
							dataType: "json",
							jsonp:"callback",
							success: function (data) {
								var result = data.data;
								var title = data.header;
								totalPageD = data.pageCount;
								var table2 = doc.getElementById("keshiDTable");
								table2.innerHTML = '';
								doc.getElementById('KSTotalD').innerHTML = totalPageD;
								insertkeshiSubTable(result,title,table2);
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								alert(errorThrown);
							}
						});
					}
				});
				a.appendChild(data);
				td.appendChild(a);
			}
			else{
                var data = doc.createTextNode(KSdataSource[i][j]);
				var td = doc.createElement("td");
				td.title = KSdataSource[i][j];
				td.appendChild(data);
			}
			if(j==0){
				td.style.width = '18%';
			}else{
				td.style.width = '10%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	KSTotal.innerHTML = KSTotalPage;
}
function insertkeshiSubTable(result,title,table){
    for(var t=0;t<title.length;t++) {
        var th = doc.createElement("th"),
            thData = doc.createTextNode(title[t]);
        th.appendChild(thData);
        table.appendChild(th);
    }
    for(var i=0;i<result.length;i++) {
        var tr = doc.createElement("tr");
        for (var j = 0; j < result[i].length; j++) {
            var td = doc.createElement("td");
            var insertData = doc.createTextNode(result[i][j]);
            td.appendChild(insertData);
			tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

var KSpageBefore = doc.getElementById("KSpageBefore"),
    KSpageNext = doc.getElementById("KSpageNext"),
	KSpageNum = doc.getElementById("KSpageNum");

	KSpageBefore.onclick = function(){
		if(KSpage==1){alert("已经是第一页");}
		else{
            KSpage --;
			//console.log(KSpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/keshi?rowCount="+ KSnumPer +"&page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  KSdataSource = data.data;
					  KSdataTitle = data.header;
					  KSTotalPage = data.pageCount;

					  KSpageNum.placeholder = KSpage;
					  insertKSTable();
				  },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
			KSCharts1url = "http://123.206.134.34:8080/Medicals_war/statistic/keshiChart?rowCount="+ 20 +"&page="+ 1 +"&page="+KSpage+"&type=0"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
			KScharts1();
			KSCharts2url = "http://123.206.134.34:8080/Medicals_war/statistic/keshiChart?rowCount="+ 20 +"&page="+ 1 +"&page="+KSpage+"&type=1"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
			KScharts2();
		}
	}
	KSpageNext.onclick = function(){
        KSpage ++;
		var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/keshi?rowCount="+ KSnumPer +"&page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
		//console.log(KSpage);
		if(KSpage > KSTotalPage){
			KSpage --;
			alert('已经是最后一页');
		}else {
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp: "callback",
				success: function (data) {
					KSdataSource = data.data;
					KSdataTitle = data.header;
					KSTotalPage = data.pageCount;

					KSpageNum.placeholder = KSpage;
					insertKSTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			KSCharts1url = "http://123.206.134.34:8080/Medicals_war/statistic/keshiChart?rowCount=" + 20 + "&page=" + KSpage + "&type=0" + "&startTime=" + KSurlStartTime + "&endTime=" + KSurlEndTime;
			KScharts1();
			KSCharts2url = "http://123.206.134.34:8080/Medicals_war/statistic/keshiChart?rowCount=" + 20 + "&page=" + KSpage + "&type=1" + "&startTime=" + KSurlStartTime + "&endTime=" + KSurlEndTime;
			KScharts2();
		}
	}

KSsubmitDate.onclick = function () {
    getDate(KSstartDate,KSendDate);
    KSurlStartTime = getDate(KSstartDate,KSendDate)[0],
    KSurlEndTime = getDate(KSstartDate,KSendDate)[1];
	KSpage = 1;
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/keshi?rowCount="+ KSnumPer +"&page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            KSdataSource = data.data;
            KSdataTitle = data.header;
			KSTotalPage = data.pageCount;

			//console.log(KSdataSource);
			doc.getElementById('KSGZL_table_top').innerHTML = '';
			insertKSTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
	KSCharts1url = "http://123.206.134.34:8080/Medicals_war/statistic/keshiChart?rowCount="+ 20 +"&page="+KSpage+"&type=0"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
	KSCharts2url = "http://123.206.134.34:8080/Medicals_war/statistic/keshiChart?rowCount="+ 20 +"&page="+KSpage+"&type=1"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
	KScharts1();
	KScharts2();
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

KSconfirm.onclick = function(){
	tempPage = KSpage;
	KSpage = parseFloat(KSassignPage.value);
	if(isInteger(KSpage)){
		console.log(KSpage);
		if(KSpage <= KSTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/keshi?rowCount=" + KSnumPer + "&page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					KSdataSource = data.data;
					KSdataTitle = data.header;
					KSTotalPage = data.pageCount;
					KSpageNum.placeholder = KSpage;
					insertKSTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			KSpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

KSnumPerPage.onchange = function(){
	var tempPer = KSnumPer,
		tempTotalPage = KSTotalPage,
		tempSelected = KSnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	KSnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/keshi?rowCount=" + KSnumPer + "&page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			KSdataSource = data.data;
			KSdataTitle = data.header;
			KSTotalPage = data.pageCount;

			if(KSTotalPage < KSpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				KSnumPer = tempPer;
				KSTotalPage = tempTotalPage;
				for(var i = 0; i < KSnumPerPage.options.length; i++){
					if(KSnumPerPage.options[i].innerHTML == tempSelected){
						KSnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertKSTable();
			}
			console.log(url2);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

KSexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/keshi?&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
}
addLoadEvent(initialPicker(KSstartDate,KSendDate));

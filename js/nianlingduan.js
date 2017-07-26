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

var pageD = 1,
	totalPageD = 0;

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
	var top = doc.getElementById('NLD_table_top');
	if(NLDpage != 1){
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

	for(var t=0;t<NLDdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(NLDdataTitle[t]);
		th.appendChild(thData);
		if(t==0){
			th.style.width = '42%';
		}else{
			th.style.width = '8%';
		}
		thead.appendChild(th);
	}
	for(var i=0;i<NLDdataSource.length;i++){
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
				$('#NLD_table_top').prepend($(this).parent().clone(true));
				$(this).find('span').css('background-color', 'yellow');
				$(this).find('span').css('visibility', 'hidden');

				alert('成功置顶');
			}else{
				alert('该项已置顶');
			}
		};

		for(var j=0;j<NLDdataSource[i].length;j++){
			if(j !== 0){
				var data = doc.createTextNode(NLDdataSource[i][j]),
					a = doc.createElement("a"),
					td = doc.createElement("td");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","modal");
				a.setAttribute("data-target","#NLDD");
                a.method = NLDdataSource[i][0];
                a.age = NLDdataTitle[j];
				var param = { method: a.method, age: a.age };
				$(a).click(param, function(event){
					var result;
					var method = event.data.method,
						age = event.data.age;

					pageD = 1;
					totalPageD = 0;
					//console.log(pageD, 'pageDDDD');
					doc.getElementById('NLDTotalD').innerHTML = '';
					doc.getElementById('NLDassignPageD').value = '';
					doc.getElementById('NLDpageNumD').placeholder = 1;

					$('#NLDDTable').html('loading...');
					//$('#NLDassignPageD').html('');
					displayDetail(method, age);

					doc.getElementById('NLDpageBeforeD').onclick = function(){
						if(pageD == 1){
							alert('已经是第一页');
						}else{
							doc.getElementById('NLDpageNumD').placeholder = --pageD;
							displayDetail(method, age);
						}
					};

					doc.getElementById('NLDpageNextD').onclick = function(){
						if(pageD >= totalPageD){
							alert('已经是最后一页');
						}else{
							console.log('pageD', pageD, totalPageD);
							doc.getElementById('NLDpageNumD').placeholder = ++pageD;
							displayDetail(method, age);
							console.log('pageD2', pageD, totalPageD);

						}
					};

					doc.getElementById('NLDconfirmD').onclick = function(){
						var tempPage = pageD;
						pageD = parseFloat(doc.getElementById('NLDassignPageD').value);
						if(isInteger(pageD)){
							if(pageD <= totalPageD){
								doc.getElementById('NLDpageNumD').placeholder = pageD;
								displayDetail(method, age);
							}else{
								pageD = tempPage;
								alert('超出页数上限，请重新选择页数');
								doc.getElementById('NLDassignPageD').value = '';
							}
						}else{
							alert('请输入正整数！')
						}
					};

					function displayDetail(method, age){
						$.ajax({
							type: "get",
							url: "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfaQuery?rowCount="+ 20 +"&page="+ pageD +"&method="+method.replace(/\+/g, "%2B")+"&age="+age+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime,
							dataType: "json",
							jsonp:"callback",
							success: function (data) {
								var result = data.data;
								var title = data.header;
								totalPageD = data.pageCount;
								var table2 = doc.getElementById("NLDDTable");
								table2.innerHTML = '';
								doc.getElementById('NLDTotalD').innerHTML = totalPageD;
								insertNLDSubTable(result,title,table2);
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
                var data = doc.createTextNode(NLDdataSource[i][j]);
				var td = doc.createElement("td");
				td.title = NLDdataSource[i][j];
				td.appendChild(data);
			}
			if(j==0){
				td.style.width = '42%';
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
		if(NLDpage==1){alert("已经是第一页");}
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
	NLDpage = 1;
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

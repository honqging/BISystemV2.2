var MZYSZGZLTotal = doc.getElementById("MZYSZGZLTotal"),
	MZYSZGZLTotalPage = 0,
	MZYSZGZLnumPerPage = doc.getElementById("MZYSZGZLnumPerPage"),
	MZYSZGZLnumPer = 20,
	MZYSZGZLassignPage = doc.getElementById("MZYSZGZLassignPage"),
	MZYSZGZLconfirm = doc.getElementById("MZYSZGZLconfirm");

var MzDocZongWorkloadpage = 1,
	MZYSZGZLdataSource = [],
	MZYSZGZLdataTitle = [],
	doc = document,
	//MZYSZGZLurlStartTime = "2010-01-01",
	MZYSZGZLurlStartTime = month1stDate,
    MZYSZGZLurlEndTime = currentDate,
    MZYSZGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount="+ MZYSZGZLnumPer +"&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime,
    MZYSZGZLstartDate = doc.getElementById("MZYSZGZLstartTime"),
    MZYSZGZLendDate = doc.getElementById("MZYSZGZLendTime"),
    MZYSZGZLsubmitDate = doc.getElementById("MZYSZGZLsubmitTime");
	MZYSZGZLexport = doc.getElementById("MZYSZGZLexport");

MZYSZGZLstartDate.value = month1stDate;
MZYSZGZLendDate.value = currentDate;

var MZYSZGZLTopList = new Array();

$.ajax({
          type: "get",
          url: MZYSZGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  MZYSZGZLdataSource = data.data;
						  MZYSZGZLdataTitle = data.header;
						  MZYSZGZLTotalPage = data.pageCount;

						  //console.log(MZYSZGZLdataSource);
						  insertMZYSZGZLTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertMZYSZGZLTable(){
	//创建表格
	var table = doc.getElementById("MZYSZGZL_table");
	var thead = doc.getElementById("MZYSZGZL_table_head");
	//var divAll = doc.getElementById("MZYSZGZL");

	table.innerHTML = '';
	thead.innerHTML = '';
	//divAll.style.height = '200px';
	//divAll.style.overflowY = 'scroll';
	//单独添加表头
	var top = doc.getElementById('MZYSZGZL_table_top');
	if(MzDocZongWorkloadpage != 1){
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

	for(var t=0;t<MZYSZGZLdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(MZYSZGZLdataTitle[t]);
		th.style.width = "19%";
		th.appendChild(thData);
		thead.appendChild(th);
	}

	for(var i=0;i<MZYSZGZLdataSource.length;i++){
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

		var tdIndexTemp = (MzDocZongWorkloadpage-1) * MZYSZGZLnumPer + i + 1;
		if(MZYSZGZLTopList.indexOf(tdIndexTemp) != -1){
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
			//console.log('tdIndex', tdIndex, MZYSZGZLTopList.indexOf(tdIndex));

			if(MZYSZGZLTopList.indexOf(tdIndex) == -1){
				var trr = $(this).parent().parent().clone();

				// start to toggle detailed info
				var a = trr.find('a').first()[0];
				a.setAttribute("tabindex","0");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","popover");
				a.setAttribute("data-trigger","focus");
				a.setAttribute("data-placement","top");
				//a.setAttribute("data-content",MZYSGZLtableData[x].groupRows[i][j]);
				a.idd = a.getAttribute('idd');

				var param = { idd: a.idd };
				$(a).click(param, function(event){
					var idd = event.data.idd;
					var result;
					$("[data-toggle='popover']").popover({
						html:true,
						content:'<div id="content2">loading...</div>'
					});
					$.ajax({
						type: "get",
						url: "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzongQuery?name="+idd+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime,
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
							$('#content2').html(wholeDiv);
						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
							alert(errorThrown);
						}
					});
				});
				// end of toggle detailed info

				$('#MZYSZGZL_table_top').prepend(trr);
				$("[data-toggle='popover']").popover({
					html:true,
					content:'<div id="content2">loading...</div>'
				});
				$(this).css('background-color', 'yellow');
				//$(this).css('visibility', 'hidden');

				alert('成功置顶');
				MZYSZGZLTopList.push(tdIndex);
			}else{
				alert('该项已置顶');
			}
		});

		for(var j=0;j<MZYSZGZLdataSource[i].length;j++){
			if(j == MZYSZGZLdataSource[i].length-1){
				var data = doc.createTextNode(MZYSZGZLdataSource[i][j]),
					a = doc.createElement("a"),
					td = doc.createElement("td");
				a.setAttribute("tabindex","0");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","popover");
				a.setAttribute("data-trigger","focus");
				a.setAttribute("data-placement","top");
				a.setAttribute('idd', MZYSZGZLdataSource[i][1]);
				//a.setAttribute("data-content",MZYSZGZLdataSource[i][j]);
				a.id = MZYSZGZLdataSource[i][1];
				$("[data-toggle='popover']").popover({
					html:true,
					content:'<div id="content">loading...</div>'
				});
				var param = { idd: a.id };
				$(a).click(param, function(event){
					var idd = event.data.idd;
					var result;
                    $("[data-toggle='popover']").popover({
                        html:true,
                        content:'<div id="content">loading...</div>'
                    });
                    $.ajax({
                          type: "get",
                          url: "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzongQuery?name="+idd+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime,
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
                });
				a.appendChild(data);
				td.appendChild(a);
			}
			else{
                var data = doc.createTextNode(MZYSZGZLdataSource[i][j]);
				var td = doc.createElement("td");
				td.title = MZYSZGZLdataSource[i][j];
				td.appendChild(data);
			}
			td.style.width = "19%";
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	MZYSZGZLTotal.innerHTML = MZYSZGZLTotalPage;
}

//��ҳ
var MZYSZGZLbeforePage = doc.getElementById("MZYSZGZLPageBefore"),
    MZYSZGZLnextPage = doc.getElementById("MZYSZGZLPageNext"),
	MZYSZGZLPageNum = doc.getElementById("MZYSZGZLPageNum");

	MZYSZGZLbeforePage.onclick = function(){
		if(MzDocZongWorkloadpage==1){alert("已经是第一页");}
		else{
            MzDocZongWorkloadpage --;
			//console.log(MzDocZongWorkloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount="+ MZYSZGZLnumPer +"&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  MZYSZGZLdataSource = data.data;
								  MZYSZGZLdataTitle = data.header;
								  MZYSZGZLTotalPage = data.pageCount;

								  MZYSZGZLPageNum.placeholder = MzDocZongWorkloadpage;
								  insertMZYSZGZLTable();
								   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
	MZYSZGZLnextPage.onclick = function(){
        MzDocZongWorkloadpage ++;
		var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount="+ MZYSZGZLnumPer +"&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
		//console.log(MzDocZongWorkloadpage);
		if(MzDocZongWorkloadpage > MZYSZGZLTotalPage){
			MzDocZongWorkloadpage --;
			alert('已经是最后一页');
		}else {
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp: "callback",
				success: function (data) {
					MZYSZGZLdataSource = data.data;
					MZYSZGZLdataTitle = data.header;
					MZYSZGZLTotalPage = data.pageCount;

					MZYSZGZLPageNum.placeholder = MzDocZongWorkloadpage;
					insertMZYSZGZLTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}
	}

//�趨ʱ��
MZYSZGZLsubmitDate.onclick = function () {
    getDate(MZYSZGZLstartDate,MZYSZGZLendDate);
    MZYSZGZLurlStartTime = getDate(MZYSZGZLstartDate,MZYSZGZLendDate)[0],
    MZYSZGZLurlEndTime = getDate(MZYSZGZLstartDate,MZYSZGZLendDate)[1];
	MzDocZongWorkloadpage = 1;
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount="+ MZYSZGZLnumPer +"&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZYSZGZLdataSource = data.data;
            MZYSZGZLdataTitle = data.header;
			MZYSZGZLTotalPage = data.pageCount;

			//console.log(SMdataSource);
			doc.getElementById('MZYSZGZL_table_top').innerHTML = '';
			MZYSZGZLPageNum.placeholder = 1;
			MZYSZGZLTopList.length = 0;
			insertMZYSZGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

MZYSZGZLconfirm.onclick = function(){
	tempPage = MzDocZongWorkloadpage;
	MzDocZongWorkloadpage = parseFloat(MZYSZGZLassignPage.value);
	if(isInteger(MzDocZongWorkloadpage)){
		console.log(MzDocZongWorkloadpage);
		if(MzDocZongWorkloadpage <= MZYSZGZLTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount=" + MZYSZGZLnumPer + "&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					MZYSZGZLdataSource = data.data;
					MZYSZGZLdataTitle = data.header;
					MZYSZGZLTotalPage = data.pageCount;
					MZYSZGZLPageNum.placeholder = MzDocZongWorkloadpage;
					insertMZYSZGZLTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			MzDocZongWorkloadpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

MZYSZGZLnumPerPage.onchange = function(){
	var tempPer = MZYSZGZLnumPer,
		tempTotalPage = MZYSZGZLTotalPage,
		tempSelected = MZYSZGZLnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	MZYSZGZLnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount=" + MZYSZGZLnumPer + "&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			MZYSZGZLdataSource = data.data;
			MZYSZGZLdataTitle = data.header;
			MZYSZGZLTotalPage = data.pageCount;

			if(MZYSZGZLTotalPage < MzDocZongWorkloadpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				MZYSZGZLnumPer = tempPer;
				MZYSZGZLTotalPage = tempTotalPage;
				for(var i = 0; i < MZYSZGZLnumPerPage.options.length; i++){
					if(MZYSZGZLnumPerPage.options[i].innerHTML == tempSelected){
						MZYSZGZLnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertMZYSZGZLTable();
			}
			console.log(url2);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

MZYSZGZLexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuiyishengzong?&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
}

addLoadEvent(initialPicker(MZYSZGZLstartDate,MZYSZGZLendDate));

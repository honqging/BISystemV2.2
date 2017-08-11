//var ASAurlStartTime = "2010-01-01",
var ASAurlStartTime = month1stDate,
	ASAurlEndTime = currentDate,
	ASAurl = "http://123.206.134.34:8080/Medicals_war/operation/asa?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime,
	ASAEchartsurl = "http://123.206.134.34:8080/Medicals_war/operation/asaChart?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime,
	ASAdataSource = [],
	ASAdataTitle = [],
	ASAdetail = [],
	ASAdetailTitle = [],
	doc = document,
	ASAstartDate = doc.getElementById("ASAstartTime"),
	ASAendDate = doc.getElementById("ASAendTime"),
	ASAsubmitDate = doc.getElementById("ASAsubmitTime");
ASAexport = doc.getElementById("ASAexport");

var pageD = 1,
	totalPageD = 0;

ASAstartDate.value = month1stDate;
ASAendDate.value = currentDate;

//获取手麻病人数据
$.ajax({
	type: "get",
	url: ASAurl,
	dataType: "json",
	jsonp:"callback",
	success: function (data) {
		ASAdataSource = data.data;
		ASAdataTitle = data.header;
		//console.log(ASAdataSource);
		insertASATable();
	},
	error: function (XMLHttpRequest, textStatus, errorThrown) {
		alert(errorThrown);
	}
});

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

function insertASATable(){
	//创建表格
	var table = doc.getElementById("ASA_table");
	var thead = doc.getElementById("ASA_table_head");

	table.innerHTML = '';
	thead.innerHTML = '';

	//单独添加表头
	for(var t=0;t<ASAdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(ASAdataTitle[t]);
		th.appendChild(thData);
		th.style.width = '50%';
		thead.appendChild(th);
	}
	for(var i=0;i<ASAdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<ASAdataSource[i].length;j++){
			if(j==ASAdataSource[i].length-1){
				var data = doc.createTextNode(ASAdataSource[i][j]),
					a = doc.createElement("a"),
					td = doc.createElement("td");
				td.title = ASAdataSource[i][j];

				//a.setAttribute("tabindex","0");
				//a.setAttribute("role","button");
				//a.setAttribute("data-toggle","popover");
				//a.setAttribute("data-trigger","focus");
				//a.setAttribute("data-placement","left");
				a.appendChild(data);
				a.src = "#";
				a.id = ASAdataSource[i][0];
				a.onclick = function(){
					//$("[data-toggle='popover']").popover({
					//	html:true,
					//	content:'<div id="content">loading...</div>'
					//});
					pageD = 1;
					totalPageD = 0;
					doc.getElementById('ASApageNumD').placeholder = 1;
					doc.getElementById('ASAassignPageD').value = '';
					doc.getElementById('ASATotalD').innerHTML = '';

					var loadMes = doc.getElementById('loadMes');
					var table2 = doc.getElementById("ASAdetail_table");

					var idd = this.id;
					table2.innerHTML = '';
					loadMes.innerHTML = 'loading...';
					doc.getElementById('ASABtnSet').style.display='none';

					displayDetail(pageD, idd);

					doc.getElementById('ASApageBeforeD').onclick = function(){
						if(pageD == 1){
							alert('已经是第一页');
						}else{
							doc.getElementById('ASApageNumD').placeholder = --pageD;
							displayDetail(pageD, idd);
						}
					};

					doc.getElementById('ASApageNextD').onclick = function(){
						console.log('pageD', pageD, totalPageD);
						if(pageD >= totalPageD){
							alert("已经是最后一页");
						}else{
							doc.getElementById('ASApageNumD').placeholder = ++pageD;
							displayDetail(pageD, idd);
						}
					};

					doc.getElementById('ASAconfirmD').onclick = function(){
						var tempPage = pageD;
						pageD = parseFloat(doc.getElementById('ASAassignPageD').value);
						if(isInteger(pageD)){
							if(pageD <= totalPageD){
								doc.getElementById('ASApageNumD').placeholder = pageD;
								displayDetail(pageD, idd);
							}else{
								pageD = tempPage;
								alert('超出页数上限，请重新选择页数');
								doc.getElementById('ASAassignPageD').value = '';
							}
						}else{
							alert('请输入正整数！')
						}
					};

					function displayDetail(pageD, idd){
						$.ajax({
							type: "get",
							url: "http://123.206.134.34:8080/Medicals_war/operation/asaQuery?rowCount="+ 20 +"&page="+ pageD +"&asaName="+idd+"&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime,
							dataType: "json",
							jsonp:"callback",
							success: function (data) {
								table2.innerHTML = '';
								ASAdetail = data.data;
								ASAdetailTitle = data.header;
								loadMes.innerHTML = '';
								console.log(ASAdetail);
								insertASAdeatilTable(ASAdetail, ASAdetailTitle, table2);
								//$('#ASAdetail_table').html(table2);
								$('#ASABtnSet').css('display', 'block');
								totalPageD = data.pageCount;
								doc.getElementById('ASATotalD').innerHTML = totalPageD;
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								alert(errorThrown);
							}
						});
					}
				}
				//a.onclick = getDetailData("http://123.206.134.34:8080/Medicals_war/operation/asaQuery?asaName=1");
				td.appendChild(a);
			}
			else{
				var data = doc.createTextNode(ASAdataSource[i][j]),
					td = doc.createElement("td");
				td.title = ASAdataSource[i][j];
				td.appendChild(data);
			}
			td.style.width = '50%';
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}
function insertASAdeatilTable(ASAdetail, ASAdetailTitle, table2){
	//单独添加表头
	for(var t=0;t<ASAdetailTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(ASAdetailTitle[t]);
		th.appendChild(thData);
		if(t==1){
			th.style.width = '15%';
		}else if(t==7){
			th.style.width = '15%';
		}else if(t==2){
			th.style.width = '10%';
		}
		table2.appendChild(th);
	}
	for(var i=0;i<ASAdetail.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<ASAdetail[i].length;j++){
			var data = doc.createTextNode(ASAdetail[i][j]),
				td = doc.createElement("td");
			td.title = ASAdetail[i][j];
			td.appendChild(data);
			if(j==1){
				td.style.width = '15%';
			}else if(j==7){
				td.style.width = '15%';
			}else if(j==2){
				td.style.width = '10%';
			}
			//td.style.width = "500px";
			tr.appendChild(td);
		}
		table2.appendChild(tr);
	}
}

//设定时间
ASAsubmitDate.onclick = function () {
	getDate(ASAstartDate,ASAendDate);
	ASAurlStartTime = getDate(ASAstartDate,ASAendDate)[0],
		ASAurlEndTime = getDate(ASAstartDate,ASAendDate)[1];
	var urlTime = "http://123.206.134.34:8080/Medicals_war/operation/asa?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime;
	$.ajax({
		type: "get",
		url: urlTime,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			ASAdataSource = data.data;
			ASAdataTitle = data.header;
			//console.log(SMdataSource);
			insertASATable();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
	ASAEchartsurl = "http://123.206.134.34:8080/Medicals_war/operation/asaChart?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime;
	ASAEcharts();
}

ASAexport.onclick = function () {
	window.location="http://123.206.134.34:8080/Medicals_war/export/asa?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime;
}

addLoadEvent(initialPicker(ASAstartDate,ASAendDate));
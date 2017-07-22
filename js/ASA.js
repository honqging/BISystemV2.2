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

//��ȡ���鲡������
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
	//�������
	var table = doc.getElementById("ASA_table");
	var thead = doc.getElementById("ASA_table_head");

	table.innerHTML = '';
	thead.innerHTML = '';

	//������ӱ�ͷ
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
					var loadMes = doc.getElementById('loadMes');
					var table2 = doc.getElementById("ASAdetail_table");
					var idd = this.id;
					table2.innerHTML = '';
					loadMes.innerHTML = 'loading...';

					displayDetail(pageD, idd);

					$('#ASApageBeforeD').click(function(){
						if(pageD == 1){
							alert('�Ѿ��ǵ�һҳ');
						}else{
							doc.getElementById('ASApageNumD').placeholder = --pageD;
							displayDetail(pageD, idd);
						}
					});

					$('#ASApageNextD').click(function(){
						console.log('pageD', pageD, totalPageD);
						if(pageD >= totalPageD){
							alert('�Ѿ������һҳ');
						}else{
							doc.getElementById('ASApageNumD').placeholder = ++pageD;
							displayDetail(pageD, idd);
						}
					});

					$('#ASAconfirmD').click(function(){
						var tempPage = pageD;
						pageD = parseFloat(doc.getElementById('ASAassignPageD').value);
						if(isInteger(pageD)){
							if(pageD <= totalPageD){
								doc.getElementById('ASApageNumD').placeholder = pageD;
								displayDetail(pageD, idd);
							}else{
								pageD = tempPage;
								alert('����ҳ�����ޣ�������ѡ��ҳ��');
							}
						}else{
							alert('��������������')
						}
					});

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
	//������ӱ�ͷ
	for(var t=0;t<ASAdetailTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(ASAdetailTitle[t]);
		th.appendChild(thData);
		table2.appendChild(th);
	}
	for(var i=0;i<ASAdetail.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<ASAdetail[i].length;j++){
			var data = doc.createTextNode(ASAdetail[i][j]),
				td = doc.createElement("td");
			td.title = ASAdetail[i][j];
			td.appendChild(data);
			//td.style.width = "500px";
			tr.appendChild(td);
		}
		table2.appendChild(tr);
	}
}

//�趨ʱ��
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
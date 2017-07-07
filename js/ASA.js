var ASAurlStartTime = "2010-01-01",
    ASAurlEndTime = currentDate,
    ASAurl = "http://123.206.134.34:8080/Medicals_temp/operation/asa?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime,
	ASAEchartsurl = "http://123.206.134.34:8080/Medicals_temp/operation/asaChart?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime,
	ASAdataSource = [],
	ASAdataTitle = [],
	ASAdetail = [],
	ASAdetailTitle = [],
	doc = document,
	ASAstartDate = doc.getElementById("ASAstartTime"),
    ASAendDate = doc.getElementById("ASAendTime"),
    ASAsubmitDate = doc.getElementById("ASAsubmitTime");
    ASAexport = doc.getElementById("ASAexport");

//��ȡ���鲡�����
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

				a.setAttribute("tabindex","0");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","popover");
				a.setAttribute("data-trigger","focus");
				a.setAttribute("data-placement","left");
				a.appendChild(data);
				a.src = "#";
				a.id = ASAdataSource[i][0];
				a.onclick = function(){
					$("[data-toggle='popover']").popover({
						html:true,
						content:'<div id="content">loading...</div>'
					});
					$.ajax({ 
						  type: "get", 
						  url: "http://123.206.134.34:8080/Medicals_temp/operation/asaQuery?asaName="+this.id+"&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime,
						  dataType: "json",
						  jsonp:"callback",
						  success: function (data) { 
							  ASAdetail = data.data;
							  ASAdetailTitle = data.header;
							  var table2 = doc.createElement("table");
							  console.log(ASAdetail);
							  insertASAdeatilTable(ASAdetail, ASAdetailTitle, table2);
							  $('#content').html(table2);
						  },
						  error: function (XMLHttpRequest, textStatus, errorThrown) { 
						  alert(errorThrown); 
						 } 
					 });
				}
				//a.onclick = getDetailData("http://123.206.134.34:8080/Medicals_temp/operation/asaQuery?asaName=1");
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
			td.style.width = "500px";
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
    var urlTime = "http://123.206.134.34:8080/Medicals_temp/operation/asa?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime;
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
	ASAEchartsurl = "http://123.206.134.34:8080/Medicals_temp/operation/asaChart?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime;
	ASAEcharts();
}

ASAexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_temp/export/asa?&startTime="+ASAurlStartTime+"&endTime="+ASAurlEndTime;
}

addLoadEvent(initialPicker(ASAstartDate,ASAendDate));
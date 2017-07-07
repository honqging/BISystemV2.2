var ASSMCZLTJloadpage = 1,
	ASSMCZLTJdataSource = [],
	ASSMCZLTJdataTitle = [],
	doc = document,
	ASSMCZLTJurlStartTime = "2010-01-01",
	ASSMCZLTJurlEndTime = currentDate,
	ASSMCZLTJurl = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime,
	ASSMCZLTJstartDate = doc.getElementById("ASSMCZLTJstartTime"),
	ASSMCZLTJendDate = doc.getElementById("ASSMCZLTJendTime"),
	ASSMCZLTJsubmitDate = doc.getElementById("ASSMCZLTJsubmitTime");
	ASSMCZLTJexport = doc.getElementById("ASSMCZLTJexport");

$.ajax({
          type: "get",
          url: ASSMCZLTJurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
			  ASSMCZLTJdataSource = data.data;
			  ASSMCZLTJdataTitle = data.header;
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
	for(var t=0;t<ASSMCZLTJdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(ASSMCZLTJdataTitle[t]);
		th.appendChild(thData);
		if(t==0){
			th.style.width = '70%';
		}else{
			th.style.width = '15%';
		}
		thead.appendChild(th);
	}
	for(var i=0;i<ASSMCZLTJdataSource.length;i++){
		var tr = doc.createElement("tr");

		//var b = doc.createElement("a"),
		//	datab = doc.createTextNode('nihao');
		//b.onclick = function(){
		//	console.log("对的么？");
		//}
		//b.appendChild(datab);
		//tr.appendChild(b);

		for(var j=0;j<ASSMCZLTJdataSource[i].length;j++){
			var data = doc.createTextNode(ASSMCZLTJdataSource[i][j]);
			var td = doc.createElement("td");
			td.title = ASSMCZLTJdataSource[i][j];
			td.appendChild(data);
			if(j==0){
				td.style.width = '70%';
			}else{
				td.style.width = '15%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

var ASSMCZLTJbeforePage = doc.getElementById("ASSMCZLTJPageBefore"),
	ASSMCZLTJnextPage = doc.getElementById("ASSMCZLTJPageNext"),
	ASSMCZLTJPageNum = doc.getElementById("ASSMCZLTJPageNum");

	ASSMCZLTJbeforePage.onclick = function(){
		if(ASSMCZLTJloadpage==1){alert("已经是第一页");}
		else{
			ASSMCZLTJloadpage --;
			//console.log(ASSMCZLTJloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  ASSMCZLTJdataSource = data.data;
					  ASSMCZLTJdataTitle = data.header;
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
	var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
	$.ajax({
		  type: "get",
		  url: url2,
		  dataType: "json",
		  jsonp:"callback",
		  success: function (data) {
			  ASSMCZLTJdataSource = data.data;
			  ASSMCZLTJdataTitle = data.header;
			  ASSMCZLTJPageNum.placeholder = ASSMCZLTJloadpage;
			  insertASSMCZLTJTable();
			   },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
	}

//�趨ʱ��
ASSMCZLTJsubmitDate.onclick = function () {
	console.log("手术名称类型统计");
    getDate(ASSMCZLTJstartDate,ASSMCZLTJendDate);
	ASSMCZLTJurlStartTime = getDate(ASSMCZLTJstartDate,ASSMCZLTJendDate)[0],
	ASSMCZLTJurlEndTime = getDate(ASSMCZLTJstartDate,ASSMCZLTJendDate)[1];
	var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/shoushumingcheng?page="+ASSMCZLTJloadpage+"&startTime="+ASSMCZLTJurlStartTime+"&endTime="+ASSMCZLTJurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
			ASSMCZLTJdataSource = data.data;
			ASSMCZLTJdataTitle = data.header;
            //console.log(SMdataSource);
            insertASSMCZLTJTable();
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
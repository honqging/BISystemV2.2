var KSpage = 1,
	KSdataSource = [],
	KSdataTitle = [],
	doc = document,
	KSurlStartTime = "2010-01-01",
    KSurlEndTime = currentDate,
    KSurl = "http://123.206.134.34:8080/Medicals_temp/statistic/keshi?page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime,
	KSCharts1url = "http://123.206.134.34:8080/Medicals_temp/statistic/keshiChart?page="+KSpage+"&type=0"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime,
	KSCharts2url = "http://123.206.134.34:8080/Medicals_temp/statistic/keshiChart?page="+KSpage+"&type=1"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime,
    KSstartDate = doc.getElementById("KSGZLstartTime"),
    KSendDate = doc.getElementById("KSGZLendTime"),
    KSsubmitDate = doc.getElementById("KSsubmitTime");
    KSexport = doc.getElementById("KSGZLexport");


$.ajax({ 
          type: "get", 
          url: KSurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) { 
						  KSdataSource = data.data;
						  KSdataTitle = data.header;
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
	for(var t=0;t<KSdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(KSdataTitle[t]);
		th.appendChild(thData);
		if(t==0){
			th.style.width = '36%';
		}else{
			th.style.width = '8%';
		}
		thead.appendChild(th);
	}
	for(var i=0;i<KSdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<KSdataSource[i].length;j++){
			if(j !== 0 && j!==6){
				//console.log(KSdataSource[i][j]);
				var data = doc.createTextNode(KSdataSource[i][j]),
					a = doc.createElement("a"),
					td = doc.createElement("td");
				a.setAttribute("tabindex","0");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","popover");
				a.setAttribute("data-trigger","focus");
				a.setAttribute("data-placement","left");
				//a.setAttribute("data-content",KSdataSource[i][j]);
				a.office = KSdataSource[i][0];
				a.level = KSdataTitle[j];
				a.onclick = function(){
					var result;
					$("[data-toggle='popover']").popover({
						html:true,
						content:'<div id="content">loading...</div>'
					});
					$.ajax({
						  type: "get",
						  url: "http://123.206.134.34:8080/Medicals_temp/statistic/keshiQuery?department="+this.office+"&feature="+this.level+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime,
						  dataType: "json",
						  jsonp:"callback",
						  success: function (data) {
                              var result = data.data;
                              var title = data.header;
                              var table2 = doc.createElement("table");
							  insertkeshiSubTable(result,title,table2);
							  $('#content').html(table2);
						  },
						  error: function (XMLHttpRequest, textStatus, errorThrown) {
						  alert(errorThrown);
						 }
					 });
				}
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
				td.style.width = '36%';
			}else{
				td.style.width = '8%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
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
			var url2 = "http://123.206.134.34:8080/Medicals_temp/statistic/keshi?page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
			$.ajax({ 
				  type: "get", 
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) { 
								  KSdataSource = data.data;
								  KSdataTitle = data.header;
								  KSpageNum.placeholder = KSpage;
								  insertKSTable();
								   }, 
				  error: function (XMLHttpRequest, textStatus, errorThrown) { 
				  alert(errorThrown); 
				 } 
			 });
			KSCharts1url = "http://123.206.134.34:8080/Medicals_temp/statistic/keshiChart?page="+KSpage+"&type=0"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
			KScharts1();
			KSCharts2url = "http://123.206.134.34:8080/Medicals_temp/statistic/keshiChart?page="+KSpage+"&type=1"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
			KScharts2();
		}
	}
	KSpageNext.onclick = function(){
        KSpage ++;
		var url2 = "http://123.206.134.34:8080/Medicals_temp/statistic/keshi?page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
		//console.log(KSpage);
			$.ajax({ 
				  type: "get", 
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) { 
								  KSdataSource = data.data;
								  KSdataTitle = data.header;
								  KSpageNum.placeholder = KSpage;
								  insertKSTable();
								   }, 
				  error: function (XMLHttpRequest, textStatus, errorThrown) { 
				  alert(errorThrown); 
				 } 
			 });
		KSCharts1url = "http://123.206.134.34:8080/Medicals_temp/statistic/keshiChart?page="+KSpage+"&type=0"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
		KScharts1();
		KSCharts2url = "http://123.206.134.34:8080/Medicals_temp/statistic/keshiChart?page="+KSpage+"&type=1"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
		KScharts2();
	}

KSsubmitDate.onclick = function () {
    getDate(KSstartDate,KSendDate);
    KSurlStartTime = getDate(KSstartDate,KSendDate)[0],
    KSurlEndTime = getDate(KSstartDate,KSendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_temp/statistic/keshi?page="+KSpage+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            KSdataSource = data.data;
            KSdataTitle = data.header;
            //console.log(SMdataSource);
            insertKSTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
	KSCharts1url = "http://123.206.134.34:8080/Medicals_temp/statistic/keshiChart?page="+KSpage+"&type=0"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
	KSCharts2url = "http://123.206.134.34:8080/Medicals_temp/statistic/keshiChart?page="+KSpage+"&type=1"+"&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
	KScharts1();
	KScharts2();
}

KSexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_temp/export/keshi?&startTime="+KSurlStartTime+"&endTime="+KSurlEndTime;
}
addLoadEvent(initialPicker(KSstartDate,KSendDate));
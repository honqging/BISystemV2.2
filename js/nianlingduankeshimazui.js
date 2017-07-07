var NLDKSloadpage = 1,
	NLDKSdataSource = [],
	NLDKSdataTitle = [],
	doc = document,
	NLDKSurlStartTime = "2010-01-01",
	NLDKSurlEndTime = currentDate,
	NLDKSurl = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime,
	NLDKSstartDate = doc.getElementById("NLDKSstartTime"),
	NLDKSendDate = doc.getElementById("NLDKSendTime"),
	NLDKSsubmitDate = doc.getElementById("NLDKSsubmitTime");
	NLDKSexport = doc.getElementById("NLDKSexport");

var allData = new Array(8);

$.ajax({
          type: "get",
          url: NLDKSurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
			  NLDKSdataSource = data.data;
			  NLDKSdataTitle = data.header;
			  insertNLDKSTable();
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });

function insertNLDKSTable(){
	var table = doc.getElementById("NLDKS_table");
	var thead = doc.getElementById("NLDKS_table_head");
	table.innerHTML = '';
	thead.innerHTML = '';
	//add table head
	for(var t=0;t<NLDKSdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(NLDKSdataTitle[t]);
		th.appendChild(thData);
		if(t==0){
			th.style.width = '23%';
		}else{
			th.style.width = '11%';
		}

		thead.appendChild(th);
	}

	// add a row containing total number of operation methods
	var tr = doc.createElement("tr");

	// display summation: statistic data
	//var allData = new Array(8);
	allData[0] = "合计";
	for(var i=1; i<allData.length; i++){
		allData[i] = 0;
	}

	//console.log("NLDKSdataSource.length" + NLDKSdataSource[0].length);
	for(var i=1;i<allData.length;i++){
		for(var j=0; j<NLDKSdataSource.length; j++){
			allData[i] += NLDKSdataSource[j][i];
		}
	}
	var data = new Array(8);
	for(var q=0; q<data.length; q++){
		data[q] = doc.createTextNode(allData[q]);
	}

	for(var t=0; t<data.length; t++){
		var td = doc.createElement("td");
		td.title = data[t];
		td.appendChild(data[t]);
		tr.appendChild(td);
	}
	table.appendChild(tr);

	// add data rows
	for(var i=0;i<NLDKSdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<NLDKSdataSource[i].length;j++){
			var data;
			if(NLDKSdataSource[i][j] == 0){
				data = doc.createTextNode("");
			}else{
				data = doc.createTextNode(NLDKSdataSource[i][j]);
			}
			var td = doc.createElement("td");
			if(j>0){
				var a = doc.createElement("a");
				td.title = NLDKSdataSource[i][j];
				a.appendChild(data);
				td.appendChild(a);
				td.style.width = '11%';
			}else{
				td.title = NLDKSdataSource[i][j];
				td.appendChild(data);
				td.style.width = '23%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

var NLDKSbeforePage = doc.getElementById("NLDKSPageBefore"),
	NLDKSnextPage = doc.getElementById("NLDKSPageNext"),
	NLDKSPageNum = doc.getElementById("NLDKSPageNum");

	NLDKSbeforePage.onclick = function(){
		if(NLDKSloadpage==1){alert("已经是第一页");}
		else{
			NLDKSloadpage --;
			//console.log(NLDKSloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  NLDKSdataSource = data.data;
					  NLDKSdataTitle = data.header;
					  NLDKSPageNum.placeholder = NLDKSloadpage;
					  insertNLDKSTable();
					  NLDKSEcharts();
				  },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
NLDKSnextPage.onclick = function(){
	NLDKSloadpage ++;
	var url2 = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime;
	$.ajax({
		  type: "get",
		  url: url2,
		  dataType: "json",
		  jsonp:"callback",
		  success: function (data) {
			  NLDKSdataSource = data.data;
			  NLDKSdataTitle = data.header;
			  NLDKSPageNum.placeholder = NLDKSloadpage;
			  insertNLDKSTable();
			  NLDKSEcharts();
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
}

// 设定时间
NLDKSsubmitDate.onclick = function () {
    getDate(NLDKSstartDate,NLDKSendDate);
	NLDKSurlStartTime = getDate(NLDKSstartDate,NLDKSendDate)[0],
	NLDKSurlEndTime = getDate(NLDKSstartDate,NLDKSendDate)[1];
	var urlTime = "http://123.206.134.34:8080/Medicals_war/charts/keshinianlingduan?page="+NLDKSloadpage+"&startTime="+NLDKSurlStartTime+"&endTime="+NLDKSurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
			NLDKSdataSource = data.data;
			NLDKSdataTitle = data.header;
            //console.log(SMdataSource);
            insertNLDKSTable();
			NLDKSEcharts();
		},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

NLDKSexport.onclick = function () {
    // no interface yet, add later
    window.location="http://123.206.134.34:8080/Medicals_war/export/keshinianlingduan?startTime=" + NLDKSurlStartTime + "&endTime=" + NLDKSurlEndTime;
}

addLoadEvent(initialPicker(NLDKSstartDate,NLDKSendDate));


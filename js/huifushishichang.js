var HFSSCloadpage = 1,
	HFSSCdataSource = [],
	HFSSCdataTitle = [],
	doc = document,
	HFSSCurlStartTime = "2010-01-01",
	HFSSCurlEndTime = currentDate,
	HFSSCurl = "http://123.206.134.34:8080/Medicals_temp/recovery/morethan1hour?page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime,
	HFSSCstartDate = doc.getElementById("HFSSCstartTime"),
	HFSSCendDate = doc.getElementById("HFSSCendTime"),
	HFSSCsubmitDate = doc.getElementById("HFSSCsubmitTime");
	HFSSCexport = doc.getElementById("HFSSCexport");

$.ajax({
          type: "get",
          url: HFSSCurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
			  HFSSCdataSource = data.data;
			  HFSSCdataTitle = data.header;
			  insertHFSSCTable();
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertHFSSCTable(){
	var table = doc.getElementById("HFSSC_table");
	var thead = doc.getElementById("HFSSC_table_head");
	table.innerHTML = '';
	thead.innerHTML = '';
	//add table head
	for(var rows=0; rows<2; rows++) {
		var trHead = doc.createElement("tr");
		for (var t = 0; t < HFSSCdataTitle.length-1; t++) {
			var th = doc.createElement("th");
			var	thData;
			if(rows == 0){
				if(t == 0){
					thData = doc.createTextNode(HFSSCdataTitle[t]);
					th.appendChild(thData);
					th.rowSpan = '2';
					th.style.width = '20%';
					th.vAlign = "center";
					th.id = "tdd";
				}else if(t == 1){
					thData = doc.createTextNode("超过一小时");
					th.appendChild(thData);
					th.colSpan = '2';
					th.style.width = '20%';
				}
			}else if(rows == 1){
				thData = doc.createTextNode(HFSSCdataTitle[t+1]);
				th.appendChild(thData);
				th.style.width = '10%';
			}
			th.style.textAlign = "center";
			trHead.appendChild(th);
		}
		thead.appendChild(trHead);
	}

	// add a row containing total number of operation methods
	var tr = doc.createElement("tr");

	// allOpe: the total number of operation
	// allEmergentOpe: the total number of emergent operation
	// allChangeOpe: the total number of changing data operation
	var allOpe = 0,
		allEmergentOpe = 0,
		allChangeOpe = 0;

	console.log(HFSSCdataSource.length);

	for(var i=0;i<HFSSCdataSource.length;i++){
		allOpe += HFSSCdataSource[i][1];
		allEmergentOpe += HFSSCdataSource[i][2];
		allChangeOpe += HFSSCdataSource[i][3];
	}
	var data = new Array(3);
	data[0] = doc.createTextNode("合计"),
	data[1] = doc.createTextNode(allOpe),
	data[2] = doc.createTextNode(allEmergentOpe);

	for(var t=0; t<data.length; t++){
		var td = doc.createElement("td");
		td.title = data[t];
		td.appendChild(data[t]);
		if(t>0){
			td.style.textAlign = "center";
		}
		tr.appendChild(td);
	}
	table.appendChild(tr);

	// add data rows
	for(var i=0;i<HFSSCdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<HFSSCdataSource[i].length;j++){
			var data = doc.createTextNode(HFSSCdataSource[i][j]);
			var td = doc.createElement("td");
			if(j>0){
				var a = doc.createElement("a");
				td.title = HFSSCdataSource[i][j];
				a.appendChild(data);
				td.appendChild(a);
				td.style.textAlign = "center";
			}else{
				td.title = HFSSCdataSource[i][j];
				td.appendChild(data);
			}
			if(j==0){
				td.style.width = '20%';
			}else{
				td.style.width = '10%';
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

//��ҳ
var HFSSCbeforePage = doc.getElementById("HFSSCPageBefore"),
	HFSSCnextPage = doc.getElementById("HFSSCPageNext"),
	HFSSCPageNum = doc.getElementById("HFSSCPageNum");

	HFSSCbeforePage.onclick = function(){
		if(HFSSCloadpage==1){alert("已经是第一页");}
		else{
			HFSSCloadpage --;
			//console.log(HFSSCloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_temp/recovery/morethan1hour?page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  HFSSCdataSource = data.data;
					  HFSSCdataTitle = data.header;
					  HFSSCPageNum.placeholder = HFSSCloadpage;
					  insertHFSSCTable();
					   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
HFSSCnextPage.onclick = function(){
	HFSSCloadpage ++;
	var url2 = "http://123.206.134.34:8080/Medicals_temp/recovery/morethan1hour?page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
	$.ajax({
		  type: "get",
		  url: url2,
		  dataType: "json",
		  jsonp:"callback",
		  success: function (data) {
			  HFSSCdataSource = data.data;
			  HFSSCdataTitle = data.header;
			  HFSSCPageNum.placeholder = HFSSCloadpage;
			  insertHFSSCTable();
			   },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
	}

// 按日期搜索
HFSSCsubmitDate.onclick = function () {
    getDate(HFSSCstartDate,HFSSCendDate);
	HFSSCurlStartTime = getDate(HFSSCstartDate,HFSSCendDate)[0],
	HFSSCurlEndTime = getDate(HFSSCstartDate,HFSSCendDate)[1];
	var urlTime = "http://123.206.134.34:8080/Medicals_temp/recovery/morethan1hour?page="+HFSSCloadpage+"&startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
			HFSSCdataSource = data.data;
			HFSSCdataTitle = data.header;
            //console.log(SMdataSource);
            insertHFSSCTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

HFSSCexport.onclick = function () {
    // no interface yet, add later
    window.location="http://123.206.134.34:8080/Medicals_temp/export/morethan1hour?startTime="+HFSSCurlStartTime+"&endTime="+HFSSCurlEndTime;
}

addLoadEvent(initialPicker(HFSSCstartDate,HFSSCendDate));

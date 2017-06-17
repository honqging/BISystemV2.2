var MZJZZQloadpage = 1,
	MZJZZQdataSource = [],
	MZJZZQdataTitle = [],
	doc = document,
	MZJZZQurlStartTime = "2010-01-01",
	MZJZZQurlEndTime = currentDate,
	MZJZZQurl = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime,
	MZJZZQstartDate = doc.getElementById("MZJZZQstartTime"),
	MZJZZQendDate = doc.getElementById("MZJZZQendTime"),
	MZJZZQsubmitDate = doc.getElementById("MZJZZQsubmitTime");
	MZJZZQexport = doc.getElementById("MZJZZQexport");

$.ajax({
          type: "get",
          url: MZJZZQurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
			  MZJZZQdataSource = data.data;
			  MZJZZQdataTitle = data.header;
			  insertMZJZZQTable();
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertMZJZZQTable(){
	var table = doc.getElementById("MZJZZQ_table");
	table.innerHTML = '';
	//add table head
	for(var t=0;t<MZJZZQdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(MZJZZQdataTitle[t]);
		th.appendChild(thData);
		table.appendChild(th);
	}

	// add a row containing total number of operation methods
	var tr = doc.createElement("tr");

	// allOpe: the total number of operation
	// allEmergentOpe: the total number of emergent operation
	// allChangeOpe: the total number of changing data operation
	var allOpe = 0,
		allEmergentOpe = 0,
		allChangeOpe = 0;

	console.log(MZJZZQdataSource.length);

	for(var i=0;i<MZJZZQdataSource.length;i++){
		allOpe += MZJZZQdataSource[i][1];
		allEmergentOpe += MZJZZQdataSource[i][2];
		allChangeOpe += MZJZZQdataSource[i][3];
	}
	var data = new Array(4);
	data[0] = doc.createTextNode("合计"),
	data[1] = doc.createTextNode(allOpe),
	data[2] = doc.createTextNode(allEmergentOpe),
	data[3] = doc.createTextNode(allChangeOpe);

	for(var t=0; t<data.length; t++){
		var td = doc.createElement("td");
		td.title = data[t];
		td.appendChild(data[t]);
		tr.appendChild(td);
	}
	table.appendChild(tr);

	// add data rows
	for(var i=0;i<MZJZZQdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<MZJZZQdataSource[i].length;j++){
			var data = doc.createTextNode(MZJZZQdataSource[i][j]);
			var td = doc.createElement("td");
			if(j>1){
				var a = doc.createElement("a");
				td.title = MZJZZQdataSource[i][j];
				a.appendChild(data);
				td.appendChild(a);
			}else{
				td.title = MZJZZQdataSource[i][j];
				td.appendChild(data);
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

//��ҳ
var MZJZZQbeforePage = doc.getElementById("MZJZZQPageBefore"),
	MZJZZQnextPage = doc.getElementById("MZJZZQPageNext"),
	MZJZZQPageNum = doc.getElementById("MZJZZQPageNum");

	MZJZZQbeforePage.onclick = function(){
		if(MZJZZQloadpage==1){alert("已经是第一页");}
		else{
			MZJZZQloadpage --;
			//console.log(MZJZZQloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
					  MZJZZQdataSource = data.data;
					  MZJZZQdataTitle = data.header;
					  MZJZZQPageNum.placeholder = MZJZZQloadpage;
					  insertMZJZZQTable();
					   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
MZJZZQnextPage.onclick = function(){
	MZJZZQloadpage ++;
	var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
	$.ajax({
		  type: "get",
		  url: url2,
		  dataType: "json",
		  jsonp:"callback",
		  success: function (data) {
			  MZJZZQdataSource = data.data;
			  MZJZZQdataTitle = data.header;
			  MZJZZQPageNum.placeholder = MZJZZQloadpage;
			  insertMZJZZQTable();
			   },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
	}

//�趨ʱ��
MZJZZQsubmitDate.onclick = function () {
    getDate(MZJZZQstartDate,MZJZZQendDate);
	MZJZZQurlStartTime = getDate(MZJZZQstartDate,MZJZZQendDate)[0],
	MZJZZQurlEndTime = getDate(MZJZZQstartDate,MZJZZQendDate)[1];
	var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/mazuijizhenzeqi?page="+MZJZZQloadpage+"&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
			MZJZZQdataSource = data.data;
			MZJZZQdataTitle = data.header;
            //console.log(SMdataSource);
            insertMZJZZQTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

MZJZZQexport.onclick = function () {
    // no interface yet, add later
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuijizhenzeqi?&startTime="+MZJZZQurlStartTime+"&endTime="+MZJZZQurlEndTime;
}

addLoadEvent(initialPicker(MZJZZQstartDate,MZJZZQendDate));

var NLDpage = 1,
	NLDdataSource = [],
	NLDdataTitle = [],
	doc = document,
	NLDurlStartTime = "2010-01-01",
    NLDurlEndTime = currentDate,
    NLDurl = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime,
    NLDstartDate = doc.getElementById("NLDstartTime"),
    NLDendDate = doc.getElementById("NLDendTime"),
    NLDsubmitDate = doc.getElementById("NLDsubmitTime");
	NLDexport = doc.getElementById("NLDexport");

$.ajax({
          type: "get",
          url: NLDurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  NLDdataSource = data.data;
						  NLDdataTitle = data.header;
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
	table.innerHTML = '';
	//������ӱ�ͷ
	for(var t=0;t<NLDdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(NLDdataTitle[t]);
		th.appendChild(thData);
		table.appendChild(th);
	}
	for(var i=0;i<NLDdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<NLDdataSource[i].length;j++){
			if(j !== 0){
				var data = doc.createTextNode(NLDdataSource[i][j]),
					a = doc.createElement("a"),
					td = doc.createElement("td");
				a.setAttribute("tabindex","0");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","popover");
				a.setAttribute("data-trigger","focus");
				a.setAttribute("data-placement","left");
				//a.setAttribute("data-content",NLDdataSource[i][j]);
                a.method = NLDdataSource[i][0];
                a.age = NLDdataTitle[j];
				a.onclick = function(){
					var result;
					$("[data-toggle='popover']").popover({
						html:true,
						content:'<div id="content">loading...</div>'
					});
					$.ajax({
						  type: "get",
						  url: "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfaQuery?method="+this.method.replace(/\+/g, "%2B")+"&age="+this.age+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime,
						  dataType: "json",
						  jsonp:"callback",
						  success: function (data) {
                              var result = data.data;
                              var title = data.header;
                              var table2 = doc.createElement("table");
                              insertNLDSubTable(result,title,table2);
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
                var data = doc.createTextNode(NLDdataSource[i][j]);
				var td = doc.createElement("td");
				td.title = NLDdataSource[i][j];
				td.appendChild(data);
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
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
		if(NLDpage==1){alert("�Ѿ��ǵ�һҳ");}
		else{
            NLDpage --;
			//console.log(NLDpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  NLDdataSource = data.data;
								  NLDdataTitle = data.header;
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
		var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
		//console.log(NLDpage);
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  NLDdataSource = data.data;
								  NLDdataTitle = data.header;
								  NLDPageNum.placeholder = NLDpage;
								  insertNLDTable();
								   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
	}

//�趨ʱ��
NLDsubmitDate.onclick = function () {
    getDate(NLDstartDate,NLDendDate);
    NLDurlStartTime = getDate(NLDstartDate,NLDendDate)[0],
    NLDurlEndTime = getDate(NLDstartDate,NLDendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/mazuifangfa?page="+NLDpage+"&startTime="+NLDurlStartTime+"&endTime="+NLDurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            NLDdataSource = data.data;
            NLDdataTitle = data.header;
            //console.log(SMdataSource);
            insertNLDTable();
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
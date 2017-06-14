var SSHSGZLdataSource = [],
	SSHSdataTitle = [],
	doc = document,
    SSHSGZLpage = 1,
	SSHSGZLurlStartTime = "2010-01-01",
    SSHSGZLurlEndTime = currentDate,
    SSHSGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime,
    SSHSGZLstartDate = doc.getElementById("SSHSGZLstartTime"),
    SSHSGZLendDate = doc.getElementById("SSHSGZLendTime"),
    SSHSGZLsubmitDate = doc.getElementById("SSHSGZLsubmitTime");
	SSHSGZLexport = doc.getElementById("SSHSGZLexport");

$.ajax({
          type: "get",
          url: SSHSGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  SSHSGZLdataSource = data.data;
						  SSHSdataTitle = data.header;
						 //console.log(SSHSGZLdataSource);
						  insertSSHSGZLTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertSSHSGZLTable(){
	//�������
	var table = doc.getElementById("SSHSGZL_table");
	table.innerHTML ='';
	//������ӱ�ͷ
	for(var t=0;t<SSHSdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(SSHSdataTitle[t]);
		th.appendChild(thData);
		table.appendChild(th);
	}
	for(var i=0;i<SSHSGZLdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<SSHSGZLdataSource[i].length;j++){
			var data = doc.createTextNode(SSHSGZLdataSource[i][j]),
				td = doc.createElement("td");
			td.title = SSHSGZLdataSource[i][j];
			td.appendChild(data);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}
//��ҳ
var SSHSGZLbeforePage = doc.getElementById("SSHSGZLPageBefore"),
	SSHSGZLnextPage = doc.getElementById("SSHSGZLPageNext"),
	SSHSGZLpageNum = doc.getElementById("SSHSGZLPageNum");

	SSHSGZLbeforePage.onclick = function(){
		if(SSHSGZLpage==1){alert("�Ѿ��ǵ�һҳ");}
		else{
            SSHSGZLpage --;
			//console.log(page);
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  SSHSGZLdataSource = data.data;
								  SSHSdataTitle = data.header;
								  SSHSGZLpageNum.placeholder = SSHSGZLpage;
								  insertSSHSGZLTable();
								   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				}
			});
		}
	}
	SSHSGZLnextPage.onclick = function(){
        SSHSGZLpage ++;
		var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
		//console.log(SSHSGZLpage);
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  SSHSGZLdataSource = data.data;
								  SSHSdataTitle = data.header;
								  //console.log(SSHSGZLdataSource);
								  SSHSGZLpageNum.placeholder = SSHSGZLpage;
								  insertSSHSGZLTable();
								   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				}
			});
	}
//�趨ʱ��
SSHSGZLsubmitDate.onclick = function () {
    getDate(SSHSGZLstartDate,SSHSGZLendDate);
    SSHSGZLurlStartTime = getDate(SSHSGZLstartDate,SSHSGZLendDate)[0],
    SSHSGZLurlEndTime = getDate(SSHSGZLstartDate,SSHSGZLendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSHSGZLdataSource = data.data;
            SSHSdataTitle = data.header;
            insertSSHSGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

SSHSGZLexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/shoushuhushi?&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
}

addLoadEvent(initialPicker(SSHSGZLstartDate,SSHSGZLendDate));

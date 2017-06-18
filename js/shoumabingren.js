var SMBRpage = 1,
    currentDate = getNowFormatDate(),
	SMdataSource = [],
	SMdataTitle = [],
	doc = document,
	SMBRurlStartTime = "2010-01-01",
    SMBRurlEndTime = currentDate,
    url = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime,
    SMstartDate = doc.getElementById("SMstartTime"),
    SMendDate = doc.getElementById("SMendTime"),
    SMsubmitDate = doc.getElementById("SMsubmitTime");
    SMexport = doc.getElementById("SMexport");

//��ȡ���鲡������
$.ajax({
          type: "get",
          url: url,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  SMdataSource = data.data;
						  SMdataTitle = data.header;
						 //console.log(SMdataSource);
						  insertSMTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertSMTable(){
	//�������
	var table = doc.getElementById("SMBR_table");
    var thead = doc.getElementById("SMBR_table_head");

    table.innerHTML = '';
    thead.innerHTML = '';

    //������ӱ�ͷ
	for(var t=0;t<SMdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(SMdataTitle[t]);
		th.appendChild(thData);
        if(t==5|t==6|t==7){
            th.style.width = '14%';
        }else{
            th.style.width = '7%';
        }
		thead.appendChild(th);
	}
	for(var i=0;i<SMdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<SMdataSource[i].length;j++){
			var data = doc.createTextNode(SMdataSource[i][j]),
				td = doc.createElement("td");
			td.title = SMdataSource[i][j];
			td.appendChild(data);
            if(j==5|j==6|j==7){
                td.style.width = '14%';
            }else{
                td.style.width = '7%';
            }
            tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

//分页
var SMBRbeforePage = doc.getElementById("SMBRPageBefore"),
    SMBRnextPage = doc.getElementById("SMBRPageNext"),
    SMBRPageNum = doc.getElementById("SMBRPageNum");

SMBRbeforePage.onclick = function(){
    if(SMBRpage==1){alert("已经是第一页");}
    else{
        SMBRpage --;
        var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                SMdataSource = data.data;
                SMdataTitle = data.header;
                SMBRPageNum.placeholder = SMBRpage;
                insertSMTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
SMBRnextPage.onclick = function(){
    console.log(SMBRurlStartTime,SMBRurlStartTime);
    SMBRpage ++;
    var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
    console.log(url2);
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SMdataSource = data.data;
            SMdataTitle = data.header;
            SMBRPageNum.placeholder = SMBRpage;
            insertSMTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//设定时间
SMsubmitDate.onclick = function () {
    getDate(SMstartDate,SMendDate);
    SMBRurlStartTime = getDate(SMstartDate,SMendDate)[0],
    SMBRurlEndTime = getDate(SMstartDate,SMendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SMdataSource = data.data;
            SMdataTitle = data.header;
			console.log(urlTime);
            //console.log(SMdataSource);
            insertSMTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

SMexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/shoumabingren?&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
}

addLoadEvent(initialPicker(SMstartDate,SMendDate));
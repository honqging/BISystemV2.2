var SSHDpage = 1,
	SSHDurlStartTime = "2010-01-01",
    SSHDurlEndTime = currentDate,
	SSHDurl = "http://123.206.134.34:8080/Medicals_war/operation/shoushuhuadao?page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime,
	SSHDtableData = [],
	SSHDtableTiTle = [],
	doc = document,
	SSHDstartDate = doc.getElementById("SSHDstartTime"),
    SSHDendDate = doc.getElementById("SSHDendTime"),
    SSHDsubmitDate = doc.getElementById("SSHDsubmitTime");
    SSHDexport = doc.getElementById("SSHDexport");

$.ajax({
          type: "get",
          url: SSHDurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  SSHDtableData = data.data;
						  SSHDtableTiTle = data.header;
						 //console.log(SSHDtableData);
						  insertSSHDTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertSSHDTable(){
	//�������
	var table = doc.getElementById("SSHD_table");
    var thead = doc.getElementById("SSHD_table_head");

    table.innerHTML = '';
    thead.innerHTML = '';

    //������ӱ�ͷ
	for(var t=0;t<SSHDtableTiTle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(SSHDtableTiTle[t]);
		th.appendChild(thData);
        if(t==1){
            th.style.width = '16%';
        }else{
            th.style.width = '8%';
        }
		thead.appendChild(th);
	}
	for(var i=1;i<SSHDtableData.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<SSHDtableData[i].length;j++){
			var data = doc.createTextNode(SSHDtableData[i][j]),
				td = doc.createElement("td");
			td.title = SSHDtableData[i][j];
			td.appendChild(data);
            if(j==1){
                td.style.width = '16%';
            }else{
                td.style.width = '8%';
            }
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

//分页
var SSHDbeforePage = doc.getElementById("SSHDPageBefore"),
    SSHDnextPage = doc.getElementById("SSHDPageNext"),
    SSHDPageNum = doc.getElementById("SSHDPageNum");

SSHDbeforePage.onclick = function(){
    if(SSHDpage==1){alert("已经是第一页");}
    else{
        SSHDpage --;
        var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoushuhuadao?page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                SSHDtableData = data.data;
                SSHDtableTiTle = data.header;
                SSHDPageNum.placeholder = SSHDpage;
                insertSSHDTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
SSHDnextPage.onclick = function(){
    SSHDpage ++;
    var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoushuhuadao?page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSHDtableData = data.data;
            SSHDtableTiTle = data.header;
            SSHDPageNum.placeholder = SSHDpage;
            insertSSHDTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//设定时间
SSHDsubmitDate.onclick = function () {
    getDate(SSHDstartDate,SSHDendDate);
    SSHDurlStartTime = getDate(SSHDstartDate,SSHDendDate)[0],
    SSHDurlEndTime = getDate(SSHDstartDate,SSHDendDate)[1];
	console.log(SSHDpage,SSHDurlStartTime,SSHDurlEndTime);
    var urlTime = "http://123.206.134.34:8080/Medicals_war/operation/shoushuhuadao?page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSHDtableData = data.data;
            SSHDtableTiTle = data.header;
            //console.log(SMdataSource);
            insertSSHDTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

SSHDexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/shoushuhuadao?&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
}

addLoadEvent(initialPicker(SSHDstartDate,SSHDendDate));
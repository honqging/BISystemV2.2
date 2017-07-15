var SSHDTotal = doc.getElementById("SSHDTotal"),
    SSHDTotalPage = 0,
    SSHDnumPerPage = doc.getElementById("SSHDnumPerPage"),
    SSHDnumPer = 20,
    SSHDassignPage = doc.getElementById("SSHDassignPage"),
    SSHDconfirm = doc.getElementById("SSHDconfirm");

var SSHDpage = 1,
	SSHDurlStartTime = "2010-01-01",
    SSHDurlEndTime = currentDate,
	SSHDurl = "http://123.206.134.34:8080/Medicals_war/operation/shoushuhuadao?rowCount="+ SSHDnumPer +"&page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime,
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
                          SSHDTotalPage = data.pageCount;
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
	for(var i=0;i<SSHDtableData.length;i++){
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

    SSHDTotal.innerHTML = SSHDTotalPage;
}

//分页
var SSHDbeforePage = doc.getElementById("SSHDPageBefore"),
    SSHDnextPage = doc.getElementById("SSHDPageNext"),
    SSHDPageNum = doc.getElementById("SSHDPageNum");

SSHDbeforePage.onclick = function(){
    if(SSHDpage==1){alert("已经是第一页");}
    else{
        SSHDpage --;
        var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoushuhuadao?rowCount="+ SSHDnumPer +"&page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                SSHDtableData = data.data;
                SSHDtableTiTle = data.header;
                SSHDTotalPage = data.pageCount;
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
    var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoushuhuadao?rowCount="+ SSHDnumPer +"&page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
    if(SSHDpage == SSHDTotalPage){
        alert('已经是最后一页');
    }else {
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp: "callback",
            success: function (data) {
                SSHDtableData = data.data;
                SSHDtableTiTle = data.header;
                SSHDTotalPage = data.pageCount;
                SSHDPageNum.placeholder = SSHDpage;
                insertSSHDTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}

//设定时间
SSHDsubmitDate.onclick = function () {
    getDate(SSHDstartDate,SSHDendDate);
    SSHDurlStartTime = getDate(SSHDstartDate,SSHDendDate)[0],
    SSHDurlEndTime = getDate(SSHDstartDate,SSHDendDate)[1];
	console.log(SSHDpage,SSHDurlStartTime,SSHDurlEndTime);
    var urlTime = "http://123.206.134.34:8080/Medicals_war/operation/shoushuhuadao?rowCount="+ SSHDnumPer +"&page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSHDtableData = data.data;
            SSHDtableTiTle = data.header;
            SSHDTotalPage = data.pageCount;
            //console.log(SMdataSource);
            insertSSHDTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

SSHDconfirm.onclick = function(){
    tempPage = SSHDpage;
    SSHDpage = parseFloat(SSHDassignPage.value);
    if(isInteger(SSHDpage)){
        console.log(SSHDpage);
        if(SSHDpage <= SSHDTotalPage){
            var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?rowCount=" + SSHDnumPer + "&page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
            console.log(url2);
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp:"callback",
                success: function (data) {
                    SSHDtableData = data.data;
                    SSHDtableTitle = data.header;
                    SSHDTotalPage = data.pageCount;
                    SSHDPageNum.placeholder = SSHDpage;
                    insertSSHDTable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }else{
            SSHDpage = tempPage;
            alert('超出页数上限，请重新选择页数');
        }
    }else{
        alert('请输入正整数！')
    }
}

SSHDnumPerPage.onchange = function(){
    var tempPer = SSHDnumPer,
        tempSelected = SSHDnumPer;
    var p1 = $(this).children('option:selected').val();//这就是selected的值
    SSHDnumPer = p1;
    var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?rowCount=" + SSHDnumPer + "&page="+SSHDpage+"&startTime="+SSHDurlStartTime+"&endTime="+SSHDurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSHDtableData = data.data;
            SSHDtableTitle = data.header;
            SSHDTotalPage = data.pageCount;

            if(SSHDTotalPage < SSHDpage){
                alert('超出数据量上限，请重新选择页数或者每页数据条数');
                SSHDnumPer = tempPer;
                for(var i = 0; i < SSHDnumPerPage.options.length; i++){
                    if(SSHDnumPerPage.options[i].innerHTML == tempSelected){
                        SSHDnumPerPage.options[i].selected = true;
                        break;
                    }
                }
            }else{
                insertSSHDTable();
            }
            console.log(url2);
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

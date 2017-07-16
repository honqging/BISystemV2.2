var SMBRTotal = doc.getElementById("SMBRTotal"),
    SMBRTotalPage = 0,
    SMBRnumPerPage = doc.getElementById("SMBRnumPerPage"),
    SMBRnumPer = 20,
    SMBRassignPage = doc.getElementById("SMBRassignPage"),
    SMBRconfirm = doc.getElementById("SMBRconfirm");

var SMBRpage = 1,
    currentDate = getNowFormatDate(),
	SMdataSource = [],
	SMdataTitle = [],
	doc = document,
	SMBRurlStartTime = "2010-01-01",
    SMBRurlEndTime = currentDate,
    url = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?rowCount=" + SMBRnumPer + "&page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime,
    SMstartDate = doc.getElementById("SMstartTime"),
    SMendDate = doc.getElementById("SMendTime"),
    SMsubmitDate = doc.getElementById("SMsubmitTime"),
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
                          SMBRTotalPage = data.pageCount;

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
        if(t==5|t==6){
            th.style.width = '12%';
        }else if(t==7|t==8){
            th.style.width = '10%';
        }else if(t==9){
            th.style.width = '20%';
        }else{
            th.style.width = '6%';
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
            if(j==5|j==6){
                td.style.width = '12%';
            }else if(j==7|j==8){
                td.style.width = '10%';
            }else if(j==9){
                td.style.width = "20%";
            }else{
                td.style.width = '6%';
            }
            tr.appendChild(td);
		}
		table.appendChild(tr);
	}

    SMBRTotal.innerHTML = SMBRTotalPage;
}

//分页
var SMBRbeforePage = doc.getElementById("SMBRPageBefore"),
    SMBRnextPage = doc.getElementById("SMBRPageNext"),
    SMBRPageNum = doc.getElementById("SMBRPageNum");

SMBRbeforePage.onclick = function(){
    if(SMBRpage==1){alert("已经是第一页");}
    else{
        SMBRpage --;
        var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?rowCount=" + SMBRnumPer + "&page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                SMdataSource = data.data;
                SMdataTitle = data.header;
                SMBRTotalPage = data.pageCount;
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
    if(SMBRpage > SMBRTotalPage){
        alert('已经是最后一页');
    }else{
        var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?rowCount=" + SMBRnumPer + "&page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
        console.log(url2);
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                SMdataSource = data.data;
                SMdataTitle = data.header;
                SMBRTotalPage = data.pageCount;
                SMBRPageNum.placeholder = SMBRpage;
                insertSMTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}

//设定时间
SMsubmitDate.onclick = function () {
    getDate(SMstartDate,SMendDate);
    SMBRurlStartTime = getDate(SMstartDate,SMendDate)[0],
    SMBRurlEndTime = getDate(SMstartDate,SMendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?rowCount=" + SMBRnumPer + "&page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SMdataSource = data.data;
            SMdataTitle = data.header;
            SMBRTotalPage = data.pageCount;
            console.log(urlTime);
            //console.log(SMdataSource);
            insertSMTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

SMBRconfirm.onclick = function(){
    tempPage = SMBRpage;
    SMBRpage = parseFloat(SMBRassignPage.value);
    if(isInteger(SMBRpage)){
        console.log(SMBRpage);
        if(SMBRpage <= SMBRTotalPage){
            var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?rowCount=" + SMBRnumPer + "&page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
            console.log(url2);
            $.ajax({
                type: "get",
                url: url2,
                dataType: "json",
                jsonp:"callback",
                success: function (data) {
                    SMdataSource = data.data;
                    SMdataTitle = data.header;
                    SMBRTotalPage = data.pageCount;
                    SMBRPageNum.placeholder = SMBRpage;
                    insertSMTable();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        }else{
            SMBRpage = tempPage;
            alert('超出页数上限，请重新选择页数');
        }
    }else{
        alert('请输入正整数！')
    }
}

SMBRnumPerPage.onchange = function(){
    var tempPer = SMBRnumPer,
        tempTotalPage = SMBRTotalPage,
        tempSelected = SMBRnumPer;
    var p1 = $(this).children('option:selected').val();//这就是selected的值
    SMBRnumPer = p1;
    var url2 = "http://123.206.134.34:8080/Medicals_war/operation/shoumabingren?rowCount=" + SMBRnumPer + "&page="+SMBRpage+"&startTime="+SMBRurlStartTime+"&endTime="+SMBRurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SMdataSource = data.data;
            SMdataTitle = data.header;
            SMBRTotalPage = data.pageCount;

            if(SMBRTotalPage < SMBRpage){
                alert('超出数据量上限，请重新选择页数或者每页数据条数');
                SMBRnumPer = tempPer;
                SMBRTotalPage = tempTotalPage;
                for(var i = 0; i < SMBRnumPerPage.options.length; i++){
                    if(SMBRnumPerPage.options[i].innerHTML == tempSelected){
                        SMBRnumPerPage.options[i].selected = true;
                        break;
                    }
                }
            }else{
                insertSMTable();
            }
            console.log(url2);
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
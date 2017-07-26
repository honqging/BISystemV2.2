var SSHSGZLTotal = doc.getElementById("SSHSGZLTotal"),
	SSHSGZLTotalPage = 0,
	SSHSGZLnumPerPage = doc.getElementById("SSHSGZLnumPerPage"),
	SSHSGZLnumPer = 20,
	SSHSGZLassignPage = doc.getElementById("SSHSGZLassignPage"),
	SSHSGZLconfirm = doc.getElementById("SSHSGZLconfirm");

var SSHSGZLdataSource = [],
	SSHSdataTitle = [],
	doc = document,
    SSHSGZLpage = 1,
	//SSHSGZLurlStartTime = "2010-01-01",
	SSHSGZLurlStartTime = month1stDate,
    SSHSGZLurlEndTime = currentDate,
    SSHSGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?rowCount="+ SSHSGZLnumPer +"&page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime,
    SSHSGZLstartDate = doc.getElementById("SSHSGZLstartTime"),
    SSHSGZLendDate = doc.getElementById("SSHSGZLendTime"),
    SSHSGZLsubmitDate = doc.getElementById("SSHSGZLsubmitTime");
	SSHSGZLexport = doc.getElementById("SSHSGZLexport");

SSHSGZLstartDate.value = month1stDate;
SSHSGZLendDate.value = currentDate;

$.ajax({
          type: "get",
          url: SSHSGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  SSHSGZLdataSource = data.data;
						  SSHSdataTitle = data.header;
			 		 	  SSHSGZLTotalPage = data.pageCount;

			  //console.log(SSHSGZLdataSource);
						  insertSSHSGZLTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertSSHSGZLTable(){
	//创建表格
	var table = doc.getElementById("SSHSGZL_table");
	var thead = doc.getElementById("SSHSGZL_table_head");
	table.innerHTML = '';
	thead.innerHTML = '';
	//单独添加表头
	var top = doc.getElementById('SSHSGZL_table_top');
	if(SSHSGZLpage != 1){
		top.style.display = 'none';
	}else{
		top.style.display = 'block';
	}
	var td = doc.createElement('td'),
		span = doc.createElement('span');
	span.innerHTML = '🔝';
	td.appendChild(span);
	td.style.width = '2%';
	td.style.padding = '8px';
	thead.appendChild(td);

	for(var t=0;t<SSHSdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(SSHSdataTitle[t]);
		th.appendChild(thData);
		th.style.width = '24%';
		thead.appendChild(th);
	}

	for(var i=0;i<SSHSGZLdataSource.length;i++){
		var tr = doc.createElement("tr");

		var td = doc.createElement('td'),
			span = doc.createElement('span');
		span.innerHTML = '🔝';
		td.appendChild(span);
		td.style.width = '2%';
		tr.appendChild(td);
		tr.onclick = function(){
			$(this).find('span').css('visibility', 'visible');
		};
		td.onclick = function(){
			if($(this).find('span').css('background-color') != 'rgb(255, 255, 0)'){
				$('#SSHSGZL_table_top').prepend($(this).parent().clone(true));
				$(this).find('span').css('background-color', 'yellow');
				$(this).find('span').css('visibility', 'hidden');

				alert('成功置顶');
			}else{
				alert('该项已置顶');
			}
		};

		for(var j=0;j<SSHSGZLdataSource[i].length;j++){
			var data = doc.createTextNode(SSHSGZLdataSource[i][j]),
				td = doc.createElement("td");
			td.title = SSHSGZLdataSource[i][j];
			td.appendChild(data);
			td.style.width = '24%'
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	SSHSGZLTotal.innerHTML = SSHSGZLTotalPage;
}
//��ҳ
var SSHSGZLbeforePage = doc.getElementById("SSHSGZLPageBefore"),
	SSHSGZLnextPage = doc.getElementById("SSHSGZLPageNext"),
	SSHSGZLpageNum = doc.getElementById("SSHSGZLPageNum");

	SSHSGZLbeforePage.onclick = function(){
		if(SSHSGZLpage==1){alert("已经是第一页");}
		else{
            SSHSGZLpage --;
			//console.log(page);
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?rowCount="+ SSHSGZLnumPer +"&page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  SSHSGZLdataSource = data.data;
								  SSHSdataTitle = data.header;
					  			  SSHSGZLTotalPage = data.pageCount;

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
		var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?rowCount="+ SSHSGZLnumPer +"&page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
		//console.log(SSHSGZLpage);
		if(SSHSGZLpage > SSHSGZLTotalPage){
			SSHSGZLpage --;
			alert('已经是最后一页');
		}else {
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp: "callback",
				success: function (data) {
					SSHSGZLdataSource = data.data;
					SSHSdataTitle = data.header;
					SSHSGZLTotalPage = data.pageCount;

					//console.log(SSHSGZLdataSource);
					SSHSGZLpageNum.placeholder = SSHSGZLpage;
					insertSSHSGZLTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}
	}
//�趨ʱ��
SSHSGZLsubmitDate.onclick = function () {
    getDate(SSHSGZLstartDate,SSHSGZLendDate);
    SSHSGZLurlStartTime = getDate(SSHSGZLstartDate,SSHSGZLendDate)[0],
    SSHSGZLurlEndTime = getDate(SSHSGZLstartDate,SSHSGZLendDate)[1];
	SSHSGZLpage = 1;
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?rowCount="+ SSHSGZLnumPer +"&page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            SSHSGZLdataSource = data.data;
            SSHSdataTitle = data.header;
			SSHSGZLTotalPage = data.pageCount;

			insertSSHSGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

SSHSGZLconfirm.onclick = function(){
	tempPage = SSHSGZLpage;
	SSHSGZLpage = parseFloat(SSHSGZLassignPage.value);
	if(isInteger(SSHSGZLpage)){
		console.log(SSHSGZLpage);
		if(SSHSGZLpage <= SSHSGZLTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?rowCount=" + SSHSGZLnumPer + "&page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					SSHSGZLdataSource = data.data;
					SSHSGZLdataTitle = data.header;
					SSHSGZLTotalPage = data.pageCount;
					SSHSGZLPageNum.placeholder = SSHSGZLpage;
					insertSSHSGZLTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			SSHSGZLpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

SSHSGZLnumPerPage.onchange = function(){
	var tempPer = SSHSGZLnumPer,
		tempTotalPage = SSHSGZLTotalPage,
		tempSelected = SSHSGZLnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	SSHSGZLnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/shoushuhushi?rowCount=" + SSHSGZLnumPer + "&page="+SSHSGZLpage+"&startTime="+SSHSGZLurlStartTime+"&endTime="+SSHSGZLurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			SSHSGZLdataSource = data.data;
			SSHSGZLdataTitle = data.header;
			SSHSGZLTotalPage = data.pageCount;

			if(SSHSGZLTotalPage < SSHSGZLpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				SSHSGZLnumPer = tempPer;
				SSHSGZLTotalPage = tempTotalPage;
				for(var i = 0; i < SSHSGZLnumPerPage.options.length; i++){
					if(SSHSGZLnumPerPage.options[i].innerHTML == tempSelected){
						SSHSGZLnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertSSHSGZLTable();
			}
			console.log(url2);
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

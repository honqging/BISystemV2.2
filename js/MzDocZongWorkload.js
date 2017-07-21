var MZYSZGZLTotal = doc.getElementById("MZYSZGZLTotal"),
	MZYSZGZLTotalPage = 0,
	MZYSZGZLnumPerPage = doc.getElementById("MZYSZGZLnumPerPage"),
	MZYSZGZLnumPer = 20,
	MZYSZGZLassignPage = doc.getElementById("MZYSZGZLassignPage"),
	MZYSZGZLconfirm = doc.getElementById("MZYSZGZLconfirm");

var MzDocZongWorkloadpage = 1,
	MZYSZGZLdataSource = [],
	MZYSZGZLdataTitle = [],
	doc = document,
	//MZYSZGZLurlStartTime = "2010-01-01",
	MZYSZGZLurlStartTime = month1stDate,
    MZYSZGZLurlEndTime = currentDate,
    MZYSZGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount="+ MZYSZGZLnumPer +"&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime,
    MZYSZGZLstartDate = doc.getElementById("MZYSZGZLstartTime"),
    MZYSZGZLendDate = doc.getElementById("MZYSZGZLendTime"),
    MZYSZGZLsubmitDate = doc.getElementById("MZYSZGZLsubmitTime");
	MZYSZGZLexport = doc.getElementById("MZYSZGZLexport");

MZYSZGZLstartDate.value = month1stDate;
MZYSZGZLendDate.value = currentDate;

$.ajax({
          type: "get",
          url: MZYSZGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  MZYSZGZLdataSource = data.data;
						  MZYSZGZLdataTitle = data.header;
						  MZYSZGZLTotalPage = data.pageCount;

						  //console.log(MZYSZGZLdataSource);
						  insertMZYSZGZLTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertMZYSZGZLTable(){
	//创建表格
	var table = doc.getElementById("MZYSZGZL_table");
	var thead = doc.getElementById("MZYSZGZL_table_head");
	//var divAll = doc.getElementById("MZYSZGZL");

	table.innerHTML = '';
	thead.innerHTML = '';
	//divAll.style.height = '200px';
	//divAll.style.overflowY = 'scroll';
	//单独添加表头
	for(var t=0;t<MZYSZGZLdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(MZYSZGZLdataTitle[t]);
		th.style.width = "20%";
		th.appendChild(thData);
		thead.appendChild(th);
	}

	for(var i=0;i<MZYSZGZLdataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<MZYSZGZLdataSource[i].length;j++){
			if(j == MZYSZGZLdataSource[i].length-1){
				var data = doc.createTextNode(MZYSZGZLdataSource[i][j]),
					a = doc.createElement("a"),
					td = doc.createElement("td");
				a.setAttribute("tabindex","0");
				a.setAttribute("role","button");
				a.setAttribute("data-toggle","popover");
				a.setAttribute("data-trigger","focus");
				a.setAttribute("data-placement","top");
				//a.setAttribute("data-content",MZYSZGZLdataSource[i][j]);
				a.id = MZYSZGZLdataSource[i][1];
				a.onclick = function(){
                    var result;
                    $("[data-toggle='popover']").popover({
                        html:true,
                        content:'<div id="content">loading...</div>'
                    });
                    $.ajax({
                          type: "get",
                          url: "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzongQuery?name="+this.id+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime,
                          dataType: "json",
                          jsonp:"callback",
                          success: function (data) {
										  result = data;
										  var wholeDiv = doc.createElement("div");
										  for(var i=0;i<result.length;i++){
											  var eachData = doc.createTextNode(result[i]);
											  var p = doc.createElement("p");
											  p.appendChild(eachData);
											  wholeDiv.appendChild(p);
										  }
										  $('#content').html(wholeDiv);
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
                var data = doc.createTextNode(MZYSZGZLdataSource[i][j]);
				var td = doc.createElement("td");
				td.title = MZYSZGZLdataSource[i][j];
				td.appendChild(data);
			}
			td.style.width = "20%";
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	MZYSZGZLTotal.innerHTML = MZYSZGZLTotalPage;
}

//��ҳ
var MZYSZGZLbeforePage = doc.getElementById("MZYSZGZLPageBefore"),
    MZYSZGZLnextPage = doc.getElementById("MZYSZGZLPageNext"),
	MZYSZGZLPageNum = doc.getElementById("MZYSZGZLPageNum");

	MZYSZGZLbeforePage.onclick = function(){
		if(MzDocZongWorkloadpage==1){alert("已经是第一页");}
		else{
            MzDocZongWorkloadpage --;
			//console.log(MzDocZongWorkloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount="+ MZYSZGZLnumPer +"&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  MZYSZGZLdataSource = data.data;
								  MZYSZGZLdataTitle = data.header;
								  MZYSZGZLTotalPage = data.pageCount;

								  MZYSZGZLPageNum.placeholder = MzDocZongWorkloadpage;
								  insertMZYSZGZLTable();
								   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
		}
	}
	MZYSZGZLnextPage.onclick = function(){
        MzDocZongWorkloadpage ++;
		var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount="+ MZYSZGZLnumPer +"&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
		//console.log(MzDocZongWorkloadpage);
		if(MzDocZongWorkloadpage > MZYSZGZLTotalPage){
			alert('已经是最后一页');
		}else {
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp: "callback",
				success: function (data) {
					MZYSZGZLdataSource = data.data;
					MZYSZGZLdataTitle = data.header;
					MZYSZGZLTotalPage = data.pageCount;

					MZYSZGZLPageNum.placeholder = MzDocZongWorkloadpage;
					insertMZYSZGZLTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}
	}

//�趨ʱ��
MZYSZGZLsubmitDate.onclick = function () {
    getDate(MZYSZGZLstartDate,MZYSZGZLendDate);
    MZYSZGZLurlStartTime = getDate(MZYSZGZLstartDate,MZYSZGZLendDate)[0],
    MZYSZGZLurlEndTime = getDate(MZYSZGZLstartDate,MZYSZGZLendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount="+ MZYSZGZLnumPer +"&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZYSZGZLdataSource = data.data;
            MZYSZGZLdataTitle = data.header;
			MZYSZGZLTotalPage = data.pageCount;

			//console.log(SMdataSource);
            insertMZYSZGZLTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

MZYSZGZLconfirm.onclick = function(){
	tempPage = MzDocZongWorkloadpage;
	MzDocZongWorkloadpage = parseFloat(MZYSZGZLassignPage.value);
	if(isInteger(MzDocZongWorkloadpage)){
		console.log(MzDocZongWorkloadpage);
		if(MzDocZongWorkloadpage <= MZYSZGZLTotalPage){
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount=" + MZYSZGZLnumPer + "&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
			console.log(url2);
			$.ajax({
				type: "get",
				url: url2,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					MZYSZGZLdataSource = data.data;
					MZYSZGZLdataTitle = data.header;
					MZYSZGZLTotalPage = data.pageCount;
					MZYSZGZLPageNum.placeholder = MzDocZongWorkloadpage;
					insertMZYSZGZLTable();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}else{
			MzDocZongWorkloadpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

MZYSZGZLnumPerPage.onchange = function(){
	var tempPer = MZYSZGZLnumPer,
		tempTotalPage = MZYSZGZLTotalPage,
		tempSelected = MZYSZGZLnumPer;
	var p1 = $(this).children('option:selected').val();//这就是selected的值
	MZYSZGZLnumPer = p1;
	var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?rowCount=" + MZYSZGZLnumPer + "&page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
	$.ajax({
		type: "get",
		url: url2,
		dataType: "json",
		jsonp:"callback",
		success: function (data) {
			MZYSZGZLdataSource = data.data;
			MZYSZGZLdataTitle = data.header;
			MZYSZGZLTotalPage = data.pageCount;

			if(MZYSZGZLTotalPage < MzDocZongWorkloadpage){
				alert('超出数据量上限，请重新选择页数或者每页数据条数');
				MZYSZGZLnumPer = tempPer;
				MZYSZGZLTotalPage = tempTotalPage;
				for(var i = 0; i < MZYSZGZLnumPerPage.options.length; i++){
					if(MZYSZGZLnumPerPage.options[i].innerHTML == tempSelected){
						MZYSZGZLnumPerPage.options[i].selected = true;
						break;
					}
				}
			}else{
				insertMZYSZGZLTable();
			}
			console.log(url2);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

MZYSZGZLexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuiyishengzong?&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
}

addLoadEvent(initialPicker(MZYSZGZLstartDate,MZYSZGZLendDate));

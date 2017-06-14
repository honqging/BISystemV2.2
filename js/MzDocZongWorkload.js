var MzDocZongWorkloadpage = 1,
	MZYSZGZLdataSource = [],
	MZYSZGZLdataTitle = [],
	doc = document,
	MZYSZGZLurlStartTime = "2010-01-01",
    MZYSZGZLurlEndTime = currentDate,
    MZYSZGZLurl = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime,
    MZYSZGZLstartDate = doc.getElementById("MZYSZGZLstartTime"),
    MZYSZGZLendDate = doc.getElementById("MZYSZGZLendTime"),
    MZYSZGZLsubmitDate = doc.getElementById("MZYSZGZLsubmitTime");
	MZYSZGZLexport = doc.getElementById("MZYSZGZLexport");

$.ajax({
          type: "get",
          url: MZYSZGZLurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) {
						  MZYSZGZLdataSource = data.data;
						  MZYSZGZLdataTitle = data.header;
						 //console.log(MZYSZGZLdataSource);
						  insertMZYSZGZLTable();
                           },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
		  alert(errorThrown);
		 }
	 });
function insertMZYSZGZLTable(){
	//�������
	var table = doc.getElementById("MZYSZGZL_table");
	table.innerHTML = '';
	//������ӱ�ͷ
	for(var t=0;t<MZYSZGZLdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(MZYSZGZLdataTitle[t]);
		th.appendChild(thData);
		table.appendChild(th);
	}
	for(var i=1;i<MZYSZGZLdataSource.length;i++){
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
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

//��ҳ
var MZYSZGZLbeforePage = doc.getElementById("MZYSZGZLPageBefore"),
    MZYSZGZLnextPage = doc.getElementById("MZYSZGZLPageNext"),
	MZYSZGZLPageNum = doc.getElementById("MZYSZGZLPageNum");

	MZYSZGZLbeforePage.onclick = function(){
		if(MzDocZongWorkloadpage==1){alert("�Ѿ��ǵ�һҳ");}
		else{
            MzDocZongWorkloadpage --;
			//console.log(MzDocZongWorkloadpage);
			var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  MZYSZGZLdataSource = data.data;
								  MZYSZGZLdataTitle = data.header;
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
		var url2 = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
		//console.log(MzDocZongWorkloadpage);
			$.ajax({
				  type: "get",
				  url: url2,
				  dataType: "json",
				  jsonp:"callback",
				  success: function (data) {
								  MZYSZGZLdataSource = data.data;
								  MZYSZGZLdataTitle = data.header;
								  MZYSZGZLPageNum.placeholder = MzDocZongWorkloadpage;
								  insertMZYSZGZLTable();
								   },
				  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  alert(errorThrown);
				 }
			 });
	}

//�趨ʱ��
MZYSZGZLsubmitDate.onclick = function () {
    getDate(MZYSZGZLstartDate,MZYSZGZLendDate);
    MZYSZGZLurlStartTime = getDate(MZYSZGZLstartDate,MZYSZGZLendDate)[0],
    MZYSZGZLurlEndTime = getDate(MZYSZGZLstartDate,MZYSZGZLendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/statistic/mazuiyishengzong?page="+MzDocZongWorkloadpage+"&startTime="+MZYSZGZLurlStartTime+"&endTime="+MZYSZGZLurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZYSZGZLdataSource = data.data;
            MZYSZGZLdataTitle = data.header;
            //console.log(SMdataSource);
            insertMZYSZGZLTable();
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
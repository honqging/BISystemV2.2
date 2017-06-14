var MZFSpage = 1,
    MZFSdataSource = [],
    MZFSdataTitle = [],
    doc = document,
	MZFSurlStartTime = "2010-01-01",
    MZFSurlEndTime = currentDate,
    MZFSurl = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime,
    MZFSstartDate = doc.getElementById("MZFSstartTime"),
    MZFSendDate = doc.getElementById("MZFSGendTime"),
    MZFSsubmitDate = doc.getElementById("MZFSsubmitTime");
    MZFSexport = doc.getElementById("MZFSexport");

$.ajax({
    type: "get",
    url: MZFSurl,
    dataType: "json",
    jsonp:"callback",
    success: function (data) {
        MZFSdataSource = data.data;
        MZFSdataTitle = data.header;
        insertMZXGTable();
		test();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    }
});
function insertMZXGTable(){
	var subId = 1000;
    //�������
    var table = doc.getElementById("MZFS_table");
    table.innerHTML = '';
    //������ӱ�ͷ
    for(var t=0;t<MZFSdataTitle.length;t++){
        var th = doc.createElement("th"),
            thData = doc.createTextNode(MZFSdataTitle[t]);
        th.appendChild(thData);
        table.appendChild(th);
    }
    for(var i=0;i<MZFSdataSource.length;i++){
        var tr1 = doc.createElement("tr");
		var data1 = doc.createTextNode(MZFSdataSource[i].groupName),
			td1 = doc.createElement("td");
		td1.appendChild(data1);
		var data2 = doc.createTextNode(MZFSdataSource[i].sum),
			a = doc.createElement("a"),
			td2 = doc.createElement("td");
		a.appendChild(data2);
		td2.appendChild(a);
		tr1.appendChild(td1);
		tr1.appendChild(td2);
		tr1.lang = "{id:"+(i+1)+",pid:0,level:0}";
		table.appendChild(tr1);
		for(var k=0;k<MZFSdataSource[i].groupRows.length;k++){
			var tr2 = doc.createElement("tr");
			var data3 = doc.createTextNode(MZFSdataSource[i].groupRows[k][0]),
				td3 = doc.createElement("td");
			td3.appendChild(data3);
			var data4 = doc.createTextNode(MZFSdataSource[i].groupRows[k][1]),
				a = doc.createElement("a"),
				td4 = doc.createElement("td");
			a.appendChild(data4);
			td4.appendChild(a);
			tr2.appendChild(td3);
			tr2.appendChild(td4);
			tr2.lang = "{id:"+subId+",pid:"+(i+1)+",level:1}";
			subId ++;
			table.appendChild(tr2);
		}
    }
}

//��ҳ
var MZFSpageBefore = doc.getElementById("MZFSPageBefore"),
    MZFSpageNext = doc.getElementById("MZFSPageNext"),
    MZFSpageNum = doc.getElementById("MZFSPageNum");

MZFSpageBefore.onclick = function(){
    if(MZFSpage==1){alert("�Ѿ��ǵ�һҳ");}
    else{
        MZFSpage --;
        var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
        $.ajax({
            type: "get",
            url: url2,
            dataType: "json",
            jsonp:"callback",
            success: function (data) {
                MZFSdataSource = data.data;
                MZFSdataTitle = data.header;
                MZFSpageNum.placeholder = MZFSpage;
                insertMZXGTable();
				test();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    }
}
MZFSpageNext.onclick = function(){
    MZFSpage ++;
    var url2 = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
    $.ajax({
        type: "get",
        url: url2,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZFSdataSource = data.data;
            MZFSdataTitle = data.header;
            MZFSpageNum.placeholder = MZFSpage;
            insertMZXGTable();
			test();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

//�趨ʱ��
MZFSsubmitDate.onclick = function () {
    getDate(MZFSstartDate,MZFSendDate);
    MZFSurlStartTime = getDate(MZFSstartDate,MZFSendDate)[0],
    MZFSurlEndTime = getDate(MZFSstartDate,MZFSendDate)[1];
    var urlTime = "http://123.206.134.34:8080/Medicals_war/reportform/mazuigenggai?page="+MZFSpage+"&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
    $.ajax({
        type: "get",
        url: urlTime,
        dataType: "json",
        jsonp:"callback",
        success: function (data) {
            MZFSdataSource = data.data;
            MZFSdataTitle = data.header;
            insertMZXGTable();
			test();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

MZFSexport.onclick = function () {
    window.location="http://123.206.134.34:8080/Medicals_war/export/mazuigenggai?&startTime="+MZFSurlStartTime+"&endTime="+MZFSurlEndTime;
}

addLoadEvent(initialPicker(MZFSstartDate,MZFSendDate));

//��ʼ����
function test(){
	var otb = null;
	/*var isLoaded = false;
	if(!isLoaded){ */
		otb = new oTreeTable('otb', document.getElementById('treeTable'), {skin:'default',showIcon:false});
		//isLoaded = true;
	//}
}
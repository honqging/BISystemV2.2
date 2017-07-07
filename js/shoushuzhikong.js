var SSZKurl = "http://123.206.134.34:8080/Medicals_temp/operation/shoushuzhikong",
	SSZKdataSource = [],
	SSZKdataTitle = [],
	zkTitle = doc.getElementById("zkTitle"),
	doc = document;

//获取手术质控数据
$.ajax({ 
          type: "get", 
          url: SSZKurl,
          dataType: "json",
		  jsonp:"callback",
          success: function (data) { 
						  SSZKdataSource = data.data;
						  SSZKdataTitle = data.detailHeader;
						  //console.log(SSZKdataSource);
						  //insertSSZKtable();
						  insertSSZKtable(0);
						  for(var i=0;i<5;i++){
							k = i+1;
							doc.getElementById("zk"+k).innerHTML = data.data[i].groupRows.length;
						  }
                           }, 
		  error: function (XMLHttpRequest, textStatus, errorThrown) { 
		  alert(errorThrown); 
		 } 
	 });
function insertSSZKtable(n){
	//创建表格
	var table = doc.getElementById("SSZK_table");
	table.innerHTML = ''
	//单独添加表头
	for(var t=0;t<SSZKdataTitle.length;t++){
		var th = doc.createElement("th"),
			thData = doc.createTextNode(SSZKdataTitle[t]);
		th.appendChild(thData);
		table.appendChild(th);
	}
	var detailDataSource = [];
	detailDataSource = SSZKdataSource[n].groupRows;
	zkTitle.innerHTML = SSZKdataSource[n].groupName + "——详情";
	for(var i=0;i<detailDataSource.length;i++){
		var tr = doc.createElement("tr");
		for(var j=0;j<detailDataSource[i].length;j++){
			var data = doc.createTextNode(detailDataSource[i][j]),
				td = doc.createElement("td");
			td.title = detailDataSource[i][j];
			td.appendChild(data);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}


var item1 = doc.getElementById("zk1").onclick = function(){ 
	insertSSZKtable(0);
};
var item2 = doc.getElementById("zk2").onclick = function(){
	insertSSZKtable(1);
};
var item3 = doc.getElementById("zk3").onclick = function(){
	insertSSZKtable(2);
};
var item4 = doc.getElementById("zk4").onclick = function(){
	insertSSZKtable(3);
};
var item5 = doc.getElementById("zk5").onclick = function(){
	insertSSZKtable(4);
};

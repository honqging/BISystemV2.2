var MZpage = 1,
	doc = document,
	MZurlStartTime = "2010-01-01",
	MZurlEndTime = currentDate,
	//MZEchartsUrl = "http://123.206.134.34:8080/Medicals_war/charts/mazuifangfa?page="+MZpage+"&startTime="+MZurlStartTime+"&endTime="+MZurlEndTime,
	MZstartDate = doc.getElementById("MZstartTime"),
	MZendDate = doc.getElementById("MZendTime"),
	MZsubmitDate = doc.getElementById("MZsubmitTime");
	MZexport = doc.getElementById("MZexport");

var MZpageBefore = doc.getElementById("MZPageBefore"),
	MZpageNext = doc.getElementById("MZPageNext"),
	MZpageNum = doc.getElementById("MZPageNum");

MZpageBefore.onclick = function(){
	if(MZpage==1){alert("已经是第一页");}
	else{
		MZpage --;
		MZFFcharts();
	}
}

MZpageNext.onclick = function(){
	console.log("1"+MZpage);
	MZpage ++;
	console.log("2"+MZpage);
	MZFFcharts();
}

//设定时间
MZsubmitDate.onclick = function () {
	getDate(MZstartDate,MZendDate);
	MZurlStartTime = getDate(MZstartDate,MZendDate)[0],
		MZurlEndTime = getDate(MZstartDate,MZendDate)[1];
	MZFFcharts();
}

MZexport.onclick = function () {
	// no interface yet
}
addLoadEvent(initialPicker(MZstartDate, MZendDate));

function MZFFcharts(){
	require.config({
		paths: {
			echarts: './build/dist' //引用资源文件夹路径，注意路径
		}
	});
	require(
		[
			'echarts',
			'echarts/chart/bar'     //柱形图
			//'echarts/chart/line'    //折线图
		],
		function (ec) {
			var MZEchartsUrl = "http://123.206.134.34:8080/Medicals_war/charts/mazuifangfa?page="+MZpage+"&startTime="+MZurlStartTime+"&endTime="+MZurlEndTime;
			var url = MZEchartsUrl;
			console.log(url);
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					MZpageNum.placeholder = MZpage;
					//console.log(dataSource);
					addData();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax
			function addData(){
				var myChart = ec.init(document.getElementById('MZFFTJT_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#3C98DC'];
				var option = {
					color: colors,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						right: '20%'
					},
					toolbox: {
						feature: {
							dataView: {show: true, readOnly: false},
							restore: {show: true},
							saveAsImage: {show: true}
						}
					},
					legend: {
						data: ['麻醉方法数量'],
						align: 'left'
					},
					xAxis: [
						{
							type: 'category',
						   /*  axisTick: {
								alignWithLabel: true
							}, */
							data: dataSource.x,
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '数量',
							min: 0,
						}
					],
					series: [
						{
							name:'麻醉方法数量',
							type:'bar',
							data:dataSource.y,
						}
					]
				};
				myChart.setOption(option);
			}
		}
	);
}
addLoadEvent(MZFFcharts());
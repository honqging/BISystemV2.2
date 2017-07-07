var doc = document,
	ZDSSurlStartTime = "2010-01-01",
	ZDSSurlEndTime = currentDate,
	ZDSSstartDate = doc.getElementById("ZDSSstartTime"),
	ZDSSendDate = doc.getElementById("ZDSSendTime"),
	ZDSSsubmitDate = doc.getElementById("ZDSSsubmitTime");

//设定时间
ZDSSsubmitDate.onclick = function () {
	getDate(ZDSSstartDate,ZDSSendDate);
	ZDSSurlStartTime = getDate(ZDSSstartDate,ZDSSendDate)[0],
		ZDSSurlEndTime = getDate(ZDSSstartDate,ZDSSendDate)[1];
	ZDSScharts();
}

addLoadEvent(initialPicker(ZDSSstartDate, ZDSSendDate));

function ZDSScharts(){
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
			var ZDSSEchartsUrl = "http://123.206.134.34:8080/Medicals_temp/charts/zhundian?startTime="+ZDSSurlStartTime+"&endTime="+ZDSSurlEndTime;
			var url = ZDSSEchartsUrl;
			console.log(url);
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					//console.log(dataSource);
					addData();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax
			function addData(){
				var myChart = ec.init(document.getElementById('ZDSS_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#2A92FF'];
				var option = {
					color: colors,
					title: {
						text: '开台时间',
						textStyle : {
							fontSize : '15',
							fontWeight : 'normal'
						},
						x: 'center',
						y: 'bottom'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						right: '20%',
						y2: 60
					},
					toolbox: {
						feature: {
							dataView: {show: true, readOnly: false},
							restore: {show: true},
							saveAsImage: {show: true}
						}
					},
					//legend: {
					//	data: ['开台例数']
					//},
					xAxis: [
						{
							type: 'category',
						   /*  axisTick: {
								alignWithLabel: true
							}, */
							data: dataSource.x,
							axisLabel: {
								//横轴信息全部显示
								interval:0
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '开台例数',
							min: 0
						}
					],
					series: [
						{
							name:'开台例数',
							type:'bar',
							itemStyle: {
								normal: {
									label : {
										show : true
									}
								}
							},
							data:dataSource.y
						}
					]
				};
				myChart.setOption(option);
			}
		}
	);
}
addLoadEvent(ZDSScharts());

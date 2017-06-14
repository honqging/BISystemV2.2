function KScharts1(){
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
			var url = KSCharts1url;
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
			//result ajax 取
			function addData(){
				var myChart = ec.init(document.getElementById('KS_Echarts1'));
				var ecConfig = require('echarts/config');
				var colors = ['red', 'green', 'yellow','blue'];
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
						data:['手术等级_特','手术等级_大','手术等级_中','手术等级_小']
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
							name: '手术例数',
							min: 0,
						},
						{
							type: 'value',
							name: '',
							min: 0,
						},
						{
							type: 'value',
							name: '',
							min: 0,
							axisLine: {
								lineStyle: {
									color: colors[2]
								}
							},
							axisLabel: {
								formatter: '{value}'
							}
						},
						{
							type: 'value',
							name: '',
							min: 0,
							axisLine: {
								lineStyle: {
									color: colors[3]
								}
							},
							axisLabel: {
								formatter: '{value}'
							}
						}
					],
					series: [
						{
							name:'手术等级_特',
							type:'bar',
							data:dataSource.y1,
						},
						{
							name:'手术等级_大',
							type:'bar',
							yAxisIndex: 1,
							data:dataSource.y2,
						},
						{
							name:'手术等级_中',
							type:'bar',
							yAxisIndex: 1,
							data:dataSource.y3,
						},
						{
							name:'手术等级_小',
							type:'bar',
							yAxisIndex: 1,
							data:dataSource.y5,
						}
					]
				};
				myChart.setOption(option);
			}
		}
	);
}
addLoadEvent(KScharts1());
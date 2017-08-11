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
					if(dataSource.x.length != 0){
						addData();
					}else{
						doc.getElementById('KS_Echarts1').innerHTML = '';
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax 取
			function addData(){
				var myChart = ec.init(document.getElementById('KS_Echarts1'));
				var ecConfig = require('echarts/config');
				var colors = ['#D74644', '#84D57C', '#F3D643','#75C4F3'];
				var option = {
					color: colors,
					tooltip: {
						//trigger: 'axis',
						//axisPointer: {
						//	type: 'cross'
						//}
					},
					grid: {
						right: '20%',
						y2: 100
					},
					toolbox: {
						feature: {
							dataView: {show: true, readOnly: false},
							restore: {show: true},
							saveAsImage: {show: true}
						}
					},
					legend: {
						data:['一级手术','二级手术','三级手术','四级手术']
					},
					xAxis: [
						{
							type: 'category',
						   /*  axisTick: {
								alignWithLabel: true
							}, */
							data: dataSource.x,
							axisLabel: {
								//横轴信息全部显示
								interval:0,

								//横轴信息文字每行显示三个
								formatter:function(val){
									var newVal = '';
									var vList = val.split("");
									for(var j = 0; j<vList.length; j++){
										if(j%3 == 0 && j!=0){
											newVal += '\n';
										}
										newVal += vList[j];
									}
									return newVal;
								}
							}
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
							name:'一级手术',
							type:'bar',
							data:dataSource.y1,
						},
						{
							name:'二级手术',
							type:'bar',
							yAxisIndex: 1,
							data:dataSource.y2,
						},
						{
							name:'三级手术',
							type:'bar',
							yAxisIndex: 1,
							data:dataSource.y3,
						},
						{
							name:'四级手术',
							type:'bar',
							yAxisIndex: 1,
							data:dataSource.y4,
						}
					]
				};
				myChart.setOption(option);
			}
		}
	);
}
addLoadEvent(KScharts1());
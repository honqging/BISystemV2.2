function NLDKSEcharts(){
	require.config({
				paths: {
					echarts: './build/dist' //引用资源文件夹路径，注意路径
				}
			});
	require(
		[
			'echarts',
			'echarts/chart/pie'     //饼图  （如需饼漏斗图动态类型切换，require时还需要echarts/chart/funnel）
			//'echarts/chart/chord'   //和弦图
			//'echarts/chart/map'     //地图
			//'echarts/chart/radar'   //雷达
			//'echarts/chart/line',   // 按需加载所需图表，用到什么类型就加载什么类型，这里不需要考虑路径
			//'echarts/chart/bar'     //柱形图
			//'echarts/chart/line'    //折线图
		],
		function (ec) {
			var url = NLDKSurl;
			var dataSource = [];
			$.ajax({
					  type: "get",
					  url: url,
					  dataType: "json",
					  jsonp:"callback",
					  success: function (data) {
						  dataSource = data;
						  addData();
					  },
					  error: function (XMLHttpRequest, textStatus, errorThrown) {
					  alert(errorThrown);
					 }
				 });
			//result ajax 取
			function addData(){
				//var result = dataSource;

				var name = NLDKSdataTitle.slice(1, NLDKSdataTitle.length),
					value = allData.slice(1, allData.length);

				var res = "";
				for(var i = 0; i < name.length; i++){
					res += '{"value":"' + value[i+1] + '","name":"' + name[i] + '"}';
					if(i != name.length-1){
						res += ","
					}
				}
				res = JSON.parse("[" + res + "]");

				var myChart = ec.init(document.getElementById('NLDKS_Echarts'));
				var ecConfig = require('echarts/config');
				var option = {
					color: ['#CFDDEA', '#56CEFE', '#6BB9A1', '#E7982D', '#F4D739', '#DF63A4', '#F1CA8F'],
					title : {
						text: '按年龄段统计麻醉手术次数',
						x:'center',
						textStyle : {
							fontSize : '12'
						}
					},
					//tooltip : {
					//	trigger: 'item'
					//},
					toolbox: {
						show : true
					},
					calculable : true,
					series : [
						{
							name:'麻醉手术次数',
							type:'pie',
							radius : ['35%', '70%'],
							itemStyle : {
								normal : {
									label : {
										show : true,
										//position: 'inner',
										formatter: '{b} : {c} 人'
									},
									labelLine : {
										show : false
									}
								}
								//emphasis : {
								//	label : {
								//		show : true,
								//		position : 'outer',
								//		textStyle : {
								//			fontSize : '20',
								//			fontWeight : 'bold'
								//		}
								//	}
								//}
							},
							data: res
						}
					]
				};

				myChart.setOption(option);
			}
		}
	); 
}
addLoadEvent(NLDKSEcharts());

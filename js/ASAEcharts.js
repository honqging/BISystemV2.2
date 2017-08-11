function ASAEcharts(){
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
			var url = ASAEchartsurl;
			var dataSource = [];
			$.ajax({ 
					  type: "get", 
					  url: url,
					  dataType: "json",
					  jsonp:"callback",
					  success: function (data) { 
									  dataSource = data;
									  //console.log(dataSource);
						  if(dataSource.length != 0){
							  addData();
						  }else{
							  doc.getElementById('ASA_Echarts').innerHTML = '';
						  }
					  },
					  error: function (XMLHttpRequest, textStatus, errorThrown) { 
					  alert(errorThrown); 
					 } 
				 });
			//result ajax 取
			function addData(){
				var result = dataSource; 
				
				var myChart = ec.init(document.getElementById('ASA_Echarts'));
				var ecConfig = require('echarts/config');
				var option = {
					color: ['#E7982D', '#F4D739', '#7F95FC', '#E38081', '#AEE5FE', '#C2A0FC', '#CFDDEA', '#56CEFE', '#6BB9A1'],
					title : {
							text: '',
							subtext: 'ASA分级手术统计饼图',
							x:'center'
						},
						calculable : true,
						series : [
							{
								name:'访问来源',
								type:'pie',
								radius : '55%',
								center: ['50%', '60%'],
								data: result,
								itemStyle:{
									normal:{
										label:{
											show: true,
											formatter: '{b} : {c} ({d}%)'
									  	},
									  	labelLine :{show:false}
									}
								}
							}
						]
					};
				myChart.setOption(option);
			}
		}
	); 
}
addLoadEvent(ASAEcharts());	
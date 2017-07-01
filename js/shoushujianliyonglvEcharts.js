var SSJLYLpage = 1,
	doc = document,
	SSJLYLurlStartTime = "2010-01-01",
	SSJLYLurlEndTime = currentDate,
	// SSJLYLEchartsUrl = "",
	SSJLYLstartDate = doc.getElementById("SSJLYLstartTime"),
	SSJLYLendDate = doc.getElementById("SSJLYLendTime"),
	SSJLYLsubmitDate = doc.getElementById("SSJLYLsubmitTime");

var SSJLYLpageBefore = doc.getElementById("SSJLYLPageBefore"),
	SSJLYLpageNext = doc.getElementById("SSJLYLPageNext"),
	SSJLYLpageNum = doc.getElementById("SSJLYLPageNum");

SSJLYLpageBefore.onclick = function(){
	if(SSJLYLpage==1){alert("已经是第一页");}
	else{
		SSJLYLpage --;
		SSJLYLcharts();
	}
}

SSJLYLpageNext.onclick = function(){
	console.log("1"+SSJLYLpage);
	SSJLYLpage ++;
	console.log("2"+SSJLYLpage);
	SSJLYLcharts();
}

//设定时间
SSJLYLsubmitDate.onclick = function () {
	getDate(SSJLYLstartDate,SSJLYLendDate);
	SSJLYLurlStartTime = getDate(SSJLYLstartDate,SSJLYLendDate)[0],
		SSJLYLurlEndTime = getDate(SSJLYLstartDate,SSJLYLendDate)[1];
	SSJLYLcharts();
}

addLoadEvent(initialPicker(SSJLYLstartDate, SSJLYLendDate));

function SSJLYLcharts(){
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
			var SSJLYLEchartsUrl = "http://123.206.134.34:8080/Medicals_war/charts/liyonglv?page="+SSJLYLpage+"&startTime="+SSJLYLurlStartTime+"&endTime="+SSJLYLurlEndTime;
			var url = SSJLYLEchartsUrl;
			console.log(url);
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					SSJLYLpageNum.placeholder = SSJLYLpage;
					//console.log(dataSource);
					addData();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax
			function addData(){
				var myChart = ec.init(document.getElementById('SSJLYL_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#7743DC'];
				var option = {
					color: colors,
					title: {
						text: '手术间',
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
										if(j%12 == 0 && j!=0){
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
							min: 0
						}
					],
					series: [
						{
							name:'手术例数',
							type:'bar',
							barCategoryGap: '70%',
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
addLoadEvent(SSJLYLcharts());

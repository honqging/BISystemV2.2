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
					title: {
						text: '麻醉方法',
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
						y2: 80
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
							name:'麻醉方法数量',
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
addLoadEvent(MZFFcharts());
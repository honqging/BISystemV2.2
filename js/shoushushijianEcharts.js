var SSSJpage = 1,
	doc = document,
	SSSJurlStartTime = "2010-01-01",
	SSSJurlEndTime = currentDate,
	// SSSJEchartsUrl = "",
	SSSJstartDate = doc.getElementById("SSSJstartTime"),
	SSSJendDate = doc.getElementById("SSSJendTime"),
	SSSJsubmitDate = doc.getElementById("SSSJsubmitTime");

var SSSJpageBefore = doc.getElementById("SSSJPageBefore"),
	SSSJpageNext = doc.getElementById("SSSJPageNext"),
	SSSJpageNum = doc.getElementById("SSSJPageNum");

SSSJpageBefore.onclick = function(){
	if(SSSJpage==1){alert("已经是第一页");}
	else{
		SSSJpage --;
		SSSJcharts();
	}
}

SSSJpageNext.onclick = function(){
	console.log("1"+SSSJpage);
	SSSJpage ++;
	console.log("2"+SSSJpage);
	SSSJcharts();
}

//设定时间
SSSJsubmitDate.onclick = function () {
	getDate(SSSJstartDate,SSSJendDate);
	SSSJurlStartTime = getDate(SSSJstartDate,SSSJendDate)[0],
		SSSJurlEndTime = getDate(SSSJstartDate,SSSJendDate)[1];
	SSSJcharts();
}

addLoadEvent(initialPicker(SSSJstartDate, SSSJendDate));

function SSSJcharts(){
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
			var SSSJEchartsUrl = "http://123.206.134.34:8080/Medicals_temp/charts/shoushushijian?page="+SSSJpage+"&startTime="+SSSJurlStartTime+"&endTime="+SSSJurlEndTime;
			var url = SSSJEchartsUrl;
			console.log(url);
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					SSSJpageNum.placeholder = SSSJpage;
					//console.log(dataSource);
					addData();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax
			function addData(){
				var myChart = ec.init(document.getElementById('SSSJ_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#FD843C'];
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
							name: '小时',
							min: 0
						}
					],
					series: [
						{
							name:'手术时间',
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
addLoadEvent(SSSJcharts());

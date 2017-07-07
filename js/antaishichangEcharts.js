var ATSCpage = 1,
	doc = document,
	ATSCurlStartTime = "2010-01-01",
	ATSCurlEndTime = currentDate,
	// ATSCEchartsUrl = "",
	ATSCstartDate = doc.getElementById("ATSCstartTime"),
	ATSCendDate = doc.getElementById("ATSCendTime"),
	ATSCsubmitDate = doc.getElementById("ATSCsubmitTime");

var ATSCpageBefore = doc.getElementById("ATSCPageBefore"),
	ATSCpageNext = doc.getElementById("ATSCPageNext"),
	ATSCpageNum = doc.getElementById("ATSCPageNum");

ATSCpageBefore.onclick = function(){
	if(ATSCpage==1){alert("已经是第一页");}
	else{
		ATSCpage --;
		ATSCcharts();
	}
}

ATSCpageNext.onclick = function(){
	console.log("1"+ATSCpage);
	ATSCpage ++;
	console.log("2"+ATSCpage);
	ATSCcharts();
}

//设定时间
ATSCsubmitDate.onclick = function () {
	getDate(ATSCstartDate,ATSCendDate);
	ATSCurlStartTime = getDate(ATSCstartDate,ATSCendDate)[0],
		ATSCurlEndTime = getDate(ATSCstartDate,ATSCendDate)[1];
	ATSCcharts();
}

addLoadEvent(initialPicker(ATSCstartDate, ATSCendDate));

function ATSCcharts(){
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
			var ATSCEchartsUrl = "http://123.206.134.34:8080/Medicals_temp/charts/antaishichang?page="+ATSCpage+"&startTime="+ATSCurlStartTime+"&endTime="+ATSCurlEndTime;
			var url = ATSCEchartsUrl;
			console.log(url);
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					ATSCpageNum.placeholder = ATSCpage;
					//console.log(dataSource);
					addData();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax
			function addData(){
				var myChart = ec.init(document.getElementById('ATSC_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#F944C6'];
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
					//legend: {
					//	data: ['科室名称'],
					//	align: 'left'
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
							name: '分钟',
							min: 0
						}
					],
					series: [
						{
							name:'分钟',
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
addLoadEvent(ATSCcharts());

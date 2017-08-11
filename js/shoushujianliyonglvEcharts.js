var SSJLYLTotal = doc.getElementById("SSJLYLTotal"),
	SSJLYLTotalPage = 0,
	SSJLYLassignPage = doc.getElementById("SSJLYLassignPage"),
	SSJLYLconfirm = doc.getElementById("SSJLYLconfirm");

var SSJLYLpage = 1,
	doc = document,
	//SSJLYLurlStartTime = "2010-01-01",
	SSJLYLurlStartTime = month1stDate,
	SSJLYLurlEndTime = currentDate,
	// SSJLYLEchartsUrl = "",
	SSJLYLstartDate = doc.getElementById("SSJLYLstartTime"),
	SSJLYLendDate = doc.getElementById("SSJLYLendTime"),
	SSJLYLsubmitDate = doc.getElementById("SSJLYLsubmitTime");

var SSJLYLpageBefore = doc.getElementById("SSJLYLPageBefore"),
	SSJLYLpageNext = doc.getElementById("SSJLYLPageNext"),
	SSJLYLpageNum = doc.getElementById("SSJLYLPageNum");

SSJLYLstartDate.value = month1stDate;
SSJLYLendDate.value = currentDate;

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
	if(SSJLYLpage > SSJLYLTotalPage){
		SSJLYLpage --;
		alert('已经是最后一页');
	}else{
		SSJLYLcharts();
	}
}

//设定时间
SSJLYLsubmitDate.onclick = function () {
	getDate(SSJLYLstartDate,SSJLYLendDate);
	SSJLYLurlStartTime = getDate(SSJLYLstartDate,SSJLYLendDate)[0],
		SSJLYLurlEndTime = getDate(SSJLYLstartDate,SSJLYLendDate)[1];
	SSJLYLpage = 1;
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
					SSJLYLTotalPage = data.pageCount;

					SSJLYLpageNum.placeholder = SSJLYLpage;

					for(var ii in dataSource.y){
						if(dataSource.y[ii] == null){
							dataSource.y[ii] = 0;
							//console.log('hhah', dataSource.y[ii]);
						}
					}

					//console.log(dataSource);
					if(dataSource.x.length != 0){
						addData();
					}else{
						doc.getElementById('SSJLYL_Echarts').innerHTML = '暂无数据';
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax
			function addData(){
				var myChart = ec.init(document.getElementById('SSJLYL_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#8060DF'];
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
										if(j%4 == 0 && j!=0){
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

				SSJLYLTotal.innerHTML = SSJLYLTotalPage;
			}
		}
	);
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

SSJLYLconfirm.onclick = function(){
	tempPage = SSJLYLpage;
	SSJLYLpage = parseFloat(SSJLYLassignPage.value);
	if(isInteger(SSJLYLpage)){
		console.log(SSJLYLpage);
		if(SSJLYLpage <= SSJLYLTotalPage){
			SSJLYLcharts();
		}else{
			SSJLYLpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

addLoadEvent(SSJLYLcharts());

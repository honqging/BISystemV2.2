var MZTotal = doc.getElementById("MZTotal"),
	MZTotalPage = 0,
	MZassignPage = doc.getElementById("MZassignPage"),
	MZconfirm = doc.getElementById("MZconfirm");

var MZpage = 1,
	doc = document,
	//MZurlStartTime = "2010-01-01",
	MZurlStartTime = month1stDate,
	MZurlEndTime = currentDate,
	//MZEchartsUrl = "http://123.206.134.34:8080/Medicals_war/charts/mazuifangfa?page="+MZpage+"&startTime="+MZurlStartTime+"&endTime="+MZurlEndTime,
	MZstartDate = doc.getElementById("MZstartTime"),
	MZendDate = doc.getElementById("MZendTime"),
	MZsubmitDate = doc.getElementById("MZsubmitTime");

var MZpageBefore = doc.getElementById("MZPageBefore"),
	MZpageNext = doc.getElementById("MZPageNext"),
	MZpageNum = doc.getElementById("MZPageNum");

MZstartDate.value = month1stDate;
MZendDate.value = currentDate;

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
	if(MZpage > MZTotalPage){
		MZpage --;
		alert('已经是最后一页');
	}else{
		MZFFcharts();
	}
}

//设定时间
MZsubmitDate.onclick = function () {
	getDate(MZstartDate,MZendDate);
	MZurlStartTime = getDate(MZstartDate,MZendDate)[0],
		MZurlEndTime = getDate(MZstartDate,MZendDate)[1];
	MZpage = 1;
	MZpageNum.placeholder = 1;
	MZFFcharts();
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
					MZTotalPage = data.pageCount;

					MZpageNum.placeholder = MZpage;

					for(var ii in dataSource.y){
						if(dataSource.y[ii] == null){
							dataSource.y[ii] = 0;
							//console.log('hhah', dataSource.y[ii]);
						}
					}

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
				var colors = ['#6FA8E0'];
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
						//trigger: 'axis',
						//axisPointer: {
						//	type: 'cross'
						//}
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
							barCategoryGap: '80%',
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

				MZTotal.innerHTML = MZTotalPage;
			}
		}
	);
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

MZconfirm.onclick = function(){
	tempPage = MZpage;
	MZpage = parseFloat(MZassignPage.value);
	if(isInteger(MZpage)){
		console.log(MZpage);
		if(MZpage <= MZTotalPage){
			MZFFcharts();
		}else{
			MZpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

addLoadEvent(MZFFcharts());

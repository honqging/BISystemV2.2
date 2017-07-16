var ATJSCTotal = doc.getElementById("ATJSCTotal"),
	ATJSCTotalPage = 0,
	ATJSCassignPage = doc.getElementById("ATJSCassignPage"),
	ATJSCconfirm = doc.getElementById("ATJSCconfirm");

var ATJSCpage = 1,
	doc = document,
	ATJSCurlStartTime = "2010-01-01",
	ATJSCurlEndTime = currentDate,
	// ATJSCEchartsUrl = "",
	ATJSCstartDate = doc.getElementById("ATJSCstartTime"),
	ATJSCendDate = doc.getElementById("ATJSCendTime"),
	ATJSCsubmitDate = doc.getElementById("ATJSCsubmitTime");

var ATJSCpageBefore = doc.getElementById("ATJSCPageBefore"),
	ATJSCpageNext = doc.getElementById("ATJSCPageNext"),
	ATJSCpageNum = doc.getElementById("ATJSCPageNum");

ATJSCpageBefore.onclick = function(){
	if(ATJSCpage==1){alert("已经是第一页");}
	else{
		ATJSCpage --;
		ATJSCcharts();
	}
}

ATJSCpageNext.onclick = function(){
	console.log("1"+ATJSCpage);
	ATJSCpage ++;
	if(ATJSCpage > ATJSCTotalPage){
		alert('已经是最后一页');
	}else{
		ATJSCcharts();
	}
}

//设定时间
ATJSCsubmitDate.onclick = function () {
	getDate(ATJSCstartDate,ATJSCendDate);
	ATJSCurlStartTime = getDate(ATJSCstartDate,ATJSCendDate)[0],
		ATJSCurlEndTime = getDate(ATJSCstartDate,ATJSCendDate)[1];
	ATJSCcharts();
}

addLoadEvent(initialPicker(ATJSCstartDate, ATJSCendDate));

function ATJSCcharts(){
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
			var ATJSCEchartsUrl = "http://123.206.134.34:8080/Medicals_war/charts/antaijunshichang?page="+ATJSCpage+"&startTime="+ATJSCurlStartTime+"&endTime="+ATJSCurlEndTime;
			var url = ATJSCEchartsUrl;
			console.log(url);
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					ATJSCTotalPage = data.pageCount;
					ATJSCpageNum.placeholder = ATJSCpage;
					//console.log(dataSource);
					addData();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
			//result ajax
			function addData(){
				var myChart = ec.init(document.getElementById('ATJSC_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#DE6389'];
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

				ATJSCTotal.innerHTML = ATJSCTotalPage;
			}
		}
	);
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

ATJSCconfirm.onclick = function(){
	tempPage = ATJSCpage;
	ATJSCpage = parseFloat(ATJSCassignPage.value);
	if(isInteger(ATJSCpage)){
		console.log(ATJSCpage);
		if(ATJSCpage <= ATJSCTotalPage){
			ATJSCcharts();
		}else{
			ATJSCpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

addLoadEvent(ATJSCcharts());

var SXCSTotal = doc.getElementById("SXCSTotal"),
	SXCSTotalPage = 0,
	SXCSassignPage = doc.getElementById("SXCSassignPage"),
	SXCSconfirm = doc.getElementById("SXCSconfirm");

var SXCSpage = 1,
	doc = document,
	//SXCSurlStartTime = "2010-01-01",
	SXCSurlStartTime = month1stDate,
	SXCSurlEndTime = currentDate;
    SXCSEchartsUrl = "",
	SXCSstartDate = doc.getElementById("SXCSstartTime"),
	SXCSendDate = doc.getElementById("SXCSendTime"),
	SXCSsubmitDate = doc.getElementById("SXCSsubmitTime");

var SXCSpageBefore = doc.getElementById("SXCSPageBefore"),
	SXCSpageNext = doc.getElementById("SXCSPageNext"),
	SXCSpageNum = doc.getElementById("SXCSPageNum");

SXCSstartDate.value = month1stDate;
SXCSendDate.value = currentDate;

SXCSpageBefore.onclick = function(){
	if(SXCSpage==1){alert("已经是第一页");}
	else{
		SXCSpage --;
		SXCScharts();
	}
}

SXCSpageNext.onclick = function(){
	SXCSpage ++;
	if(SXCSpage > SXCSTotalPage){
		alert('已经是最后一页');
	}else{
		SXCScharts();
	}
}

//设定时间
SXCSsubmitDate.onclick = function () {
	getDate(SXCSstartDate,SXCSendDate);
	SXCSurlStartTime = getDate(SXCSstartDate,SXCSendDate)[0],
		SXCSurlEndTime = getDate(SXCSstartDate,SXCSendDate)[1];
	SXCScharts();
}

addLoadEvent(initialPicker(SXCSstartDate, SXCSendDate));

function SXCScharts(){
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
			var SXCSEchartsUrl = "http://123.206.134.34:8080/Medicals_war/charts/shuxuecishu?page="+SXCSpage+"&startTime="+SXCSurlStartTime+"&endTime="+SXCSurlEndTime;
			var url = SXCSEchartsUrl;
			console.log(url);
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					SXCSTotalPage = data.pageCount;

					SXCSpageNum.placeholder = SXCSpage;

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
				var myChart = ec.init(document.getElementById('SXCS_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#D94C4B'];
				var option = {
					color: colors,
					title: {
						text: '输血',
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
							name: '输血次数',
							min: 0
						}
					],
					series: [
						{
							name:'输血次数',
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

				SXCSTotal.innerHTML = SXCSTotalPage;
			}
		}
	);
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

SXCSconfirm.onclick = function(){
	tempPage = SXCSpage;
	SXCSpage = parseFloat(SXCSassignPage.value);
	if(isInteger(SXCSpage)){
		console.log(SXCSpage);
		if(SXCSpage <= SXCSTotalPage){
			SXCScharts();
		}else{
			SXCSpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

addLoadEvent(SXCScharts());

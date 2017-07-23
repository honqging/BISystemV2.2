var JZSSTotal = doc.getElementById("JZSSTotal"),
	JZSSTotalPage = 0,
	JZSSassignPage = doc.getElementById("JZSSassignPage"),
	JZSSconfirm = doc.getElementById("JZSSconfirm");

var JZSSpage = 1,
	doc = document,
	//JZSSurlStartTime = "2010-01-01",
	JZSSurlStartTime = month1stDate,
	JZSSurlEndTime = currentDate,
	// JZSSEchartsUrl = "",
	JZSSstartDate = doc.getElementById("JZSSstartTime"),
	JZSSendDate = doc.getElementById("JZSSendTime"),
	JZSSsubmitDate = doc.getElementById("JZSSsubmitTime");

var JZSSpageBefore = doc.getElementById("JZSSPageBefore"),
	JZSSpageNext = doc.getElementById("JZSSPageNext"),
	JZSSpageNum = doc.getElementById("JZSSPageNum");

JZSSstartDate.value = month1stDate;
JZSSendDate.value = currentDate;

JZSSpageBefore.onclick = function(){
	if(JZSSpage==1){alert("已经是第一页");}
	else{
		JZSSpage --;
		JZSScharts();
	}
}

JZSSpageNext.onclick = function(){
	console.log("1"+JZSSpage);
	JZSSpage ++;
	if(JZSSpage > JZSSTotalPage){
		JZSSpage --;
		alert('已经是最后一页');
	}else{
		JZSScharts();
	}
}

//设定时间
JZSSsubmitDate.onclick = function () {
	getDate(JZSSstartDate,JZSSendDate);
	JZSSurlStartTime = getDate(JZSSstartDate,JZSSendDate)[0],
		JZSSurlEndTime = getDate(JZSSstartDate,JZSSendDate)[1];
	JZSSpage = 1;
	JZSScharts();
}

addLoadEvent(initialPicker(JZSSstartDate, JZSSendDate));

function JZSScharts(){
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
			var JZSSEchartsUrl = "http://123.206.134.34:8080/Medicals_war/charts/jizhen?page="+JZSSpage+"&startTime="+JZSSurlStartTime+"&endTime="+JZSSurlEndTime;
			var url = JZSSEchartsUrl;
			console.log(url);
			var dataSource = [];
			$.ajax({
				type: "get",
				url: url,
				dataType: "json",
				jsonp:"callback",
				success: function (data) {
					dataSource = data;
					JZSSTotalPage = data.pageCount;

					JZSSpageNum.placeholder = JZSSpage;
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
				var myChart = ec.init(document.getElementById('JZSS_Echarts'));
				var ecConfig = require('echarts/config');
				var colors = ['#D94C4B'];
				var option = {
					color: colors,
					title: {
						text: '科室名称',
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

								//标签与坐标轴的间距
								//margin: 50,

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
							name: '急诊数',
							min: 0
						}
					],
					series: [
						{
							name:'急诊手术数量',
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

				JZSSTotal.innerHTML = JZSSTotalPage;
			}
		}
	);
}

function isInteger(obj) {
	return typeof obj === 'number' && obj%1 === 0 && obj > 0
}

JZSSconfirm.onclick = function(){
	tempPage = JZSSpage;
	JZSSpage = parseFloat(JZSSassignPage.value);
	if(isInteger(JZSSpage)){
		console.log(JZSSpage);
		if(JZSSpage <= JZSSTotalPage){
			JZSScharts();
		}else{
			JZSSpage = tempPage;
			alert('超出页数上限，请重新选择页数');
		}
	}else{
		alert('请输入正整数！')
	}
}

addLoadEvent(JZSScharts());

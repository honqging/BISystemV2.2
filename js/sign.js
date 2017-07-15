var doc = document;
var modules = '';

// sign in
function signIn(){
	var signInUrl = 'http://123.206.134.34:8080/Medicals_war/login';
	var name = doc.getElementById('name').value,
		password = doc.getElementById('inPassword').value;
	var inData = {
		userName: name,
		password: password
	};
	$.ajax({
		type: 'POST',
		url: signInUrl,
		data: inData,
		dataType: 'json',
		jsonp: 'callback',
		success: function(data, textStatus, jqXHR){
			if(data.result == 1){
				alert("用户名或密码错误，请重新输入");
			}else{
				window.location.href = 'index.html';
			}


			//var coo = doc.cookie;
			//alert('cookie.length: ', getCookie('JSESSIONID'));
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	})
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "noneee";
}

var docCookies = {
	getItem: function (sKey) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	},
	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		var sExpires = "";
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					break;
				case String:
					sExpires = "; expires=" + vEnd;
					break;
				case Date:
					sExpires = "; expires=" + vEnd.toUTCString();
					break;
			}
		}
		document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		return true;
	},
	removeItem: function (sKey, sPath, sDomain) {
		if (!sKey || !this.hasItem(sKey)) { return false; }
		document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
		return true;
	},
	hasItem: function (sKey) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	keys: /* optional method: you can safely remove it! */ function () {
		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
		return aKeys;
	}
};

// sign up
function signUp(){
	var userName = doc.getElementById('userName').value,
		password = doc.getElementById('password').value,
		firstName = doc.getElementById('firstName').value,
		lastName = doc.getElementById('lastName').value,
		position = doc.getElementById('position').value,
		department = doc.getElementById('department').value,
		phone = doc.getElementById('phone').value;

	if(userName == '' || password == ''){
		alert('用户名或密码不允许为空');
	}
	var checkUrl = "http://123.206.134.34:8080/Medicals_war/checkusername?userName=" + userName;

	$.ajax({
		type: 'GET',
		url: checkUrl,
		dataType: 'json',
		jsonp: 'callback',
		success: function(data){
			if(data.result == 1){
				console.log('exist');
				alert('用户已经存在，请更换用户名！');
			}else{
				// sign up
				var signUpUrl = 'http://123.206.134.34:8080/Medicals_war/register';
				var upData = {
					userName: userName,
					password: password,
					firstName: firstName,
					lastName: lastName,
					position: position,
					department: department,
					phone: phone
				};

				$.ajax({
					type: 'POST',
					url: signUpUrl,
					data: upData,
					dataType: 'json',
					jsonp: 'callback',
					success: function (data) {
						if(data['result'] == 0){
							alert('注册成功！即将返回登录界面');
							window.location.href = 'signIn.html';
						}else{
							alert('注册失败！请重新注册');
						}
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						alert(errorThrown);
					}
				});
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}

// limits of authority
function indexCheck(userName, modulesJson){
	var user = doc.getElementById('user');
	user.innerHTML = userName;

	var subList = [[],
		['手麻病人一览表', '手术滑刀时间一览表', 'ASA分级统计'],
		['护士工作量统计表', '麻醉医生工作量统计表', '麻醉医生总工作量统计表', '手术护士工作量统计表', '手术医生工作量统计表', '科室工作量统计表'],
		['准点手术开台率', '急诊手术统计图', '手术时间分布图', '麻醉方法统计图', '手术间利用率统计图', '按台时长统计图', '按台均时长统计图', '输血次数统计图', '按年龄段统计科室麻醉手术次数'],
		['按年龄段统计麻醉方法麻醉次数', '按手术体位统计', '麻醉效果统计', '临床路径更改麻醉方式统计', '麻醉记录单插管统计', '按手术名称种类统计', '按麻醉方法统计急诊择期手术例数'],
		['恢复室时长超过1小时情况分析']
		];
	var subListId = [[],
		['SMBR', 'SSHD', 'ASA'],
		['HSGZL', 'MZYSGZL', 'MZYSZGZL', 'SSHSGZL', 'SSYSGZL', 'KSGZL'],
		['ZDSS', 'JZSS', 'SSSJ', 'MZFFTJT', 'SSJLYL', 'ATSC', 'ATJSC', 'SXCS', 'NLDKS'],
		['NLD', 'SSTW', 'MZXG', 'LCLJGGMZFS', 'MZJLDCG', 'ASSMCZLTJ', 'MZJZZQ'],
		['HFSSC']
		];

	var subListId2 = [[],
		['SMBR2', 'SSHD2', 'SSZK2', 'ASA2'],
		['HSGZL2', 'MZYSGZL2', 'MZYSZGZL2', 'SSHSGZL2', 'SSYSGZL2', 'KSGZL2'],
		['ZDSS2', 'JZSS2', 'SSSJ2', 'MZFFTJT2', 'SSJLYL2', 'ATSC2', 'ATJSC2', 'SXCS2', 'NLDKS2'],
		['NLD2', 'SSTW2', 'MZXG2', 'LCLJGGMZFS2', 'MZJLDCG2', 'ASSMCZLTJ2', 'MZJZZQ2'],
		['HFSSC2']
	];

	for(var i=0; i<subList.length; i++){
		var ifFirst = -1;
		for(var j=0; j<subList[i].length; j++){
			var idd = subListId2[i][j];
			var subMenu = doc.getElementById(idd);
			if(subMenu != null){
				subMenu.style.display = 'none';
				//console.log('show to be none...');
			}

			for(var t=0; t<modulesJson.length; t++){
				if(modulesJson[t]['ParentModule'] == i+1){
					//console.log('.........' + modules[t]['ModuleName']);
					//console.log(subList[i][j]);

					if(modulesJson[t]['ModuleName'] == subList[i][j]){
						//console.log(subList[i][j] + subMenu);

						if(subMenu != null){
							subMenu.style.display = 'block';
						}

						if(ifFirst == -1){
							ifFirst = j;
						}
					}
				}
			}
		}
		//console.log(ifFirst);

		if(ifFirst == 0){
			var noSubMenu = doc.getElementById(subListId[i][0]);
			if(noSubMenu != null ){
				//console.log(i);
				noSubMenu.setAttribute('class', 'tab-pane fade in active');
			}

		}else{
			//var noSubMenu = doc.getElementById(subListId[i][0]),
			//var noSubMenu = doc.getElementById(subListId[i][0]),
			var	yesSubMenu = doc.getElementById(subListId[i][ifFirst]);

			if(yesSubMenu != null){
				//console.log(subListId[i][0]);
				yesSubMenu.setAttribute('class', 'tab-pane fade in active');
			}


		}
	}

	//window.location.href = 'index.html';
}

function getPara(para) {
	if (location.href.indexOf("?") == -1) {
		// 没有参数，则Do nothing.
		return null;
	} else {
		// 取得GET请求?号后面的字符串
		var urlQuery = location.href.split("?");
		if (urlQuery[1].indexOf("&") == -1) { //只有一个参数
			if (urlQuery[1].indexOf("=") == -1) {
				//没有等号，没有参数，则Do nothing
				return null;
			} else {
				var keyValue = urlQuery[1].split("=");
				var key = keyValue[0];
				var value = keyValue[1];
				if (key == para) {
					return value;
				}
			}
		} else {

		}
		return null;
	}
}

function signOut(){
	var signOutUrl = 'http://123.206.134.34:8080/Medicals_war/logout';

	$.ajax({
		type: 'GET',
		url: signOutUrl,
		jsonp: 'callback',
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(data){
			alert('登出成功，即将返回登录界面');
			window.location.href = 'signIn.html';
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert('登出失败，请重新登录');
			window.location.href = 'signIn.html';
			//alert(errorThrown);
		}
	});
}

function isLogin(){
	var isLoginUrl = 'http://123.206.134.34:8080/Medicals_war/islogin';

	$.ajax({
		type: 'POST',
		url: isLoginUrl,
		dataType: 'json',
		jsonp: 'callback',
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(data){
			if(data.isLogin){
				if(data.isLogin == 1){
					window.onload = function(){
						indexCheck(data.userName, data.modules);
					};
					//return 1;
				}else{
					//return 0;
					alert('您未登录，请返回登录');
					window.location.href = 'signIn.html';
				}
			}else{
				//return 0;
				alert('您未登录，请返回登录');
				window.location.href = 'signIn.html';
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
			//return 0;
		}
	});
}

function isLogin2(){
	var isLoginUrl = 'http://123.206.134.34:8080/Medicals_war/islogin';

	$.ajax({
		type: 'POST',
		url: isLoginUrl,
		dataType: 'json',
		jsonp: 'callback',
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(data){
			if(data.isLogin){
				if(data.isLogin == 1){
					indexCheck(data.userName, data.modules);
				}else{
					alert('您未登录，请返回登录');
					window.location.href = 'signIn.html';
				}
			}else{
				alert('您未登录，请返回登录');
				window.location.href = 'signIn.html';
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		}
	});
}
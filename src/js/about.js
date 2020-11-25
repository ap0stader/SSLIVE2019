// about.js

function load() {
    resize();
}

function toLive() {
	var livePath = "live.html"; //如果在直播跳转地址
	window.location.href = livePath;
}

function listener(showSnackbarButton, snackbarContainer) {
	'use strict';
	//var snackbarContainer = document.querySelector('#live-not-on-snackbar');
	//var showSnackbarButton = document.querySelector('#button-redirect-to-live');
	var handler = function (event) {
		showSnackbarButton.style.backgroundColor = '';
	};
	showSnackbarButton.addEventListener('click', function () {
		'use strict';
		$.ajax({
			url: "../../console/livestatus.json",
			method: "GET",
			success: function (data) {
				// 分发到直播页面条件：JSON文件中直播已经开始
				if (data.Live) {//是否开播
					toLive();
				} else {
					$.ajax({
						url: "/config/coding/livestart.json",
						method: "GET",
						success: function (data) {
							var nowtime = new Date().getTime(); //当前时间
							// 请注意，这里的月份一定要减1，即一月应该是“0月”
							var livetime = new Date(data.year, data.month - 1, data.day, data
								.hour, data.minute).getTime();
							//开播时间
							var rest = parseInt((livetime - nowtime) / 1000);

							var day = parseInt(rest / 3600 / 24);
							var hour = parseInt((rest / 3600) % 24);
							var min = parseInt((rest / 60) % 60);
							var sec = parseInt(rest % 60);


							if (day.toString().length == 1) {
								day = "0" + day
							}
							if (hour.toString().length == 1) {
								hour = "0" + hour
							}
							if (min.toString().length == 1) {
								min = "0" + min
							}
							if (sec.toString().length == 1) {
								sec = "0" + sec
							}
							//alert("还有"+day+"天"+hour+"小时"+min+"分钟才开始直播");//随便写的
							var handler = function(event) {
								toLive();
							  };
							//显示直播未开始
							var data = {
								message: "还有" + day + "天" + hour + "小时" + min + "分钟才开始直播",
								timeout: 2000,
								actionHandler: handler,
      							actionText: '强制跳转'
							};
							snackbarContainer.MaterialSnackbar.showSnackbar(data);

						},
						error: function () {
							$('#loading').text(" ");
							$("#errmsg").text("请检查网络链接并刷新页面");
							return;
						}
					});

				}
			},
			error: function () {
				$('#loading').text(" ");
				$("#errmsg").text("请检查网络链接并刷新页面");
				return;
			}
		});
	});
}

function listenerAlter(showSnackbarButton, snackbarContainer) {
	'use strict';
	//var snackbarContainer = document.querySelector('#live-not-on-snackbar');
	//var showSnackbarButton = document.querySelector('#button-redirect-to-live');
	var handler = function (event) {
		showSnackbarButton.style.backgroundColor = '';
	};
	showSnackbarButton.addEventListener('click', function () {
		'use strict';
		$.ajax({
			url: "../../console/livestatus.json",
			method: "GET",
			success: function (data) {
				// 分发到直播页面条件：JSON文件中直播已经开始
				if (data.Live) {//是否开播
					toLive();
				} else {
					$.ajax({
						url: "/config/coding/livestart.json",
						method: "GET",
						success: function (data) {
							var nowtime = new Date().getTime(); //当前时间
							// 请注意，这里的月份一定要减1，即一月应该是“0月”
							var livetime = new Date(data.year, data.month - 1, data.day, data
								.hour, data.minute).getTime();
							//开播时间
							var rest = parseInt((livetime - nowtime) / 1000);

							var day = parseInt(rest / 3600 / 24);
							var hour = parseInt((rest / 3600) % 24);
							var min = parseInt((rest / 60) % 60);
							var sec = parseInt(rest % 60);


							if (day.toString().length == 1) {
								day = "0" + day
							}
							if (hour.toString().length == 1) {
								hour = "0" + hour
							}
							if (min.toString().length == 1) {
								min = "0" + min
							}
							if (sec.toString().length == 1) {
								sec = "0" + sec
							}
							alert("还有"+day+"天"+hour+"小时"+min+"分钟才开始直播");//随便写的

						},
						error: function () {
							$('#loading').text(" ");
							$("#errmsg").text("请检查网络链接并刷新页面");
							return;
						}
					});

				}
			},
			error: function () {
				$('#loading').text(" ");
				$("#errmsg").text("请检查网络链接并刷新页面");
				return;
			}
		});
	});
}

$('document').ready(load)
$(window).resize(resize)

//根据设备加载不同的样式
var setStyle = function(cssArr){
	var i= 0,len = cssArr.length;
	for(i;i<len;i++){
		document.write('<link href="'+cssArr[i]+'" type="text/css" rel=stylesheet>');
	}
};
// 判断是否移动端
function goPAGE() {
	if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		// window.location.href="移动端url";
		//alert("mobile");
		//判断访问环境是 移动端 则加载以下样式
		setStyle(['src/css/pages/about-mobile.css']);
	}
	else {
		// window.location.href="pc端url"; 
		//alert("pc")
	}
}
goPAGE();        // 调用function

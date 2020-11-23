// introduction.js

// 全局变量，以适应多重请求嵌套
var liveTimeLeft, stopTimeLeft;

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
			url: "/console/livestatus.json",
			method: "GET",
			success: function (data) {
				var live = data.Live; //是否开播
				// 分发到直播页面条件：JSON文件中直播已经开始
				if (live) {
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

/*
function isLive() {
	// 根据直播情况分发页面
	// 分发到直播页面条件：JSON文件中直播已经开始
	$.ajax({
		url: "/console/livestatus.json",
		method: "GET",
		success: function (data) {
			var live = data.Live; //是否开播
			// 分发到直播页面条件：JSON文件中直播已经开始
			if (live) {
				toLive();
			} else {
				$.ajax({
					url: "/config/coding/livestart.json",
					method: "GET",
					success: function (data) {
						var nowtime = new Date().getTime(); //当前时间
						// 请注意，这里的月份一定要减1，即一月应该是“0月”
						var livetime = new Date(data.year, data.month - 1, data.day, data.hour, data.minute).getTime();
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

						//显示直播未开始
						var snackbarContainer = document.querySelector('#live-not-on-snackbar');
						var data = {
							message: 'Button color changed.',
							timeout: 2000,
							actionHandler: handler,
							actionText: 'Undo'
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
}
*/
// 判断是否已经开播
function checker() {
	// 根据直播情况分发页面
	var CHOOSE = true; //ture-根据是否开播分流，false根据时间分流
	// 分发到直播页面条件：JSON文件中直播已经开始
	if (CHOOSE) {
		$.ajax({
			url: "/console/livestatus.json",
			method: "GET",
			success: function (data) {
				var live = data.Live; //是否开播
				// 分发到直播页面条件：JSON文件中直播已经开始
				if (live) {
					toLive();
				} else {
					return false;
					//window.location.href = inTro;
				}
			},
			error: function () {
				$('#loading').text(" ");
				$("#errmsg").text("请检查网络链接并刷新页面");
				return;
			}
		});
	} else {
		$.ajax({
			url: "/config/coding/livestart.json",
			method: "GET",
			success: function (data) {
				var nowtime = new Date().getTime(); //当前时间
				// 请注意，这里的月份一定要减1，即一月应该是“0月”
				var livetime = new Date(data.year, data.month - 1, data.day, data.hour, data.minute).getTime();
				//开播时间
				liveTimeLeft = livetime - nowtime; //计算时差
			},
			error: function () {
				$('#loading').text(" ");
				$("#errmsg").text("请检查网络链接并刷新页面");
				return;
			}
		});
		$.ajax({
			url: "/config/coding/livestop.json",
			method: "GET",
			success: function (data) {
				var nowtime = new Date().getTime(); //当前时间
				// 请注意，这里的月份一定要减1，即一月应该是“0月”
				var stoptime = new Date(data.year, data.month - 1, data.day, data.hour, data.minute).getTime();
				//停播时间
				stopTimeLeft = stoptime - nowtime; //计算时差
			},
			error: function () {
				$('#loading').text(" ");
				$("#errmsg").text("请检查网络链接并刷新页面");
				return;
			}
		});
		if ((liveTimeLeft < 10000) && (stopTimeLeft > 0)) {
			toLive();
		} else {
			//window.location.href = inTro;
		}
	}
}

// 调整页面
function resizeer() {
	resize();
	$('#timer-container').css('height', $(window).width() / 16 * 9 + 'px');
	$(".history-image").css('height', $('.history-image').width() / 16 * 10 + 'px');
}


function load() {
	if (check() == 1) {
		setInterval(newtime, 1000);
		setInterval(checker, 10000);
		resizeer();
	}
}

$('document').ready(load);
$(window).resize(resizeer);
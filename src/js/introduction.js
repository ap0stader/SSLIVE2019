// introduction.js

// 全局变量，以适应多重请求嵌套
var liveTimeLeft, stopTimeLeft;

// 判断是否已经开播
function checker() {
    // 根据直播情况分发页面
    var CHOOSE = true; //ture-根据是否开播分流，false根据时间分流
    var livePath="live.html";//如果在直播跳转地址
    var inTro="introduction.html";//不在的跳转地址
    // 分发到直播页面条件：JSON文件中直播已经开始
    if (CHOOSE) {
    	$.ajax({
    		url: "/console/livestatus.json",
    		method: "GET",
    		success: function(data) {
    			var live = data.Live; //是否开播
    			// 分发到直播页面条件：JSON文件中直播已经开始
    			if (live) {
    				window.location.href = livePath;
    			} else {
    				window.location.href = inTro;
    			}
    		},
    		error: function() {
    			$('#loading').text(" ");
    			$("#errmsg").text("请检查网络链接并刷新页面");
    			return;
    		}
    	});
    } else {
    	//按照时间定时分流到b站
    	$.ajax({
    		url: "/config/coding/livestart.json",
    		method: "GET",
    		success: function(data) {
    			var nowtime = new Date().getTime(); //当前时间
    			// 请注意，这里的月份一定要减1，即一月应该是“0月”
    			var livetime = new Date(data.year, data.month - 1, data.day, data.hour, data.minute).getTime();
    			//开播时间
    			liveTimeLeft = livetime - nowtime; //计算时差
    		},
    		error: function() {
    			$('#loading').text(" ");
    			$("#errmsg").text("请检查网络链接并刷新页面");
    			return;
    		}
    	});
    	$.ajax({
    		url: "/config/coding/livestop.json",
    		method: "GET",
    		success: function(data) {
    			var nowtime = new Date().getTime(); //当前时间
    			// 请注意，这里的月份一定要减1，即一月应该是“0月”
    			var stoptime = new Date(data.year, data.month - 1, data.day, data.hour, data.minute).getTime();
    			//停播时间
    			stopTimeLeft = stoptime - nowtime; //计算时差
    		},
    		error: function() {
    			$('#loading').text(" ");
    			$("#errmsg").text("请检查网络链接并刷新页面");
    			return;
    		}
    	});
    	if ((liveTimeLeft < 10000) && (stopTimeLeft > 0)) {
    		window.location.href = livePath;
    	} else {
    		window.location.href = inTro;
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

// index.js

// 全局变量，以适应多重请求嵌套
var liveTimeLeft, stopTimeLeft;

function load() {
    if (check() == 1) {
        // 根据直播情况分发页面
        $.ajax({
            url: "/config/livemode.json",
            method: "GET",
            success: function (data) {
                var mode = data.mode;//是否开播
                // 分发到直播页面条件：JSON文件中直播已经开始
                if (mode == 'ssersay') {
                    $.ajax({
                        url: "/console/livestatus.json",
                        method: "GET",
                        success: function (data) {
                            var live = data.Live;//是否开播
                            // 分发到直播页面条件：JSON文件中直播已经开始
                            if (live) {
                                window.location.href = 'live.html'
                            } else {
                                window.location.href = 'introduction.html';
                            }
                        },
                        error: function () {
                            $('#loading').text(" ")
                            $("#errmsg").text("请检查网络链接并刷新页面");
                        }
                    });
                } else if(mode == 'coding') {
                    $.ajax({
                        url: "/config/coding/livestart.json",
                        method: "GET",
                        success: function (data) {
                            var nowtime = new Date().getTime();//当前时间
                            // 请注意，这里的月份一定要减1，即一月应该是“0月”
                            var livetime = new Date(data.year, data.month - 1, data.day, data.hour, data.minute).getTime();
                            //开播时间
                            liveTimeLeft = livetime - nowtime;//计算时差
                        },
                        error: function () {
                            $('#loading').text(" ")
                            $("#errmsg").text("请检查网络链接并刷新页面");
                        }
                    });
                    $.ajax({
                        url: "/config/coding/livestop.json",
                        method: "GET",
                        success: function (data) {
                            var nowtime = new Date().getTime();//当前时间
                            // 请注意，这里的月份一定要减1，即一月应该是“0月”
                            var stoptime = new Date(data.year, data.month - 1, data.day, data.hour, data.minute).getTime();
                            //停播时间
                            stopTimeLeft = stoptime - nowtime;//计算时差
                        },
                        error: function () {
                            $('#loading').text(" ")
                            $("#errmsg").text("请检查网络链接并刷新页面");
                        }
                    });
                    if ((liveTimeLeft < 10000) && (stopTimeLeft > 0)) {
                        window.location.href = 'https://live.bilibili.com/10038913'
                    } else {
                        window.location.href = 'introduction.html';
                    }
                }
            },
            error: function () {
                $('#loading').text(" ")
                $("#errmsg").text("请检查网络链接并刷新页面");
            }
        });
    }
}

$('document').ready(load)

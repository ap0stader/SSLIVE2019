// index.js
// 功能：
// 根据直播情况分发页面

// debug模式，直接进入live.html，两种方式进入
var debugmode = false;
if (window.location.search.search("debug=1") >= 0) { debugmode = true; }

// getJSON文件以判断
var live = false;
$.ajax({
    url: "/config/livestatus.json",
    method: "GET",
    success: function (data) {
        live = data.Live;//是否开播

        var nowtime = new Date().getTime();//当前时间
        var livetime = new Date(data.Time.year, data.Time.month, data.Time.date, data.Time.hour, data.Time.minute).getTime();//开播时间
        var leftTime = livetime - nowtime;//计算时差

        // 直播页面条件：
        // 1.剩余时间小于预设值  2.直播已经开始  3.开启debug模式
        if (leftTime < data.Delta || live || debugmode) {
            window.location.href = 'live.html'
        }else {
            window.location.href = 'introduction.html';
        }
    },
    error: function() {
        $("#errmsg").text("错误！请检查网络链接并刷新页面");
    }
})
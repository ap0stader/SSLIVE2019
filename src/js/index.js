// index.js

function load() {
    if (check() == 1) {
        // 根据直播情况分发页面
        $.ajax({
            url: "/config/livestatus.json",
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
    }
}

$('document').ready(load)

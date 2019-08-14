// introduction.js

// 判断是否已经开播
function checker() {
    $.ajax({
        url: "/config/livestatus.json",
        method: "GET",
        success: function (data) {
            var live = data.Live;//是否开播
            var nowtime = new Date().getTime();//当前时间
            var livetime = new Date(data.Time.year, data.Time.month - 1, data.Time.date, data.Time.hour, data.Time.minute).getTime();//开播时间
            // 请注意，这里的月份一定要减1，即1月应该是“0月”
            var leftTime = livetime - nowtime;//计算剩余时间
            // 分发到直播页面条件：
            // 剩余时间小于预设值且直播已经开始
            if (leftTime < data.Delta && live) {
                window.location.href = 'live.html'
            }
        },
        error: function () {
            window.alert("请检查网络链接并刷新页面");
        }
    });
}

// 调整页面
function resizeer() {
    resize();
    $('#timer-container').css('height', $(window).width() / 16 * 9 + 'px');
    $(".history-image").css('height', $('.history-image').width() / 16 * 10 + 'px')
}

function load() {
    if (check() == 1) {
        setInterval(newtime, 1000);
        setInterval(checker, 10000);
        resizeer();
    }
}

$('document').ready(load)
$(window).resize(resizeer)

// introduction.js

// 判断是否已经开播
function checker() {
    $.ajax({
        url: "/config/livestatus.json",
        method: "GET",
        success: function (data) {
            var live = data.Live;//是否开播
            // 分发到直播页面条件：JSON文件中直播已经开始
            if (live) {
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

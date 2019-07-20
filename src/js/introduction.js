function resize() {
    $('#bgimg').css('height', $(window).height() - 60 + 'px');
    if($(window).width() < 750){
        $('#timer').css('font-size', $(window).width() / 31.25 + 'px');
        $('.tips-container').css('font-size', $(window).width() / 31.25 + 'px');
        $('#promote').css('font-size', $(window).width() / 31.25 + 'px');
    }
    
    $('#video').css('width', $(window).width() + 'px');
    $('#video').css('max-width', $(window).width() + 'px');
    $('#video').css('height', $(window).width() / 16 * 9 + 'px')
    $('#video').css('max-height', $(window).height() - 60 + 'px');

    $('#fullscreen').click(function(){
        videojs('video').requestFullscreen();
    });
    
}

function load(){
    newtime();
    videojs('video',{
        controls: true,
        // autoplay: 'any',
        preload: 'auto',
    });
    setInterval(function () { //“向下滑动”的动画
        $("#promote").animate({ bottom: "+=2.5%" }, { duration: 1000 });
        $("#promote").animate({ bottom: "-=2.5%" }, { duration: 1000 });
    }, 2000);
    setInterval(function () {
        // getJSON文件以判断
        $.ajax({
            url: "/config/livestatus.json",
            method: "GET",
            success: function (data) {
                var live = data.Live;//是否开播

                var nowtime = new Date().getTime();//当前时间
                var livetime = new Date(data.Time.year, data.Time.month, data.Time.date, data.Time.hour, data.Time.minute).getTime();//开播时间
                var leftTime = livetime - nowtime;//计算时差

                // TODO 这儿的逻辑到底是什么？
                // 分发到直播页面条件：
                // 1.剩余时间小于预设值  2.直播已经开始
                if (leftTime < data.Delta && live) {
                    window.location.href = 'live.html'
                }else {
                    window.location.href = 'introduction.html';
                }
            },
            error: function() {
                $("#errmsg").text("错误！请检查网络链接并刷新页面");
            }
        });
    }, 3000);
    resize();
}

$('document').ready(load)
$(window).resize(resize)

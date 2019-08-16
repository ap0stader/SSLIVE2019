// live.js
var player;
var isplay = false;

// 加载播放器
function load() {
    resize();
    player = videojs('video', {
        liveui: true,
        controls: true,
        preload: true,
        fullscreen: { options: { navigationUI: 'show' } }
    });
    // TODO 更改为真实的地址
    // player.src("https://suit.ssersay.cn/SUIT/stream.m3u8");
    player.src("https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8");

    $('#play').click(function () {
        if (isplay) {
            player.pause();
            $('#play').css('background-image', "url('/src/img/control/play.svg')");
            isplay = false;
        } else {
            player.play();
            $('#play').css('background-image', "url('/src/img/control/pause.svg')");
            isplay = true;
        }
    });

    $('#fullscreen').click(function () {
        player.requestFullscreen();
    });

    $('#danmuswitch').click(function () {
        add_danmu("Hello", "white", 1, 0)
    })

    create_socket();

    $("#danmu").danmu({
        //弹幕区宽度
        width: $("#video_html5_api").width(),
        //弹幕区高度
        height: $("#video_html5_api").height(),
        zindex: 10,
        //小弹幕的字号大小
        fontSizeSmall: 1.5 * parseInt($('html').css('font-size')),
        //大弹幕的字号大小
        FontSizeBig: 2 * parseInt($('html').css('font-size')),
        //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分
        positionOptimize: true,
    });
    $('#danmu').danmu('danmuStart');
}

$('document').ready(load)
$(window).resize(resize)

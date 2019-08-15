// live.js
var player;

// 加载播放器
function load() {
    resize();
    player = videojs('video', {
        liveui: true,
        controls: true,
        preload: true,
    });
    // TODO 更改为真实的地址
    // player.src("https://suit.ssersay.cn/SUIT/stream.m3u8");
    player.src("https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8");

    $("#danmu").danmu({
        height: $("#video_html5_api").height(),  //弹幕区高度
        width: $("#video_html5_api").width(),   //弹幕区宽度
        zindex: 50,
        fontSizeSmall: 1.5 * parseInt($('html').css('font-size')),     //小弹幕的字号大小
        FontSizeBig: 2 * parseInt($('html').css('font-size')),       //大弹幕的字号大小

        positionOptimize: true,         //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分
    });
    $('#danmu').danmu('danmuStart');
}

$('document').ready(load)
$(window).resize(resize)

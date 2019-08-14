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
}

$('document').ready(load)
$(window).resize(resize)

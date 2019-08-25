// live.js
var player;
var isplay = false;
var isdanmu = true;

function danmu_submit() {
    send_danmu($('#danmu-sender-input').val(), "white", 0, 0);
    $('#danmu-sender-input').val("");
}

// 加载播放器
function load() {
    resize();
    player = videojs('video', {
        liveui: true,
        controls: true,
        preload: true,
        fullscreen: { options: { navigationUI: 'show' } }
    });
    player.src("https://suit.ssersay.cn/SUIT/stream.m3u8");
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
    $('#danmuswitch').click(function () {
        if (isdanmu) {
            $('#danmu').danmu("setOpacity", 0);
            $('#danmuswitch').css('background-image', "url('/src/img/danmu/off.svg')");
            isdanmu = false;
        } else {
            $('#danmu').danmu("setOpacity", 0.9);
            $('#danmuswitch').css('background-image', "url('/src/img/danmu/on.svg')");
            isdanmu = true;
        }
    })
    $('#fullscreen').click(function () {
        player.requestFullscreen();
    });
    $("#danmu-sender-input").bind("input propertychange", function (param) {
        if ($("#danmu-sender-input").val() != '') {
            $("#danmu-sender-button").unbind("click").click(danmu_submit).css("background-color", "#00a1d6")
        } else {
            $("#danmu-sender-button").unbind("click").css("background-color", "#005470");
        }
    });
    $("#danmu-sender-button").unbind("click").css("background-color", "#57613c");
    growl.show({ text: "弹幕正在连接", type: "custom", imgsrc: "/src/img/growl/loading.gif" });
    // 在联通之后再展示弹幕发送组件
    $('#danmu-sender-container').css('display', 'none');
    // 建立websocket连接
    create_socket();
    // https://github.com/chiruom/jquery.danmu.js
    $("#danmu").danmu({
        //弹幕区宽度
        width: $("#video_html5_api").width(),
        //弹幕区高度
        height: $("#video_html5_api").height(),
        //弹幕区域z-index属性
        zindex: 10,
        //滚动弹幕的默认速度，这是数值指的是弹幕滚过每672像素所需要的时间（毫秒）
        speed: 7000 * (672 / 300),
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

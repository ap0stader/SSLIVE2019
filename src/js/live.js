var videowidth, videoheight;

function resize() {
    if($(window).width() < 750){
        // 根据屏幕宽度更改文字，以保证文字在一行内显示
        $('#title').text('省实“青春诗会”直播')
        $('html').css('font-size', $(window).width() / 31.25 + 'px');
        videowidth = $(window).width() * 0.95;
        videoheight = videowidth / 16 * 9;
        $('#video').css('width', videowidth);
        $('#video').css('height', videoheight);
        $('#video').css('max-width', videowidth);
        $('#video').css('min-height', videoheight);
    }else{
        // 根据屏幕宽度更改文字，以保证文字在一行内显示
        $('#title').text('广东实验中学“青春诗会”直播');
        videowidth = $(window).width() * 0.618 > 750 ? $(window).width() * 0.618 : 750;
        videoheight = videowidth / 16 * 9;
        $('#video').css('width', videowidth);
        $('#video').css('height', videoheight);
        $('#video').css('min-width', 750);
        $('#video').css('min-height', 421.875);
    }

    $('#controls').css('width', videowidth - 4);
    // 适配微信
    $('body').css('height', $(window).height());
    $('body').css('width', $(window).width());
}

var playmode;
var flvplayer, hlsplayer;
function load(){
    if(!flvjs.isSupported()){
        var playmode = 'FLV';
        flvplayer = flvjs.createPlayer({
            type : 'flv',
            isLive : true,
            hasAudio: true,
            hasVideo: true,
            cors: true,
            url: "http://suit.ssersay.cn/SUIT/stream.flv"
        },{
            enableStashBuffer: true,
        });
        var flvElement = document.getElementById('video');
        flvplayer.attachMediaElement(flvElement);
        flvplayer.load();
    }else{
        var playmode = 'HLS';
        $('#video').addClass("video-js vjs-big-play-centered");
        hlsplayer = videojs('video', {
            liveui: true,
            controls: false,
            preload: 'auto',
        });
        hlsplayer.src("http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8");
    }

    var isplay = false;
    $('#play').click(function(){
        if(isplay){
            if(playmode == 'FLV'){
                flvplayer.pause();
            }else if(playmode == 'HLS'){
                hlsplayer.pause();
            }
            $('#play').css('background-image', "url('/src/img/play.svg')");
            isplay = false;
        }else{
            if(playmode == 'FLV'){
                flvplayer.play();
            }else if(playmode == 'HLS'){
                hlsplayer.play();
            }
            $('#play').css('background-image', "url('/src/img/pause.svg')");
            isplay = true;
        }
    });

    $('#fullscreen').click(function(){
        if(playmode == 'FLV'){
            var ele = document.getElementById("video");
            if (ele.requestFullscreen) {
                ele.requestFullscreen();
            }
            else if (ele.webkitRequestFullscreen) {
                ele.webkitRequestFullscreen();
            }
            else if (ele.msRequestFullscreen) {
                ele.msRequestFullscreen();
            }
            else if (ele.mozRequestFullScreen) {
                ele.mozRequestFullScreen();
            }
            else if (ele.oRequestFullScreen) {
                ele.oRequestFullScreen();
            }
        }else if(playmode == 'HLS'){
            hlsplayer.requestFullscreen();
        }
    });

    resize();
}

$('document').ready(load)
$(window).resize(resize)

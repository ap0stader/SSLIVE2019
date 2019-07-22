function resize() {
    if($(window).width() < 750){
        // 根据屏幕宽度更改文字，以保证文字在一行内显示
        $('#title').text('省实“青春诗会”直播')
        $('html').css('font-size', $(window).width() / 31.25 + 'px');

        $('#video').css('width', $(window).width() * 0.95 + 'px');
        $('#video').css('max-width', $(window).width() * 0.95 + 'px');
        $('#video').css('height', $('#video').width() / 16 * 9 + 'px');
        $('#video').css('min-height', $('#video').width() / 16 * 9 + 'px');
    }else{
        // 根据屏幕宽度更改文字，以保证文字在一行内显示
        $('#title').text('广东实验中学“青春诗会”直播');

        $('#video').css('width', $(window).width() * 0.618 > 750 ? $(window).width() * 0.618 + 'px' : "750px");
        $('#video').css('min-width', "750px")
        $('#video').css('height', $('#video').width() / 16 * 9 + 'px');
        $('#video').css('min-height', '421.875px');
    }


    $('body').css('height', $(window).height())
    $('body').css('width', $(window).width())
}

function load(){
    if(!flvjs.isSupported()){
        var flvplayer = flvjs.createPlayer({
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
        $('#video').addClass("video-js vjs-big-play-centered");
        var hlsplayer = videojs('video', {
            liveui: true,
            controls: true,
            preload: 'auto',
        });
        hlsplayer.src("http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8");
    }
    resize();
}

$('document').ready(load)
$(window).resize(resize)

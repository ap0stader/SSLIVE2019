function resize() {
    $('#bgimg').css('height', $(window).height() - 60 + 'px');
    if($(window).width() < 750){
        $('#timer').css('font-size', $(window).width() / 31.25 + 'px');
        $('.tips-container').css('font-size', $(window).width() / 31.25 + 'px');
    }
    $('#video').css('max-width', $(window).width() + 'px');
    $('#video').css('max-height', ($(window).width() / 16 * 9) + 'px');
    $('#fullscreen').click(function(){
        console.log('click')
        videojs('video').requestFullscreen();
    });
}

function load(){
    newtime();
    videojs('video',{
        controls: true,
        autoplay: 'any',
        preload: 'auto',
    });
    resize()
}

$('document').ready(load)
$(window).resize(resize)



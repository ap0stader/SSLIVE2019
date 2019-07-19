function loadbgimg(url) {
    $('#bgimg').css('height', $(window).height() - 60 + 'px');
    newtime()
}

$('document').ready(loadbgimg)

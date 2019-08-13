// feedback.js
function browserjs_agree() {
    $("#browserjs-disagree").css("display", "none");
    $("#browserjs-disagree-notice").css("display", "none");
    $("#browserjs-agree").text("已同意使用这些数据");
    $("#step2").css("display", "block");
}

function browserjs_disagree() {
    $("#browserjs-disagree-notice").css("display", "block");
}

// 调整页面的字体大小
var rem = 16;
function resize() {
    if ($(window).width() < 500) {
        rem = $(window).width() / 31.25;
    } else {
        rem = 16
    }
    $('html').css('font-size', rem + 'px')
}

function load() {
    $("#browserjs-agree").click(browserjs_agree);
    $("#browserjs-disagree").click(browserjs_disagree);
    resize();
}

$('document').ready(load)
$(window).resize(resize)

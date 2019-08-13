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

function submit() {
    var Browser = Browser()
    $.ajax({
        url: "/console/feedback.php",
        method: "POST",
        data: {
            ua: navigator.userAgent,
            browser: info.browser,
            version: info.version,
            engine: info.engine,
            os: info.os,
            osVersion: info.osVersion,
            device: info.device,
            text: $("#textarea").text()
        },
        success: function (data) {
            if (data == "success") {
                live = true;
                $('#LiveControlButton').text("停 止 直 播").click(end);
                $("#LiveStatusReminder").css("visibility", "visible");
                growl.show({ text: "直播已开始！", type: "custom", imgsrc: "src/img/ok.gif", autoclose: 1000 });
            } else {
                alert(data);
            }
        }
    });
    $("#submit").unbind("click");
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
    $("#submit").click(submit);
    resize();
}

$('document').ready(load)
$(window).resize(resize)

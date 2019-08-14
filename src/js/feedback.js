// feedback.js
function submit() {
    var browser = new Browser();
    $("#submit").unbind("click");
    $("#submit").html("正在提交，请稍候");
    $.ajax({
        url: "https://feedback.ssersay.cn/console/feedback.php",
        method: "POST",
        data: {
            ua: navigator.userAgent,
            browser: browser.browser,
            version: browser.version,
            engine: browser.engine,
            os: browser.os,
            osVersion: browser.osVersion,
            device: browser.device,
            text: $("#textarea").val()
        },
        success: function (data) {
            if (data == 'success') {
                growl.show({ text: "提交成功！", type: "custom", imgsrc: "/src/img/growl/ok.gif", autoclose: 1000 });
            } else if (data == 'up') {
                window.alert("您提交问题反馈次数过多，请等待我们处理完成之后再提交，感谢您的支持！");
            } else if (data == 'error') {
                window.alert("您提交问题反馈出现错误！")
            }
            setTimeout(function () {
                window.location.href = 'index.html'
            }, 1100);
        }
    });
}

function textarea_input() {
    if ($("#textarea").val() != '') {
        $("#submit").unbind("click");
        $("#submit").click(submit);
    } else {
        $("#submit").unbind("click");
    }
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
    $("#textarea").bind("input propertychange", textarea_input);
    resize();
}

$('document').ready(load)
$(window).resize(resize)

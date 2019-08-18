// feedback.js

// 提交反馈内容
function submit() {
    var browser = new Browser();
    $("#submit").unbind("click").html("正在提交，请稍候").css("background-color", "#06AD56")
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
        },
        error: function () {
            window.alert("请检查网络链接并刷新页面");
        }
    });
}

// 判断是否可以提交
function textarea_input() {
    if ($("#textarea").val() != '') {
        $("#submit").unbind("click").click(submit).css("background-color", "#07C160")
    } else {
        $("#submit").unbind("click").css("background-color", "#045C2E");
    }
}

function load() {
    if (check() == 1) {
        $("#submit").css("background-color", "#045C2E");
        $("#textarea").bind("input propertychange", textarea_input);
        resize();
    }
}

$('document').ready(load)
$(window).resize(resize)

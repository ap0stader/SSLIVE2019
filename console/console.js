// console.js
var live = false;

function start() {
    $.ajax({
        url: "/console/livestatus.php",
        method: "POST",
        data: {
            cmd: "start"
        },
        success: function(data) {
            if (data == "success") {
                live = true;
                $('#LiveControlButton').text("停 止 直 播").unbind("click").click(end);
                $("#LiveStatusReminder").css("visibility", "visible");
                growl.show({
                    text: "直播已开始！",
                    type: "custom",
                    imgsrc: "/src/img/growl/ok.gif",
                    autoclose: 1000
                });
            } else {
                alert(data);
            }
        }
    })
}
function logOut() {
    //登出
	//取消这3个cookie，通过把过期设为-1
    $.cookie('user', "", {
        expires: -1,
        path: '/'
    });
    $.cookie('time', "", {
        expires: -1,
        path: '/'
    });
    $.cookie('token', "", {
        expires: -1,
        path: '/'
    });
    location.reload();
}
function end() {
    $.ajax({
        url: "/console/livestatus.php",
        method: "POST",
        data: {
            cmd: "stop"
        },
        success: function(data) {
            if (data == "success") {
                live = false;
                $("#LiveControlButton").text("开 始 直 播").unbind("click").click(start);
                $("#LiveStatusReminder").css("visibility", "hidden");
                growl.show({
                    text: "直播已停止！",
                    type: "custom",
                    imgsrc: "/src/img/growl/ok.gif",
                    autoclose: 1000
                });
            } else {
                alert(data);
            }
        }
    })
}

// 获得当前直播情况
function get() {
    $.ajax({
        url: "/console/livestatus.json",
        method: "GET",
        success: function(data) {
            var live = data.Live; //是否开播
            if (live) {
                $("#LiveStatusReminder").css("visibility", "visible");
                $('#LiveControlButton').text("停 止 直 播").unbind("click").click(end);
            } else {
                $("#LiveStatusReminder").css("visibility", "hidden");
                $("#LiveControlButton").text("开 始 直 播").unbind("click").click(start);
            }
        }
    });
}

function load() {
    //显示加载特效
    $('#loading').show();
    if ($.cookie('user') != null && $.cookie('token') != null && $.cookie('time') != null) {
        //验证token
        $.post("CHEACKIN.php", {
            a: $.cookie('user'),
            b: $.cookie('time'),
            c: $.cookie('token')
        },
        function(result) {
            if (result == "valid") {
                $('#loading').hide();
                console.log("Welcome %s, hope you can have fun in here\nyou already login %s days", $.cookie('user'), ((new Date()).getTime() - $.cookie('time')) / 86400000);
            } else {
                //重新登录指引
                $("body").append("<div id='msg'><span>you should relogin</span></div>");
                setTimeout(function() {
                    window.location.href = "login/index.html";
                },
                2000);
            }
        });
    } else {
        $("body").append("<div id='msg'><span>you should relogin</span></div>");
        setTimeout(function() {
            window.location.href = "login/index.html";
        },
        2000);
    }
    setInterval(newtime, 1000);
    get();
}

$('document').ready(load);
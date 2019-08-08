var live = false;

function start() {
    $.ajax({
        url: "/console/livestatus.php",
        method: "POST",
        data: {
            cmd: "start"
        },
        success: function (data) {
            if (data == "success") {
                growl.show({ text: "直播已开始！", type: "custom", imgsrc: "src/img/ok.gif", autoclose: 1000 });
                live = true;
                $("#LiveStatusReminder").css("visibility", "visible");
                $('#LiveControlButton').text("停 止 直 播").click(end);
            } else {
                alert(data);
            }
        }
    })
}

function end() {
    $.ajax({
        url: "/console/livestatus.php",
        method: "POST",
        data: {
            cmd: "stop"
        },
        success: function (data) {
            if (data == "success") {
                growl.show({ text: "直播已停止！", type: "custom", imgsrc: "src/img/ok.gif", autoclose: 1000 });
                live = false;
                $("#LiveStatusReminder").css("visibility", "hidden");
                $("#LiveControlButton").text("开 始 直 播").click(start);
            } else {
                alert(data);
            }
        }
    })
}

// 获得当前直播情况
function get() {
    $.ajax({
        url: "/config/livestatus.json",
        method: "GET",
        success: function (data) {
            var live = data.Live;//是否开播
            if (live) {
                $("#LiveStatusReminder").css("visibility", "visible");
                $('#LiveControlButton').text("停 止 直 播").click(end);
            } else {
                $("#LiveStatusReminder").css("visibility", "hidden");
                $("#LiveControlButton").text("开 始 直 播").click(start);
            }
        }
    });
}

function load() {
    setInterval(newtime, 1000);
    get();
}

$('document').ready(load)
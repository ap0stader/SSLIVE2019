// danmu.js
// 弹幕有关函数，仅针对live.html页面

// 建立WebSocket
var websocket;

function create_socket() {
    websocket = new WebSocket('wss://backend.ssersay.cn:9505');
    websocket.onmessage = function (evt) {
        growl.close("hard");
        var json = $.parseJSON(evt.data);
        if (json.todo == "add_danmu") {
            add_danmu(json.data.text, json.data.color, json.data.size, json.data.position);
        } else if (json.todo == "response") {
            switch (json.origin) {
                case "send_danmu":
                    send_danmu_response(json.data)
                    break;
                default:
                    console.log("todo:" + json.todo);
                    console.log("origin:" + json.origin);
                    console.log("data:" + json.data);
                    break;
            }
        }
    };
    websocket.onerror = function (evt) {
        window.alert("WebSocket服务发生了错误，请您在页面底部找到问题反馈进行反馈。");
        growl.close("hard");
    };
    websocket.onopen = function (evt) {
        $('#danmu-sender-container').css('display', 'flex');
        growl.close("hard");
    };
    websocket.onclose = function (evt) {
        $('#danmu-sender-container').css('display', 'none');
        if (evt.code != 1006) {
            growl.show({ text: "正在重连", type: "custom", imgsrc: "/src/img/growl/loading.gif" });
            create_socket();
        }
    };
}

function add_danmu(text, color, size, position) {
    var time = $('#danmu').data("nowTime") + 1;
    $("#danmu").danmu("addDanmu", [
        { "text": text, "color": color, "size": size, "position": position, "time": time }
    ]);
}

function send_danmu(text, color, size, position) {
    // 合成data字符串
    var data_obj = '{"text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '"}';
    websocket.send('{"command":"send_danmu","data":' + data_obj + '}');
    growl.show({ text: "正在发送", type: "custom", imgsrc: "/src/img/growl/loading.gif" });
}

function send_danmu_response(data) {
    if (data == "success") {
        growl.show({ text: "弹幕发送成功！", type: "custom", imgsrc: "/src/img/growl/ok.gif", autoclose: 1000 });
    } else if (data == 'block') {
        window.alert('您的弹幕涉嫌违规，已屏蔽！！！')
    } else if (data == 'failed') {
        window.alert('您的弹幕发送失败，请您在页面底部找到问题反馈进行反馈。')
    }
}
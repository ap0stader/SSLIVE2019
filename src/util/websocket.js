// websocket.js
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